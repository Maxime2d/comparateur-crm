"use client";

import { useEffect, useRef, useState } from "react";
import { Platform } from "@/types/platform";
import { BarChart3, Trophy } from "lucide-react";

interface AnimatedComparisonBarsProps {
  platforms: Platform[];
  label: string;
  getScore: (p: Platform) => number;
  maxScore?: number;
}

// Palette du site — alignée sur le radar
const platformColors = [
  { bar: "bg-violet-600", text: "text-violet-700", soft: "bg-violet-50" },
  { bar: "bg-fuchsia-500", text: "text-fuchsia-700", soft: "bg-fuchsia-50" },
  { bar: "bg-emerald-500", text: "text-emerald-700", soft: "bg-emerald-50" },
];

export function AnimatedComparisonBars({
  platforms,
  label,
  getScore,
  maxScore = 10,
}: AnimatedComparisonBarsProps) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start: number | null = null;
          const duration = 800;
          const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const p = Math.min(elapsed / duration, 1);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const scores = platforms.map((p) => getScore(p));
  const bestScore = Math.max(...scores);

  return (
    <div ref={ref} className="space-y-2">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </span>
      {platforms.map((p, i) => {
        const score = scores[i];
        const pct = (score / maxScore) * 100 * progress;
        const isBest =
          score === bestScore &&
          scores.filter((s) => s === bestScore).length === 1;
        const colors = platformColors[i % platformColors.length];

        return (
          <div key={p.slug} className="flex items-center gap-3">
            <span
              className={`text-xs font-medium w-24 truncate ${
                isBest ? colors.text + " font-bold" : "text-slate-600"
              }`}
            >
              {p.name}
            </span>
            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full ${colors.bar} relative`}
                style={{ width: `${pct}%`, transition: "width 0.1s linear" }}
              >
                {isBest && progress > 0.9 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm" />
                )}
              </div>
            </div>
            <span
              className={`text-sm font-bold tabular-nums min-w-[2.5rem] text-right ${
                isBest ? colors.text : "text-slate-700"
              }`}
            >
              {score.toFixed(1)}
            </span>
            {isBest && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-full">
                <Trophy size={9} />
                TOP
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface ComparisonBarsSectionProps {
  platforms: Platform[];
}

const categories = [
  {
    key: "overall",
    label: "Note globale",
    get: (p: Platform) => p.scores.overall,
  },
  {
    key: "pricing",
    label: "Rapport qualité/prix",
    get: (p: Platform) => p.scores.pricing,
  },
  {
    key: "features",
    label: "Fonctionnalités",
    get: (p: Platform) => p.scores.features,
  },
  { key: "ux", label: "Ergonomie", get: (p: Platform) => p.scores.ux },
  {
    key: "support",
    label: "Support client",
    get: (p: Platform) => p.scores.support,
  },
  {
    key: "integrations",
    label: "Intégrations",
    get: (p: Platform) => p.scores.integrations,
  },
];

export function ComparisonBarsSection({ platforms }: ComparisonBarsSectionProps) {
  if (platforms.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
      <h3 className="font-bold text-slate-900 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-violet-600" />
        Comparaison visuelle des scores
      </h3>

      {/* Color legend */}
      <div className="flex flex-wrap gap-3">
        {platforms.map((p, i) => {
          const colors = platformColors[i % platformColors.length];
          return (
            <div key={p.slug} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full ${colors.bar}`} />
              <span className="text-xs font-medium text-slate-700">
                {p.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
        {categories.map((cat) => (
          <AnimatedComparisonBars
            key={cat.key}
            platforms={platforms}
            label={cat.label}
            getScore={cat.get}
          />
        ))}
      </div>
    </div>
  );
}
