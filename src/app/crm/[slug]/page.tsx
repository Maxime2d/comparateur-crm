import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  Check,
  X,
  ArrowRight,
  ChevronDown,
  Shield,
  Building2,
  ChevronRight,
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
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { formatPrice, getCtaLabel, getScoreColor } from "@/lib/utils";
import { SCORE_WEIGHTS } from "@/types/platform";

export async function generateStaticParams() {
  const slugs = getAllPlatformSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    return {
      title: "CRM non trouvé",
      description: "Le CRM que vous recherchez n'existe pas.",
    };
  }

  const title = `${platform.name} : avis, tarifs et test complet 2026`;
  const description = `${platform.shortDescription} Découvrez notre analyse détaillée, les prix, les fonctionnalités et les alternatives à ${platform.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/crm/${platform.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/crm/${platform.slug}`,
      type: "website",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [
      platform.name,
      `${platform.name} avis`,
      `${platform.name} tarif`,
      `${platform.name} prix`,
      "CRM",
      "logiciel CRM",
      ...platform.badges,
    ],
  };
}

export default async function PlatformDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            CRM non trouvé
          </h1>
          <p className="text-slate-600 mb-6">
            Le CRM que vous recherchez n&apos;existe pas.
          </p>
          <Link
            href="/comparateur"
            className="text-violet-600 hover:text-violet-700 font-medium"
          >
            Retour au comparateur
          </Link>
        </div>
      </div>
    );
  }

  const relatedPlatforms = getTopPlatforms(6)
    .filter((p) => p.slug !== platform.slug)
    .slice(0, 3);

  const ctaLabel = getCtaLabel(platform.pricing);

  return (
    <>
      <PlatformJsonLd platform={platform} />
      {platform.faq && platform.faq.length > 0 && (
        <FAQJsonLd faqs={platform.faq} />
      )}
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Comparateur", href: "/comparateur" },
          { name: platform.name, href: `/crm/${platform.slug}` },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24 md:pb-0">
        {/* Breadcrumb */}
        <nav
          aria-label="Fil d'Ariane"
          className="max-w-5xl mx-auto px-4 pt-6 text-sm text-slate-500"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-violet-600">
                Accueil
              </Link>
            </li>
            <ChevronRight size={14} className="text-slate-400" />
            <li>
              <Link href="/comparateur" className="hover:text-violet-600">
                Comparateur CRM
              </Link>
            </li>
            <ChevronRight size={14} className="text-slate-400" />
            <li className="text-slate-900 font-medium">{platform.name}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 mt-6">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="mb-6">
                  <PlatformLogo
                    website={platform.website}
                    name={platform.name}
                    size={64}
                    className="rounded-lg"
                  />
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-3">
                  {platform.name} : avis, tarifs et test complet
                </h1>
                <p className="text-lg text-slate-600 mb-4">
                  {platform.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {platform.badges?.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <AffiliateLink
                    href={platform.affiliateUrl}
                    platformName={platform.name}
                    platformSlug={platform.slug}
                    source="fiche-hero"
                    variant="button-primary"
                    size="lg"
                  >
                    {ctaLabel}
                    <ExternalLink size={18} />
                  </AffiliateLink>
                  <a
                    href="#tarifs"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:border-violet-300 hover:text-violet-700 font-semibold transition-colors"
                  >
                    Voir les tarifs
                    <ArrowRight size={18} />
                  </a>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Lien affilié. Nous pouvons percevoir une commission — cela n&apos;affecte pas nos scores.
                </p>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-slate-50 rounded-2xl p-8 border border-violet-100">
                <div className="mb-6">
                  <p className="text-sm text-slate-600 mb-2">Note globale</p>
                  <div className="flex items-end gap-4">
                    <div className="text-5xl font-bold text-slate-900">
                      {platform.scores.overall}
                      <span className="text-2xl text-slate-400">/10</span>
                    </div>
                    <ScoreBadge score={platform.scores.overall} />
                  </div>
                </div>

                <div id="tarifs" className="border-t border-violet-100 pt-6">
                  <p className="text-sm text-slate-600 mb-3">Tarif d&apos;entrée</p>
                  <p className="text-3xl font-bold text-slate-900 mb-2">
                    {formatPrice(platform.pricing.startsAt, platform.pricing.onQuote)}
                    {platform.pricing.startsAt > 0 && (
                      <span className="text-base text-slate-500 font-normal">
                        /utilisateur/mois
                      </span>
                    )}
                  </p>
                  {platform.pricing.hasFreePlan && (
                    <Badge
                      variant="outline"
                      className="mb-4 border-emerald-200 text-emerald-700 bg-emerald-50"
                    >
                      Plan gratuit disponible
                    </Badge>
                  )}
                  {platform.pricing.hasFreeTrial && !platform.pricing.hasFreePlan && (
                    <Badge
                      variant="outline"
                      className="mb-4 border-violet-200 text-violet-700 bg-violet-50"
                    >
                      Essai gratuit disponible
                    </Badge>
                  )}
                </div>

                <div className="border-t border-violet-100 pt-6 mt-6">
                  <p className="text-sm text-slate-600 mb-3">Cible</p>
                  <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-violet-500" />
                    <span className="text-slate-900">
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
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Notre évaluation en détail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(SCORE_WEIGHTS).map(([key]) => {
                const scoreValue = (platform.scores as unknown as Record<string, number>)[key] || 0;
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                return (
                  <div
                    key={key}
                    className="bg-white rounded-xl p-6 border border-slate-200"
                  >
                    <p className="text-sm text-slate-600 mb-2">{label}</p>
                    <p className="text-3xl font-bold text-slate-900 mb-3">
                      {scoreValue}
                      <span className="text-base text-slate-400">/10</span>
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getScoreColor(scoreValue)}`}
                        style={{ width: `${scoreValue * 10}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MID-PAGE CTA */}
        <section className="py-6">
          <div className="max-w-5xl mx-auto px-4">
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 text-white p-8 md:p-10 shadow-lg shadow-violet-600/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Testez {platform.name} directement
                  </h3>
                  <p className="text-violet-100">
                    {platform.pricing.hasFreePlan
                      ? "Plan gratuit disponible — aucune carte bancaire requise."
                      : platform.pricing.hasFreeTrial
                        ? "Essai gratuit — profitez de toutes les fonctionnalités sans engagement."
                        : "Demandez une démo personnalisée."}
                  </p>
                </div>
                <AffiliateLink
                  href={platform.affiliateUrl}
                  platformName={platform.name}
                  platformSlug={platform.slug}
                  source="fiche-midpage"
                  variant="button-secondary"
                  size="lg"
                  className="bg-white text-violet-700 hover:bg-violet-50 flex-shrink-0"
                >
                  {ctaLabel}
                  <ExternalLink size={18} />
                </AffiliateLink>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Fonctionnalités
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(CRM_FEATURE_LABELS).map(([key, label]) => {
                const hasFeature = (platform.features as unknown as Record<string, boolean>)[key] || false;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-violet-300 transition-colors"
                  >
                    {hasFeature ? (
                      <Check className="text-emerald-600 flex-shrink-0" size={20} />
                    ) : (
                      <X className="text-slate-300 flex-shrink-0" size={20} />
                    )}
                    <span className={hasFeature ? "text-slate-900" : "text-slate-400"}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integrations */}
        {platform.integrations.length > 0 && (
          <section className="py-12">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Intégrations disponibles
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {platform.integrations.map((integration) => (
                  <div
                    key={integration}
                    className="bg-white rounded-lg p-4 border border-slate-200 text-center text-sm text-slate-700 hover:shadow-md hover:border-violet-200 transition-all"
                  >
                    {integration}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pros & Cons */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Avantages et inconvénients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Check className="text-emerald-600" size={20} />
                  Avantages
                </h3>
                <ul className="space-y-3">
                  {(platform.prosAndCons.pros || []).map((pro, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">
                      <span className="text-emerald-600 font-bold mt-0.5">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50 rounded-xl p-6 border border-rose-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <X className="text-rose-600" size={20} />
                  Inconvénients
                </h3>
                <ul className="space-y-3">
                  {(platform.prosAndCons.cons || []).map((con, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">
                      <span className="text-rose-600 font-bold mt-0.5">-</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security / Target */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="text-violet-600" size={20} />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Pour qui ?
                  </h3>
                </div>
                <p className="text-sm text-slate-600 mb-3">Tailles cibles :</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {platform.target.sizes.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
                {platform.target.sectors && platform.target.sectors.length > 0 && (
                  <>
                    <p className="text-sm text-slate-600 mb-3">Secteurs adaptés :</p>
                    <div className="flex flex-wrap gap-2">
                      {platform.target.sectors.map((s) => (
                        <Badge key={s} variant="outline">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  En résumé
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {platform.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {platform.faq && platform.faq.length > 0 && (
          <section className="py-12 bg-white border-y border-slate-200">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Questions fréquentes sur {platform.name}
              </h2>
              <div className="space-y-3">
                {platform.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-slate-50 rounded-xl border border-slate-200 p-5 cursor-pointer hover:border-violet-300 transition-colors"
                  >
                    <summary className="flex items-center justify-between font-semibold text-slate-900 list-none">
                      {item.question}
                      <ChevronDown
                        size={20}
                        className="group-open:rotate-180 transition-transform text-slate-400"
                      />
                    </summary>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Alternatives */}
        {relatedPlatforms.length > 0 && (
          <section className="py-12">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Alternatives à {platform.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPlatforms.map((alt) => (
                  <div
                    key={alt.slug}
                    className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md hover:border-violet-200 transition-all"
                  >
                    <div className="mb-4">
                      <PlatformLogo
                        website={alt.website}
                        name={alt.name}
                        size={40}
                        className="rounded"
                      />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {alt.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {alt.shortDescription}
                    </p>
                    <p className="font-semibold text-slate-900 mb-4">
                      {formatPrice(alt.pricing.startsAt, alt.pricing.onQuote)}
                      {alt.pricing.startsAt > 0 && (
                        <span className="text-sm text-slate-500 font-normal">/mois</span>
                      )}
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/crm/${alt.slug}`}
                        className="text-violet-600 hover:text-violet-700 font-medium inline-flex items-center gap-1.5 text-sm"
                      >
                        Voir la fiche
                        <ArrowRight size={14} />
                      </Link>
                      <AffiliateLink
                        href={alt.affiliateUrl}
                        platformName={alt.name}
                        platformSlug={alt.slug}
                        source="related-crm"
                        variant="button-outline"
                        size="sm"
                        fullWidth
                      >
                        {getCtaLabel(alt.pricing)}
                      </AffiliateLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA Section */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Prêt à essayer {platform.name} ?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              {platform.pricing.hasFreePlan
                ? `Commencez gratuitement avec ${platform.name} et découvrez si c'est le bon CRM pour votre équipe.`
                : `Profitez d'une démo ou d'un essai gratuit pour vérifier si ${platform.name} répond à vos besoins.`}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AffiliateLink
                href={platform.affiliateUrl}
                platformName={platform.name}
                platformSlug={platform.slug}
                source="fiche-bottom"
                variant="button-primary"
                size="lg"
              >
                {ctaLabel}
                <ArrowRight size={18} />
              </AffiliateLink>
              <Link
                href="/comparateur"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-900 rounded-xl hover:bg-slate-50 font-semibold"
              >
                Comparer d&apos;autres CRM
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Sticky mobile CTA */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <AffiliateLink
            href={platform.affiliateUrl}
            platformName={platform.name}
            platformSlug={platform.slug}
            source="fiche-sticky"
            variant="button-primary"
            size="md"
            fullWidth
          >
            {ctaLabel} · {platform.name}
            <ExternalLink size={16} />
          </AffiliateLink>
        </div>
      </div>
    </>
  );
}
