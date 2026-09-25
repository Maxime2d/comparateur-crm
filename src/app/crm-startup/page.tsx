import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, TrendingUp, Code } from "lucide-react";
import { platforms } from "@/lib/platforms";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { SegmentHub } from "@/components/segment/segment-hub";

export const metadata: Metadata = {
  title: "CRM Startup 2026 : Top 7 par Phase de Croissance (Seed → Series C)",
  description:
    "Quel CRM pour votre startup en 2026 ? Comparatif de 7 outils (HubSpot, Pipedrive, Folk, Close…) classés par stade : pré-seed, seed, Series A-C. Tarifs, intégrations, scalabilité.",
  alternates: { canonical: `${SITE_URL}/crm-startup` },
  openGraph: {
    title: `CRM Startup 2026 : Top 7 Outils par Phase de Croissance | ${SITE_NAME}`,
    description: "Comparatif des meilleurs CRM pour startups en 2026, classés par stade de croissance.",
    url: `${SITE_URL}/crm-startup`,
    type: "website",
  },
};

export default function CrmStartupPage() {
  // Startup-friendly: free or low-cost, modern UX, scales with growth
  const startupSlugs = [
    "hubspot-crm",
    "pipedrive",
    "folk",
    "freshsales",
    "close",
    "brevo",
    "sellsy",
  ];
  const startupPlatforms = startupSlugs
    .map((slug) => platforms.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .sort((a, b) => b.scores.overall - a.scores.overall);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "CRM Startup", href: "/crm-startup" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Meilleurs CRM pour startup 2026",
          numberOfItems: startupPlatforms.length,
          itemListElement: startupPlatforms.map((p, i) => ({
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

      <FAQJsonLd
        faqs={[
          {
            question: "Faut-il un CRM dès la création de sa startup ?",
            answer: "Oui, dès que vous avez plus de 10 prospects à suivre. Un CRM gratuit comme HubSpot ne coûte rien et évite de perdre des leads dans un tableur. Attendre 6 mois crée une dette de données difficile à rattraper.",
          },
          {
            question: "Quel CRM gratuit choisir pour une startup en early-stage ?",
            answer: "HubSpot CRM gratuit est le choix par défaut : contacts illimités, pipeline visuel, intégrations Gmail/Outlook. Folk est une alternative appréciée des startups françaises pour sa légèreté et son enrichissement de contacts automatique.",
          },
          {
            question: "Quand faut-il passer d'un CRM gratuit à un CRM payant ?",
            answer: "Dès que votre équipe commerciale dépasse 3-5 personnes ou que vous avez besoin d'automatisations (séquences email, scoring, workflows). En général, au stade Series A, le ROI d'un CRM payant (15-50 €/utilisateur/mois) est largement positif.",
          },
          {
            question: "HubSpot ou Pipedrive pour une startup ?",
            answer: "HubSpot si votre stratégie est inbound (contenu, SEO, formulaires) : l'écosystème marketing gratuit est imbattable. Pipedrive si vous faites de l'outbound (cold call, prospection active) : l'interface pipeline-first est plus efficace pour les SDR.",
          },
        ]}
      />

      <SegmentHub
        segmentLabel="Startup"
        segmentIcon={Rocket}
        breadcrumbName="CRM Startup"
        breadcrumbHref="/crm-startup"
        pageTitle="Top 7 CRM pour startups en 2026"
        highlight="startups"
        intro="Sélection des CRM adaptés aux startups : modernes, scalables, abordables au démarrage, capables d'accompagner votre croissance jusqu'à 100+ utilisateurs."
        prosCards={[
          {
            icon: <Rocket size={24} />,
            title: "Démarrage immédiat",
            text: "Plans gratuits ou essais sans CB. Onboarding en moins d'une journée. Vous n'avez ni le temps ni le budget pour un projet de 6 mois.",
          },
          {
            icon: <TrendingUp size={24} />,
            title: "Scale avec vous",
            text: "Outils qui passent de 1 à 100 utilisateurs sans changer de plateforme. Données préservées, paliers tarifaires lisibles, montée en gamme propre.",
          },
          {
            icon: <Code size={24} />,
            title: "API et intégrations",
            text: "Webhook natifs, API REST documentée, intégrations Zapier/Make. Pour brancher votre produit, votre billing Stripe, votre data warehouse.",
          },
        ]}
        platforms={startupPlatforms}
        longProse={
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Comment choisir son CRM par stade de startup
            </h2>
            <p>
              <strong>Pre-seed à Seed (1-10 personnes)</strong> : <Link href="/crm/hubspot-crm" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">HubSpot CRM
              gratuit</Link>. Suffisant, gratuit, contacts illimités. Pas de raison de
              payer à ce stade.
            </p>
            <p>
              <strong>Series A (10-30 personnes)</strong> : HubSpot Sales Hub
              Starter (15 €/u) ou <Link href="/crm/pipedrive" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">Pipedrive</Link> Advanced (32 €/u). Choix selon votre
              culture : HubSpot pour inbound, Pipedrive pour outbound.
            </p>
            <p>
              <strong>Series B-C (30-100 personnes)</strong> : HubSpot Sales Hub
              Pro ou Salesforce Pro Suite. Investissement dans les workflows et la
              personnalisation.
            </p>
            <p>
              <strong>Series D+ (100+ personnes)</strong> : Salesforce Enterprise
              ou HubSpot Enterprise. Personnalisation massive, intégrations
              entreprise, hiérarchies complexes.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Questions fréquentes sur les CRM pour startups
            </h2>
            <details className="group border border-slate-200 rounded-lg p-4 mb-3">
              <summary className="font-semibold text-slate-900 cursor-pointer">Faut-il un CRM dès la création de sa startup ?</summary>
              <p className="mt-2">Oui, dès que vous avez plus de 10 prospects à suivre. Un CRM gratuit comme HubSpot ne coûte rien et évite de perdre des leads dans un tableur. Attendre 6 mois crée une dette de données difficile à rattraper.</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 mb-3">
              <summary className="font-semibold text-slate-900 cursor-pointer">Quel CRM gratuit pour une startup en early-stage ?</summary>
              <p className="mt-2">HubSpot CRM gratuit est le choix par défaut : contacts illimités, pipeline visuel, intégrations Gmail/Outlook. Folk est une alternative appréciée des startups françaises pour sa légèreté et son enrichissement de contacts automatique.</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 mb-3">
              <summary className="font-semibold text-slate-900 cursor-pointer">Quand passer d&apos;un CRM gratuit à un CRM payant ?</summary>
              <p className="mt-2">Dès que votre équipe commerciale dépasse 3-5 personnes ou que vous avez besoin d&apos;automatisations (séquences email, scoring, workflows). En général au stade Series A, le ROI d&apos;un CRM payant (15-50 €/utilisateur/mois) est largement positif.</p>
            </details>
            <details className="group border border-slate-200 rounded-lg p-4 mb-3">
              <summary className="font-semibold text-slate-900 cursor-pointer">HubSpot ou Pipedrive pour une startup ?</summary>
              <p className="mt-2">HubSpot si votre stratégie est inbound (contenu, SEO, formulaires) : l&apos;écosystème marketing gratuit est imbattable. Pipedrive si vous faites de l&apos;outbound (cold call, prospection active) : l&apos;interface pipeline-first est plus efficace pour les SDR.</p>
            </details>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Erreurs à éviter
            </h2>
            <p>
              <strong>Sur-équiper trop tôt</strong>. Salesforce avant 30 employés
              est un piège : vous payez pour de la complexité que vous
              n&apos;utilisez pas. La majorité des scale-ups françaises restent sur
              HubSpot ou Pipedrive jusqu&apos;à Series B/C.
            </p>
            <p>
              <strong>Sous-équiper trop longtemps</strong>. Rester sur un Trello
              ou un Excel quand l&apos;équipe commerciale dépasse 5 personnes coûte
              en visibilité et en deals oubliés. Le ROI d&apos;un CRM payant est
              généralement positif dès le 6e commercial.
            </p>
            <p>
              <strong>Choisir un outil que vos commerciaux ne veulent pas
              utiliser</strong>. L&apos;adoption est tout. Faites tester par les 2
              ou 3 commerciaux les plus expérimentés avant de décider. Un CRM
              imposé par le management est un CRM mort.
            </p>
            <p>
              Consultez aussi notre sélection de{" "}
              <Link href="/crm-gratuit" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">CRM gratuits</Link>{" "}
              pour démarrer sans budget, ou nos{" "}
              <Link href="/crm-open-source" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">CRM open source</Link>{" "}
              si vous avez une équipe technique et des contraintes de souveraineté.
            </p>
          </div>
        }
      />
    </>
  );
}
