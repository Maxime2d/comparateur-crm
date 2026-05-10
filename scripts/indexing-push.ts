/**
 * Pousse quotidiennement N URLs à l'indexation Google + IndexNow.
 *
 * - Lit la liste prioritaire (indexing-priority.ts)
 * - Lit l'état (indexing-state.json) pour ne pas re-soumettre la même URL
 *   trop souvent (cooldown 14 jours par URL)
 * - Soumet les N URLs prioritaires :
 *    1. Tier 1 d'abord, puis Tier 2, puis Tier 3
 *    2. Au sein d'un tier, ordre aléatoire chaque jour
 * - Pour chaque URL : Google Indexing API (URL_UPDATED) + IndexNow
 * - Met à jour le state file
 *
 * Usage : npx tsx scripts/indexing-push.ts [--limit 20] [--dry-run]
 *
 * Prérequis :
 *   - Service account Google Cloud avec Indexing API activée
 *   - Service account ajouté comme "Propriétaire" dans Search Console
 *   - Clé JSON privée à l'emplacement défini par GOOGLE_INDEXING_KEY_PATH
 *     (par défaut : ~/.config/comparateurcrm/google-indexing.json)
 *   - Voir scripts/INDEXING_SETUP.md pour le guide complet
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { JWT } from "google-auth-library";
import { PRIORITY_URLS, type PriorityUrl } from "./indexing-priority.js";

// ─── Configuration ────────────────────────────────────────────────────
const STATE_FILE = path.join(__dirname, "indexing-state.json");
const KEY_PATH =
  process.env.GOOGLE_INDEXING_KEY_PATH ||
  path.join(os.homedir(), ".config/comparateurcrm/google-indexing.json");
const COOLDOWN_DAYS = 14; // Ne pas re-soumettre la même URL avant 14j
const DEFAULT_LIMIT = 20; // URLs poussées par run (quota Google = 200/jour)
const INDEXNOW_KEY = "7a24e394d3cc370ea6c28b01da2166c0";
const INDEXNOW_HOST = "comparateurcrm.fr";

// ─── Args parsing ─────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const limitIdx = args.indexOf("--limit");
const LIMIT =
  limitIdx >= 0 && args[limitIdx + 1]
    ? parseInt(args[limitIdx + 1], 10)
    : DEFAULT_LIMIT;

// ─── State management ─────────────────────────────────────────────────
interface State {
  lastRunAt: string | null;
  totalSubmissions: number;
  submissions: Record<
    string,
    { lastSubmittedAt: string; submissionCount: number }
  >;
}

function readState(): State {
  if (!fs.existsSync(STATE_FILE)) {
    return { lastRunAt: null, totalSubmissions: 0, submissions: {} };
  }
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8")) as State;
}

function writeState(state: State) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
}

// ─── Sélection des URLs à pousser ─────────────────────────────────────
function pickUrls(state: State, limit: number): PriorityUrl[] {
  const now = Date.now();
  const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;

  // Filtrer les URLs sous cooldown
  const eligible = PRIORITY_URLS.filter((entry) => {
    const sub = state.submissions[entry.url];
    if (!sub) return true;
    const lastTs = new Date(sub.lastSubmittedAt).getTime();
    return now - lastTs > cooldownMs;
  });

  // Trier par tier (1 < 2 < 3) puis par "submission count" (jamais soumises d'abord)
  // puis aléatoire au sein du même groupe (rotation quotidienne)
  const seed = new Date().toISOString().slice(0, 10); // change chaque jour
  const seededRandom = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h) / 2147483647;
  };

  eligible.sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    const ca = state.submissions[a.url]?.submissionCount || 0;
    const cb = state.submissions[b.url]?.submissionCount || 0;
    if (ca !== cb) return ca - cb;
    return seededRandom(a.url + seed) - seededRandom(b.url + seed);
  });

  return eligible.slice(0, limit);
}

// ─── Google Indexing API ──────────────────────────────────────────────
async function getJwtClient(): Promise<JWT | null> {
  if (!fs.existsSync(KEY_PATH)) {
    console.warn(
      `⚠️  Clé Google Indexing non trouvée à : ${KEY_PATH}\n` +
        `    Indexing API désactivée pour ce run. Voir INDEXING_SETUP.md.`,
    );
    return null;
  }
  const key = JSON.parse(fs.readFileSync(KEY_PATH, "utf8")) as {
    client_email: string;
    private_key: string;
  };
  return new JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
}

async function pushToGoogleIndexing(
  client: JWT,
  url: string,
): Promise<{ ok: boolean; status: number; body?: string }> {
  try {
    const token = await client.getAccessToken();
    const res = await fetch(
      "https://indexing.googleapis.com/v3/urlNotifications:publish",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, type: "URL_UPDATED" }),
      },
    );
    const body = await res.text();
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    return { ok: false, status: 0, body: String(err) };
  }
}

// ─── IndexNow (Bing/Yandex/Naver/Seznam/Yep) ──────────────────────────
async function pushToIndexNow(
  urls: string[],
): Promise<{ ok: boolean; status: number; body?: string }> {
  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    const body = await res.text();
    return { ok: res.ok || res.status === 202, status: res.status, body };
  } catch (err) {
    return { ok: false, status: 0, body: String(err) };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n┌─ Indexation auto comparateurcrm.fr ───────────────────`);
  console.log(`│ Date     : ${new Date().toISOString()}`);
  console.log(`│ Limit    : ${LIMIT} URLs`);
  console.log(`│ Mode     : ${dryRun ? "DRY-RUN (aucune API call)" : "LIVE"}`);
  console.log(`│ Cooldown : ${COOLDOWN_DAYS} jours`);
  console.log(`└────────────────────────────────────────────────────────\n`);

  const state = readState();
  const toPush = pickUrls(state, LIMIT);

  if (toPush.length === 0) {
    console.log("✓ Aucune URL à pousser (toutes en cooldown).");
    return;
  }

  console.log(`Sélection de ${toPush.length} URLs :\n`);
  toPush.forEach((u, i) =>
    console.log(`  ${(i + 1).toString().padStart(2)}. [T${u.tier} ${u.category.padEnd(6)}] ${u.url}`),
  );
  console.log("");

  if (dryRun) {
    console.log("→ DRY-RUN, pas d'appel API. Stop ici.");
    return;
  }

  const jwtClient = await getJwtClient();
  let googleOk = 0;
  let googleFail = 0;

  // 1. Google Indexing API (1 par 1)
  if (jwtClient) {
    console.log("→ Google Indexing API");
    for (const entry of toPush) {
      const res = await pushToGoogleIndexing(jwtClient, entry.url);
      const icon = res.ok ? "✓" : "✗";
      console.log(
        `   ${icon} HTTP ${res.status}  ${entry.url}${
          !res.ok && res.body ? `\n      ${res.body.slice(0, 200)}` : ""
        }`,
      );
      if (res.ok) googleOk++;
      else googleFail++;
      // Petite pause pour rester gentil
      await new Promise((r) => setTimeout(r, 200));
    }
  } else {
    console.log("→ Google Indexing API : SKIP (pas de credentials)");
  }

  // 2. IndexNow (batch de toutes les URLs en 1 call)
  console.log("\n→ IndexNow (Bing/Yandex/Naver/Seznam/Yep)");
  const indexNowRes = await pushToIndexNow(toPush.map((e) => e.url));
  const indexNowIcon = indexNowRes.ok ? "✓" : "✗";
  console.log(
    `   ${indexNowIcon} HTTP ${indexNowRes.status}  ${toPush.length} URLs soumises`,
  );

  // 3. Update state
  const now = new Date().toISOString();
  for (const entry of toPush) {
    const prev = state.submissions[entry.url];
    state.submissions[entry.url] = {
      lastSubmittedAt: now,
      submissionCount: (prev?.submissionCount || 0) + 1,
    };
  }
  state.lastRunAt = now;
  state.totalSubmissions += toPush.length;
  writeState(state);

  // 4. Summary
  console.log(`\n┌─ Résumé ─────────────────────────────────────────────`);
  console.log(`│ URLs poussées : ${toPush.length}`);
  console.log(
    `│ Google API    : ${googleOk} OK / ${googleFail} échec${
      !jwtClient ? " (skip)" : ""
    }`,
  );
  console.log(
    `│ IndexNow      : ${indexNowRes.ok ? "OK" : "échec"} (HTTP ${indexNowRes.status})`,
  );
  console.log(`│ Total cumulé  : ${state.totalSubmissions}`);
  console.log(`└──────────────────────────────────────────────────────\n`);
}

main().catch((err) => {
  console.error("Erreur fatale :", err);
  process.exit(1);
});
