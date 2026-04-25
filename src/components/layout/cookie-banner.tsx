"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "ccm-cookie-consent";

type Consent = "accepted" | "refused" | null;

/**
 * Bandeau RGPD + ePrivacy conforme à la CNIL :
 * - Accepter tout et Refuser tout sont VISUELLEMENT équivalents
 * - Possibilité de naviguer sans choisir (pas de paywall)
 * - Persistance localStorage 12 mois (CNIL recommande renouvellement annuel)
 */
export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { value: Consent; ts: number };
        // Renouvellement annuel
        const oneYear = 365 * 24 * 60 * 60 * 1000;
        if (Date.now() - parsed.ts < oneYear) {
          setConsent(parsed.value);
        }
      }
    } catch {
      /* localStorage indisponible — on affiche le bandeau */
    }
  }, []);

  const persist = (value: Consent) => {
    setConsent(value);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, ts: Date.now() }),
      );
      // Désactive la mesure si refus (Vercel Analytics utilise un opt-out flag)
      if (value === "refused") {
        const w = window as unknown as {
          va?: (event: string, payload: unknown) => void;
        };
        w.va?.("event", { name: "cookie_refused" });
      }
    } catch {
      /* localStorage indisponible */
    }
  };

  if (!mounted || consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-3 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-md z-[90]"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
      >
        <div className="relative bg-white rounded-2xl border border-violet-200 shadow-2xl shadow-violet-900/15 p-5">
          <button
            onClick={() => persist("refused")}
            className="absolute top-3 right-3 p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
            aria-label="Fermer et refuser"
          >
            <X size={16} />
          </button>

          <div className="flex items-start gap-3 mb-3">
            <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <Cookie size={18} />
            </span>
            <div>
              <h3
                id="cookie-title"
                className="font-bold text-slate-900 text-sm mb-1"
              >
                On vous respecte
              </h3>
              <p
                id="cookie-desc"
                className="text-xs text-slate-600 leading-relaxed"
              >
                On utilise des cookies de mesure d&apos;audience anonymes
                (Vercel Analytics) pour améliorer le site. Pas de pub, pas de
                revente de données.{" "}
                <Link
                  href="/mentions-legales"
                  className="text-violet-600 hover:text-violet-700 underline underline-offset-2"
                >
                  En savoir plus
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={() => persist("refused")}
              className="flex-1 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={() => persist("accepted")}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-md shadow-violet-500/25 hover:scale-[1.02] transition-transform"
            >
              <Shield size={14} />
              Accepter
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
