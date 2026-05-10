/**
 * Liste prioritaire des URLs à soumettre à l'indexation.
 * Classement par TIER : 1 = haute priorité (commercial + hubs SEO),
 * 2 = E-E-A-T + transactionnel, 3 = long-tail (blog + petites fiches).
 *
 * Au sein d'un tier, l'ordre est aléatoirement mixé chaque jour pour
 * éviter d'envoyer toujours la même séquence à Google.
 *
 * Total : 101 URLs (la home est exclue car déjà indexée).
 */

export interface PriorityUrl {
  url: string;
  tier: 1 | 2 | 3;
  category: string;
}

export const PRIORITY_URLS: PriorityUrl[] = [
  // ═══════════════════════════════════════════════════════════════════
  // TIER 1 — Haute valeur SEO (commercial / hubs / VS)
  // ═══════════════════════════════════════════════════════════════════

  // 6 hubs par segment — gros volume de recherche
  { url: "https://comparateurcrm.fr/crm-francais", tier: 1, category: "hub" },
  { url: "https://comparateurcrm.fr/crm-gratuit", tier: 1, category: "hub" },
  { url: "https://comparateurcrm.fr/crm-tpe", tier: 1, category: "hub" },
  { url: "https://comparateurcrm.fr/crm-startup", tier: 1, category: "hub" },
  { url: "https://comparateurcrm.fr/crm-freelance", tier: 1, category: "hub" },
  {
    url: "https://comparateurcrm.fr/crm-open-source",
    tier: 1,
    category: "hub",
  },

  // Top 12 fiches CRM les plus recherchées
  { url: "https://comparateurcrm.fr/crm/sellsy", tier: 1, category: "fiche" },
  {
    url: "https://comparateurcrm.fr/crm/pipedrive",
    tier: 1,
    category: "fiche",
  },
  {
    url: "https://comparateurcrm.fr/crm/salesforce",
    tier: 1,
    category: "fiche",
  },
  { url: "https://comparateurcrm.fr/crm/zoho-crm", tier: 1, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/axonaut", tier: 1, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/folk", tier: 1, category: "fiche" },
  {
    url: "https://comparateurcrm.fr/crm/monday-sales-crm",
    tier: 1,
    category: "fiche",
  },
  {
    url: "https://comparateurcrm.fr/crm/freshsales",
    tier: 1,
    category: "fiche",
  },
  {
    url: "https://comparateurcrm.fr/crm/microsoft-dynamics-365",
    tier: 1,
    category: "fiche",
  },
  {
    url: "https://comparateurcrm.fr/crm/activecampaign",
    tier: 1,
    category: "fiche",
  },
  { url: "https://comparateurcrm.fr/crm/bitrix24", tier: 1, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/odoo-crm", tier: 1, category: "fiche" },

  // 10 pages VS — fort intent comparatif
  {
    url: "https://comparateurcrm.fr/comparer/hubspot-vs-pipedrive",
    tier: 1,
    category: "vs",
  },
  {
    url: "https://comparateurcrm.fr/comparer/hubspot-vs-salesforce",
    tier: 1,
    category: "vs",
  },
  {
    url: "https://comparateurcrm.fr/comparer/pipedrive-vs-salesforce",
    tier: 1,
    category: "vs",
  },
  {
    url: "https://comparateurcrm.fr/comparer/salesforce-vs-zoho",
    tier: 1,
    category: "vs",
  },
  {
    url: "https://comparateurcrm.fr/comparer/zoho-vs-hubspot",
    tier: 1,
    category: "vs",
  },
  {
    url: "https://comparateurcrm.fr/comparer/pipedrive-vs-zoho",
    tier: 1,
    category: "vs",
  },
  {
    url: "https://comparateurcrm.fr/comparer/sellsy-vs-pipedrive",
    tier: 1,
    category: "vs",
  },
  {
    url: "https://comparateurcrm.fr/comparer/axonaut-vs-sellsy",
    tier: 1,
    category: "vs",
  },
  {
    url: "https://comparateurcrm.fr/comparer/brevo-vs-hubspot",
    tier: 1,
    category: "vs",
  },
  {
    url: "https://comparateurcrm.fr/comparer/monday-vs-pipedrive",
    tier: 1,
    category: "vs",
  },

  // ═══════════════════════════════════════════════════════════════════
  // TIER 2 — E-E-A-T + transactionnel + outils
  // ═══════════════════════════════════════════════════════════════════
  { url: "https://comparateurcrm.fr/comparateur", tier: 2, category: "core" },
  { url: "https://comparateurcrm.fr/quiz", tier: 2, category: "core" },
  { url: "https://comparateurcrm.fr/tarifs", tier: 2, category: "core" },
  { url: "https://comparateurcrm.fr/blog", tier: 2, category: "core" },
  { url: "https://comparateurcrm.fr/guide", tier: 2, category: "core" },
  { url: "https://comparateurcrm.fr/comparer", tier: 2, category: "core" },
  { url: "https://comparateurcrm.fr/outils", tier: 2, category: "tool" },
  {
    url: "https://comparateurcrm.fr/outils/calculateur-roi-crm",
    tier: 2,
    category: "tool",
  },
  { url: "https://comparateurcrm.fr/methodologie", tier: 2, category: "eeat" },
  {
    url: "https://comparateurcrm.fr/glossaire-crm",
    tier: 2,
    category: "eeat",
  },
  { url: "https://comparateurcrm.fr/a-propos", tier: 2, category: "eeat" },
  { url: "https://comparateurcrm.fr/faq", tier: 2, category: "eeat" },
  {
    url: "https://comparateurcrm.fr/mentions-legales",
    tier: 2,
    category: "eeat",
  },

  // ═══════════════════════════════════════════════════════════════════
  // TIER 3 — Long-tail (articles blog + fiches CRM moins populaires)
  // ═══════════════════════════════════════════════════════════════════

  // Fiches CRM moins prioritaires (15 restantes)
  { url: "https://comparateurcrm.fr/crm/hubspot-crm", tier: 3, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/brevo", tier: 3, category: "fiche" },
  {
    url: "https://comparateurcrm.fr/crm/initiative-crm",
    tier: 3,
    category: "fiche",
  },
  {
    url: "https://comparateurcrm.fr/crm/teamleader",
    tier: 3,
    category: "fiche",
  },
  { url: "https://comparateurcrm.fr/crm/karlia", tier: 3, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/nocrm", tier: 3, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/efficy", tier: 3, category: "fiche" },
  {
    url: "https://comparateurcrm.fr/crm/divalto-weavy",
    tier: 3,
    category: "fiche",
  },
  {
    url: "https://comparateurcrm.fr/crm/youday-crm",
    tier: 3,
    category: "fiche",
  },
  { url: "https://comparateurcrm.fr/crm/sugarcrm", tier: 3, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/insightly", tier: 3, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/copper", tier: 3, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/agile-crm", tier: 3, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/creatio", tier: 3, category: "fiche" },
  { url: "https://comparateurcrm.fr/crm/close", tier: 3, category: "fiche" },

  // Articles de blog — guides et avis
  {
    url: "https://comparateurcrm.fr/blog/sellsy-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/hubspot-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/pipedrive-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/salesforce-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/zoho-crm-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/axonaut-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/folk-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/monday-sales-crm-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/freshsales-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/microsoft-dynamics-365-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/activecampaign-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/bitrix24-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/odoo-crm-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/brevo-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/initiative-crm-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/teamleader-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/karlia-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/nocrm-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/efficy-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/divalto-weavy-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/youday-crm-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/sugarcrm-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/insightly-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/copper-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/agile-crm-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/creatio-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/close-avis-tarifs-test-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/comment-choisir-crm",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/meilleur-crm-gratuit-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/meilleur-crm-tpe-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-pme-guide-complet",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-b2b-guide-complet-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-immobilier-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-immobilier-pro-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-ecommerce-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-saas-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-services-consulting-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-finance-banque-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-sante-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-formation-edtech-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-restauration-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-retail-magasin-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-btp-construction-2026",
    tier: 3,
    category: "blog",
  },
  {
    url: "https://comparateurcrm.fr/blog/crm-association-obnl-2026",
    tier: 3,
    category: "blog",
  },
];
