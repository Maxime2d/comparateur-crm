import type { Metadata } from "next";
import { User, Calendar, FileCheck } from "lucide-react";
import { platforms } from "@/lib/platforms";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { SegmentHub } from "@/components/segment/segment-hub";

export const metadata: Metadata = {
  title: "Meilleur CRM pour freelance 2026 : Top des outils pour indépendants",
  description:
    "Comparatif des meilleurs CRM pour freelances et indépendants en 2026 : Folk, Axonaut, HubSpot, Brevo, noCRM. Choix selon votre métier (consultant, créatif, dev).",
  alternates: { canonical: `${SITE_URL}/crm-freelance` },
  openGraph: {
    title: `Meilleur CRM pour freelance | ${SITE_NAME}`,
    description: "Top des CRM adaptés aux freelances et indépendants.",
    url: `${SITE_URL}/crm-freelance`,
    type: "website",
  },
};

export default function CrmFreelancePage() {
  const freelanceSlugs = [
    "folk",
    "axonaut",
    "hubspot-crm",
    "brevo",
    "nocrm",
    "pipedrive",
    "karlia",
  ];
  const freelancePlatforms = freelanceSlugs
    .map((slug) => platforms.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .sort((a, b) => b.scores.overall - a.scores.overall);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "CRM Freelance", href: "/crm-freelance" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Meilleurs CRM pour freelance 2026",
          numberOfItems: freelancePlatforms.length,
          itemListElement: freelancePlatforms.map((p, i) => ({
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
        segmentLabel="Pour freelances & indépendants"
        breadcrumbName="CRM Freelance"
        breadcrumbHref="/crm-freelance"
        pageTitle={`Top ${freelancePlatforms.length} CRM pour freelances en 2026`}
        intro="Notre sélection des CRM pensés pour les freelances et indépendants : focus sur la relation longue, gestion de devis et facturation française, application mobile."
        prosCards={[
          {
            icon: <User size={24} />,
            title: "Pour 1 personne",
            text: "Tarification adaptée au mono-utilisateur. Pas de minimum de 3 ou 5 utilisateurs. Plans gratuits ou abordables (moins de 30 €/mois).",
          },
          {
            icon: <Calendar size={24} />,
            title: "Relation longue",
            text: "Le freelance vit des clients récurrents. Le CRM doit valoriser l'historique, les anniversaires de mission, les recommandations. Plus relationnel que transactionnel.",
          },
          {
            icon: <FileCheck size={24} />,
            title: "Devis et facturation",
            text: "Gestion native de la TVA française et des mentions auto-entrepreneur. Factur-X compatible pour préparer la réforme de la facturation électronique.",
          },
        ]}
        platforms={freelancePlatforms}
        longProse={
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Les besoins spécifiques d&apos;un freelance
            </h2>
            <p>
              Un freelance n&apos;a pas besoin d&apos;un pipeline visuel à 5 stades
              comme un commercial B2B. Son besoin est différent :{" "}
              <strong>maintenir une relation chaude</strong> avec un cercle de 50 à
              200 contacts récurrents (clients, prescripteurs, partenaires). Le bon
              CRM est celui qui aide à se rappeler de prendre des nouvelles d&apos;un
              client après 3 mois de silence, ou à célébrer l&apos;anniversaire
              d&apos;une mission.
            </p>
            <p>
              C&apos;est pourquoi des outils comme <strong>Folk</strong>, conçus
              pour la &quot;relation longue&quot; plutôt que le pipeline classique,
              sont particulièrement adaptés aux freelances. L&apos;interface
              ressemble à un mélange entre LinkedIn et Notion : on enrichit
              progressivement chaque contact avec des notes, des tags, des
              événements.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              CRM ou tout-en-un avec facturation ?
            </h2>
            <p>
              Le freelance français a un autre besoin clé : <strong>facturer
              proprement</strong>. Avec la réforme de la facturation électronique
              qui s&apos;impose aux TPE en septembre 2027, le CRM doit générer des
              factures conformes au format Factur-X.
            </p>
            <p>
              Deux écoles. <strong>Tout-en-un</strong> : Axonaut (24,99
              €/mois) gère CRM + devis + facturation + suivi des règlements dans
              une seule plateforme. Idéal pour les freelances qui veulent tout
              centraliser. <strong>Best of breed</strong> : Folk pour le
              relationnel + Pennylane ou Sellsy facturation séparé. Plus
              sophistiqué mais plus cher au total.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Notre recommandation par profil
            </h2>
            <p>
              <strong>Consultant ou coach</strong> : Folk gratuit (200 contacts) ou
              Premium (19 €/mois). Idéal pour le relationnel et le réseau.
            </p>
            <p>
              <strong>Freelance créatif (designer, dev, rédacteur)</strong> :
              Axonaut. Le tout-en-un fait gagner 2-3h/semaine de paperasse.
            </p>
            <p>
              <strong>Freelance B2B avec prospection active</strong> : noCRM.io ou
              Pipedrive. Pipeline simple pour ne rien oublier.
            </p>
            <p>
              <strong>Freelance avec emailing à sa communauté</strong> : Brevo
              gratuit. CRM + 300 emails/jour gratuits.
            </p>
          </div>
        }
      />
    </>
  );
}
