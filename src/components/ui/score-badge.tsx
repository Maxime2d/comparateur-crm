"use client";

import { cn, getScoreBgColor } from "@/lib/utils";
import { AnimatedTooltip } from "./animated-tooltip";
import { PlatformScores } from "@/types/platform";
import { Star, ArrowUpRight } from "lucide-react";

interface ScoreBadgeProps {
  score: number;
  className?: string;
  /** Si fourni, affiche un tooltip avec le breakdown détaillé au survol. */
  scores?: PlatformScores;
  /** Nom du CRM pour le tooltip header. */
  platformName?: string;
}

const labelMap: Record<keyof Omit<PlatformScores, "overall">, string> = {
  features: "Fonctionnalités",
  pricing: "Tarification",
  ux: "Ergonomie",
  support: "Support",
  integrations: "Intégrations",
  satisfaction: "Satisfaction",
  accessibility: "Accessibilité",
};

export function ScoreBadge({
  score,
  className,
  scores,
  platformName,
}: ScoreBadgeProps) {
  const badge = (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-bold cursor-default",
        getScoreBgColor(score),
        className,
      )}
    >
      {score.toFixed(1)}/10
    </span>
  );

  // Si on n'a pas le breakdown, juste le badge simple
  if (!scores) return badge;

  // Top 3 sous-scores pour le tooltip
  const breakdown = (
    Object.entries(labelMap) as [keyof typeof labelMap, string][]
  )
    .map(([key, label]) => ({ key, label, value: scores[key] || 0 }))
    .sort((a, b) => b.value - a.value);

  return (
    <AnimatedTooltip
      side="top"
      content={
        <div className="text-left">
          <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-white/10">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-violet-300 font-bold">
                Score détaillé
              </div>
              <div className="text-xs font-semibold text-white">
                {platformName || "CRM"}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-gradient-to-br from-violet-500 to-fuchsia-500 px-2 py-1 rounded-md">
              <Star size={10} className="fill-white" />
              <span className="text-sm font-black tabular-nums">
                {score.toFixed(1)}
              </span>
            </div>
          </div>
          <ul className="space-y-1">
            {breakdown.map(({ key, label, value }) => (
              <li
                key={key}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <span className="text-slate-300">{label}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full"
                      style={{ width: `${(value / 10) * 100}%` }}
                    />
                  </div>
                  <span className="font-bold text-white tabular-nums w-7 text-right">
                    {value.toFixed(1)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1 text-[10px] text-violet-300 mt-2 pt-2 border-t border-white/10">
            <ArrowUpRight size={10} />
            <span>Voir la fiche complète</span>
          </div>
        </div>
      }
    >
      {badge}
    </AnimatedTooltip>
  );
}
