import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "FAQ : tout savoir sur les logiciels CRM en 2026",
  description:
    "Réponses aux 12 questions les plus fréquentes sur les CRM : prix, fonctionnement, choix, gratuité, RGPD, intégration. Le guide complet pour démarrer.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: `FAQ Logiciels CRM | ${SITE_NAME}`,
    description:
      "Réponses aux questions les plus fréquentes sur les CRM en France.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

const faqs = [
  {
    question: "Qu'est-ce qu'un logiciel CRM ?",
    answer:
      "Un CRM (Customer Relationship Management, gestion de la relation client) est un logiciel qui centralise toutes les informations et interactions avec vos prospects et clients : coordonnées, historique des échanges, opportunités commerciales en cours, devis émis, tâches à faire. L'objectif est d'éviter la dispersion entre boîtes mail, tableurs et carnets, pour ne plus jamais perdre une affaire faute de relance.",
  },
  {
    question: "Quel est le prix moyen d'un logiciel CRM en 2026 ?",
    answer:
      "En 2026, le prix d'un CRM en France varie de 0 € (plans gratuits comme HubSpot ou Zoho) à 165 € par utilisateur et par mois (Salesforce Enterprise). La majorité des PME paient entre 15 € et 80 € par utilisateur et par mois selon leurs besoins. Comptez aussi 3 000 à 25 000 € de frais de paramétrage initial pour un déploiement structuré, et environ 2 à 4 heures de formation par utilisateur.",
  },
  {
    question: "Existe-t-il des CRM vraiment gratuits ?",
    answer:
      "Oui, plusieurs CRM proposent un plan gratuit utilisable en production sans limite de temps. HubSpot CRM est le plus généreux (contacts et utilisateurs illimités, pipeline complet). Zoho CRM permet jusqu'à 3 utilisateurs gratuitement. Brevo combine CRM gratuit et 300 emails par jour. Folk autorise 200 contacts gratuits. Voir notre comparatif détaillé des CRM gratuits pour les détails.",
  },
  {
    question: "Combien de temps faut-il pour déployer un CRM dans une PME ?",
    answer:
      "Un déploiement CRM standard dans une PME prend entre 4 et 12 semaines selon la complexité. Comptez 2 à 4 semaines de paramétrage et d'import des données existantes, 2 à 4 semaines de formation des équipes, et 4 à 8 semaines d'adoption progressive avec ajustements. Un CRM simple comme Pipedrive ou Axonaut peut être opérationnel en 2 semaines pour une équipe de moins de 10 commerciaux.",
  },
  {
    question: "Quel CRM choisir pour une TPE ou un freelance ?",
    answer:
      "Pour une TPE ou un freelance, privilégiez la simplicité et la gestion intégrée de la facturation. Axonaut (CRM + facturation française tout-en-un) reste le meilleur compromis pour les TPE. Pour les indépendants, Folk ou Pipedrive Essential sont excellents. Si le budget est nul, HubSpot CRM gratuit fait largement l'affaire pour démarrer.",
  },
  {
    question: "Quel CRM est conforme au RGPD ?",
    answer:
      "Tous les CRM majeurs (HubSpot, Salesforce, Pipedrive, Sellsy, Axonaut, Zoho, Microsoft Dynamics) sont conformes au RGPD. Les solutions françaises ou européennes (Sellsy, Axonaut, Teamleader, Brevo) ont l'avantage de l'hébergement UE par défaut, ce qui simplifie la conformité. Pour un CRM américain, vérifiez la signature du DPA (Data Processing Agreement) et le mécanisme de transfert des données vers les États-Unis (Standard Contractual Clauses).",
  },
  {
    question: "Comment intégrer un CRM à un logiciel de facturation ?",
    answer:
      "Trois approches existent. (1) Choisir un CRM qui intègre nativement la facturation (Sellsy, Axonaut, Teamleader). (2) Utiliser un CRM pur et le connecter à un logiciel de facturation séparé via API ou intégration native (HubSpot + Pennylane par exemple). (3) Passer par un connecteur Zapier/Make si l'intégration native n'existe pas. La solution 1 est la plus simple en TPE/PME française.",
  },
  {
    question: "Faut-il prendre un CRM cloud ou auto-hébergé ?",
    answer:
      "En 2026, 95 % des PME choisissent le cloud (SaaS). Avantages : pas de serveur à maintenir, mises à jour automatiques, accès multi-appareils, coût initial plus faible. Le CRM auto-hébergé (open-source ou éditeur installé sur vos serveurs) ne se justifie que pour des contraintes réglementaires fortes (santé, défense) ou des très grands comptes avec une DSI dédiée. Solutions auto-hébergeables : SuiteCRM, EspoCRM, Vtiger.",
  },
  {
    question: "Quelle est la différence entre un CRM et un ERP ?",
    answer:
      "Un CRM se concentre sur la relation client : prospection, vente, fidélisation. Un ERP couvre l'ensemble des processus de l'entreprise : achats, stocks, production, comptabilité, RH, ventes. Certains outils français (Axonaut, Sellsy, Divalto Weavy) combinent les deux. Une PME démarre généralement par un CRM puis ajoute un ERP au-delà de 50 salariés ou si elle gère des stocks complexes.",
  },
  {
    question: "Quel CRM choisir pour un commercial qui travaille beaucoup en mobilité ?",
    answer:
      "Pour un usage terrain, l'application mobile native est cruciale. Pipedrive et HubSpot ont les meilleures applications mobiles. Salesforce dispose de l'application la plus puissante mais demande une formation. Axonaut et Sellsy ont aussi des apps mobiles solides en français. Vérifiez la prise en charge offline si vous travaillez dans des zones sans réseau.",
  },
  {
    question: "Le CRM remplace-t-il l'email marketing ?",
    answer:
      "Pas totalement. Un CRM gère les emails 1-to-1 (relances, suivi commercial) et parfois des séquences automatisées simples. Un outil d'email marketing (Brevo, Mailchimp, ActiveCampaign) gère les campagnes 1-to-many avec segmentation avancée, A/B testing, et reporting fin. Beaucoup de CRM (HubSpot, Brevo, Sellsy) intègrent les deux dans leurs paliers payants. Pour de l'emailing intensif, gardez un outil dédié connecté à votre CRM.",
  },
  {
    question: "Comment migrer ses données depuis un ancien CRM ?",
    answer:
      "La plupart des CRM proposent un import CSV (contacts, entreprises, deals). Pour des migrations complexes (avec historique de mails, fichiers, automatisations), passez par un connecteur dédié comme Trujay ou Import2, ou un partenaire intégrateur. Comptez 2 à 8 jours de travail selon le volume. Bonne pratique : faites un test sur 100 contacts d'abord, puis basculez le reste après validation.",
  },
];

export default function FAQPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
        <div className="max-w-3xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">FAQ</li>
            </ol>
          </nav>

          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Questions fréquentes sur les logiciels CRM
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Les 12 questions les plus posées par les TPE et PME françaises sur le
              choix, le déploiement et l&apos;usage d&apos;un CRM en 2026.
            </p>
          </header>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-slate-200 p-6 cursor-pointer hover:border-violet-300 transition-colors"
              >
                <summary className="flex items-center justify-between font-semibold text-slate-900 list-none gap-4">
                  <span className="text-lg">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className="group-open:rotate-180 transition-transform text-slate-400 flex-shrink-0"
                  />
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          {/* Cross-links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/blog/comment-choisir-crm"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Comment choisir son CRM
              </h3>
              <p className="text-sm text-slate-600">Méthode complète en 8 étapes.</p>
            </Link>
            <Link
              href="/glossaire-crm"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Glossaire CRM
              </h3>
              <p className="text-sm text-slate-600">Tous les termes décodés.</p>
            </Link>
            <Link
              href="/methodologie"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Notre méthodologie
              </h3>
              <p className="text-sm text-slate-600">Comment nous notons les CRM.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
