import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, ArrowLeft, Check, X } from "lucide-react";
import {
  getAllComparisonSlugs,
  getComparisonFrontmatter,
  getComparisonBySlug,
  getRelatedComparisons,
} from "@/lib/mdx";
import { getPlatformBySlug } from "@/lib/platforms";
import {
  getGeneratedComparisonSlugs,
  resolveGeneratedPair,
  buildVsFaqs,
} from "@/lib/vs-pairs";
import { GeneratedVsBody } from "@/components/comparer/generated-vs-body";
import { SITE_URL, SITE_NAME, CRM_FEATURE_LABELS } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { PillarLinks } from "@/components/shared/pillar-links";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { ScoreBadge } from "@/components/ui/score-badge";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getCtaLabel } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    ...getAllComparisonSlugs(),
    ...getGeneratedComparisonSlugs(),
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fm = getComparisonFrontmatter(slug);
  let title: string;
  let description: string;
  if (fm) {
    title = fm.title;
    description = fm.description;
  } else {
    const pair = resolveGeneratedPair(slug);
    if (!pair) return {};
    title = `${pair.a.name} vs ${pair.b.name} : comparatif 2026 (tarifs & fonctionnalités)`;
    description = `${pair.a.name} ou ${pair.b.name} en 2026 ? Comparatif des tarifs, fonctionnalités, forces et limites pour choisir le bon CRM selon votre profil.`;
  }
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/comparer/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/comparer/${slug}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);

  // Deux sources possibles : un MDX rédigé, ou une paire générée (data-driven).
  let a, b;
  let bodyNode: React.ReactNode;
  let faqs: { question: string; answer: string }[];
  let headerTitle: string;
  let headerDescription: string;
  let pageDate: string;
  let pageUpdated: string;

  if (comparison) {
    const { frontmatter, content, faqs: mdxFaqs } = comparison;
    a = getPlatformBySlug(frontmatter.platformA);
    b = getPlatformBySlug(frontmatter.platformB);
    if (!a || !b) return notFound();
    bodyNode = content;
    faqs = mdxFaqs;
    headerTitle = frontmatter.title;
    headerDescription = frontmatter.description;
    pageDate = frontmatter.date;
    pageUpdated = frontmatter.updated || frontmatter.date;
  } else {
    const pair = resolveGeneratedPair(slug);
    if (!pair) return notFound();
    a = pair.a;
    b = pair.b;
    bodyNode = <GeneratedVsBody a={a} b={b} />;
    faqs = buildVsFaqs(a, b);
    headerTitle = `${a.name} vs ${b.name} : comparatif 2026`;
    headerDescription = `${a.name} ou ${b.name} ? Tarifs, fonctionnalités et verdict par profil pour choisir le bon CRM.`;
    pageDate = a.lastUpdated || "2026-01-01";
    pageUpdated = pageDate;
  }

  const featureKeys = Object.keys(CRM_FEATURE_LABELS);
  const relatedComparisons = getRelatedComparisons(slug, a.slug, b.slug);

  return (
    <>
      {faqs.length > 0 && <FAQJsonLd faqs={faqs} />}
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Comparaisons", href: "/comparer" },
          { name: headerTitle, href: `/comparer/${slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: headerTitle,
          description: headerDescription,
          datePublished: pageDate,
          dateModified: pageUpdated,
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          mainEntityOfPage: `${SITE_URL}/comparer/${slug}`,
          about: [
            { "@type": "SoftwareApplication", name: a.name, url: a.website },
            { "@type": "SoftwareApplication", name: b.name, url: b.website },
          ],
        }}
      />

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
                <Link href="/comparateur" className="hover:text-violet-600">
                  Comparateur
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium truncate max-w-xs">
                {a.name} vs {b.name}
              </li>
            </ol>
          </nav>

          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              {headerTitle}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {headerDescription}
            </p>
          </header>

          {/* Side-by-side hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[a, b].map((p) => (
              <div
                key={p.slug}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <PlatformLogo website={p.website} name={p.name} size={56} />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {p.name}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {p.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <ScoreBadge score={p.scores.overall} />
                  <span className="text-sm text-slate-600">
                    Note globale · {p.scores.overall}/10
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-1">
                    Tarif d&apos;entrée
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatPrice(p.pricing.startsAt, p.pricing.onQuote)}
                    {p.pricing.startsAt > 0 && (
                      <span className="text-sm text-slate-500 font-normal">
                        /mois
                      </span>
                    )}
                  </p>
                  {p.pricing.hasFreePlan && (
                    <Badge
                      variant="outline"
                      className="mt-2 border-emerald-200 text-emerald-700 bg-emerald-50"
                    >
                      Plan gratuit
                    </Badge>
                  )}
                </div>
                <AffiliateLink
                  href={p.affiliateUrl}
                  platformName={p.name}
                  platformSlug={p.slug}
                  source="vs-page"
                  variant="button-primary"
                  size="md"
                  fullWidth
                >
                  {getCtaLabel(p.pricing)}
                  <ExternalLink size={16} />
                </AffiliateLink>
              </div>
            ))}
          </div>

          {/* Feature-by-feature table */}
          <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-12">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                Comparatif détaillé des fonctionnalités
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                      Fonctionnalité
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">
                      {a.name}
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">
                      {b.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {featureKeys.map((key) => {
                    const aHas =
                      (a.features as unknown as Record<string, boolean>)[key] ||
                      false;
                    const bHas =
                      (b.features as unknown as Record<string, boolean>)[key] ||
                      false;
                    return (
                      <tr key={key}>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          {CRM_FEATURE_LABELS[key]}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {aHas ? (
                            <Check className="inline text-emerald-600" size={18} />
                          ) : (
                            <X className="inline text-slate-300" size={18} />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {bHas ? (
                            <Check className="inline text-emerald-600" size={18} />
                          ) : (
                            <X className="inline text-slate-300" size={18} />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* MDX body — verdict, use-cases, pros/cons */}
          <article className="max-w-none bg-white rounded-2xl border border-slate-200 p-6 md:p-10 mb-12">
            {bodyNode}
          </article>

          {/* Maillage interne — fiches des 2 CRM comparés */}
          <PillarLinks
            platformSlugs={[a.slug, b.slug]}
            title="Lire nos avis détaillés"
          />

          {/* Comparaisons connexes */}
          {relatedComparisons.length > 0 && (
            <aside
              className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
              aria-label="Comparaisons connexes"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Autres comparaisons utiles
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedComparisons.map(({ slug: relSlug, data }) => (
                  <li key={relSlug}>
                    <Link
                      href={`/comparer/${relSlug}`}
                      className="group flex items-center justify-between gap-3 rounded-xl bg-white border border-slate-200 p-3 hover:border-violet-300 hover:shadow-sm transition-all"
                    >
                      <span className="font-medium text-slate-800 text-sm">
                        {data.title}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-violet-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Final CTAs */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[a, b].map((p) => (
              <AffiliateLink
                key={p.slug}
                href={p.affiliateUrl}
                platformName={p.name}
                platformSlug={p.slug}
                source="vs-verdict"
                variant="button-primary"
                size="lg"
                fullWidth
              >
                {getCtaLabel(p.pricing)} · {p.name}
                <ExternalLink size={18} />
              </AffiliateLink>
            ))}
          </section>

          <div className="text-center mb-10">
            <Link
              href="/comparateur"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
            >
              <ArrowLeft size={16} />
              Voir tous les CRM du comparateur
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
