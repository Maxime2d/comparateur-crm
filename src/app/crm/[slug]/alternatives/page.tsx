import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, ArrowLeft, Check } from "lucide-react";
import {
  getPlatformBySlug,
  getAllPlatformSlugs,
  getTopPlatforms,
} from "@/lib/platforms";
import type { Platform } from "@/types/platform";
import { SITE_URL } from "@/lib/constants";
import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  ItemListJsonLd,
} from "@/components/seo/json-ld";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { ScoreBadge } from "@/components/ui/score-badge";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getCtaLabel } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPlatformSlugs().map((slug) => ({ slug }));
}

/** Liste d'alternatives : champ `alternatives` complété à 6 si besoin. */
function getAlternatives(platform: Platform): Platform[] {
  const base = platform.alternatives
    .map((s) => getPlatformBySlug(s))
    .filter((p): p is Platform => Boolean(p));

  if (base.length >= 6) return base.slice(0, 6);

  // Complète avec les meilleurs CRM du même segment de cible.
  const sizes = new Set(platform.target.sizes);
  const extra = getTopPlatforms(27)
    .filter(
      (p) =>
        p.slug !== platform.slug &&
        !base.some((b) => b.slug === p.slug) &&
        p.target.sizes.some((s) => sizes.has(s)),
    )
    .slice(0, 6 - base.length);

  return [...base, ...extra];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);
  if (!platform) return {};
  const title = `Alternatives à ${platform.name} : 6 meilleurs concurrents (2026)`;
  const description = `Les meilleures alternatives à ${platform.name} en 2026 : concurrents moins chers, gratuits ou français. Tableau comparatif des tarifs, notes et fonctionnalités.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/crm/${slug}/alternatives` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/crm/${slug}/alternatives`,
    },
    twitter: { card: "summary_large_image", title, description },
    keywords: [
      `alternative ${platform.name}`,
      `alternatives ${platform.name}`,
      `concurrent ${platform.name}`,
      `${platform.name} ou`,
      `remplacer ${platform.name}`,
    ],
  };
}

export default async function AlternativesPage({ params }: Props) {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);
  if (!platform) return notFound();

  const alternatives = getAlternatives(platform);
  if (alternatives.length === 0) return notFound();

  const cheaper = alternatives.filter(
    (p) => p.pricing.startsAt > 0 && p.pricing.startsAt < platform.pricing.startsAt,
  );
  const free = alternatives.filter((p) => p.pricing.hasFreePlan);
  const french = alternatives.filter((p) => p.badges.includes("Français"));
  const best = [...alternatives].sort(
    (a, b) => b.scores.overall - a.scores.overall,
  )[0];

  const faqs = [
    {
      question: `Quelle est la meilleure alternative à ${platform.name} ?`,
      answer: `Parmi les concurrents directs, ${best.name} est l'alternative la mieux notée (${best.scores.overall}/10) sur notre comparateur. Le meilleur choix dépend toutefois de votre budget, de la taille de votre équipe et de vos priorités fonctionnelles — utilisez notre quiz ou notre comparateur pour trancher.`,
    },
    {
      question: `Existe-t-il une alternative gratuite à ${platform.name} ?`,
      answer: free.length
        ? `Oui. Parmi les alternatives, ${free
            .map((p) => p.name)
            .join(", ")} proposent un plan gratuit pour démarrer sans budget.`
        : `Peu d'alternatives directes proposent un plan 100 % gratuit pérenne, mais plusieurs offrent un essai gratuit. Consultez notre page des CRM gratuits pour les options sans engagement.`,
    },
    {
      question: `Quelle alternative française à ${platform.name} ?`,
      answer: french.length
        ? `Côté éditeurs français, ${french
            .map((p) => p.name)
            .join(", ")} ${french.length > 1 ? "sont de bonnes alternatives" : "est une bonne alternative"}, avec hébergement et support en France. Voir notre sélection de CRM français.`
        : `Pour une solution éditée et hébergée en France, consultez notre page dédiée aux CRM français : plusieurs répondent aux mêmes besoins.`,
    },
    {
      question: `Pourquoi chercher une alternative à ${platform.name} ?`,
      answer: `Les raisons les plus fréquentes sont le prix, une complexité jugée excessive, des fonctionnalités manquantes ou un besoin de support en français. ${cheaper.length ? `Plusieurs alternatives démarrent à un tarif inférieur, comme ${cheaper[0].name} dès ${formatPrice(cheaper[0].pricing.startsAt, cheaper[0].pricing.onQuote)}/mois.` : ""}`,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: platform.name, href: `/crm/${slug}` },
          { name: "Alternatives", href: `/crm/${slug}/alternatives` },
        ]}
      />
      <ItemListJsonLd platforms={alternatives} />
      <FAQJsonLd faqs={faqs} />

      <div className="min-h-screen bg-[#fafaff]">
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li>
                <Link href={`/crm/${slug}`} className="hover:text-violet-600">
                  {platform.name}
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">Alternatives</li>
            </ol>
          </nav>

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Alternatives à {platform.name} en 2026
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl">
              {platform.name} ne correspond pas (ou plus) à vos besoins ? Voici
              les {alternatives.length} meilleures alternatives, comparées sur
              les tarifs, les notes et les fonctionnalités clés. Que vous
              cherchiez moins cher, un plan gratuit ou une solution française,
              vous trouverez une option adaptée.
            </p>
          </header>

          {/* Tableau comparatif */}
          <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">
                      CRM
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">
                      Note
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">
                      Dès
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">
                      Plan gratuit
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">
                      Cible
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-violet-50/40">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {platform.name}{" "}
                      <span className="text-xs text-slate-400">(référence)</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {platform.scores.overall}/10
                    </td>
                    <td className="px-4 py-3 text-center">
                      {formatPrice(
                        platform.pricing.startsAt,
                        platform.pricing.onQuote,
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {platform.pricing.hasFreePlan ? (
                        <Check className="inline text-emerald-600" size={16} />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600">
                      {platform.target.sizes.join(", ")}
                    </td>
                  </tr>
                  {alternatives.map((p) => (
                    <tr key={p.slug}>
                      <td className="px-4 py-3">
                        <Link
                          href={`/crm/${p.slug}`}
                          className="font-medium text-violet-700 hover:text-violet-800"
                        >
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.scores.overall}/10
                      </td>
                      <td className="px-4 py-3 text-center">
                        {formatPrice(p.pricing.startsAt, p.pricing.onQuote)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.pricing.hasFreePlan ? (
                          <Check className="inline text-emerald-600" size={16} />
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-600">
                        {p.target.sizes.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Cartes détaillées */}
          <section className="space-y-5 mb-12">
            {alternatives.map((p, i) => {
              const reasons: string[] = [];
              if (
                p.pricing.startsAt > 0 &&
                p.pricing.startsAt < platform.pricing.startsAt
              )
                reasons.push("moins cher");
              if (p.pricing.hasFreePlan) reasons.push("plan gratuit");
              if (p.badges.includes("Français")) reasons.push("éditeur français");
              if (p.scores.ux > platform.scores.ux)
                reasons.push("plus simple à prendre en main");
              if (p.scores.features > platform.scores.features)
                reasons.push("plus complet");
              return (
                <article
                  key={p.slug}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-300 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    <div className="flex items-center gap-4 md:w-64 flex-shrink-0">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-violet-700 text-sm font-bold text-white">
                        #{i + 1}
                      </span>
                      <PlatformLogo website={p.website} name={p.name} size={36} />
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {p.name}
                        </h2>
                        <ScoreBadge score={p.scores.overall} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-700 leading-relaxed mb-3">
                        {p.shortDescription}.
                        {reasons.length > 0 && (
                          <>
                            {" "}
                            Face à {platform.name} :{" "}
                            <span className="font-medium text-slate-900">
                              {reasons.join(", ")}
                            </span>
                            .
                          </>
                        )}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm text-slate-600">
                          Dès{" "}
                          <span className="font-bold text-slate-900">
                            {formatPrice(p.pricing.startsAt, p.pricing.onQuote)}
                          </span>
                        </span>
                        {p.badges.slice(0, 2).map((b) => (
                          <Badge key={b} className="text-xs">
                            {b}
                          </Badge>
                        ))}
                        <div className="ml-auto flex items-center gap-3">
                          <Link
                            href={`/crm/${p.slug}`}
                            className="text-sm font-semibold text-violet-600 hover:text-violet-700"
                          >
                            Voir la fiche →
                          </Link>
                          <AffiliateLink
                            href={p.affiliateUrl}
                            platformName={p.name}
                            platformSlug={p.slug}
                            source="related-crm"
                            variant="button-primary"
                            size="sm"
                          >
                            {getCtaLabel(p.pricing)}
                            <ExternalLink size={14} />
                          </AffiliateLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* Maillage interne */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 mb-12">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Pour aller plus loin
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <li>
                <Link
                  href={`/crm/${slug}`}
                  className="text-violet-600 hover:text-violet-700 font-medium"
                >
                  Fiche complète de {platform.name}
                </Link>
              </li>
              <li>
                <Link
                  href="/comparateur"
                  className="text-violet-600 hover:text-violet-700 font-medium"
                >
                  Comparer tous les CRM
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="text-violet-600 hover:text-violet-700 font-medium"
                >
                  Trouver mon CRM (quiz)
                </Link>
              </li>
              <li>
                <Link
                  href="/crm-gratuit"
                  className="text-violet-600 hover:text-violet-700 font-medium"
                >
                  CRM gratuits
                </Link>
              </li>
            </ul>
          </section>

          {/* FAQ visible (alignée sur le schema) */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="bg-white rounded-xl border border-slate-200 p-5"
                >
                  <summary className="font-semibold text-slate-900 cursor-pointer">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-slate-700 leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <div className="text-center mb-10">
            <Link
              href={`/crm/${slug}`}
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
            >
              <ArrowLeft size={16} />
              Retour à la fiche {platform.name}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
