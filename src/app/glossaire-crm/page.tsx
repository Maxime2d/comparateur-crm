import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Glossaire CRM 2026 : tous les termes expliqués simplement",
  description:
    "Lexique CRM complet : définitions claires de 30+ termes essentiels (lead, pipeline, scoring, MQL, SQL, ARR, churn, automation, intégration). Le dictionnaire de la relation client.",
  alternates: { canonical: `${SITE_URL}/glossaire-crm` },
  openGraph: {
    title: `Glossaire CRM | ${SITE_NAME}`,
    description:
      "Toutes les définitions des termes CRM essentiels en 2026.",
    url: `${SITE_URL}/glossaire-crm`,
    type: "website",
  },
};

interface Term {
  term: string;
  definition: string;
}

const terms: Term[] = [
  {
    term: "API (Application Programming Interface)",
    definition:
      "Interface technique qui permet à un CRM de communiquer avec d'autres logiciels. Une API publique documentée est essentielle pour automatiser les flux de données entre votre CRM et votre outil de facturation, votre messagerie, votre site web, etc.",
  },
  {
    term: "ARR (Annual Recurring Revenue)",
    definition:
      "Revenu récurrent annuel généré par les abonnements clients. Indicateur clé pour les entreprises SaaS. Le CRM permet de suivre l'ARR par client, par segment et par période, et de prévoir son évolution.",
  },
  {
    term: "Automation",
    definition:
      "Ensemble des règles et workflows qui exécutent des actions sans intervention humaine : envoyer un email après inscription, créer une tâche après une réunion, attribuer un lead à un commercial. L'automation est le levier de productivité principal d'un CRM moderne.",
  },
  {
    term: "B2B (Business to Business)",
    definition:
      "Vente entre entreprises. Les CRM B2B sont optimisés pour des cycles de vente longs (semaines à mois), des décisions multi-interlocuteurs et des comptes complexes. Exemples : Salesforce, HubSpot, Pipedrive.",
  },
  {
    term: "B2C (Business to Consumer)",
    definition:
      "Vente aux particuliers. Les CRM B2C gèrent de gros volumes de contacts, des cycles courts, et nécessitent souvent une forte intégration emailing/marketing automation. Exemples : Brevo, HubSpot Marketing Hub.",
  },
  {
    term: "Cloud (SaaS)",
    definition:
      "Modèle d'hébergement où le CRM est exécuté sur les serveurs de l'éditeur, accessible via navigateur. Avantages : pas de maintenance technique, mises à jour automatiques, accès multi-appareils. C'est le modèle dominant en 2026 (95 % des PME).",
  },
  {
    term: "Churn (taux d'attrition)",
    definition:
      "Pourcentage de clients perdus sur une période donnée. Un CRM permet de suivre le churn par cohorte et d'identifier les signaux faibles (baisse d'usage, tickets de support) pour réduire les pertes via du customer success.",
  },
  {
    term: "CPQ (Configure Price Quote)",
    definition:
      "Module qui automatise la génération de devis complexes selon des règles de tarification, remises et options. Essentiel pour les ventes industrielles ou SaaS avec catalogue volumineux. Présent dans Salesforce, HubSpot Pro, Sellsy.",
  },
  {
    term: "Custom object",
    definition:
      "Objet de données personnalisé créé en plus des objets standard (contacts, entreprises, deals). Exemple : un éditeur SaaS peut créer un custom object 'Abonnement' pour suivre ses MRR. Disponible sur HubSpot Pro, Salesforce, Zoho Enterprise.",
  },
  {
    term: "Deal (opportunité)",
    definition:
      "Entité CRM représentant une affaire commerciale en cours, avec un montant prévu, un stade dans le pipeline, et une date de clôture estimée. Le suivi des deals est le cœur de l'activité commerciale dans un CRM.",
  },
  {
    term: "DPA (Data Processing Agreement)",
    definition:
      "Accord juridique signé entre vous et l'éditeur du CRM, encadrant le traitement de vos données personnelles. Obligatoire au titre du RGPD. Vérifiez systématiquement la disponibilité d'un DPA avant de signer un contrat CRM.",
  },
  {
    term: "Drag and drop",
    definition:
      "Interaction par glisser-déposer, courante dans les pipelines visuels Kanban des CRM modernes. Permet de déplacer un deal d'un stade à l'autre en un geste, sans formulaire à remplir.",
  },
  {
    term: "E-mail tracking",
    definition:
      "Fonctionnalité qui informe en temps réel quand un destinataire ouvre un email ou clique sur une pièce jointe. Disponible nativement dans HubSpot, Pipedrive, Salesforce. Très utile pour timer ses relances commerciales.",
  },
  {
    term: "ERP (Enterprise Resource Planning)",
    definition:
      "Logiciel intégré couvrant l'ensemble des processus de l'entreprise : achats, stocks, production, comptabilité, RH, ventes. Un CRM se concentre sur la relation client, un ERP couvre toute l'opération. Certains outils français (Axonaut, Sellsy, Divalto Weavy) combinent les deux.",
  },
  {
    term: "Factur-X",
    definition:
      "Format hybride de facture électronique français, combinant un PDF lisible et des données XML structurées. Compatible avec la réforme de la facturation électronique obligatoire en France. Plusieurs CRM français (Sellsy, Axonaut) le supportent nativement.",
  },
  {
    term: "Forecast (prévision de vente)",
    definition:
      "Estimation du chiffre d'affaires futur basée sur les deals en cours, leur probabilité de signature et leur date de clôture prévue. Le forecast est généré automatiquement par les CRM, avec un degré de précision croissant grâce à l'IA.",
  },
  {
    term: "Funnel (entonnoir de conversion)",
    definition:
      "Représentation visuelle des étapes par lesquelles passent les prospects, du premier contact à la signature. Le funnel typique : visiteur → lead → MQL → SQL → opportunité → client. Le CRM mesure la conversion à chaque étape.",
  },
  {
    term: "Hébergement UE",
    definition:
      "Stockage des données sur des serveurs physiquement situés dans l'Union Européenne. Critère important pour la conformité RGPD et la souveraineté numérique. Les CRM français (Sellsy, Axonaut) hébergent par défaut en UE.",
  },
  {
    term: "Intégration native",
    definition:
      "Connexion pré-construite entre deux logiciels, fournie par l'éditeur du CRM, sans configuration technique. Plus stable et plus rapide à mettre en place qu'un connecteur Zapier. Le nombre d'intégrations natives est un critère de choix important.",
  },
  {
    term: "Lead",
    definition:
      "Contact commercial qualifié représentant une opportunité potentielle de vente. Un lead a manifesté un intérêt (téléchargement, formulaire, RDV) sans encore être prêt à acheter. Le CRM gère le passage progressif d'un lead à client.",
  },
  {
    term: "Lead scoring",
    definition:
      "Attribution automatique d'une note (souvent de 0 à 100) à chaque lead, en fonction de critères démographiques (taille d'entreprise, secteur) et comportementaux (pages visitées, emails ouverts). Permet aux commerciaux de prioriser les leads les plus chauds.",
  },
  {
    term: "Marketing automation",
    definition:
      "Automatisation des actions marketing : envoi d'emails de bienvenue, scoring de leads, déclenchement de campagnes selon le comportement. Disponible dans HubSpot Marketing Hub, Brevo, ActiveCampaign, Salesforce Marketing Cloud.",
  },
  {
    term: "MQL (Marketing Qualified Lead)",
    definition:
      "Lead qualifié par le marketing, considéré suffisamment chaud pour être transmis aux commerciaux. Le passage MQL → SQL est une étape clé du funnel B2B. Le CRM enregistre la transition et l'attribution.",
  },
  {
    term: "Open-source",
    definition:
      "Logiciel dont le code source est public et modifiable. Les CRM open-source (SuiteCRM, EspoCRM, Vtiger) peuvent être auto-hébergés gratuitement, mais demandent des compétences techniques. Souvent moins ergonomiques que les solutions SaaS.",
  },
  {
    term: "Pipeline",
    definition:
      "Représentation visuelle de toutes les opportunités commerciales en cours, organisées par stade (prospect, qualification, proposition, négociation, signature). Le pipeline est le tableau de bord central du commercial dans un CRM moderne.",
  },
  {
    term: "RGPD (Règlement Général sur la Protection des Données)",
    definition:
      "Règlement européen entré en vigueur en 2018 qui encadre le traitement des données personnelles. Tout CRM utilisé en Europe doit être conforme : DPA, droits d'accès et suppression, consentement explicite, registre des traitements.",
  },
  {
    term: "Sales enablement",
    definition:
      "Ensemble des outils et contenus mis à disposition des commerciaux pour vendre plus efficacement : argumentaires, études de cas, modèles d'emails, scripts d'appels. Les CRM intègrent de plus en plus de modules de sales enablement.",
  },
  {
    term: "Scoring",
    definition:
      "Voir 'Lead scoring'. Méthode pour prioriser automatiquement les leads les plus susceptibles de convertir.",
  },
  {
    term: "SLA (Service Level Agreement)",
    definition:
      "Engagement contractuel sur la qualité du service du CRM : disponibilité (99,9 %), temps de réponse du support, fenêtres de maintenance. À vérifier avant de signer un contrat enterprise.",
  },
  {
    term: "SQL (Sales Qualified Lead)",
    definition:
      "Lead qualifié par les commerciaux comme prêt à recevoir une proposition concrète. Étape suivante du MQL dans le funnel B2B. La transition MQL → SQL est typiquement marquée par une démo ou un appel de découverte.",
  },
  {
    term: "Synchronisation bidirectionnelle",
    definition:
      "Synchronisation où les changements dans le CRM remontent dans l'outil tiers et vice versa. Importante pour les intégrations email (Gmail/Outlook) ou facturation. Une synchro unidirectionnelle suffit pour des outils satellite.",
  },
  {
    term: "Tag (étiquette)",
    definition:
      "Marqueur libre attribué à un contact, deal ou entreprise pour le segmenter. Plus souple qu'un champ structuré. Un même contact peut avoir plusieurs tags : 'newsletter', 'partenaire', 'à relancer'.",
  },
  {
    term: "Webhook",
    definition:
      "Mécanisme qui envoie en temps réel une notification HTTP vers une URL tierce quand un événement se produit dans le CRM (deal gagné, contact créé). Utilisé pour déclencher des actions dans d'autres systèmes sans polling.",
  },
  {
    term: "Workflow",
    definition:
      "Suite d'actions automatisées déclenchées par un événement. Exemple : 'Quand un deal passe en stade Signature, créer une tâche d'onboarding pour le service client'. Les workflows sont la pierre angulaire de l'automation CRM.",
  },
];

export default function GlossairePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Glossaire CRM", href: "/glossaire-crm" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Glossaire CRM",
          description:
            "Définitions des termes essentiels de la gestion de la relation client en 2026.",
          url: `${SITE_URL}/glossaire-crm`,
          hasDefinedTerm: terms.map((t) => ({
            "@type": "DefinedTerm",
            name: t.term,
            description: t.definition,
          })),
        }}
      />

      <PageHero
        eyebrow="Glossaire"
        eyebrowIcon={BookOpen}
        title="Glossaire CRM 2026"
        highlight="2026"
        subtitle="Le dictionnaire complet des termes de la gestion de la relation client. Définitions claires, exemples concrets, et lien vers les CRM concernés."
      />

      <div className="bg-[#fafaff] pb-20">
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">Glossaire CRM</li>
            </ol>
          </nav>

          {/* Index alphabétique */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
            <p className="text-sm font-semibold text-slate-700 mb-3">
              Aller directement à un terme :
            </p>
            <div className="flex flex-wrap gap-2">
              {terms.map((t) => {
                const id = slugify(t.term);
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-violet-100 hover:text-violet-700 transition-colors"
                  >
                    {t.term.split(" (")[0]}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Termes */}
          <div className="space-y-3">
            {terms.map((t) => {
              const id = slugify(t.term);
              return (
                <article
                  key={id}
                  id={id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 scroll-mt-24"
                >
                  <h2 className="text-lg font-bold text-slate-900 mb-2">
                    {t.term}
                  </h2>
                  <p className="text-slate-700 leading-relaxed">{t.definition}</p>
                </article>
              );
            })}
          </div>

          {/* Cross-links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/comparateur"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Comparateur CRM
              </h3>
              <p className="text-sm text-slate-600">24 logiciels filtrables.</p>
            </Link>
            <Link
              href="/blog/comment-choisir-crm"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Comment choisir
              </h3>
              <p className="text-sm text-slate-600">Méthode en 8 étapes.</p>
            </Link>
            <Link
              href="/faq"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                FAQ générale
              </h3>
              <p className="text-sm text-slate-600">12 réponses clés.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
