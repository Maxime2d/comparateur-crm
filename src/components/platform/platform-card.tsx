"use client";

import Link from "next/link";
import { Platform } from "@/types/platform";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/ui/score-badge";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { formatPrice, getCtaLabel } from "@/lib/utils";
import { ExternalLink, ArrowRight, Check, Scale } from "lucide-react";

interface PlatformCardProps {
  platform: Platform;
  rank?: number;
  /** Si défini, affiche un toggle "Comparer". */
  isSelectable?: boolean;
  /** Indique si cette card est dans la sélection courante. */
  isSelected?: boolean;
  /** Désactivé si la sélection est pleine et que cette card n'est pas dedans. */
  selectionDisabled?: boolean;
  /** Callback déclenché au toggle. */
  onToggleSelect?: (slug: string) => void;
}

export function PlatformCard({
  platform,
  rank,
  isSelectable = false,
  isSelected = false,
  selectionDisabled = false,
  onToggleSelect,
}: PlatformCardProps) {
  const rankBadgeColors: Record<number, string> = {
    1: "bg-amber-400 text-amber-900",
    2: "bg-slate-300 text-slate-800",
    3: "bg-amber-600 text-white",
  };

  return (
    <div
      className={`relative group rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 ${
        isSelected
          ? "border-violet-400 shadow-lg shadow-violet-500/20 ring-2 ring-violet-300/50"
          : "border-slate-200 hover:shadow-xl"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {rank && (
          <div
            className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${rankBadgeColors[rank] || "bg-slate-100 text-slate-600"}`}
          >
            #{rank}
          </div>
        )}

        <div className="flex items-center gap-4 flex-shrink-0">
          <PlatformLogo
            website={platform.website}
            name={platform.name}
            size={32}
          />
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {platform.name}
            </h3>
            <p className="text-sm text-slate-500">
              {platform.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-wrap items-center gap-2">
          {platform.badges.slice(0, 3).map((badge) => (
            <Badge key={badge} className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">
              {formatPrice(platform.pricing.startsAt, platform.pricing.onQuote)}
            </div>
            {platform.pricing.startsAt > 0 && (
              <div className="text-xs text-slate-500">/utilisateur/mois</div>
            )}
          </div>

          <ScoreBadge score={platform.scores.overall} />
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
        {isSelectable && (
          <button
            type="button"
            onClick={() => onToggleSelect?.(platform.slug)}
            disabled={selectionDisabled && !isSelected}
            aria-pressed={isSelected}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all sm:mr-auto ${
              isSelected
                ? "bg-violet-600 text-white shadow-sm shadow-violet-500/25 hover:bg-violet-700"
                : selectionDisabled
                  ? "bg-slate-50 text-slate-300 border border-slate-200 cursor-not-allowed"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-violet-300 hover:text-violet-700"
            }`}
            title={
              selectionDisabled && !isSelected
                ? "Limite de 3 CRM atteinte"
                : isSelected
                  ? "Retirer de la comparaison"
                  : "Ajouter à la comparaison"
            }
          >
            {isSelected ? (
              <>
                <Check size={14} strokeWidth={3} />
                Sélectionné
              </>
            ) : (
              <>
                <Scale size={14} />
                Comparer
              </>
            )}
          </button>
        )}

        <Link
          href={`/crm/${platform.slug}`}
          className="text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1"
        >
          Voir le détail <ArrowRight className="h-4 w-4" />
        </Link>
        <AffiliateLink
          href={platform.affiliateUrl}
          platformName={platform.name}
          platformSlug={platform.slug}
          source="comparateur"
          variant="button-primary"
          size="sm"
        >
          {getCtaLabel(platform.pricing)}
          <ExternalLink className="h-3.5 w-3.5" />
        </AffiliateLink>
      </div>
    </div>
  );
}
