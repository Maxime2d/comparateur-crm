import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Infinity as InfinityIcon, Zap } from "lucide-react";
import { platforms } from "@/lib/platforms";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { SegmentHub } from "@/components/segment/segment-hub";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "CRM Gratuit 2026 : Top 6 Plans Gratuits Permanents (Sans CB)",
  description:
    "Comparatif des 6 meilleurs CRM gratuits en 2026 (HubSpot, Brevo, Zoho…). Plans gratuits à vie, sans carte bancaire. Contacts illimités, limites réelles, notre verdict pour les TPE/PME.",
  alternates: { canonical: `${SITE_URL}/crm-gratuit` },
  openGraph: {
    title: `CRM Gratuit 2026 : Top 6 Plans Gratuits Permanents | ${SITE_NAME}`,
    description:
      "Comparatif des meilleurs CRM avec plan gratuit permanent en 2026. Contacts illimités, sans engagement, sans CB.",
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

      <FAQJsonLd
        faqs={[
          {
            question: "Un CRM gratuit est-il vraiment gratuit à vie ?",
            answer: "Oui, les CRM de notre sélection (HubSpot, Brevo, Zoho…) proposent des plans gratuits permanents, sans limite de durée et sans carte bancaire requise. Les limites portent sur le nombre de fonctionnalités ou d'utilisateurs, pas sur la durée.",
          },
          {
            question: "Quel est le meilleur CRM gratuit pour une TPE en 2026 ?",
            answer: "HubSpot CRM gratuit est le plus complet : contacts et utilisateurs illimités, pipeline de vente, formulaires, emails. Pour les e-commerçants, Brevo offre en plus l'email marketing et le SMS natif gratuitement.",
          },
          {
            question: "Peut-on migrer d'un CRM gratuit vers un CRM payant facilement ?",
            answer: "Oui. Les CRM de notre sélection permettent de passer au plan payant en un clic, sans perdre vos données. HubSpot, Zoho et Brevo proposent tous une montée en gamme progressive avec vos données intactes.",
          },
          {
            question: "Combien de contacts peut-on gérer avec un CRM gratuit ?",
            answer: "Cela varie : HubSpot permet des contacts illimités sur son plan gratuit, Zoho CRM gratuit accepte jusqu'à 5 000 contacts pour 3 utilisateurs, et Brevo gère des contacts illimités avec une limite de 300 emails/jour.",
          },
        ]}
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
              Questions fréquentes sur les CRM gratuits
            </h2>
            <details className="group border border-slate-200 rounded-lg p-4 mb-3">
              <summary className="font-semibold text-slate-900 cursor-pointer">Un CRM gratuit est-il vraiment gratuit à vie ?</summary>
              <p className="mt-2">Oui, les CRM de notre sélection (HubSpot, Brevo, Zoho…) proposent des plans gratuits permanents, sans limite de durée et sans carte bancaire requise. Les limites portent sur le nombre de fonctionnalités ou d&apos;utilisateurs, pas sur la durée.</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 mb-3">
              <summary className="font-semibold text-slate-900 cursor-pointer">Quel est le meilleur CRM gratuit pour une TPE en 2026 ?</summary>
              <p className="mt-2">HubSpot CRM gratuit est le plus complet : contacts et utilisateurs illimités, pipeline de vente, formulaires, emails. Pour les e-commerçants, Brevo offre en plus l&apos;email marketing et le SMS natif gratuitement.</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 mb-3">
              <summary className="font-semibold text-slate-900 cursor-pointer">Peut-on migrer facilement vers un plan payant ?</summary>
              <p className="mt-2">Oui. Les CRM de notre sélection permettent de passer au plan payant en un clic, sans perdre vos données. HubSpot, Zoho et Brevo proposent tous une montée en gamme progressive avec vos données intactes.</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 mb-3">
              <summary className="font-semibold text-slate-900 cursor-pointer">Combien de contacts peut-on gérer gratuitement ?</summary>
              <p className="mt-2">Cela varie : HubSpot permet des contacts illimités, Zoho CRM gratuit accepte jusqu&apos;à 5 000 contacts pour 3 utilisateurs, et Brevo gère des contacts illimités avec une limite de 300 emails/jour.</p>
            </details>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Notre recommandation
            </h2>
            <p>
              Pour <strong>95 % des cas</strong>, <Link href="/crm/hubspot-crm" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">HubSpot CRM gratuit</Link> reste le
              meilleur choix : contacts et utilisateurs illimités, fonctionnalités
              riches, montée en gamme propre. Pour les{" "}
              <strong>e-commerçants français</strong>, <Link href="/crm/brevo" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">Brevo</Link> est imbattable grâce à
              sa délivrabilité email et son SMS natif. Pour les{" "}
              <strong>petites équipes B2B</strong> qui veulent toute une suite
              gratuite, <Link href="/crm/zoho-crm" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">Zoho CRM</Link> (3 utilisateurs) reste pertinent.
            </p>
            <p>
              Si vous avez des compétences techniques et que vous souhaitez héberger
              vos données vous-même, consultez notre guide des{" "}
              <Link href="/crm-open-source" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">CRM open source</Link>.
              Et si vous êtes une startup en forte croissance, notre sélection{" "}
              <Link href="/crm-startup" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">CRM pour startup</Link>{" "}
              vous aidera à trouver l&apos;outil qui scale avec votre équipe.
            </p>
          </div>
        }
      />
    </>
  );
}
