import { Metadata } from "next";
import React from "react";
import {
  ExternalLink,
  Check,
  X,
  Star,
  ArrowRight,
  ChevronDown,
  Users,
  Shield,
  Globe,
  Clock,
  Building2,
} from "lucide-react";

import {
  getPlatformBySlug,
  getAllPlatformSlugs,
  getTopPlatforms,
} from "@/lib/platforms";
import {
  SITE_NAME,
  SITE_URL,
  CRM_FEATURE_LABELS,
} from "@/lib/constants";
import {
  PlatformJsonLd,
  FAQJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { formatPrice, getCtaLabel, getScoreColor } from "@/lib/utils";
import { SCORE_WEIGHTS } from "@/types/platform";

export async function generateStaticParams() {
  const slugs = getAllPlatformSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const platform = getPlatformBySlug(params.slug);

  if (!platform) {
    return {
      title: "CRM non trouvé",
      description: "Le CRM que vous recherchez n&apos;existe pas.",
    };
  }

  return {
    title: `${platform.name} - Comparateur CRM`,
    description: platform.shortDescription,
    openGraph: {
      title: `${platform.name} - Comparateur CRM`,
      description: platform.shortDescription,
      url: `${SITE_URL}/crm/${platform.slug}`,
      type: "website",
      images: [
        {
          url: platform.website,
          width: 1200,
          height: 630,
          alt: platform.name,
        },
      ],
    },
    keywords: [
      platform.name,
      "CRM",
      ...platform.tags,
    ],
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PlatformDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const platform = getPlatformBySlug(params.slug);

  if (!platform) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CRM non trouvé
          </h1>
          <p className="text-gray-600 mb-6">
            Le CRM que vous recherchez n&apos;existe pas.
          </p>
          <a
            href="/comparateur"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Retour au comparateur
          </a>
        </div>
      </div>
    );
  }

  const relatedPlatforms = getTopPlatforms(3).filter(
    (p) => p.slug !== platform.slug
  );

  return (
    <>
      <PlatformJsonLd platform={platform} />
      <FAQJsonLd platform={platform} />
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: SITE_URL },
        { name: "Comparateur", url: `${SITE_URL}/comparateur` },
        { name: platform.name, url: `${SITE_URL}/crm/${platform.slug}` },
      ]} />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="mb-6">
                  <PlatformLogo
                    website={platform.website}
                    size={64}
                    className="rounded-lg"
                  />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {platform.name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {platform.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {platform.tags?.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <AffiliateLink
                    href={platform.website}
                    platformName={platform.name}
                    platformSlug={platform.slug}
                    source="detail"
                    className="inline-flex items-center gap-2"
                  >
                    Visiter le site
                    <ExternalLink size={18} />
                  </AffiliateLink>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-8">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Note globale</p>
                  <div className="flex items-end gap-4">
                    <div className="text-4xl font-bold text-gray-900">
                      {platform.scores.overall}
                    </div>
                    <ScoreBadge score={platform.scores.overall} />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm text-gray-600 mb-3">Tarifs</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice(platform.pricing.startsAt)}/mois
                  </p>
                  {platform.pricing.hasFreePlan && (
                    <Badge variant="outline" className="mb-4">
                      Plan gratuit disponible
                    </Badge>
                  )}
                </div>

                <div className="border-t pt-6 mt-6">
                  <p className="text-sm text-gray-600 mb-3">Entreprises</p>
                  <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-gray-500" />
                    <span className="text-gray-900">
                      {platform.target.sizes.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Score Breakdown */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Détail des scores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(SCORE_WEIGHTS).map(([key, weight]) => {
                const score = (platform.scores as any)[key] || 0;
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                return (
                  <div
                    key={key}
                    className="bg-white rounded-lg p-6 border border-gray-200"
                  >
                    <p className="text-sm text-gray-600 mb-2">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-3">
                      {score}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getScoreColor(score)}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 bg-white border-y border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Fonctionnalités
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(CRM_FEATURE_LABELS).map(([key, label]) => {
                const hasFeature = (platform.features as any)[key] || false;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    {hasFeature ? (
                      <Check className="text-green-600 flex-shrink-0" size={20} />
                    ) : (
                      <X className="text-gray-300 flex-shrink-0" size={20} />
                    )}
                    <span
                      className={
                        hasFeature ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Intégrations
            </h2>
            {platform.integrations.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {platform.integrations.map((integration) => (
                  <div
                    key={integration}
                    className="bg-white rounded-lg p-4 border border-gray-200 text-center text-sm text-gray-700 hover:shadow-md transition-shadow"
                  >
                    {integration}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                Aucune intégration détaillée fournie.
              </p>
            )}
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="py-12 bg-white border-y border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Avantages et inconvénients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="text-green-600" size={20} />
                  Avantages
                </h3>
                <ul className="space-y-3">
                  {(platform.pros || []).map((pro, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span className="text-green-600 mt-1">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <X className="text-red-600" size={20} />
                  Inconvénients
                </h3>
                <ul className="space-y-3">
                  {(platform.cons || []).map((con, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span className="text-red-600 mt-1">-</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {(platform.faq || []).map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <summary className="flex items-center justify-between font-semibold text-gray-900">
                    {item.question}
                    <ChevronDown
                      size={20}
                      className="group-open:rotate-180 transition-transform"
                    />
                  </summary>
                  <p className="mt-4 text-gray-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Alternatives */}
        <section className="py-12 bg-white border-y border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Alternatives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPlatforms.map((alt) => (
                <div
                  key={alt.slug}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  <div className="mb-4">
                    <PlatformLogo
                      website={alt.website}
                      size={40}
                      className="rounded"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {alt.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {alt.shortDescription}
                  </p>
                  <p className="font-semibold text-gray-900 mb-4">
                    {formatPrice(alt.pricing.startsAt)}/mois
                  </p>
                  <a
                    href={`/crm/${alt.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
                  >
                    Voir plus
                    <ArrowRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prêt à essayer {platform.name}?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Découvrez comment {platform.name} peut transformer votre gestion de
              la relation client.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AffiliateLink
                href={platform.website}
                platformName={platform.name}
                platformSlug={platform.slug}
                source="detail-cta"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                {getCtaLabel(platform.pricing.hasFreePlan)}
                <ArrowRight size={18} />
              </AffiliateLink>
              <a
                href="/comparateur"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium"
              >
                Comparer d&apos;autres CRM
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
