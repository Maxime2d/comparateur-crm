/**
 * Affiliate partner registry — INTERNAL SOURCE OF TRUTH
 *
 * Liste des CRM avec partenariat affilié approuvé (qui rémunèrent les
 * conversions). Sert au routage automatique des CTAs : sur les pages
 * d'un CRM non-partenaire, on propose des alternatives qui paient.
 *
 * À COMPLÉTER au fur et à mesure des approbations Affilae / réseaux directs.
 * Tant qu'un CRM n'est PAS dans cette liste avec status: "approved",
 * il est traité comme non-partenaire (= on route vers une alternative).
 *
 * Inspiré du pattern utilisé sur comparateur-efacturation.fr qui sépare
 * "fiche éditoriale" (description honnête, même si pas partenaire) de
 * "monétisation" (on envoie vers une alternative qui paie).
 */

export interface CrmPartnership {
  /** Slug de la plateforme (doit matcher Platform.slug dans platforms.ts) */
  platformSlug: string;
  /** Statut du partenariat */
  status: "approved" | "pending" | "rejected";
  /** Réseau d'affiliation : "affilae" | "direct" | "kiflo" | "impact" | ... */
  network?: string;
  /** Date d'approbation (ISO) — pour priorisation et reporting */
  startDate?: string;
  /** Bénéfice client mis en avant dans le CTA (ex: "1er mois offert") */
  clientBenefit?: string;
  /** Notes internes */
  notes?: string;
}

/**
 * Liste des CRM avec partenariat actif. Vide tant qu'aucune approbation
 * n'a été confirmée — c'est volontaire pour ne PAS pousser un CRM comme
 * partenaire à tort. Compléter au fil des validations Affilae/réseaux.
 *
 * Exemple à ajouter quand on aura un partenariat HubSpot :
 *   {
 *     platformSlug: "hubspot-crm",
 *     status: "approved",
 *     network: "impact",
 *     startDate: "2026-XX-XX",
 *     clientBenefit: "Plan gratuit + démo personnalisée",
 *   }
 */
export const crmPartnerships: CrmPartnership[] = [
  // À COMPLÉTER : aucune approbation confirmée à ce jour.
  // Voir suivi-partenariats.md (à la racine du projet) pour le pipeline.
];

/**
 * Vérifie si un CRM est un partenaire affilié approuvé (= monétisé).
 *
 * Source de vérité pour la logique "partner vs non-partner" sur tout le
 * site. NE PAS se baser sur l'URL (lb.affilae.com, ?ref=, etc.) — ça loupe
 * les partenariats directs.
 */
export function isApprovedPartner(slug: string): boolean {
  return crmPartnerships.some(
    (p) => p.platformSlug === slug && p.status === "approved",
  );
}

/**
 * Retourne la liste des slugs des CRM partenaires approuvés.
 * Utilisé par PartnerAlternatives pour proposer des remplaçants.
 */
export function getApprovedPartnerSlugs(): string[] {
  return crmPartnerships
    .filter((p) => p.status === "approved")
    .map((p) => p.platformSlug);
}

/**
 * Bénéfice client à afficher dans le CTA, si défini.
 */
export function getPartnerBenefit(slug: string): string | undefined {
  return crmPartnerships.find((p) => p.platformSlug === slug)?.clientBenefit;
}
