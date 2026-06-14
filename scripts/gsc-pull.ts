/**
 * Extraction des données Google Search Console (Search Analytics API).
 *
 * Réutilise le MÊME service account que l'indexation
 * (scripts/INDEXING_SETUP.md). Le compte de service doit être ajouté comme
 * utilisateur (lecture suffit) dans Search Console, et l'API
 * "Google Search Console API" doit être activée dans Google Cloud.
 *
 * Produit, dans scripts/gsc-reports/ :
 *   - queries-YYYY-MM-DD.csv       top requêtes (clics, impressions, CTR, position)
 *   - pages-YYYY-MM-DD.csv         top pages
 *   - opportunities-YYYY-MM-DD.csv requêtes "quick win" (position 5-20, beaucoup
 *                                  d'impressions, CTR faible) = à pousser
 *   - summary-YYYY-MM-DD.json      totaux + faits saillants
 *
 * Usage :
 *   npx tsx scripts/gsc-pull.ts                 # 28 derniers jours
 *   npx tsx scripts/gsc-pull.ts --days 90
 *   npx tsx scripts/gsc-pull.ts --site sc-domain:comparateurcrm.fr
 *
 * Prérequis identiques à l'indexation :
 *   - Clé JSON à GOOGLE_INDEXING_KEY_PATH
 *     (par défaut ~/.config/comparateurcrm/google-indexing.json)
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { JWT } from "google-auth-library";

// ─── Configuration ────────────────────────────────────────────────────
const KEY_PATH =
  process.env.GOOGLE_INDEXING_KEY_PATH ||
  path.join(os.homedir(), ".config/comparateurcrm/google-indexing.json");

const OUT_DIR = path.join(__dirname, "gsc-reports");
const API = "https://searchconsole.googleapis.com/webmasters/v3";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

// ─── Args ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function arg(name: string, fallback: string): string {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const DAYS = parseInt(arg("days", "28"), 10);
const SITE = arg("site", "sc-domain:comparateurcrm.fr");
const ROW_LIMIT = parseInt(arg("limit", "1000"), 10);

// ─── Helpers ──────────────────────────────────────────────────────────
function isoDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

type Row = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

async function query(
  client: JWT,
  body: Record<string, unknown>,
): Promise<Row[]> {
  const url = `${API}/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
  const res = await client.request<{ rows?: Row[] }>({
    url,
    method: "POST",
    data: body,
  });
  return res.data.rows || [];
}

function toCsv(rows: Row[], dimensionHeader: string): string {
  const header = `${dimensionHeader},clics,impressions,ctr_%,position\n`;
  const lines = rows.map((r) => {
    const key = `"${(r.keys[0] || "").replace(/"/g, '""')}"`;
    return `${key},${r.clicks},${r.impressions},${(r.ctr * 100).toFixed(2)},${r.position.toFixed(1)}`;
  });
  return header + lines.join("\n") + "\n";
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(KEY_PATH)) {
    console.error(`❌ Clé service account introuvable : ${KEY_PATH}`);
    console.error(
      "   Voir scripts/INDEXING_SETUP.md (même clé que l'indexation).",
    );
    process.exit(1);
  }

  const key = JSON.parse(fs.readFileSync(KEY_PATH, "utf8"));
  const client = new JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: [SCOPE],
  });

  const startDate = isoDaysAgo(DAYS + 2); // GSC a ~2j de latence
  const endDate = isoDaysAgo(2);
  const base = { startDate, endDate, rowLimit: ROW_LIMIT, dataState: "all" };

  console.log(`🔎 ${SITE} — du ${startDate} au ${endDate} (${DAYS} j)`);

  const [queries, pages] = await Promise.all([
    query(client, { ...base, dimensions: ["query"] }),
    query(client, { ...base, dimensions: ["page"] }),
  ]);

  // Opportunités : position 5-20, ≥ 50 impressions, triées par impressions.
  const opportunities = queries
    .filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 50)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 100);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stamp = endDate;
  fs.writeFileSync(
    path.join(OUT_DIR, `queries-${stamp}.csv`),
    toCsv(queries, "requete"),
  );
  fs.writeFileSync(
    path.join(OUT_DIR, `pages-${stamp}.csv`),
    toCsv(pages, "page"),
  );
  fs.writeFileSync(
    path.join(OUT_DIR, `opportunities-${stamp}.csv`),
    toCsv(opportunities, "requete"),
  );

  const totalClicks = queries.reduce((s, r) => s + r.clicks, 0);
  const totalImpr = queries.reduce((s, r) => s + r.impressions, 0);
  const summary = {
    site: SITE,
    period: { startDate, endDate, days: DAYS },
    totals: {
      clicks: totalClicks,
      impressions: totalImpr,
      ctr_pct: totalImpr ? +((totalClicks / totalImpr) * 100).toFixed(2) : 0,
      distinctQueries: queries.length,
      distinctPages: pages.length,
    },
    topQueries: queries.slice(0, 10).map((r) => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      position: +r.position.toFixed(1),
    })),
    quickWins: opportunities.slice(0, 15).map((r) => ({
      query: r.keys[0],
      impressions: r.impressions,
      ctr_pct: +(r.ctr * 100).toFixed(2),
      position: +r.position.toFixed(1),
    })),
  };
  fs.writeFileSync(
    path.join(OUT_DIR, `summary-${stamp}.json`),
    JSON.stringify(summary, null, 2) + "\n",
  );

  console.log(
    `✅ ${queries.length} requêtes, ${pages.length} pages — ${totalClicks} clics / ${totalImpr} impressions`,
  );
  console.log(`📁 Rapports : ${OUT_DIR}`);
  if (opportunities.length) {
    console.log(`\n🎯 Top quick wins (position 5-20, fort volume) :`);
    summary.quickWins.slice(0, 8).forEach((q) => {
      console.log(
        `   • "${q.query}" — pos ${q.position}, ${q.impressions} impr, CTR ${q.ctr_pct}%`,
      );
    });
  }
}

main().catch((err) => {
  const msg = err?.response?.data?.error?.message || err?.message || err;
  console.error("❌ Erreur GSC :", msg);
  if (String(msg).includes("does not have sufficient permission")) {
    console.error(
      "   → Ajoute l'email du service account dans Search Console (lecture).",
    );
  }
  if (String(msg).includes("Search Console API has not been used")) {
    console.error(
      "   → Active 'Google Search Console API' dans Google Cloud Console.",
    );
  }
  process.exit(1);
});
