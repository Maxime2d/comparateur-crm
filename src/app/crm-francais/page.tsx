import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Flag, MapPin, Shield, Euro } from "lucide-react";
import { platforms } from "@/lib/platforms";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { formatPrice, getCtaLabel } from "@/lib/utils";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Meilleur CRM français 2026 : Top 8 des logiciels CRM made in France",
  description:
    "Comparatif des meilleurs CRM français en 2026 : Sellsy, Axonaut, Brevo, Karlia, Teamleader, Youday, Initiative CRM, Divalto. Hébergement UE, support FR, conformité RGPD garantie.",
  alternates: { canonical: `${SITE_URL}/crm-francais` },
  openGraph: {
    title: `Meilleur CRM français 2026 | ${SITE_NAME}`,
    description:
      "Top 8 des logiciels CRM français : tarifs, hébergement UE, support en français, conformité RGPD.",
    url: `${SITE_URL}/crm-francais`,
    type: "website",
  },
};

export default function CrmFrancaisPage() {
  // Filter platforms with French badge
  const frenchPlatforms = platforms
    .filter((p) =>
      p.badges.some((b) =>
        ["Français", "France", "🇫🇷", "Made in France"].some((needle) =>
          b.includes(needle),
        ),
      ),
    )
    .sort((a, b) => b.scores.overall - a.scores.overall);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "CRM Français", href: "/crm-francais" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Meilleurs logiciels CRM français 2026",
          description:
            "Classement des meilleurs CRM français en 2026 par notre équipe éditoriale indépendante.",
          numberOfItems: frenchPlatforms.length,
          itemListElement: frenchPlatforms.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "SoftwareApplication",
              name: p.name,
              url: `${SITE_URL}/crm/${p.slug}`,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: p.pricing.startsAt || 0,
                priceCurrency: "EUR",
              },
            },
          })),
        }}
      />

      <PageHero
        eyebrow="Made in France"
        eyebrowIcon={Flag}
        title="Les meilleur CRM français"
        highlight="CRM français"
        subtitle="Hébergement en Union Européenne, support en français, équipes basées en France, conformité RGPD native. Notre sélection des logiciels CRM vraiment made in France."
      />

      <div className="bg-[#fafaff] pb-20">
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">CRM Français</li>
            </ol>
          </nav>

          {/* Pourquoi choisir un CRM français */}
          <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <MapPin className="text-violet-600 mb-3" size={24} />
              <h3 className="font-semibold text-slate-900 mb-2">
                Hébergement UE
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Données stockées sur des serveurs situés en France ou en Union
                Européenne. Conformité RGPD simplifiée, pas de transfert hors UE.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <Shield className="text-violet-600 mb-3" size={24} />
              <h3 className="font-semibold text-slate-900 mb-2">
                Conformité RGPD native
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                DPA fourni par défaut, droits d&apos;accès et de suppression
                respectés. Pas de Standard Contractual Clauses pour exporter vos
                données.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <Euro className="text-violet-600 mb-3" size={24} />
              <h3 className="font-semibold text-slate-900 mb-2">
                Adapté au marché FR
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Gestion native de la TVA française, intégration Factur-X, support en
                français basé en France, formation par des partenaires locaux.
              </p>
            </div>
          </section>

          {/* Liste */}
          <section className="space-y-4 mb-12">
            {frenchPlatforms.map((p, i) => (
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

          {/* Pourquoi nos lecteurs préfèrent les CRM français */}
          <section className="mb-12 bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Pourquoi choisir un CRM français en 2026 ?
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Le marché du CRM est dominé en volume par des éditeurs américains
                (Salesforce, HubSpot, Pipedrive, Microsoft Dynamics). Pourtant, en
                2026, de plus en plus de PME françaises choisissent un éditeur
                français. Trois raisons principales.
              </p>
              <p>
                <strong>La souveraineté des données</strong> est devenue un sujet
                stratégique. Avec un CRM français, vos données restent sur des
                serveurs situés en France ou en UE. Pas de Cloud Act américain qui
                s&apos;applique. Pas de Standard Contractual Clauses à signer pour
                un export hors UE. La conformité RGPD est intégrée par construction.
              </p>
              <p>
                <strong>L&apos;adaptation au marché français</strong> est un
                avantage concret. Sellsy gère nativement la TVA française avec ses
                taux réduits. Axonaut intègre la facture électronique au format
                Factur-X comme demandé par la réforme. Les CRM américains
                n&apos;intègrent ces fonctions qu&apos;avec retard, voire jamais.
                Pour la facturation conforme,{" "}
                <a
                  href="https://comparateur-efacturation.fr"
                  target="_blank"
                  rel="noopener"
                  className="text-violet-600 hover:text-violet-700 underline underline-offset-2"
                >
                  notre comparateur dédié aux plateformes DGFiP
                </a>{" "}
                détaille les options compatibles.
              </p>
              <p>
                <strong>Le support en français</strong> change tout au quotidien.
                Avec un éditeur basé à Paris, Lille ou Toulouse, vous parlez à des
                conseillers qui comprennent les spécificités fiscales et RH
                françaises. La formation est dispensée par des partenaires locaux.
                La documentation est rédigée en français natif, pas traduite
                approximativement.
              </p>
            </div>
          </section>

          {/* Cross-link */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/comparateur"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Tous les CRM
              </h3>
              <p className="text-sm text-slate-600">
                Comparateur complet : 24 logiciels, filtres avancés.
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
                Recommandation personnalisée en 2 minutes.
              </p>
            </Link>
            <Link
              href="/blog/comment-choisir-crm"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Comment choisir
              </h3>
              <p className="text-sm text-slate-600">Méthode complète en 8 étapes.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
