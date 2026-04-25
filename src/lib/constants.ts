export const SITE_NAME = "Comparateur CRM";
export const SITE_DESCRIPTION =
  "Comparatif indépendant des meilleurs logiciels CRM en 2026. Tarifs, avis et fonctionnalités de +20 solutions pour gérer votre relation client.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://comparateurcrm.fr";

export const COLORS = {
  primary: "#7C3AED",
  secondary: "#059669",
  accent: "#F59E0B",
  dark: "#0F172A",
  light: "#F8FAFC",
  border: "#E2E8F0",
  bgAlt: "#F1F5F9",
} as const;

export const COMPANY_SIZES = [
  { value: "TPE", label: "TPE (1-10 salariés)" },
  { value: "PME", label: "PME (11-250 salariés)" },
  { value: "ETI", label: "ETI (250-5 000 salariés)" },
  { value: "Entreprise", label: "Grand groupe (5 000+)" },
] as const;

export const SECTORS = [
  { value: "Commerce", label: "Commerce / Retail" },
  { value: "Services", label: "Services / Consulting" },
  { value: "SaaS", label: "Tech / SaaS" },
  { value: "Industrie", label: "Industrie / Manufacturing" },
  { value: "Finance", label: "Finance / Assurance" },
  { value: "Immobilier", label: "Immobilier" },
  { value: "Technologie", label: "Technologie" },
  { value: "B2B", label: "B2B Général" },
] as const;

export const USER_COUNT_OPTIONS = [
  { value: "solo", label: "Juste moi", description: "Vous gérez seul(e) votre activité commerciale" },
  { value: "2-5", label: "2 à 5 commerciaux", description: "Petite équipe commerciale" },
  { value: "6-20", label: "6 à 20 commerciaux", description: "Équipe structurée, gestion des rôles utile" },
  { value: "20-plus", label: "Plus de 20 commerciaux", description: "Force de vente importante, reporting avancé" },
] as const;

export const SALES_PROCESS_OPTIONS = [
  { value: "short-cycle", label: "Vente courte / transactionnelle", description: "Cycle de vente rapide, souvent en B2C ou vente simple" },
  { value: "long-cycle", label: "Cycle long / B2B", description: "Vente complexe avec plusieurs interlocuteurs et étapes" },
  { value: "ecommerce", label: "E-commerce / vente en ligne", description: "Gestion des commandes et relation client digitale" },
  { value: "subscription", label: "Service / abonnement", description: "Récurrence, churn management, upsell" },
] as const;

export const EMAIL_MARKETING_OPTIONS = [
  { value: "essential", label: "Oui, indispensable", description: "Campagnes email et séquences automatisées intégrées au CRM" },
  { value: "nice-to-have", label: "C'est un plus", description: "Pratique mais pas bloquant si c'est via un outil externe" },
  { value: "no", label: "Non, pas besoin", description: "Vous utilisez déjà un outil dédié (Mailchimp, Brevo, etc.)" },
] as const;

export const BUDGET_OPTIONS_BY_SIZE: Record<string, readonly { value: string; label: string }[]> = {
  TPE: [
    { value: "free", label: "Gratuit si possible" },
    { value: "under-30", label: "Moins de 30€/utilisateur/mois" },
    { value: "30-80", label: "30-80€/utilisateur/mois" },
  ],
  PME: [
    { value: "under-30", label: "Moins de 30€/utilisateur/mois" },
    { value: "30-80", label: "30-80€/utilisateur/mois" },
    { value: "80-plus", label: "Plus de 80€/utilisateur/mois" },
  ],
  ETI: [
    { value: "30-80", label: "30-80€/utilisateur/mois" },
    { value: "80-plus", label: "Plus de 80€/utilisateur/mois" },
    { value: "on-quote", label: "Sur devis / budget flexible" },
  ],
  Entreprise: [
    { value: "80-plus", label: "Plus de 80€/utilisateur/mois" },
    { value: "on-quote", label: "Sur devis" },
    { value: "unlimited", label: "Pas de contrainte budgétaire" },
  ],
};

export const BUDGET_OPTIONS = [
  { value: "free", label: "Gratuit uniquement" },
  { value: "under-30", label: "Moins de 30€/utilisateur/mois" },
  { value: "30-80", label: "30-80€/utilisateur/mois" },
  { value: "80-plus", label: "Plus de 80€/utilisateur/mois" },
  { value: "on-quote", label: "Sur devis" },
] as const;

export const EXISTING_TOOLS_OPTIONS = [
  { value: "gmail", label: "Gmail" },
  { value: "outlook", label: "Outlook / Microsoft 365" },
  { value: "facturation", label: "Logiciel de facturation (Pennylane, Sellsy...)" },
  { value: "erp", label: "ERP (Sage, SAP...)" },
  { value: "telephony", label: "Téléphonie (Aircall, Ringover...)" },
  { value: "marketing", label: "Email marketing (Mailchimp, Brevo...)" },
  { value: "none", label: "Aucun outil spécifique" },
] as const;

export const DIGITAL_COMFORT_OPTIONS = [
  { value: "beginner", label: "Débutant", description: "Je veux un outil simple et intuitif" },
  { value: "intermediate", label: "Intermédiaire", description: "J'utilise des outils numériques au quotidien" },
  { value: "advanced", label: "Avancé", description: "Je veux des API et des intégrations poussées" },
] as const;

export const CRM_FEATURE_LABELS: Record<string, string> = {
  contactManagement: "Gestion des contacts",
  leadScoring: "Scoring de leads",
  pipelineManagement: "Pipeline commercial",
  emailIntegration: "Emailing intégré",
  taskManagement: "Gestion des tâches",
  reportingAnalytics: "Reporting / Tableaux de bord",
  automation: "Automatisation",
  collaboration: "Collaboration d'équipe",
  mobileApp: "Application mobile",
  customizableFields: "Champs personnalisables",
  multiCurrency: "Multi-devises",
  territoryManagement: "Gestion des territoires",
  forecastingTools: "Prévision des ventes",
  documentManagement: "Gestion documentaire",
  calendarIntegration: "Intégration calendrier",
  socialMediaIntegration: "Réseaux sociaux",
  webFormsTracking: "Formulaires web & tracking",
  leadNurturing: "Nurturing de leads",
  cpq: "CPQ (Configure Price Quote)",
  voiceFeatures: "Téléphonie / VoIP",
};

export const NAV_ITEMS = [
  { label: "Comparateur", href: "/comparateur" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Quiz CRM", href: "/quiz" },
  { label: "Blog", href: "/blog" },
  {
    label: "CRM par profil",
    href: "#",
    children: [
      { label: "CRM Français", href: "/crm-francais" },
      { label: "CRM Gratuit", href: "/crm-gratuit" },
      { label: "CRM TPE", href: "/crm-tpe" },
      { label: "CRM Startup", href: "/crm-startup" },
      { label: "CRM Freelance", href: "/crm-freelance" },
      { label: "CRM Open Source", href: "/crm-open-source" },
    ],
  },
  {
    label: "Outils",
    href: "#",
    children: [
      { label: "Calculateur ROI", href: "/outils/calculateur-roi-crm" },
      { label: "Glossaire CRM", href: "/glossaire-crm" },
      { label: "FAQ", href: "/faq" },
      { label: "Méthodologie", href: "/methodologie" },
    ],
  },
];
