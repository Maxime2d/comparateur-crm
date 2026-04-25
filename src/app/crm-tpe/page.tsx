import type { Metadata } from "next";
import { Briefcase, Coins, Settings, Store } from "lucide-react";
import { platforms } from "@/lib/platforms";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { SegmentHub } from "@/components/segment/segment-hub";

export const metadata: Metadata = {
  title: "Meilleur CRM pour TPE 2026 : Top des logiciels pour petites entreprises",
  description:
    "Comparatif des meilleurs CRM pour TPE et petites entreprises (1-10 salariés) en 2026 : Axonaut, Sellsy, HubSpot, Pipedrive. Choix adapté à votre taille et budget.",
  alternates: { canonical: `${SITE_URL}/crm-tpe` },
  openGraph: {
    title: `Meilleur CRM pour TPE | ${SITE_NAME}`,
    description: "Top des CRM pensés pour les TPE françaises de 1 à 10 salariés.",
    url: `${SITE_URL}/crm-tpe`,
    type: "website",
  },
};

export default function CrmTpePage() {
  // TPE = supports TPE size + reasonable price
  const tpePlatforms = platforms
    .filter(
      (p) =>
        p.target.sizes.includes("TPE") &&
        (!p.pricing.onQuote && p.pricing.startsAt < 50),
    )
    .sort((a, b) => b.scores.overall - a.scores.overall)
    .slice(0, 8);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "CRM TPE", href: "/crm-tpe" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Meilleurs CRM pour TPE 2026",
          numberOfItems: tpePlatforms.length,
          itemListElement: tpePlatforms.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "SoftwareApplication",
              name: p.name,
              url: `${SITE_URL}/crm/${p.slug}`,
              applicationCategory: "BusinessApplication",
            },
          })),
        }}
      />

      <SegmentHub
        segmentLabel="TPE"
        segmentIcon={Store}
        breadcrumbName="CRM TPE"
        breadcrumbHref="/crm-tpe"
        pageTitle="Top 8 CRM pour TPE et petites entreprises en 2026"
        highlight="TPE"
        intro="Notre sélection des CRM adaptés aux TPE françaises de 1 à 10 salariés : simples, abordables, opérationnels en 2 semaines, avec support en français."
        prosCards={[
          {
            icon: <Briefcase size={24} />,
            title: "Adapté aux TPE",
            text: "Outils conçus pour des structures de 1 à 10 salariés. Pas de surcharge fonctionnelle, focus sur l'essentiel : pipeline, devis, facturation.",
          },
          {
            icon: <Coins size={24} />,
            title: "Budget maîtrisé",
            text: "Tarifs sous 50€/utilisateur/mois. Plans gratuits ou essais disponibles pour valider avant d'investir. Pas de frais cachés de paramétrage initial.",
          },
          {
            icon: <Settings size={24} />,
            title: "Déploiement rapide",
            text: "Mise en service en 1 à 2 semaines, sans intégrateur. Documentation en français, formation auto-suffisante via tutoriels et académies.",
          },
        ]}
        platforms={tpePlatforms}
        longProse={
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Comment choisir son CRM quand on est TPE
            </h2>
            <p>
              Une TPE n&apos;a pas les mêmes besoins qu&apos;une PME ou un grand
              groupe. Le CRM doit être <strong>simple à utiliser sans
              formation</strong>, <strong>abordable</strong> (moins de 30
              €/utilisateur/mois idéalement), et <strong>polyvalent</strong> (CRM +
              facturation idéalement, pour éviter d&apos;empiler les outils).
            </p>
            <p>
              Les solutions tout-en-un françaises comme Axonaut ou Sellsy sont
              particulièrement adaptées : un seul abonnement couvre la prospection,
              les devis, la facturation et le suivi des paiements. Le coût total est
              inférieur à l&apos;empilement d&apos;outils séparés (CRM + Pennylane
              + Aircall + etc.).
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Les besoins-clés d&apos;une TPE
            </h2>
            <p>
              <strong>Pipeline visuel simple</strong> pour suivre les affaires en
              cours. Pas besoin de scoring prédictif, pas besoin
              d&apos;automations complexes au démarrage.
            </p>
            <p>
              <strong>Génération de devis et factures conformes</strong>. La TVA
              française doit être gérée nativement, ainsi que la facturation
              électronique pour préparer la réforme de septembre 2027 qui
              s&apos;applique aux TPE/PME.
            </p>
            <p>
              <strong>Application mobile</strong> robuste. Un dirigeant TPE est
              rarement à son bureau. Il a besoin d&apos;ajouter un contact, voir
              une fiche client ou prendre une note depuis son téléphone.
            </p>
            <p>
              <strong>Support en français</strong>. En TPE, on n&apos;a pas
              d&apos;équipe IT pour résoudre les problèmes techniques. Un support
              accessible et compréhensible est essentiel.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Notre recommandation
            </h2>
            <p>
              Pour la <strong>majorité des TPE françaises</strong>, Axonaut reste le
              meilleur compromis : tout-en-un, abordable, support FR. Pour les{" "}
              <strong>TPE qui ont déjà un comptable</strong> et veulent juste un
              CRM, Pipedrive ou HubSpot gratuit suffisent. Pour les{" "}
              <strong>indépendants relationnels</strong> (consultants, freelances),
              Folk ou Brevo sont parfaits.
            </p>
          </div>
        }
      />
    </>
  );
}
