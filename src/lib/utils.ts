import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | null, onQuote?: boolean): string {
  if (onQuote) return "Sur devis";
  if (price === null || price === 0) return "Gratuit";
  return `${price}€/mois`;
}

export function getScoreColor(score: number): string {
  if (score >= 8.5) return "text-emerald-600";
  if (score >= 7) return "text-violet-600";
  if (score >= 5) return "text-amber-600";
  return "text-red-600";
}

export function getScoreBgColor(score: number): string {
  if (score >= 8.5) return "bg-emerald-100 text-emerald-700";
  if (score >= 7) return "bg-violet-100 text-violet-700";
  if (score >= 5) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

export function getCtaLabel(pricing: { hasFreePlan: boolean; hasFreeTrial: boolean; onQuote: boolean }): string {
  if (pricing.hasFreePlan) return "Commencer gratuitement";
  if (pricing.hasFreeTrial) return "Essai gratuit";
  if (pricing.onQuote) return "Demander un devis";
  return "Demander une démo";
}
