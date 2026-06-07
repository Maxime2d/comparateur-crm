import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Gift, CheckCircle2, X as XIcon, AlertCircle, ArrowRight, ExternalLink } from "lucide-react";
import { SITE_URL, SITE_NAME, CRM_FEATURE_LABELS } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { platforms } from "@/lib/platforms";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { CRMFeatures } from "@/types/platform";

export const metadata: Metadata = {
  title: "Comparateur Plans Free CRM 2026 : quel CRM gratuit choisir ?",
  description:
    "Comparez les vrais plans gratuits permanents des CRMs en 2026. Limites, fonctionnalités, signaux de bascule vers le payant. Sans inscription.",
  alternates: { canonical: `${SITE_URL}/outils/comparateur-plans-free` },
  openGraph: {
    title: `Comparateur Plans Free CRM 2026 | ${SITE_NAME}`,
    description:
      "Tous les CRMs avec plan gratuit permanent, leurs limites et leurs vraies fonctionnalités débridées.",
    url: `${SITE_URL}/outils/comparateur-plans-free`,
    type: "website",
  },
};

// Liste des CRMs avec plan gratuit
const freePlanPlatforms = platforms.filter((p) => p.pricing.hasFreePlan);

// Fonctionnalités clés à comparer
const KEY_FEATURES: (keyof CRMFeatures)[] = [
  "contactManagement",
  "pipelineManagement",
  "emailIntegration",
  "automation",
  "leadScoring",
  "reportingAnalytics",
  "mobileApp",
  "collaboration",
];

// Tri par score features (les plus complets en free d'abord)
const sortedFreePlans = [...freePlanPlatforms].sort(
  (a, b) => (b.scores.features || 0) - (a.scores.features || 0),
);

export default function ComparateurPlansFreePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Outils", href: "/outils" },
          {
            name: "Comparateur Plans Free",
            href: "/outils/comparateur-plans-free",
          },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Comparateur Plans Free CRM 2026",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: `${SITE_URL}/outils/comparateur-plans-free`,
          offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
          description: `Comparateur des ${freePlanPlatforms.length} CRMs proposant un plan gratuit permanent en 2026.`,
        }}
      />

      <PageHero
        eyebrow="Outil gratuit"
        eyebrowIcon={Gift}
        title="Comparateur Plans Free CRM 2026"
        highlight="Plans Free"
        subtitle={`${freePlanPlatforms.length} CRMs proposent un plan gratuit permanent en 2026. Mais tous ne se valent pas. Comparez les vraies limites et fonctionnalités débridées de chaque offre free, et identifiez quand basculer payant.`}
      />

      <div className="bg-[#fafaff] pb-20">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-8">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li>
                <Link href="/outils" className="hover:text-violet-600">
                  Outils
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">
                Comparateur Plans Free
              </li>
            </ol>
          </nav>

          {/* Insight */}
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 mb-10">
            <div className="flex items-start gap-3">
              <AlertCircle
                className="text-violet-600 flex-shrink-0 mt-1"
                size={20}
              />
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Ne pas confondre plan gratuit et essai gratuit.</strong>{" "}
                Un essai dure 14 ou 30 jours et oblige à basculer payant ou
                fermer. Un plan free permanent est utilisable indéfiniment, mais
                avec des limites strictes (nombre d&apos;utilisateurs, contacts,
                fonctionnalités débridées). Cette page liste uniquement les
                vrais plans <strong>permanents</strong> — donc une vraie option
                de démarrage long terme.
              </p>
            </div>
          </div>

          {/* Liste CRMs free */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              Les {freePlanPlatforms.length} CRMs avec plan gratuit permanent
            </h2>
            <p className="text-slate-600 mb-6">
              Classés par couverture fonctionnelle de leur plan free.
            </p>

            <div className="space-y-4">
              {sortedFreePlans.map((p, i) => {
                const activeFeatures = KEY_FEATURES.filter(
                  (key) =>
                    (p.features as unknown as Record<string, boolean>)[key],
                );
                return (
                  <article
                    key={p.slug}
                    className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row items-start gap-5">
                      {/* Header CRM */}
                      <div className="flex items-center gap-4 md:w-64 flex-shrink-0">
                        <div className="relative">
                          <PlatformLogo
                            website={p.website}
                            name={p.name}
                            size={48}
                            className="rounded-xl"
                          />
                          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold border-2 border-white">
                            {i + 1}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-slate-900">
                            {p.name}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {p.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Fonctionnalités free */}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Fonctionnalités incluses
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {KEY_FEATURES.map((key) => {
                            const active = (
                              p.features as unknown as Record<string, boolean>
                            )[key];
                            return (
                              <span
                                key={key}
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                                  active
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-slate-50 text-slate-400 border border-slate-200"
                                }`}
                              >
                                {active ? (
                                  <CheckCircle2 size={11} />
                                ) : (
                                  <XIcon size={11} />
                                )}
                                {CRM_FEATURE_LABELS[key] || key}
                              </span>
                            );
                          })}
                        </div>
                        <div className="mt-3 text-xs text-slate-500">
                          <strong className="text-slate-700">
                            {activeFeatures.length} / {KEY_FEATURES.length}
                          </strong>{" "}
                          fonctionnalités clés incluses dans le plan free
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col gap-2 md:w-44 flex-shrink-0 w-full">
                        <AffiliateLink
                          href={p.affiliateUrl}
                          platformName={p.name}
                          platformSlug={p.slug}
                          source="comparateur"
                          variant="button-primary"
                          size="sm"
                          fullWidth
                        >
                          Essayer gratuit
                          <ExternalLink size={12} />
                        </AffiliateLink>
                        <Link
                          href={`/crm/${p.slug}`}
                          className="text-center text-xs font-semibold text-violet-700 hover:text-violet-800 py-1.5"
                        >
                          Voir la fiche complète →
                        </Link>
                      </div>
                    </div>

                    {/* Bascule payante */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="text-slate-600">
                        Plan payant à partir de{" "}
                        <strong className="text-slate-900">
                          {p.pricing.startsAt === 0
                            ? "—"
                            : `${p.pricing.startsAt} €/mois`}
                        </strong>{" "}
                        ·{" "}
                        {p.pricing.hasFreeTrial &&
                          `essai ${p.pricing.freeTrialDays} jours`}
                      </div>
                      <div className="text-slate-500">
                        Note globale : <strong className="text-violet-700">{(p.scores.overall || 0).toFixed(1)}/10</strong>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Quand basculer payant */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Quand faut-il basculer du plan free vers un plan payant ?
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Les plans gratuits sont parfaits pour démarrer sans risque,
                mais leurs limites finissent par bloquer la croissance. Voici
                les <strong>5 signaux clairs</strong> qu&apos;il est temps de
                passer payant&nbsp;:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    <strong>Plus de 3 utilisateurs actifs.</strong> La plupart
                    des plans free plafonnent à 2-3 utilisateurs. Au-delà,
                    chaque commercial supplémentaire devient un goulot.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>
                    <strong>Besoin d&apos;automatisations.</strong>{" "}
                    L&apos;automation (relances, scoring de leads,
                    notifications) est presque toujours réservée aux plans
                    payants. C&apos;est ce qui démultiplie le ROI.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>
                    <strong>Reporting avancé requis.</strong> Si vous voulez
                    suivre des KPIs commerciaux (taux de conversion par
                    commercial, prévisions, par segment), les plans free
                    manquent souvent de dashboards.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>
                    <strong>Volume de contacts élevé.</strong> Beaucoup de
                    plans free limitent à 250 ou 1000 contacts. Au-delà, soit
                    on supprime, soit on bascule.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    5
                  </span>
                  <span>
                    <strong>Support prioritaire nécessaire.</strong> Sur les
                    plans free, le support est généralement réduit à la
                    documentation + email avec délais longs. Pour les équipes
                    qui ne peuvent pas se permettre 72h de blocage, le payant
                    devient nécessaire.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Cross-links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/outils/calculateur-roi-crm"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Calculateur ROI
              </h3>
              <p className="text-sm text-slate-600">
                Estimer le gain de CA et le délai d&apos;amortissement.
              </p>
            </Link>
            <Link
              href="/outils/calculateur-tco-crm"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Calculateur TCO
              </h3>
              <p className="text-sm text-slate-600">
                Coût total sur 3 ans : licence + paramétrage + formation.
              </p>
            </Link>
            <Link
              href="/crm-gratuit"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Top CRM gratuits 2026{" "}
                <ArrowRight
                  size={14}
                  className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </h3>
              <p className="text-sm text-slate-600">
                Notre sélection éditoriale des meilleurs CRMs free.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
