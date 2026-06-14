/**
 * Hubs d'intention (pages "meilleur CRM pour X" / "CRM avec Y").
 * Chaque hub filtre platforms.ts via un prédicat + porte son contenu éditorial.
 * Rendu par /crm-pour/[slug] (usage/cible) et /crm-avec/[slug] (fonctionnalité).
 */
import type { Platform } from "@/types/platform";

export interface HubConfig {
  slug: string;
  base: "crm-pour" | "crm-avec";
  label: string;
  pageTitle: string;
  highlight: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  prosCards: { title: string; text: string }[];
  prose: { h: string; p: string[] }[];
  match: (p: Platform) => boolean;
}

export const HUBS: HubConfig[] = [
  // ─── /crm-pour (cible / usage) ─────────────────────────────────────
  {
    slug: "pme",
    base: "crm-pour",
    label: "PME",
    pageTitle: "Meilleur CRM pour PME en 2026",
    highlight: "PME",
    intro:
      "Notre sélection des CRM les plus adaptés aux PME françaises (10 à 250 salariés) : montée en charge, automatisation, reporting et support solide.",
    metaTitle: "Meilleur CRM pour PME 2026 : top logiciels comparés",
    metaDescription:
      "Top CRM pour PME en 2026 : fonctionnalités, automatisation, tarifs et support. Comparez les meilleures solutions adaptées aux PME françaises.",
    prosCards: [
      {
        title: "Pensé pour grandir",
        text: "Gestion multi-utilisateurs, droits et pipelines multiples pour accompagner la croissance sans changer d'outil tous les ans.",
      },
      {
        title: "Automatisation",
        text: "Relances, séquences et scoring automatisés pour faire gagner du temps aux équipes commerciales et marketing.",
      },
      {
        title: "Pilotage",
        text: "Tableaux de bord et prévisions pour suivre le chiffre d'affaires et la performance de chaque commercial.",
      },
    ],
    prose: [
      {
        h: "Comment choisir un CRM pour une PME",
        p: [
          "Une PME a besoin d'un CRM qui structure le process commercial sans alourdir le quotidien des équipes. Les critères clés : automatisation, reporting, gestion des droits par rôle, et capacité à intégrer les outils déjà en place (messagerie, facturation, marketing).",
          "Le budget se raisonne par utilisateur et par palier : prévoyez la montée en gamme à 12-18 mois, car les fonctions avancées (prévisions, automatisations complexes) sont souvent sur les plans supérieurs.",
        ],
      },
      {
        h: "Notre recommandation",
        p: [
          "Pour la plupart des PME B2B, HubSpot et Pipedrive offrent le meilleur équilibre simplicité/puissance. Les PME françaises qui veulent un tout-en-un (CRM + facturation) regarderont Sellsy ou Axonaut. Utilisez notre quiz pour une reco personnalisée.",
        ],
      },
    ],
    match: (p) => p.target.sizes.includes("PME"),
  },
  {
    slug: "eti-grand-compte",
    base: "crm-pour",
    label: "ETI & grands comptes",
    pageTitle: "Meilleur CRM pour ETI et grands comptes en 2026",
    highlight: "ETI",
    intro:
      "Les CRM taillés pour les ETI et grandes entreprises : sécurité, gouvernance des données, personnalisation poussée et intégrations au SI.",
    metaTitle: "CRM pour ETI & grands comptes 2026 : top solutions",
    metaDescription:
      "Meilleurs CRM pour ETI et grandes entreprises en 2026 : sécurité, personnalisation, intégrations SI et gouvernance. Comparatif des solutions enterprise.",
    prosCards: [
      {
        title: "Sécurité & conformité",
        text: "Certifications (ISO 27001, SOC 2), hébergement maîtrisé et conformité RGPD pour des exigences élevées.",
      },
      {
        title: "Personnalisation",
        text: "Objets et champs sur mesure, workflows avancés et API robustes pour s'adapter à des process complexes.",
      },
      {
        title: "Intégrations SI",
        text: "Connexion à l'ERP, au support et aux outils data pour une vue client unifiée à l'échelle de l'entreprise.",
      },
    ],
    prose: [
      {
        h: "Les enjeux d'un CRM pour grandes structures",
        p: [
          "Au-delà d'un certain volume, le CRM devient une plateforme : il doit gérer des milliers d'utilisateurs, des permissions fines, l'audit, et s'intégrer au système d'information existant. La personnalisation et l'extensibilité priment sur la simplicité.",
          "Le coût d'implémentation (paramétrage, intégration, formation) dépasse souvent le coût des licences. Prévoyez un projet de déploiement structuré et un budget d'accompagnement.",
        ],
      },
      {
        h: "Notre recommandation",
        p: [
          "Salesforce et Microsoft Dynamics 365 dominent le segment enterprise. Pour des besoins forts sans la complexité de Salesforce, Creatio ou SugarCRM sont des alternatives crédibles.",
        ],
      },
    ],
    match: (p) =>
      p.target.sizes.includes("ETI") || p.target.sizes.includes("Entreprise"),
  },
  {
    slug: "b2b",
    base: "crm-pour",
    label: "B2B",
    pageTitle: "Meilleur CRM B2B en 2026",
    highlight: "B2B",
    intro:
      "Les CRM les plus efficaces pour la vente B2B : gestion des comptes, cycles longs, pipelines multiples et collaboration commerciale.",
    metaTitle: "Meilleur CRM B2B 2026 : top logiciels pour la vente B2B",
    metaDescription:
      "Top CRM B2B en 2026 : gestion des comptes, cycles de vente longs, pipelines et reporting. Comparatif des meilleures solutions pour les équipes B2B.",
    prosCards: [
      {
        title: "Cycles longs",
        text: "Suivi des opportunités sur des cycles de plusieurs semaines à plusieurs mois, avec relances et multi-contacts.",
      },
      {
        title: "Gestion des comptes",
        text: "Vue entreprise et contacts associés pour piloter des deals impliquant plusieurs décideurs.",
      },
      {
        title: "Prévisions",
        text: "Forecast et reporting pour anticiper le pipeline et fiabiliser les prévisions de chiffre d'affaires.",
      },
    ],
    prose: [
      {
        h: "Ce qui compte pour la vente B2B",
        p: [
          "En B2B, le CRM doit gérer des cycles longs et des ventes complexes à plusieurs interlocuteurs. La gestion des comptes, le suivi multi-contacts, la qualification des leads et les prévisions sont déterminants.",
          "L'intégration avec l'emailing et les outils de prospection (LinkedIn, séquences) est un plus pour alimenter le pipeline de façon continue.",
        ],
      },
      {
        h: "Notre recommandation",
        p: [
          "Pipedrive et HubSpot sont d'excellents choix pour la majorité des équipes B2B. Pour les cycles très longs et les grands comptes, Salesforce apporte la profondeur nécessaire.",
        ],
      },
    ],
    match: (p) =>
      p.target.sectors.includes("B2B") ||
      /b2b/i.test(p.target.mainTarget),
  },
  {
    slug: "equipe-commerciale",
    base: "crm-pour",
    label: "Équipes commerciales",
    pageTitle: "Meilleur CRM commercial pour équipes de vente en 2026",
    highlight: "commercial",
    intro:
      "Les CRM orientés vente : pipeline visuel, scoring de leads, suivi d'activité et productivité des commerciaux.",
    metaTitle: "Meilleur CRM commercial 2026 : top outils pour la vente",
    metaDescription:
      "Top CRM commerciaux en 2026 : pipeline visuel, scoring de leads, automatisation des relances. Comparatif des meilleurs outils pour équipes de vente.",
    prosCards: [
      {
        title: "Pipeline visuel",
        text: "Vue glisser-déposer des affaires en cours pour ne rien laisser passer et prioriser les bons deals.",
      },
      {
        title: "Scoring de leads",
        text: "Priorisation automatique des prospects les plus chauds pour concentrer l'effort commercial.",
      },
      {
        title: "Productivité",
        text: "Relances automatiques, modèles d'emails et suivi d'activité pour vendre plus en travaillant moins.",
      },
    ],
    prose: [
      {
        h: "Un CRM au service des commerciaux",
        p: [
          "Un bon CRM commercial se juge à l'adoption par les équipes : il doit être visuel, rapide à mettre à jour et utile au quotidien. Pipeline clair, scoring, relances automatiques et application mobile font la différence sur le terrain.",
          "Évitez les usines à gaz : un outil trop complexe est délaissé par les commerciaux, et la donnée se dégrade.",
        ],
      },
      {
        h: "Notre recommandation",
        p: [
          "Pipedrive est la référence pour les équipes 100 % vente. Close brille pour la téléprospection et les SDR. HubSpot convient si vous voulez aligner marketing et vente.",
        ],
      },
    ],
    match: (p) => p.features.pipelineManagement && p.features.leadScoring,
  },
  // ─── /crm-avec (fonctionnalité) ────────────────────────────────────
  {
    slug: "automatisation",
    base: "crm-avec",
    label: "Automatisation",
    pageTitle: "Meilleur CRM avec automatisation en 2026",
    highlight: "automatisation",
    intro:
      "Les CRM dotés de puissantes capacités d'automatisation : workflows, relances, séquences et scoring pour faire gagner du temps aux équipes.",
    metaTitle: "CRM avec automatisation 2026 : top solutions comparées",
    metaDescription:
      "Meilleurs CRM avec automatisation en 2026 : workflows, relances automatiques, séquences et scoring. Comparatif des solutions les plus puissantes.",
    prosCards: [
      {
        title: "Workflows",
        text: "Déclencheurs et actions automatiques pour fluidifier les process commerciaux et marketing.",
      },
      {
        title: "Relances",
        text: "Séquences d'emails et rappels automatiques pour ne jamais oublier de relancer un prospect.",
      },
      {
        title: "Scoring",
        text: "Qualification automatique des leads selon leur comportement et leurs attributs.",
      },
    ],
    prose: [
      {
        h: "Pourquoi l'automatisation change tout",
        p: [
          "L'automatisation libère les équipes des tâches répétitives : saisie, relances, attribution des leads, notifications. Bien configurée, elle augmente le taux de conversion et fiabilise le suivi.",
          "Vérifiez la profondeur des workflows (conditions, branches), la facilité de configuration et les limites selon les paliers tarifaires.",
        ],
      },
      {
        h: "Notre recommandation",
        p: [
          "HubSpot et ActiveCampaign offrent parmi les automatisations marketing les plus abouties. Pour l'automatisation commerciale, Pipedrive et Salesforce sont d'excellents choix.",
        ],
      },
    ],
    match: (p) => p.features.automation,
  },
  {
    slug: "application-mobile",
    base: "crm-avec",
    label: "Application mobile",
    pageTitle: "Meilleur CRM avec application mobile en 2026",
    highlight: "mobile",
    intro:
      "Les CRM avec une application mobile complète pour gérer ses contacts, son pipeline et ses tâches depuis le terrain.",
    metaTitle: "CRM avec application mobile 2026 : top apps comparées",
    metaDescription:
      "Meilleurs CRM avec application mobile en 2026 : accès aux contacts, pipeline et tâches en déplacement. Comparatif des apps iOS et Android.",
    prosCards: [
      {
        title: "Mobilité",
        text: "Accédez à vos fiches clients et à votre pipeline depuis votre téléphone, où que vous soyez.",
      },
      {
        title: "Saisie rapide",
        text: "Ajoutez un contact, une note ou une tâche en quelques secondes après un rendez-vous.",
      },
      {
        title: "Notifications",
        text: "Rappels et alertes en temps réel pour ne rater aucune relance ni aucun rendez-vous.",
      },
    ],
    prose: [
      {
        h: "L'importance du mobile pour les équipes terrain",
        p: [
          "Pour les commerciaux itinérants et les dirigeants de TPE/PME, l'application mobile est essentielle : elle permet de mettre à jour le CRM juste après un rendez-vous, quand l'information est fraîche.",
          "Évaluez la qualité réelle de l'app (et pas seulement son existence) : mode hors-ligne, rapidité, accès aux fonctionnalités clés.",
        ],
      },
      {
        h: "Notre recommandation",
        p: [
          "Pipedrive, HubSpot et Zoho proposent des applications mobiles particulièrement abouties. Les solutions françaises comme Sellsy et Axonaut couvrent bien les besoins du terrain.",
        ],
      },
    ],
    match: (p) => p.features.mobileApp,
  },
  {
    slug: "reporting",
    base: "crm-avec",
    label: "Reporting",
    pageTitle: "Meilleur CRM avec reporting et tableaux de bord en 2026",
    highlight: "reporting",
    intro:
      "Les CRM avec un reporting puissant : tableaux de bord personnalisables, prévisions et analyses pour piloter la performance commerciale.",
    metaTitle: "CRM avec reporting 2026 : top tableaux de bord comparés",
    metaDescription:
      "Meilleurs CRM avec reporting en 2026 : tableaux de bord personnalisables, prévisions de ventes et analyses. Comparatif des solutions de pilotage.",
    prosCards: [
      {
        title: "Tableaux de bord",
        text: "Visualisez l'activité commerciale, le pipeline et la performance en un coup d'œil.",
      },
      {
        title: "Prévisions",
        text: "Anticipez le chiffre d'affaires grâce aux prévisions basées sur le pipeline pondéré.",
      },
      {
        title: "Analyses",
        text: "Identifiez les goulets d'étranglement et les leviers de croissance par commercial et par étape.",
      },
    ],
    prose: [
      {
        h: "Piloter par la donnée",
        p: [
          "Un reporting de qualité transforme le CRM en outil de pilotage : taux de conversion par étape, cycle de vente moyen, performance par commercial, prévisions fiables. C'est la base d'un management commercial efficace.",
          "Vérifiez la personnalisation des rapports, la possibilité de créer des tableaux de bord par équipe et l'export des données.",
        ],
      },
      {
        h: "Notre recommandation",
        p: [
          "Salesforce et HubSpot offrent les capacités d'analyse les plus avancées. Zoho propose un excellent reporting à un tarif compétitif.",
        ],
      },
    ],
    match: (p) => p.features.reportingAnalytics,
  },
  {
    slug: "emailing",
    base: "crm-avec",
    label: "Emailing",
    pageTitle: "Meilleur CRM avec emailing intégré en 2026",
    highlight: "emailing",
    intro:
      "Les CRM avec emailing intégré : synchronisation de la messagerie, séquences et campagnes pour aligner ventes et marketing.",
    metaTitle: "CRM avec emailing 2026 : top solutions email comparées",
    metaDescription:
      "Meilleurs CRM avec emailing intégré en 2026 : synchronisation messagerie, séquences et campagnes. Comparatif des solutions email + CRM.",
    prosCards: [
      {
        title: "Messagerie synchronisée",
        text: "Gmail et Outlook synchronisés : tous vos échanges rattachés automatiquement aux bonnes fiches.",
      },
      {
        title: "Séquences",
        text: "Envois automatiques et relances programmées pour nourrir vos prospects sans effort.",
      },
      {
        title: "Campagnes",
        text: "Emailing marketing et suivi des ouvertures/clics directement reliés à votre base CRM.",
      },
    ],
    prose: [
      {
        h: "Quand le CRM et l'email ne font qu'un",
        p: [
          "Intégrer l'email au CRM évite les doubles saisies et donne une vue complète de la relation client. La synchronisation bidirectionnelle, le tracking des ouvertures et les séquences automatisées sont des atouts majeurs.",
          "Les plateformes qui combinent CRM et marketing (emailing, automation) sont idéales pour les équipes qui veulent un seul outil.",
        ],
      },
      {
        h: "Notre recommandation",
        p: [
          "Brevo et ActiveCampaign excellent sur le couple email + CRM. HubSpot reste la référence pour aligner marketing et vente dans un même outil.",
        ],
      },
    ],
    match: (p) => p.features.emailIntegration,
  },
];

export function getHubsByBase(base: HubConfig["base"]): HubConfig[] {
  return HUBS.filter((h) => h.base === base);
}

export function getHubBySlug(
  base: HubConfig["base"],
  slug: string,
): HubConfig | undefined {
  return HUBS.find((h) => h.base === base && h.slug === slug);
}
