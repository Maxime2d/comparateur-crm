/**
 * Pages VS programmatiques : génère des comparatifs "X vs Y" data-driven
 * pour des paires à forte intention NON déjà couvertes par un MDX rédigé.
 *
 * Anti-cannibalisation : on dé-duplique par PAIRE de CRM (et pas par slug),
 * pour ne jamais publier deux URLs sur la même comparaison.
 */
import { getPlatformBySlug } from "@/lib/platforms";
import { getAllComparisonsFrontmatter } from "@/lib/mdx";
import type { Platform } from "@/types/platform";

/** Clé d'une paire indépendante de l'ordre. */
function pairKey(a: string, b: string): string {
  return [a, b].sort().join("|");
}

/**
 * Paires candidates (slugs RÉELS de platforms.ts). Les paires déjà couvertes
 * par un MDX sont automatiquement écartées plus bas.
 */
const CANDIDATE_PAIRS: [string, string][] = [
  ["hubspot-crm", "monday-sales-crm"],
  ["pipedrive", "close"],
  ["pipedrive", "freshsales"],
  ["zoho-crm", "freshsales"],
  ["axonaut", "zoho-crm"],
  ["folk", "monday-sales-crm"],
  ["close", "freshsales"],
  ["odoo-crm", "zoho-crm"],
  ["bitrix24", "hubspot-crm"],
  ["teamleader", "sellsy"],
  ["axonaut", "teamleader"],
  ["monday-sales-crm", "zoho-crm"],
  ["sellsy", "hubspot-crm"],
  ["brevo", "pipedrive"],
  ["freshsales", "hubspot-crm"],
  ["nocrm", "pipedrive"],
];

/** Paires déjà couvertes par un MDX (via frontmatter platformA/platformB). */
function getCoveredPairKeys(): Set<string> {
  const set = new Set<string>();
  for (const { data } of getAllComparisonsFrontmatter()) {
    if (data.platformA && data.platformB)
      set.add(pairKey(data.platformA, data.platformB));
  }
  return set;
}

export interface GeneratedPair {
  slug: string;
  a: string;
  b: string;
}

/** Paires générées valides (les 2 CRM existent + non déjà couvertes). */
export function getGeneratedPairs(): GeneratedPair[] {
  const covered = getCoveredPairKeys();
  const seen = new Set<string>();
  const out: GeneratedPair[] = [];
  for (const [a, b] of CANDIDATE_PAIRS) {
    const key = pairKey(a, b);
    if (covered.has(key) || seen.has(key)) continue;
    if (!getPlatformBySlug(a) || !getPlatformBySlug(b)) continue;
    seen.add(key);
    out.push({ slug: `${a}-vs-${b}`, a, b });
  }
  return out;
}

export function getGeneratedComparisonSlugs(): string[] {
  return getGeneratedPairs().map((p) => p.slug);
}

/** Résout un slug généré en paire de plateformes (ou null). */
export function resolveGeneratedPair(
  slug: string,
): { a: Platform; b: Platform } | null {
  const match = getGeneratedPairs().find((p) => p.slug === slug);
  if (!match) return null;
  const a = getPlatformBySlug(match.a);
  const b = getPlatformBySlug(match.b);
  if (!a || !b) return null;
  return { a, b };
}

/** FAQ générée (partagée entre l'affichage visible et le schema FAQPage). */
export function buildVsFaqs(
  a: Platform,
  b: Platform,
): { question: string; answer: string }[] {
  const cheaper =
    a.pricing.startsAt === b.pricing.startsAt
      ? null
      : a.pricing.startsAt < b.pricing.startsAt
        ? a
        : b;
  const freeBoth = a.pricing.hasFreePlan && b.pricing.hasFreePlan;
  const freeOne = a.pricing.hasFreePlan
    ? a
    : b.pricing.hasFreePlan
      ? b
      : null;

  return [
    {
      question: `${a.name} ou ${b.name} : lequel est le moins cher ?`,
      answer: cheaper
        ? `${cheaper.name} démarre au tarif le plus bas (${priceLabel(cheaper)}), contre ${priceLabel(cheaper.slug === a.slug ? b : a)} pour l'autre. Le coût réel dépend toutefois du nombre d'utilisateurs et du palier choisi.`
        : `Les deux démarrent à un tarif d'entrée comparable. Le coût total dépendra surtout du palier et du nombre d'utilisateurs : comparez les détails de tarifs sur chaque fiche.`,
    },
    {
      question: `${a.name} ou ${b.name} pour une PME ?`,
      answer: `${recommendBySize(a, b)} Pour trancher selon votre contexte précis, notre quiz vous oriente en 2 minutes.`,
    },
    {
      question: `${a.name} et ${b.name} proposent-ils un plan gratuit ?`,
      answer: freeBoth
        ? `Oui, les deux disposent d'un plan gratuit pour démarrer.`
        : freeOne
          ? `Seul ${freeOne.name} propose un plan gratuit ; l'autre fonctionne via un essai gratuit puis un abonnement payant.`
          : `Aucun des deux n'offre de plan gratuit permanent, mais chacun propose un essai gratuit pour tester l'outil.`,
    },
    {
      question: `Peut-on migrer de ${a.name} à ${b.name} ?`,
      answer: `Oui. La plupart des CRM permettent d'importer contacts, entreprises et historique via fichier CSV ou connecteur. Vérifiez les intégrations natives de ${b.name} et prévoyez un mapping des champs avant la bascule.`,
    },
  ];
}

function priceLabel(p: Platform): string {
  if (p.pricing.onQuote) return "sur devis";
  if (p.pricing.startsAt === 0) return "gratuit";
  return `${p.pricing.startsAt} €/utilisateur/mois`;
}

function recommendBySize(a: Platform, b: Platform): string {
  const aSmb = a.target.sizes.includes("TPE") || a.target.sizes.includes("PME");
  const bSmb = b.target.sizes.includes("TPE") || b.target.sizes.includes("PME");
  if (aSmb && !bSmb)
    return `${a.name} est davantage taillé pour les TPE/PME, tandis que ${b.name} vise plutôt les structures plus grandes.`;
  if (bSmb && !aSmb)
    return `${b.name} est davantage taillé pour les TPE/PME, tandis que ${a.name} vise plutôt les structures plus grandes.`;
  const winner = a.scores.overall >= b.scores.overall ? a : b;
  return `Les deux conviennent aux PME ; ${winner.name} obtient la meilleure note globale sur notre comparateur (${winner.scores.overall}/10).`;
}
