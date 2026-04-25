import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Euro, Info } from "lucide-react";
import { platforms } from "@/lib/platforms";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { TarifsClient } from "@/components/tarifs/tarifs-client";

export const metadata: Metadata = {
  title: "Tarifs CRM 2026 : comparatif des prix de tous les logiciels CRM",
  description:
    "Découvrez les tarifs 2026 des 24 principaux logiciels CRM : HubSpot, Salesforce, Pipedrive, Sellsy, Zoho, Axonaut et plus. Plans gratuits, essais, prix par utilisateur.",
  alternates: { canonical: `${SITE_URL}/tarifs` },
  openGraph: {
    title: `Tarifs CRM 2026 | ${SITE_NAME}`,
    description:
      "Comparatif des prix des logiciels CRM en France. Plans gratuits, essais, et tarifs à partir de.",
    url: `${SITE_URL}/tarifs`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs CRM 2026",
    description:
      "Comparez les prix de 24 logiciels CRM. Plans gratuits, essais, tarifs au mois.",
  },
};

export default function TarifsPage() {
  const countFree = platforms.filter((p) => p.pricing.hasFreePlan).length;
  const countTrial = platforms.filter((p) => p.pricing.hasFreeTrial).length;
  const cheapest = [...platforms]
    .filter(
      (p) => !p.pricing.onQuote && !p.pricing.hasFreePlan && p.pricing.startsAt > 0,
    )
    .sort((a, b) => a.pricing.startsAt - b.pricing.startsAt)[0];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Tarifs", href: "/tarifs" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Tarifs CRM 2026",
          description:
            "Comparatif des prix de 24 logiciels CRM disponibles en France",
          url: `${SITE_URL}/tarifs`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: platforms.length,
            itemListElement: platforms.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Product",
                name: p.name,
                url: `${SITE_URL}/crm/${p.slug}`,
                offers: {
                  "@type": "Offer",
                  price: p.pricing.startsAt || 0,
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                },
              },
            })),
          },
        }}
      />

      <PageHero
        eyebrow="Édition 2026"
        eyebrowIcon={Euro}
        title="Tarifs CRM : comparez les prix de tous les logiciels"
        highlight="comparez les prix"
        subtitle="Prix d'entrée, plans gratuits, essais : trouvez le CRM qui correspond à votre budget. Tarifs publics mis à jour en 2026."
      />

      <div className="bg-[#fafaff] pb-20">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">Tarifs</li>
            </ol>
          </nav>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <div className="text-3xl font-bold text-slate-900">
                {platforms.length}
              </div>
              <div className="text-sm text-slate-500 mt-1">CRM analysés</div>
            </div>
            <div className="bg-white rounded-xl border border-emerald-100 p-5 text-center">
              <div className="text-3xl font-bold text-emerald-700">
                {countFree}
              </div>
              <div className="text-sm text-slate-500 mt-1">Plans gratuits</div>
            </div>
            <div className="bg-white rounded-xl border border-violet-100 p-5 text-center">
              <div className="text-3xl font-bold text-violet-700">
                {countTrial}
              </div>
              <div className="text-sm text-slate-500 mt-1">Essais gratuits</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <div className="text-3xl font-bold text-slate-900">
                {cheapest ? `${cheapest.pricing.startsAt}€` : "—"}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Payant le moins cher
              </div>
            </div>
          </div>

          {/* Interactive table */}
          <TarifsClient platforms={platforms} />

          {/* Methodology note */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="flex items-start gap-3 mb-4">
              <Info className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
              <h2 className="text-xl font-bold text-slate-900">
                Comment lire ces tarifs ?
              </h2>
            </div>
            <div className="space-y-3 text-slate-700 leading-relaxed">
              <p>
                Les prix affichés correspondent au <strong>palier d&apos;entrée</strong>{" "}
                de chaque éditeur, exprimé par utilisateur et par mois (sauf
                mention contraire). Ils sont relevés sur les sites officiels des
                éditeurs en avril 2026 et peuvent varier en fonction des
                engagements annuels, devises et options retenues.
              </p>
              <p>
                <strong>Plan gratuit</strong> signifie qu&apos;un plan permanent
                sans paiement existe (souvent avec des limites sur le nombre de
                contacts ou d&apos;utilisateurs). <strong>Essai gratuit</strong>{" "}
                signifie une période d&apos;évaluation limitée (généralement 14
                à 30 jours) sans engagement.
              </p>
              <p className="text-sm text-slate-500">
                Les CTAs &quot;Essayer gratuitement&quot; et &quot;Demander un
                devis&quot; sont des liens affiliés. Nous pouvons percevoir une
                commission si vous souscrivez, sans surcoût pour vous — cela
                n&apos;affecte ni notre classement ni nos notes.
              </p>
            </div>
          </div>

          {/* Cross-link CTAs */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/comparateur"
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Comparateur complet
              </h3>
              <p className="text-sm text-slate-600">
                Filtrage avancé par taille, secteur, fonctionnalités.
              </p>
            </Link>
            <Link
              href="/quiz"
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Quiz en 2 minutes
              </h3>
              <p className="text-sm text-slate-600">
                8 questions, 3 CRM recommandés pour votre profil.
              </p>
            </Link>
            <Link
              href="/blog/meilleur-crm-gratuit-2026"
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Meilleur CRM gratuit
              </h3>
              <p className="text-sm text-slate-600">
                Notre sélection des 8 meilleures solutions gratuites.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
