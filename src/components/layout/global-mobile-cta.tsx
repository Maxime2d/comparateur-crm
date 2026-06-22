"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Search } from "lucide-react";

/**
 * Sticky bar mobile globale : 2 CTAs visibles partout (Quiz + Comparateur).
 *
 * Pattern éprouvé sur le site sœur comparateur-efacturation.fr : maximise
 * la conversion depuis n'importe quelle page d'entrée organique (blog,
 * guide, hub segment) sans changer le layout principal.
 *
 * Cachée sur :
 *  - /quiz                  → bouton "Quiz" redondant
 *  - /crm/[slug]            → un sticky CTA mobile CRM-spécifique (avec prix)
 *                             est déjà en place et plus pertinent
 *  - /comparateur (drawer)  → on évite la collision avec le drawer mobile
 *
 * Ne s'affiche qu'en mobile/tablette (< lg = 1024px).
 */
export function GlobalMobileCta() {
  const pathname = usePathname();

  // Routes où on ne montre pas la barre (CTA dédié plus pertinent).
  const HIDE_ON = [
    pathname.startsWith("/quiz"),
    pathname.startsWith("/crm/"),
    pathname.startsWith("/comparateur"),
  ];
  if (HIDE_ON.some(Boolean)) return null;

  return (
    <div
      aria-label="Accès rapide au quiz et au comparateur"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex gap-3"
    >
      <Link
        href="/quiz"
        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold text-sm py-3 shadow-lg shadow-violet-500/20 transition-colors"
      >
        <Zap className="h-4 w-4" /> Quiz 2 min
      </Link>
      <Link
        href="/comparateur"
        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 hover:border-violet-300 hover:text-violet-700 font-semibold text-sm py-3 transition-colors"
      >
        <Search className="h-4 w-4" /> Comparateur
      </Link>
    </div>
  );
}
