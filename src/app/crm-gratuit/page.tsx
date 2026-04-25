import type { Metadata } from "next";
import { Gift, Infinity as InfinityIcon, Zap } from "lucide-react";
import { platforms } from "@/lib/platforms";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { SegmentHub } from "@/components/segment/segment-hub";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Meilleur CRM gratuit 2026 : Top des logiciels CRM 100% sans payer",
  description:
    "Comparatif des meilleurs CRM gratuits en 2026 : HubSpot, Brevo, Zoho, Freshsales, Folk, Agile CRM. Plans gratuits permanents, fonctionnalités, limites, alternatives.",
  alternates: { canonical: `${SITE_URL}/crm-gratuit` },
  openGraph: {
    title: `Meilleur CRM gratuit 2026 | ${SITE_NAME}`,
    description:
      "Top des CRM avec plan gratuit permanent en 2026.",
    url: `${SITE_URL}/crm-gratuit`,
    type: "website",
  },
};

export default function CrmGratuitPage() {
  const freePlatforms = platforms
    .filter((p) => p.pricing.hasFreePlan)
    .sort((a, b) => b.scores.overall - a.scores.overall);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "CRM Gratuit", href: "/crm-gratuit" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Meilleurs CRM gratuits 2026",
          description:
            "Classement des CRM avec plan gratuit permanent disponibles en France en 2026.",
          numberOfItems: freePlatforms.length,
          itemListElement: freePlatforms.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "SoftwareApplication",
              name: p.name,
              url: `${SITE_URL}/crm/${p.slug}`,
              applicationCategory: "BusinessApplication",
              offers: {
                "@type": "Offer",
                price: 0,
                priceCurrency: "EUR",
              },
            },
          })),
        }}
      />

      <SegmentHub
        segmentLabel="Gratuit"
        segmentIcon={Gift}
        breadcrumbName="CRM Gratuit"
        breadcrumbHref="/crm-gratuit"
        pageTitle="Les 6 meilleurs CRM gratuits en 2026"
        highlight="CRM gratuits"
        intro="Plans gratuits permanents, sans carte bancaire, utilisables en production. Notre sélection des CRM qui ne facturent rien et restent puissants."
        prosCards={[
          {
            icon: <Gift size={24} />,
            title: "100% sans payer",
            text: "Aucun plan gratuit limité dans le temps. Vous pouvez utiliser ces CRM aussi longtemps que vous voulez sans débourser un centime.",
          },
          {
            icon: <InfinityIcon size={24} />,
            title: "Limites raisonnables",
            text: "Contacts illimités chez HubSpot, 3 utilisateurs gratuits chez Zoho, 300 emails/jour chez Brevo. Suffisant pour 80% des TPE.",
          },
          {
            icon: <Zap size={24} />,
            title: "Migration possible",
            text: "Si vous dépassez les limites, vous gardez vos données et basculez sur le plan payant en un clic. Pas de migration douloureuse.",
          },
        ]}
        platforms={freePlatforms}
        longProse={
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Pourquoi commencer avec un CRM gratuit ?
            </h2>
            <p>
              Trois bonnes raisons d&apos;adopter un CRM gratuit en 2026. La
              première, évidente, est financière : vous économisez 200 à 1000 € par
              an pour une équipe de 1 à 5 personnes. La deuxième est plus
              stratégique : un CRM gratuit force la simplicité et l&apos;adoption.
              60 % des projets CRM payants échouent par sous-utilisation. Démarrer
              gratuit oblige à se concentrer sur l&apos;essentiel.
            </p>
            <p>
              La troisième raison est la flexibilité : si l&apos;outil ne vous
              convient pas, vous arrêtez sans coût ni dette. Vous testez plusieurs
              solutions sans engagement, vous retenez celle qui convient à votre
              équipe.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Les pièges des plans gratuits
            </h2>
            <p>
              Tous les plans gratuits ne se valent pas. Premier piège : la limite
              cachée. Un CRM &quot;illimité en contacts&quot; peut limiter le
              stockage de pièces jointes, les automatisations, ou bloquer les
              exports. Lisez les petites lignes.
            </p>
            <p>
              Deuxième piège : la dépendance progressive. Si vous remplissez la
              base sur 2 ans avec 10 000 contacts et que le palier payant pour les
              dépasser coûte 500 €/mois, vous êtes captif. Vérifiez le tarif des
              paliers supérieurs avant de vous engager.
            </p>
            <p>
              Troisième piège : l&apos;upsell agressif. Certains éditeurs vous
              spamment avec des notifications &quot;passez en Pro&quot; jusqu&apos;à
              rendre l&apos;outil pénible. Préférez les éditeurs (HubSpot, Brevo)
              dont le plan gratuit reste vraiment utilisable.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Notre recommandation
            </h2>
            <p>
              Pour <strong>95 % des cas</strong>, HubSpot CRM gratuit reste le
              meilleur choix : contacts et utilisateurs illimités, fonctionnalités
              riches, montée en gamme propre. Pour les{" "}
              <strong>e-commerçants français</strong>, Brevo est imbattable grâce à
              sa délivrabilité email et son SMS natif. Pour les{" "}
              <strong>petites équipes B2B</strong> qui veulent toute une suite
              gratuite, Zoho CRM (3 utilisateurs) reste pertinent.
            </p>
          </div>
        }
      />
    </>
  );
}
