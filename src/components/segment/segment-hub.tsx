import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Platform } from "@/types/platform";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { formatPrice, getCtaLabel } from "@/lib/utils";

interface SegmentHubProps {
  segmentLabel: string;
  pageTitle: string;
  intro: string;
  prosCards: { icon: React.ReactNode; title: string; text: string }[];
  platforms: Platform[];
  longProse: React.ReactNode;
  breadcrumbName: string;
  breadcrumbHref: string;
}

/**
 * Réutilisable pour les pages hub /crm-{segment} : reçoit la liste filtrée
 * des plateformes + un wrapper de contenu éditorial.
 */
export function SegmentHub({
  segmentLabel,
  pageTitle,
  intro,
  prosCards,
  platforms,
  longProse,
  breadcrumbName,
}: SegmentHubProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-violet-600">
                Accueil
              </Link>
            </li>
            <ChevronRight size={14} className="text-slate-400" />
            <li className="text-slate-900 font-medium">{breadcrumbName}</li>
          </ol>
        </nav>

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 mb-4">
            {segmentLabel}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{intro}</p>
        </header>

        {prosCards.length > 0 && (
          <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {prosCards.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="text-violet-600 mb-3">{c.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
          </section>
        )}

        <section className="space-y-4 mb-12">
          {platforms.map((p, i) => (
            <article
              key={p.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-start gap-4 flex-shrink-0 md:w-72">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-violet-700 text-white font-bold flex items-center justify-center text-lg">
                    #{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <PlatformLogo
                        website={p.website}
                        name={p.name}
                        size={32}
                      />
                      <h2 className="text-xl font-bold text-slate-900">
                        {p.name}
                      </h2>
                    </div>
                    <ScoreBadge score={p.scores.overall} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 leading-relaxed mb-3">
                    {p.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.badges.slice(0, 4).map((badge) => (
                      <Badge key={badge} className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-slate-500">
                        Tarif d&apos;entrée
                      </div>
                      <div className="font-bold text-slate-900">
                        {formatPrice(p.pricing.startsAt, p.pricing.onQuote)}
                        {p.pricing.startsAt > 0 && (
                          <span className="text-sm text-slate-500 font-normal">
                            {" "}
                            /utilisateur/mois
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/crm/${p.slug}`}
                        className="text-sm text-violet-600 hover:text-violet-700 font-semibold"
                      >
                        Voir la fiche →
                      </Link>
                      <AffiliateLink
                        href={p.affiliateUrl}
                        platformName={p.name}
                        platformSlug={p.slug}
                        source="comparateur"
                        variant="button-primary"
                        size="sm"
                      >
                        {getCtaLabel(p.pricing)}
                      </AffiliateLink>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mb-12 bg-white rounded-2xl border border-slate-200 p-8">
          {longProse}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/comparateur"
            className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
              Tous les CRM
            </h3>
            <p className="text-sm text-slate-600">
              Comparateur complet avec filtres avancés.
            </p>
          </Link>
          <Link
            href="/quiz"
            className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
              Quiz CRM
            </h3>
            <p className="text-sm text-slate-600">
              3 recommandations personnalisées en 2 minutes.
            </p>
          </Link>
          <Link
            href="/methodologie"
            className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
              Notre méthodologie
            </h3>
            <p className="text-sm text-slate-600">Comment nous notons.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
