/**
 * Soumet les principales URLs à IndexNow (Bing, Yandex, Naver, Seznam, Yep).
 * Usage : npx tsx scripts/indexnow.ts
 *
 * Endpoint accepte jusqu'à 10 000 URLs par requête.
 * Réponses : 200 (accepté) / 202 (déjà soumis) / 422 (URLs invalides).
 */

const KEY = "7a24e394d3cc370ea6c28b01da2166c0";
const HOST = "comparateurcrm.fr";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

// Pages prioritaires à pinger
const URLS: string[] = [
  // Pages principales
  "https://comparateurcrm.fr/",
  "https://comparateurcrm.fr/comparateur",
  "https://comparateurcrm.fr/quiz",
  "https://comparateurcrm.fr/tarifs",
  "https://comparateurcrm.fr/blog",
  "https://comparateurcrm.fr/guide",
  "https://comparateurcrm.fr/comparer",
  "https://comparateurcrm.fr/outils",
  "https://comparateurcrm.fr/outils/calculateur-roi-crm",
  // E-E-A-T
  "https://comparateurcrm.fr/a-propos",
  "https://comparateurcrm.fr/methodologie",
  "https://comparateurcrm.fr/faq",
  "https://comparateurcrm.fr/glossaire-crm",
  "https://comparateurcrm.fr/mentions-legales",
  // Hubs segment
  "https://comparateurcrm.fr/crm-francais",
  "https://comparateurcrm.fr/crm-gratuit",
  "https://comparateurcrm.fr/crm-tpe",
  "https://comparateurcrm.fr/crm-startup",
  "https://comparateurcrm.fr/crm-freelance",
  "https://comparateurcrm.fr/crm-open-source",
  // Top fiches CRM
  "https://comparateurcrm.fr/crm/hubspot-crm",
  "https://comparateurcrm.fr/crm/sellsy",
  "https://comparateurcrm.fr/crm/pipedrive",
  "https://comparateurcrm.fr/crm/salesforce",
  "https://comparateurcrm.fr/crm/zoho-crm",
  "https://comparateurcrm.fr/crm/axonaut",
  "https://comparateurcrm.fr/crm/folk",
  "https://comparateurcrm.fr/crm/monday-sales-crm",
  "https://comparateurcrm.fr/crm/freshsales",
  "https://comparateurcrm.fr/crm/microsoft-dynamics-365",
  "https://comparateurcrm.fr/crm/activecampaign",
  "https://comparateurcrm.fr/crm/bitrix24",
  "https://comparateurcrm.fr/crm/odoo-crm",
];

async function main() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
  };

  console.log(`Submitting ${URLS.length} URLs to IndexNow…`);
  console.log(`Endpoint  : ${ENDPOINT}`);
  console.log(`Host      : ${HOST}`);
  console.log(`Key       : ${KEY}`);
  console.log(`Key URL   : ${KEY_LOCATION}\n`);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    console.log(`HTTP ${res.status} ${res.statusText}`);
    const body = await res.text();
    if (body.trim()) {
      console.log("Body :", body);
    }

    if (res.status === 200) {
      console.log("\n✓ URLs accepted by IndexNow (Bing, Yandex, Naver, Seznam, Yep)");
    } else if (res.status === 202) {
      console.log("\n✓ URLs accepted (already submitted recently)");
    } else if (res.status === 422) {
      console.log("\n⚠ Some URLs were rejected (422). Check the body above.");
    } else if (res.status === 429) {
      console.log("\n⚠ Too many requests. Wait a few minutes and retry.");
    } else {
      console.log("\n⚠ Unexpected response. Verify the key file is accessible at:");
      console.log("  " + KEY_LOCATION);
    }
  } catch (err) {
    console.error("Network error:", err);
    process.exit(1);
  }
}

main();
