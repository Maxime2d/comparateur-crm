import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, ArrowLeft, Check, X } from "lucide-react";
import {
  getAllComparisonSlugs,
  getComparisonFrontmatter,
  getComparisonBySlug,
} from "@/lib/mdx";
import { getPlatformBySlug } from "@/lib/platforms";
import { SITE_URL, SITE_NAME, CRM_FEATURE_LABELS } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { ScoreBadge } from "@/components/ui/score-badge";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getCtaLabel } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fm = getComparisonFrontmatter(slug);
  if (!fm) return {};
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: `${SITE_URL}/comparer/${slug}` },
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      url: `${SITE_URL}/comparer/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) return notFound();

  const { frontmatter, content } = comparison;
  const a = getPlatformBySlug(frontmatter.platformA);
  const b = getPlatformBySlug(frontmatter.platformB);

  if (!a || !b) return notFound();

  const featureKeys = Object.keys(CRM_FEATURE_LABELS);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Comparaisons", href: "/comparer" },
          { name: frontmatter.title, href: `/comparer/${slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: frontmatter.title,
          description: frontmatter.description,
          datePublished: frontmatter.date,
          dateModified: frontmatter.date,
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
              {frontmatter.title}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {frontmatter.description}
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
            {content}
          </article>

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
