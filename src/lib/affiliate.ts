/**
 * Affiliate link management — centralized tracking & UTM generation
 *
 * All affiliate links go through this module so we can:
 * 1. Append consistent UTM params for analytics
 * 2. Swap affiliate programs per platform without editing data/components
 * 3. Track clicks via Vercel Analytics + GA4 dataLayer + Matomo (when loaded)
 */

import { track } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

// ─── Sources (where the click originates) ────────────────────────────
export type AffiliateSource =
  | "homepage"
  | "comparateur"
  | "quiz-podium"
  | "quiz-details"
  | "quiz-cta"
  | "fiche-hero"
  | "fiche-sidebar"
  | "fiche-midpage"
  | "fiche-bottom"
  | "fiche-sticky"
  | "blog-mid-article"
  | "blog-conclusion"
  | "guide-cta"
  | "vs-page"
  | "vs-verdict"
  | "related-crm";

// ─── Provider mapping ────────────────────────────────────────────────
// Progressive enhancement: when a real affiliate ID becomes available
// (HubSpot, Pipedrive via Affilae/Awin, Sellsy, …) we fill it here.
// Until then, we fall back to the platform's declared affiliateUrl
// but we still wrap it in consistent UTM params.

type ProviderConfig = {
  /** Template URL — `{id}` placeholders will be replaced. */
  urlTemplate?: string;
  /** Environment variable that holds the real affiliate ID. */
  envVar?: string;
  /** Optional campaign name passed through as utm_campaign. */
  campaign?: string;
};

const PROVIDERS: Record<string, ProviderConfig> = {
  // Fill with real trackable URLs once programs are approved.
  // Example when HubSpot affiliate ID is known:
  // "hubspot-crm": { urlTemplate: "https://www.hubspot.fr/products/crm?hsa_acc={id}", envVar: "AFFILIATE_HUBSPOT_ID", campaign: "hubspot-affiliate" },
  // Example Affilae tracker:
  // "pipedrive": { urlTemplate: "https://lb.affilae.com/r/{id}", envVar: "AFFILIATE_PIPEDRIVE_ID" },
};

// ─── UTM Builder ─────────────────────────────────────────────────────
interface BuildAffiliateUrlOptions {
  /** Raw affiliate URL from platform data (fallback). */
  baseUrl: string;
  /** Platform slug — used for provider lookup and utm_term. */
  platformSlug: string;
  /** Where on the site the click originated. */
  source: AffiliateSource;
  /** Optional campaign override. */
  campaign?: string;
}

/**
 * Build an affiliate URL with UTM tracking parameters.
 * - If a PROVIDERS entry exists and its envVar is set, use the template.
 * - Otherwise, fall back to baseUrl and append UTM params.
 * - Pre-tracked Affilae links are returned as-is (already UTM-ed upstream).
 */
export function buildAffiliateUrl({
  baseUrl,
  platformSlug,
  source,
  campaign = "comparateur-crm",
}: BuildAffiliateUrlOptions): string {
  const provider = PROVIDERS[platformSlug];
  let resolved = baseUrl;

  if (provider?.urlTemplate && provider.envVar) {
    const id = process.env[provider.envVar];
    if (id) {
      resolved = provider.urlTemplate.replace("{id}", id);
      if (provider.campaign) campaign = provider.campaign;
    }
  }

  try {
    // Pre-tracked affiliate links already contain their own tracking
    if (resolved.includes("lb.affilae.com") || resolved.includes("awin1.com")) {
      return resolved;
    }
    const url = new URL(resolved);
    url.searchParams.set("utm_source", "comparateur-crm");
    url.searchParams.set("utm_medium", "affiliate");
    url.searchParams.set("utm_campaign", campaign);
    url.searchParams.set("utm_content", source);
    url.searchParams.set("utm_term", platformSlug);
    return url.toString();
  } catch {
    return resolved;
  }
}

// ─── Event tracking ──────────────────────────────────────────────────
export function trackAffiliateClick(
  platformName: string,
  platformSlug: string,
  source: AffiliateSource,
) {
  // 1. Vercel Analytics custom event
  try {
    track("affiliate_click", {
      platform: platformName,
      slug: platformSlug,
      source,
    });
  } catch {
    /* analytics not initialized — ignore */
  }

  if (typeof window === "undefined") return;

  // 2. GA4 dataLayer (GTM / GA4 will pick it up)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "affiliate_click",
    platform: platformName,
    slug: platformSlug,
    source,
  });

  // 3. gtag (if GA4 is wired directly)
  if (typeof window.gtag === "function") {
    window.gtag("event", "affiliate_click", {
      platform: platformName,
      slug: platformSlug,
      source,
    });
  }

  // 4. Matomo (if loaded)
  const _paq = (window as unknown as { _paq?: unknown[][] })._paq;
  if (_paq) {
    _paq.push([
      "trackEvent",
      "Affiliate",
      "Click",
      `${platformName} (${source})`,
    ]);
    _paq.push(["trackGoal", 1]);
  }
}

export function trackQuizCompletion(companySize: string, topPlatform: string) {
  try {
    track("quiz_completed", {
      company_size: companySize,
      top_recommendation: topPlatform,
    });
  } catch {
    /* ignore */
  }
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "quiz_completed",
    company_size: companySize,
    top_recommendation: topPlatform,
  });
  const _paq = (window as unknown as { _paq?: unknown[][] })._paq;
  if (_paq) {
    _paq.push([
      "trackEvent",
      "Quiz",
      "Completed",
      `${topPlatform} (${companySize})`,
    ]);
    _paq.push(["trackGoal", 2]);
  }
}

export function trackCtaClick(ctaName: string, location: string) {
  try {
    track("cta_click", { cta: ctaName, location });
  } catch {
    /* ignore */
  }
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "cta_click", cta: ctaName, location });
}
