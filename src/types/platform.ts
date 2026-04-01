export type CompanySize = "TPE" | "PME" | "ETI" | "Entreprise";

export type Sector = string;

export interface PlatformPricing {
  model: string;
  startsAt: number;
  currency: "EUR";
  period: string;
  hasFreePlan: boolean;
  hasFreeTrial: boolean;
  freeTrialDays: number;
  pricingUrl: string;
  onQuote: boolean;
  details: string;
}

export interface PlatformTarget {
  sizes: CompanySize[];
  sectors: Sector[];
  mainTarget: string;
}

export interface CRMFeatures {
  contactManagement: boolean;
  leadScoring: boolean;
  pipelineManagement: boolean;
  emailIntegration: boolean;
  taskManagement: boolean;
  reportingAnalytics: boolean;
  automation: boolean;
  collaboration: boolean;
  mobileApp: boolean;
  customizableFields: boolean;
  multiCurrency: boolean;
  territoryManagement: boolean;
  forecastingTools: boolean;
  documentManagement: boolean;
  calendarIntegration: boolean;
  socialMediaIntegration: boolean;
  webFormsTracking: boolean;
  leadNurturing: boolean;
  cpq: boolean;
  voiceFeatures: boolean;
}

export interface PlatformSecurity {
  hosting: string;
  certifications: string[];
  rgpdCompliant: boolean;
}

export interface PlatformSupport {
  channels: string[];
  languages: string[];
  hours: string;
}

export interface PlatformScores {
  overall: number;
  pricing: number;
  features: number;
  ux: number;
  support: number;
  integrations: number;
  satisfaction: number;
  accessibility: number;
}

export const SCORE_WEIGHTS = {
  features: 0.25,
  ux: 0.18,
  support: 0.17,
  integrations: 0.12,
  satisfaction: 0.13,
  accessibility: 0.15,
} as const;

export function calculateOverallScore(scores: Omit<PlatformScores, "overall">): number {
  const raw =
    scores.features * SCORE_WEIGHTS.features +
    scores.ux * SCORE_WEIGHTS.ux +
    scores.support * SCORE_WEIGHTS.support +
    scores.integrations * SCORE_WEIGHTS.integrations +
    scores.satisfaction * SCORE_WEIGHTS.satisfaction +
    scores.accessibility * SCORE_WEIGHTS.accessibility;
  return Math.round(raw * 10) / 10;
}

export interface PlatformProsAndCons {
  pros: string[];
  cons: string[];
}

export interface ExternalReview {
  source: string;
  rating: number;
  reviewCount: number;
  url: string;
}

export interface Platform {
  slug: string;
  name: string;
  logo: string;
  website: string;
  affiliateUrl: string;
  description: string;
  shortDescription: string;
  pricing: PlatformPricing;
  target: PlatformTarget;
  features: CRMFeatures;
  integrations: string[];
  security: PlatformSecurity;
  support: PlatformSupport;
  scores: PlatformScores;
  externalReviews?: ExternalReview[];
  prosAndCons: PlatformProsAndCons;
  faq: { question: string; answer: string }[];
  alternatives: string[];
  badges: string[];
  lastUpdated: string;
}

export type DigitalComfort = "beginner" | "intermediate" | "advanced";
export type SalesProcess = "short-cycle" | "long-cycle" | "ecommerce" | "subscription";
export type UserCount = "solo" | "2-5" | "6-20" | "20-plus";

export interface QuizAnswers {
  companySize: CompanySize | null;
  userCount: UserCount | null;
  salesProcess: SalesProcess | null;
  needsEmailMarketing: "essential" | "nice-to-have" | "no" | null;
  existingTools: string[];
  budget: string | null;
  sector: Sector | null;
  digitalComfort: DigitalComfort | null;
}

export interface MatchDetail {
  label: string;
  matched: boolean;
  detail: string;
  items?: string[];
}

export interface QuizResult {
  platform: Platform;
  compatibilityScore: number;
  reasons: string[];
  matchDetails?: MatchDetail[];
}

export interface ComparatorFilters {
  sizes: CompanySize[];
  budgetMin: number;
  budgetMax: number;
  features: (keyof CRMFeatures)[];
  integrations: string[];
  minScore: number;
  sortBy: "relevance" | "price" | "score" | "name";
  searchQuery: string;
}
