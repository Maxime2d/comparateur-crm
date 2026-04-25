"use client";

const STORAGE_KEY = "ccm-recently-viewed";
const MAX_ITEMS = 5;

export interface RecentEntry {
  slug: string;
  ts: number;
}

/** Lit la liste depuis localStorage. Renvoie [] côté serveur. */
export function readRecentlyViewed(): RecentEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RecentEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e) => e && typeof e.slug === "string" && typeof e.ts === "number",
    );
  } catch {
    return [];
  }
}

/** Ajoute un slug à l'historique (déduplique, garde les MAX_ITEMS plus récents). */
export function pushRecentlyViewed(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const existing = readRecentlyViewed().filter((e) => e.slug !== slug);
    const next: RecentEntry[] = [
      { slug, ts: Date.now() },
      ...existing,
    ].slice(0, MAX_ITEMS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

/** Vide l'historique (utilisé si l'utilisateur refuse les cookies par exemple). */
export function clearRecentlyViewed() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
