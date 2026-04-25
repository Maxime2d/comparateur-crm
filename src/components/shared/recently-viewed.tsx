"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { readRecentlyViewed, pushRecentlyViewed } from "@/lib/recently-viewed";
import { platforms } from "@/lib/platforms";
import { PlatformLogo } from "./platform-logo";
import { Platform } from "@/types/platform";

interface RecentlyViewedTrackerProps {
  /** Slug à enregistrer dans l'historique. */
  slug: string;
}

/**
 * Composant invisible : enregistre la visite d'un CRM dans le localStorage.
 * À placer sur les pages /crm/[slug].
 */
export function RecentlyViewedTracker({ slug }: RecentlyViewedTrackerProps) {
  useEffect(() => {
    pushRecentlyViewed(slug);
  }, [slug]);
  return null;
}

interface RecentlyViewedListProps {
  /** Slugs à exclure (utile pour ne pas afficher la fiche courante). */
  exclude?: string[];
  /** Variante visuelle */
  variant?: "default" | "compact";
  /** Titre custom. */
  title?: string;
}

/**
 * Affiche les derniers CRMs consultés (depuis localStorage).
 * Ne s'affiche que si l'utilisateur a déjà consulté au moins 1 CRM.
 * Skeleton pendant la lecture localStorage pour éviter le flash.
 */
export function RecentlyViewedList({
  exclude = [],
  variant = "default",
  title = "Récemment consultés",
}: RecentlyViewedListProps) {
  const [items, setItems] = useState<Platform[] | null>(null);

  useEffect(() => {
    const recent = readRecentlyViewed();
    const filtered = recent
      .map((e) => platforms.find((p) => p.slug === e.slug))
      .filter(
        (p): p is Platform => Boolean(p) && !exclude.includes(p?.slug || ""),
      )
      .slice(0, 4);
    setItems(filtered);
  }, [exclude]);

  // Loading state - on rend rien (pas de skeleton qui flashe)
  if (items === null) return null;
  if (items.length === 0) return null;

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Clock size={12} />
          {title} :
        </span>
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/crm/${p.slug}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 hover:border-violet-300 bg-white hover:bg-violet-50 text-xs font-medium text-slate-700 hover:text-violet-700 transition-colors"
          >
            <PlatformLogo
              website={p.website}
              name={p.name}
              size={14}
              className="rounded"
            />
            {p.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-violet-100 text-violet-600">
          <Clock size={16} />
        </span>
        <h3 className="font-bold text-slate-900">{title}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/crm/${p.slug}`}
            className="group flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all"
          >
            <PlatformLogo
              website={p.website}
              name={p.name}
              size={28}
              className="rounded flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-slate-900 truncate group-hover:text-violet-700 transition-colors">
                {p.name}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                Voir <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
