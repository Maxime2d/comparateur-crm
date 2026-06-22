import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Platform } from "@/types/platform";
import { platforms } from "@/lib/platforms";
import {
  isApprovedPartner,
  getPartnerBenefit,
} from "@/lib/affiliate-partners";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { ScoreBadge } from "@/components/ui/score-badge";
import { formatPrice, getCtaLabel } from "@/lib/utils";
import type { AffiliateSource } from "@/lib/affiliate";

interface PartnerAlternativesProps {
  /** CRM en cours de lecture sur la page courante (exclu des suggestions) */
  currentPlatform?: Platform;
  /** Source de tracking */
  source?: AffiliateSource;
  /** Titre optionnel (sinon généré depuis currentPlatform) */
  title?: string;
  /** Nombre max de partenaires affichés */
  limit?: number;
}

/**
 * Bloc « Alternatives recommandées » — affiché sur les pages (avis blog
 * ou fiches) de CRM NON partenaires pour rediriger une partie du trafic
 * vers des solutions monétisées.
 *
 * Pattern éprouvé sur le site sœur comparateur-efacturation.fr : partage
 * du trafic = partage du revenu, sans tromper le lecteur (le contenu
 * éditorial sur le CRM décrit reste honnête).
 *
 * Filtre par profil cible (mêmes tailles d'entreprise que currentPlatform)
 * puis tri par note globale. Si aucun partenaire approuvé pour l'instant,
 * le composant ne retourne RIEN — il n'apparaîtra que quand `crmPartnerships`
 * sera peuplé dans src/lib/affiliate-partners.ts.
 */
export function PartnerAlternatives({
  currentPlatform,
  source = "alternatives-blog",
  title,
  limit = 3,
}: PartnerAlternativesProps) {
  const recommended = platforms
    .filter(
      (p) =>
        isApprovedPartner(p.slug) &&
        p.slug !== currentPlatform?.slug &&
        (!currentPlatform ||
          p.target.sizes.some((s) => currentPlatform.target.sizes.includes(s))),
    )
    .sort((a, b) => b.scores.overall - a.scores.overall)
    .slice(0, limit);

  // Tant qu'aucun partenariat n'est approuvé, rien à afficher.
  if (recommended.length === 0) return null;

  return (
    <div className="relative my-8 rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/80 via-violet-50/40 to-white p-5 sm:p-6 shadow-sm overflow-hidden">
      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        {title ??
          (currentPlatform
            ? `Alternatives à ${currentPlatform.name} recommandées par la rédaction`
            : "Les CRM recommandés par la rédaction")}
      </p>
      <p className="mt-1 text-sm text-slate-600">
        CRM analysés, notés et adaptés à votre profil — avec essai gratuit ou plan free.
      </p>

      <div className="mt-4 grid gap-3">
        {recommended.map((p, i) => {
          const benefit = getPartnerBenefit(p.slug);
          const best = (p.externalReviews ?? [])
            .slice()
            .sort((a, b) => b.reviewCount - a.reviewCount)[0];
          return (
            <div
              key={p.slug}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="hidden sm:flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                  {i + 1}
                </span>
                <div className="h-10 w-10 shrink-0 rounded-lg border border-slate-100 bg-white flex items-center justify-center overflow-hidden">
                  <PlatformLogo website={p.website} name={p.name} size={28} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-900">
                      {p.name}
                    </span>
                    <ScoreBadge score={p.scores.overall} />
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {p.pricing.hasFreePlan
                      ? "Plan gratuit disponible"
                      : formatPrice(p.pricing.startsAt, p.pricing.onQuote)}
                    {benefit ? ` · ${benefit}` : ""}
                  </p>
                  {best && (
                    <p className="flex items-center gap-1 text-xs text-amber-600 mt-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {best.rating.toLocaleString("fr-FR")}/5 (
                      {best.reviewCount.toLocaleString("fr-FR")} avis{" "}
                      {best.source === "capterra"
                        ? "Capterra"
                        : best.source === "g2"
                          ? "G2"
                          : best.source === "getapp"
                            ? "GetApp"
                            : ""}
                      )
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/crm/${p.slug}`}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-700 transition-colors"
                >
                  Notre avis
                </Link>
                <AffiliateLink
                  href={p.affiliateUrl}
                  platformName={p.name}
                  platformSlug={p.slug}
                  source={source}
                  variant="button-primary"
                  size="sm"
                >
                  {getCtaLabel(p.pricing)}
                </AffiliateLink>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fallback quiz — guide les indécis vers une recommandation perso (toujours
          un partenaire monétisé en tête). */}
      <Link
        href="/quiz"
        className="group mt-3 flex items-center gap-3 rounded-xl border border-violet-300 bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-white shadow-sm hover:from-violet-700 hover:to-fuchsia-600 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight">
            Pas sûr de votre choix ? Trouvez votre CRM idéal en 2 min
          </p>
          <p className="text-xs text-violet-50/90">
            Quiz personnalisé, gratuit et sans inscription
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-white/15 px-3 py-2 text-xs font-semibold group-hover:bg-white/25 transition-colors">
          Faire le quiz <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
        <p>
          <strong className="text-slate-600">Transparence :</strong> certains liens sont affiliés. Cela ne change rien à votre prix et ne biaise pas notre note.
        </p>
        <Link
          href="/comparateur"
          className="inline-flex items-center gap-1 font-medium text-violet-700 hover:text-violet-800"
        >
          Comparer les 27 CRM <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
