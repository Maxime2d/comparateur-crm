"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Intégration Matomo — respectueuse du consentement (cohérente avec CookieBanner).
 *
 * Modèle de conformité CNIL :
 *  - Aucun choix encore fait        → mesure SANS cookie (anonymisée, exemptable).
 *  - Consentement « accepté »       → mesure AVEC cookies (meilleure déduplication).
 *  - Consentement « refusé »        → aucune mesure (opt-out total).
 *
 * Le bandeau (`cookie-banner.tsx`) émet un event `ccm-consent-change`
 * lorsqu'on accepte/refuse : on (ré)agit en conséquence sans recharger la page.
 *
 * Variables d'environnement requises (publiques, injectées au build) :
 *   NEXT_PUBLIC_MATOMO_URL      ex. https://analytics.tondomaine.fr/  (slash final)
 *   NEXT_PUBLIC_MATOMO_SITE_ID  ex. 3  (l'ID du site dans ton instance Matomo)
 */

const STORAGE_KEY = "ccm-cookie-consent";

type Consent = "accepted" | "refused" | null;

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

function readConsent(): Consent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as { value: Consent; ts: number };
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.ts < oneYear) return parsed.value;
    return null;
  } catch {
    return null;
  }
}

export function MatomoAnalytics() {
  const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL;
  const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
  const pathname = usePathname();

  // ─── Chargement initial du tracker ──────────────────────────────────
  useEffect(() => {
    if (!matomoUrl || !siteId) return; // pas configuré → no-op
    if (window._paq) return; // déjà chargé

    const consent: Consent = readConsent();
    if (consent === "refused") return; // opt-out explicite → on ne charge rien

    const _paq: unknown[][] = window._paq || [];
    window._paq = _paq;

    // Confidentialité : IP anonymisée + pas de tracking cross-domaine.
    _paq.push(["setDoNotTrack", true]);
    _paq.push(["disableCampaignParameters"]); // évite de capter les UTM affiliés en sources

    if (consent !== "accepted") {
      // Aucun choix encore : mode sans cookie (exemptable CNIL).
      _paq.push(["disableCookies"]);
    }

    _paq.push(["enableLinkTracking"]);
    _paq.push(["setTrackerUrl", `${matomoUrl}matomo.php`]);
    _paq.push(["setSiteId", siteId]);
    _paq.push(["trackPageView"]);

    const script = document.createElement("script");
    script.async = true;
    script.src = `${matomoUrl}matomo.js`;
    document.head.appendChild(script);

    // Réagit aux changements de consentement émis par le bandeau.
    const onConsentChange = () => {
      const next = readConsent();
      const paq = window._paq;
      if (!paq) return;
      if (next === "accepted") {
        paq.push(["setCookieConsentGiven"]);
        paq.push(["enableCookies"]);
      } else if (next === "refused") {
        paq.push(["forgetCookieConsentGiven"]);
        paq.push(["disableCookies"]);
        paq.push(["optUserOut"]);
      }
    };
    window.addEventListener("ccm-consent-change", onConsentChange);
    return () =>
      window.removeEventListener("ccm-consent-change", onConsentChange);
  }, [matomoUrl, siteId]);

  // ─── Suivi des navigations SPA (App Router) ─────────────────────────
  useEffect(() => {
    if (!matomoUrl || !siteId) return;
    const _paq = window._paq;
    if (!_paq) return;
    _paq.push(["setCustomUrl", window.location.href]);
    _paq.push(["setDocumentTitle", document.title]);
    _paq.push(["trackPageView"]);
  }, [pathname, matomoUrl, siteId]);

  return null;
}
