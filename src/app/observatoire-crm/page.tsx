import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  BarChart3,
  TrendingUp,
  Euro,
  Globe,
  Shield,
  Users,
  Zap,
  AlertCircle,
  Database,
  ArrowRight,
  Quote,
  Award,
} from "lucide-react";
import { SITE_URL, SITE_NAME, CRM_FEATURE_LABELS } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { platforms } from "@/lib/platforms";
import { CRMFeatures } from "@/types/platform";

export const metadata: Metadata = {
  title: "Observatoire CRM 2026 : étude exclusive sur 27 logiciels",
  description:
    "Étude exclusive 2026 sur les tarifs, fonctionnalités, hébergement et notes utilisateurs de 27 CRMs analysés. Données originales, sources citées, mises à jour trimestrielles.",
  alternates: { canonical: `${SITE_URL}/observatoire-crm` },
  openGraph: {
    title: `Observatoire CRM 2026 | ${SITE_NAME}`,
    description:
      "Étude originale sur 27 CRMs : tarifs, fonctionnalités, hébergement, notes utilisateurs. Données publiques et citables.",
    url: `${SITE_URL}/observatoire-crm`,
    type: "article",
  },
};

// ─── Calculs statistiques (effectués au build) ────────────────────────

const N = platforms.length;

// Tarification
const pricedPlatforms = platforms.filter(
  (p) => !p.pricing.onQuote && p.pricing.startsAt > 0,
);
const prices = pricedPlatforms.map((p) => p.pricing.startsAt).sort((a, b) => a - b);
const medianPrice = prices[Math.floor(prices.length / 2)];
const meanPrice = Math.round(
  prices.reduce((s, p) => s + p, 0) / prices.length,
);
const minPrice = prices[0];
const maxPrice = prices[prices.length - 1];
const freePlanCount = platforms.filter((p) => p.pricing.hasFreePlan).length;
const freeTrialCount = platforms.filter((p) => p.pricing.hasFreeTrial).length;
const freeTrialDays = platforms
  .filter((p) => p.pricing.hasFreeTrial && p.pricing.freeTrialDays > 0)
  .map((p) => p.pricing.freeTrialDays);
const meanTrialDays = Math.round(
  freeTrialDays.reduce((s, d) => s + d, 0) / freeTrialDays.length,
);
const onQuoteCount = platforms.filter((p) => p.pricing.onQuote).length;

// Tarification par segment
const segmentPricing = (size: "TPE" | "PME" | "ETI" | "Entreprise") => {
  const ps = platforms.filter(
    (p) =>
      p.target.sizes.includes(size) &&
      !p.pricing.onQuote &&
      p.pricing.startsAt > 0,
  );
  if (ps.length === 0) return null;
  const prices = ps.map((p) => p.pricing.startsAt).sort((a, b) => a - b);
  return {
    count: ps.length,
    median: prices[Math.floor(prices.length / 2)],
    min: prices[0],
    max: prices[prices.length - 1],
  };
};
const tpeStats = segmentPricing("TPE");
const pmeStats = segmentPricing("PME");
const etiStats = segmentPricing("ETI");

// Fonctionnalités
type FeatureKey = keyof CRMFeatures;
const featureKeys = Object.keys(platforms[0].features) as FeatureKey[];
const featureCoverage = featureKeys
  .map((key) => ({
    key,
    label: CRM_FEATURE_LABELS[key] || key,
    count: platforms.filter((p) => p.features[key]).length,
    percent: Math.round(
      (platforms.filter((p) => p.features[key]).length / N) * 100,
    ),
  }))
  .sort((a, b) => b.percent - a.percent);

const top5Features = featureCoverage.slice(0, 5);
const bottom5Features = featureCoverage.slice(-5).reverse();

// Hébergement & RGPD
const rgpdCount = platforms.filter((p) => p.security.rgpdCompliant).length;
const euHostedCount = platforms.filter((p) =>
  /UE|France|Europe|EU|Eurozone/i.test(p.security.hosting),
).length;
const franceHostedCount = platforms.filter((p) =>
  /France|Paris|Lille|Lyon|FR\b/i.test(p.security.hosting),
).length;
const supportFRCount = platforms.filter((p) =>
  p.support.languages.some((l) => /Français|French/i.test(l)),
).length;

// Notes
const reviewedPlatforms = platforms.filter(
  (p) => p.externalReviews && p.externalReviews.length > 0,
);
const totalReviewVolume = reviewedPlatforms.reduce(
  (sum, p) => sum + (p.externalReviews || []).reduce((s, r) => s + r.reviewCount, 0),
  0,
);
const meanRating = (() => {
  let weighted = 0;
  let total = 0;
  reviewedPlatforms.forEach((p) => {
    (p.externalReviews || []).forEach((r) => {
      weighted += r.rating * r.reviewCount;
      total += r.reviewCount;
    });
  });
  return Math.round((weighted / total) * 10) / 10;
})();

// Top 10 globaux
const top10ByOverall = [...platforms]
  .sort((a, b) => (b.scores.overall || 0) - (a.scores.overall || 0))
  .slice(0, 10);

// Top 5 par critère
const topByPricing = [...platforms]
  .sort((a, b) => (b.scores.pricing || 0) - (a.scores.pricing || 0))
  .slice(0, 5);
const topBySupport = [...platforms]
  .sort((a, b) => (b.scores.support || 0) - (a.scores.support || 0))
  .slice(0, 5);
const topByUX = [...platforms]
  .sort((a, b) => (b.scores.ux || 0) - (a.scores.ux || 0))
  .slice(0, 5);

// Couverture multi-segments (CRMs qui visent tous les segments)
const multiSegmentCount = platforms.filter(
  (p) => p.target.sizes.length >= 3,
).length;

const LAST_UPDATED = "Juin 2026";

export default function ObservatoirePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Observatoire CRM", href: "/observatoire-crm" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: `Observatoire CRM ${LAST_UPDATED.split(" ")[1]}`,
          description: `Étude originale sur ${N} logiciels CRM analysés en France : tarifs, fonctionnalités, hébergement, notes utilisateurs.`,
          url: `${SITE_URL}/observatoire-crm`,
          dateModified: "2026-06-06",
          creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          license: "https://creativecommons.org/licenses/by/4.0/",
          keywords: [
            "CRM",
            "France",
            "tarifs",
            "fonctionnalités",
            "RGPD",
            "Observatoire",
          ],
          temporalCoverage: "2026",
          spatialCoverage: "France",
        }}
      />

      <PageHero
        eyebrow="Étude exclusive 2026"
        eyebrowIcon={BarChart3}
        title="Observatoire CRM 2026"
        highlight="2026"
        subtitle={`Analyse originale de ${N} logiciels CRM disponibles en France. Données vérifiées, sources publiques, mises à jour trimestrielles. Toutes les statistiques de cette page sont librement citables avec attribution.`}
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
              <li className="text-slate-900 font-medium">Observatoire CRM</li>
            </ol>
          </nav>

          {/* Citation box */}
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-200 rounded-2xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center">
                <Quote size={22} />
              </span>
              <div>
                <h2 className="font-bold text-slate-900 mb-2 text-lg">
                  Données citables pour journalistes et chercheurs
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed mb-3">
                  Toutes les statistiques de cette page sont issues de
                  l&apos;analyse documentaire de {N} logiciels CRM commercialisés
                  en France. Les données sont mises à jour tous les trimestres.
                  Vous pouvez les citer librement avec attribution.
                </p>
                <p className="text-xs text-slate-600">
                  <strong>Format de citation suggéré :</strong>{" "}
                  <em>
                    Observatoire CRM {LAST_UPDATED.split(" ")[1]},
                    Comparateur CRM, comparateurcrm.fr/observatoire-crm
                  </em>
                </p>
              </div>
            </div>
          </div>

          {/* Chiffres clés */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Database size={20} className="text-violet-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                L&apos;observatoire en chiffres clés
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KpiCard
                label="CRMs analysés"
                value={N.toString()}
                sub="commercialisés en France"
                color="violet"
              />
              <KpiCard
                label="Avis utilisateurs"
                value={`${(totalReviewVolume / 1000).toFixed(0)}k+`}
                sub="agrégés depuis G2, Capterra, GetApp"
                color="fuchsia"
              />
              <KpiCard
                label="Note moyenne"
                value={`${meanRating}/5`}
                sub="sur l'ensemble du marché"
                color="emerald"
              />
              <KpiCard
                label="Mise à jour"
                value={LAST_UPDATED}
                sub="révision trimestrielle"
                color="amber"
              />
            </div>
          </section>

          {/* Tarification */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Euro size={20} className="text-violet-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Tarification du marché CRM en France
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <KpiCard
                label="Prix médian"
                value={`${medianPrice} €`}
                sub="par utilisateur / mois"
                color="violet"
              />
              <KpiCard
                label="Prix moyen"
                value={`${meanPrice} €`}
                sub="par utilisateur / mois"
                color="fuchsia"
              />
              <KpiCard
                label="Range"
                value={`${minPrice}–${maxPrice} €`}
                sub="par utilisateur / mois"
                color="indigo"
              />
              <KpiCard
                label="Sur devis"
                value={`${onQuoteCount}/${N}`}
                sub={`${Math.round((onQuoteCount / N) * 100)}% du marché`}
                color="rose"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <SegmentPricingCard
                segment="TPE (1-10 salariés)"
                stats={tpeStats}
                color="emerald"
              />
              <SegmentPricingCard
                segment="PME (11-250 salariés)"
                stats={pmeStats}
                color="violet"
              />
              <SegmentPricingCard
                segment="ETI (250+ salariés)"
                stats={etiStats}
                color="indigo"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard
                icon={Zap}
                title="Plans gratuits permanents"
                value={`${freePlanCount} sur ${N} CRMs (${Math.round((freePlanCount / N) * 100)}%)`}
                detail="Le plan gratuit reste l'exception : moins d'un CRM sur deux le propose. Souvent limité à un nombre restreint d'utilisateurs ou de contacts."
                color="emerald"
              />
              <InsightCard
                icon={TrendingUp}
                title="Essai gratuit"
                value={`${freeTrialCount} sur ${N} CRMs (${Math.round((freeTrialCount / N) * 100)}%)`}
                detail={`Durée moyenne : ${meanTrialDays} jours. La majorité des éditeurs offrent un essai pour faciliter la décision sans engagement.`}
                color="violet"
              />
            </div>
          </section>

          {/* Fonctionnalités */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 size={20} className="text-violet-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Couverture fonctionnelle du marché
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 text-xs">
                    ✓
                  </span>
                  Top 5 fonctionnalités les plus présentes
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Le socle commun du marché en 2026
                </p>
                <ul className="space-y-3">
                  {top5Features.map((f) => (
                    <FeatureBar key={f.key} feature={f} color="emerald" />
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-rose-100 text-rose-700 text-xs">
                    !
                  </span>
                  Top 5 fonctionnalités les moins présentes
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Les vrais critères différenciants
                </p>
                <ul className="space-y-3">
                  {bottom5Features.map((f) => (
                    <FeatureBar key={f.key} feature={f} color="rose" />
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Insight clé :</strong> les fonctions « gestion des
                contacts » et « pipeline » sont quasi universelles. Les
                fonctions de
                <strong> CPQ, téléphonie intégrée et multi-devises</strong>{" "}
                restent rares et constituent les meilleurs critères pour
                trier les offres avancées.
              </p>
            </div>
          </section>

          {/* Hébergement */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Globe size={20} className="text-violet-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Hébergement, RGPD et marché français
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <KpiCard
                label="Hébergement UE"
                value={`${euHostedCount}/${N}`}
                sub={`${Math.round((euHostedCount / N) * 100)}% du marché`}
                color="indigo"
              />
              <KpiCard
                label="Hébergement France"
                value={`${franceHostedCount}/${N}`}
                sub={`${Math.round((franceHostedCount / N) * 100)}% souverains`}
                color="violet"
              />
              <KpiCard
                label="Conformité RGPD"
                value={`${rgpdCount}/${N}`}
                sub={`${Math.round((rgpdCount / N) * 100)}% du marché`}
                color="emerald"
              />
              <KpiCard
                label="Support en français"
                value={`${supportFRCount}/${N}`}
                sub={`${Math.round((supportFRCount / N) * 100)}% du marché`}
                color="fuchsia"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Lecture du marché souverain
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    La conformité RGPD est devenue un standard du marché
                    (quasi-totalité des éditeurs), mais l&apos;hébergement en
                    France reste plus rare. Sur les{" "}
                    <strong>{franceHostedCount} CRMs hébergés en France</strong>,
                    on retrouve principalement les éditeurs français eux-mêmes
                    (Sellsy, Axonaut, Brevo, Karlia, Initiative CRM,
                    Teamleader). Les acteurs mondiaux utilisent généralement
                    AWS Europe ou Azure Europe sans data center 100% France.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Top 10 globaux */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Award size={20} className="text-violet-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Top 10 — Classement éditorial 2026
              </h2>
            </div>
            <p className="text-slate-600 mb-6">
              Classement basé sur notre note pondérée (fonctionnalités, UX,
              support, intégrations, satisfaction, accessibilité). Voir notre{" "}
              <Link
                href="/methodologie"
                className="text-violet-600 hover:text-violet-700 underline underline-offset-2"
              >
                méthodologie
              </Link>{" "}
              pour le détail de la pondération.
            </p>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Rang</th>
                    <th className="px-4 py-3 text-left">CRM</th>
                    <th className="px-4 py-3 text-right">Note</th>
                    <th className="px-4 py-3 text-right">Prix dès</th>
                    <th className="px-4 py-3 text-left">Cible</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {top10ByOverall.map((p, i) => (
                    <tr key={p.slug} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-bold text-slate-900">
                        #{i + 1}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/crm/${p.slug}`}
                          className="font-semibold text-slate-900 hover:text-violet-700"
                        >
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-violet-700 tabular-nums">
                        {(p.scores.overall || 0).toFixed(1)}/10
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {p.pricing.onQuote
                          ? "Sur devis"
                          : p.pricing.startsAt === 0
                            ? "Gratuit"
                            : `${p.pricing.startsAt} €`}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs">
                        {p.target.sizes.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Top 5 par critère */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Users size={20} className="text-violet-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Top 5 par critère
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TopByCardLi
                title="Meilleur rapport qualité-prix"
                color="emerald"
                items={topByPricing}
                scoreKey="pricing"
              />
              <TopByCardLi
                title="Meilleur support client"
                color="violet"
                items={topBySupport}
                scoreKey="support"
              />
              <TopByCardLi
                title="Meilleure ergonomie (UX)"
                color="fuchsia"
                items={topByUX}
                scoreKey="ux"
              />
            </div>
          </section>

          {/* Méthodologie + sources */}
          <section className="mb-12">
            <div className="bg-slate-900 text-white rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={20} className="text-violet-300" />
                <h2 className="text-xl font-bold">
                  Comment ces données ont été produites
                </h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Toutes les statistiques de cette page sont calculées en temps
                réel à partir de notre base de données de {N} logiciels CRM
                analysés selon une méthodologie documentée. Les notes
                utilisateurs sont agrégées depuis G2, Capterra et GetApp (les
                trois sources B2B de référence). Les tarifs et fonctionnalités
                sont relevés directement sur les sites officiels des éditeurs.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                <strong>Multi-segment :</strong> {multiSegmentCount} CRMs sur{" "}
                {N} couvrent 3 segments ou plus (TPE, PME, ETI) — preuve que
                la majorité des éditeurs visent une cible précise.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/methodologie"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Voir la méthodologie
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/comparateur"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/15 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Explorer le comparateur
                  <ArrowRight size={14} />
                </Link>
                <a
                  href="mailto:contact@comparateurcrm.fr?subject=Citation%20Observatoire%20CRM%202026"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/15 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Demander une interview / commentaire
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// ─── Composants utilitaires ──────────────────────────────────────────

const colorMap: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", bar: "bg-violet-600" },
  fuchsia: { bg: "bg-fuchsia-50", text: "text-fuchsia-700", border: "border-fuchsia-200", bar: "bg-fuchsia-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", bar: "bg-emerald-600" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", bar: "bg-indigo-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", bar: "bg-amber-600" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", bar: "bg-rose-600" },
};

function KpiCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: keyof typeof colorMap;
}) {
  const c = colorMap[color];
  return (
    <div className={`${c.bg} border ${c.border} rounded-2xl p-5`}>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
        {label}
      </div>
      <div className={`text-3xl font-black ${c.text} mb-1 tabular-nums`}>
        {value}
      </div>
      <div className="text-xs text-slate-600">{sub}</div>
    </div>
  );
}

function SegmentPricingCard({
  segment,
  stats,
  color,
}: {
  segment: string;
  stats: { count: number; median: number; min: number; max: number } | null;
  color: keyof typeof colorMap;
}) {
  if (!stats) return null;
  const c = colorMap[color];
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-5`}>
      <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
        {segment}
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className={`text-3xl font-black ${c.text} tabular-nums`}>
          {stats.median} €
        </span>
        <span className="text-xs text-slate-500">prix médian/mois</span>
      </div>
      <div className="text-xs text-slate-600">
        Range : <span className="font-semibold">{stats.min}–{stats.max} €</span>{" "}
        · {stats.count} offres
      </div>
    </div>
  );
}

function InsightCard({
  icon: Icon,
  title,
  value,
  detail,
  color,
}: {
  icon: typeof Zap;
  title: string;
  value: string;
  detail: string;
  color: keyof typeof colorMap;
}) {
  const c = colorMap[color];
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className={`flex-shrink-0 w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center`}>
          <Icon size={18} />
        </span>
        <div>
          <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
          <p className={`text-sm font-bold ${c.text} mb-2`}>{value}</p>
        </div>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{detail}</p>
    </div>
  );
}

function FeatureBar({
  feature,
  color,
}: {
  feature: { label: string; count: number; percent: number };
  color: keyof typeof colorMap;
}) {
  const c = colorMap[color];
  return (
    <li>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm text-slate-700 font-medium">{feature.label}</span>
        <span className={`text-sm font-bold ${c.text} tabular-nums`}>
          {feature.percent}%
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${c.bar} rounded-full`}
          style={{ width: `${feature.percent}%` }}
        />
      </div>
      <div className="text-xs text-slate-500 mt-0.5">
        {feature.count} / {N} CRMs
      </div>
    </li>
  );
}

function TopByCardLi({
  title,
  color,
  items,
  scoreKey,
}: {
  title: string;
  color: keyof typeof colorMap;
  items: typeof platforms;
  scoreKey: "pricing" | "support" | "ux";
}) {
  const c = colorMap[color];
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h3 className={`font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100`}>
        {title}
      </h3>
      <ol className="space-y-2.5">
        {items.map((p, i) => (
          <li key={p.slug} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className={`flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md ${c.bg} ${c.text} text-xs font-bold`}>
                {i + 1}
              </span>
              <Link
                href={`/crm/${p.slug}`}
                className="text-sm font-semibold text-slate-900 hover:text-violet-700 truncate"
              >
                {p.name}
              </Link>
            </div>
            <span className={`text-sm font-bold ${c.text} tabular-nums`}>
              {(p.scores[scoreKey] || 0).toFixed(1)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
