"use client";

import { useEffect, useRef, useState } from "react";
import { Platform } from "@/types/platform";
import { Hexagon } from "lucide-react";

interface RadarChartProps {
  platforms: Platform[];
  size?: number;
}

const axes = [
  { key: "features", label: "Fonctionnalités" },
  { key: "ux", label: "UX" },
  { key: "support", label: "Support" },
  { key: "integrations", label: "Intégrations" },
  { key: "satisfaction", label: "Satisfaction" },
  { key: "accessibility", label: "Accessibilité" },
  { key: "pricing", label: "Prix" },
] as const;

// Palette du site (violet, fuchsia, emerald) avec contraste pour 3 platforms
const platformStyles = [
  { stroke: "#7c3aed", fill: "rgba(124, 58, 237, 0.18)" }, // violet-600
  { stroke: "#d946ef", fill: "rgba(217, 70, 239, 0.16)" }, // fuchsia-500
  { stroke: "#10b981", fill: "rgba(16, 185, 129, 0.14)" }, // emerald-500
];

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleIndex: number,
  total: number,
) {
  const angle = (Math.PI * 2 * angleIndex) / total - Math.PI / 2;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

export function RadarChart({ platforms, size = 320 }: RadarChartProps) {
  const [progress, setProgress] = useState(0);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (platforms.length === 0) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start: number | null = null;
          const duration = 1100;
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
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [platforms.length]);

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.32;
  const levels = [2, 4, 6, 8, 10];
  const numAxes = axes.length;

  const buildPath = (p: Platform) => {
    return (
      axes
        .map((axis, i) => {
          const score = p.scores[axis.key as keyof typeof p.scores] || 0;
          const r = (score / 10) * maxR * progress;
          const pt = polarToCartesian(cx, cy, r, i, numAxes);
          return `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
        })
        .join(" ") + " Z"
    );
  };

  if (platforms.length === 0) return null;

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6"
    >
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Hexagon className="h-5 w-5 text-violet-600" />
        Radar des compétences
      </h3>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {platforms.map((p, i) => {
          const style = platformStyles[i % platformStyles.length];
          const isHovered = hoveredPlatform === p.slug;
          return (
            <button
              key={p.slug}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: isHovered ? style.fill : "transparent",
                border: `2px solid ${style.stroke}`,
                opacity: !hoveredPlatform || isHovered ? 1 : 0.4,
              }}
              onMouseEnter={() => setHoveredPlatform(p.slug)}
              onMouseLeave={() => setHoveredPlatform(null)}
              onFocus={() => setHoveredPlatform(p.slug)}
              onBlur={() => setHoveredPlatform(null)}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: style.stroke }}
              />
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width="100%"
          style={{ maxWidth: size }}
          aria-label="Graphique radar des scores"
        >
          {/* Background levels */}
          {levels.map((level) => {
            const r = (level / 10) * maxR;
            const points = Array.from({ length: numAxes }, (_, i) => {
              const pt = polarToCartesian(cx, cy, r, i, numAxes);
              return `${pt.x.toFixed(2)},${pt.y.toFixed(2)}`;
            }).join(" ");
            return (
              <g key={level}>
                <polygon
                  points={points}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth={level === 10 ? 1.5 : 0.75}
                  strokeDasharray={level === 10 ? "none" : "4,3"}
                />
                <text
                  x={cx + 4}
                  y={cy - r + 4}
                  fontSize="9"
                  fill="#94a3b8"
                  fontWeight="500"
                >
                  {level}
                </text>
              </g>
            );
          })}

          {/* Axis lines */}
          {axes.map((_, i) => {
            const pt = polarToCartesian(cx, cy, maxR, i, numAxes);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={pt.x}
                y2={pt.y}
                stroke="#e2e8f0"
                strokeWidth="0.75"
              />
            );
          })}

          {/* Axis labels */}
          {axes.map((axis, i) => {
            const labelR = maxR + 24;
            const pt = polarToCartesian(cx, cy, labelR, i, numAxes);
            return (
              <text
                key={axis.key}
                x={pt.x}
                y={pt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontWeight="600"
                fill="#475569"
              >
                {axis.label}
              </text>
            );
          })}

          {/* Platform polygons */}
          {platforms.map((p, i) => {
            const style = platformStyles[i % platformStyles.length];
            const isHovered = hoveredPlatform === p.slug;
            const isOtherHovered =
              hoveredPlatform && hoveredPlatform !== p.slug;
            return (
              <g
                key={p.slug}
                onMouseEnter={() => setHoveredPlatform(p.slug)}
                onMouseLeave={() => setHoveredPlatform(null)}
                style={{
                  transition: "opacity 0.3s ease",
                  opacity: isOtherHovered ? 0.15 : 1,
                }}
              >
                <path
                  d={buildPath(p)}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={isHovered ? 3 : 2}
                  strokeLinejoin="round"
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 0 6px ${style.stroke}55)`
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                />
                {axes.map((axis, j) => {
                  const score = p.scores[axis.key as keyof typeof p.scores] || 0;
                  const r = (score / 10) * maxR * progress;
                  const pt = polarToCartesian(cx, cy, r, j, numAxes);
                  return (
                    <circle
                      key={axis.key}
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 4 : 3}
                      fill={style.stroke}
                      stroke="white"
                      strokeWidth="1.5"
                      style={{ transition: "r 0.2s ease" }}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Score details on hover */}
      {hoveredPlatform &&
        (() => {
          const p = platforms.find((pl) => pl.slug === hoveredPlatform);
          if (!p) return null;
          const i = platforms.indexOf(p);
          const style = platformStyles[i % platformStyles.length];
          return (
            <div
              className="mt-4 rounded-xl p-3 border transition-all duration-300"
              style={{
                borderColor: style.stroke + "40",
                backgroundColor: style.fill,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: style.stroke }}
                />
                <span className="font-bold text-sm text-slate-900">
                  {p.name}
                </span>
                <span className="text-xs text-slate-500">
                  — Note globale : {p.scores.overall}/10
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {axes.map((axis) => {
                  const score =
                    p.scores[axis.key as keyof typeof p.scores] || 0;
                  return (
                    <div key={axis.key} className="text-center">
                      <div className="text-[10px] text-slate-500 leading-tight">
                        {axis.label}
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        {score}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
    </div>
  );
}
