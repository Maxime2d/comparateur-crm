import { ReactNode, ElementType } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Grille asymétrique inspirée d'Aceternity UI / 21st.dev.
 * 6 colonnes sur desktop, 1 sur mobile. Utilise BentoCard avec colSpan/rowSpan.
 */
export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-6 auto-rows-[14rem] md:auto-rows-[12rem] gap-4 ${className}`}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  /** Titre principal (h3). */
  title: string;
  /** Description courte. */
  description: string;
  /** Icône Lucide en haut à gauche. */
  icon?: ElementType;
  /** Lien (rend la card cliquable). */
  href?: string;
  /** Texte du CTA (par défaut "Découvrir"). */
  ctaLabel?: string;
  /** Span de colonnes (1-6). Default 2. */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Span de lignes (1-3). Default 1. */
  rowSpan?: 1 | 2 | 3;
  /** Couleur du halo de fond. */
  glow?: "violet" | "fuchsia" | "indigo" | "emerald" | "amber" | "rose";
  /** Variante visuelle. "dark" = fond #0a0a0f + texte clair. */
  variant?: "default" | "dark" | "gradient";
  /** Badge en haut à droite (ex: "Nouveau", "Bientôt"). */
  badge?: string;
  /** Contenu visuel custom (image / chart / etc.) qui prend la moitié droite ou bas. */
  visual?: ReactNode;
  /** Si true, la card s'agrandit légèrement au hover. */
  hoverable?: boolean;
}

const colSpanMap: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
};
const rowSpanMap: Record<number, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
};

const glowMap: Record<string, string> = {
  violet: "from-violet-500/20",
  fuchsia: "from-fuchsia-500/20",
  indigo: "from-indigo-500/20",
  emerald: "from-emerald-500/20",
  amber: "from-amber-500/20",
  rose: "from-rose-500/20",
};
const glowAccentMap: Record<string, string> = {
  violet: "text-violet-300",
  fuchsia: "text-fuchsia-300",
  indigo: "text-indigo-300",
  emerald: "text-emerald-300",
  amber: "text-amber-300",
  rose: "text-rose-300",
};
const glowAccentLightMap: Record<string, string> = {
  violet: "text-violet-600",
  fuchsia: "text-fuchsia-600",
  indigo: "text-indigo-600",
  emerald: "text-emerald-600",
  amber: "text-amber-600",
  rose: "text-rose-600",
};

export function BentoCard({
  title,
  description,
  icon: Icon,
  href,
  ctaLabel = "Découvrir",
  colSpan = 2,
  rowSpan = 1,
  glow = "violet",
  variant = "default",
  badge,
  visual,
  hoverable = true,
}: BentoCardProps) {
  const isDark = variant === "dark";
  const isGradient = variant === "gradient";

  const baseClasses = `
    relative overflow-hidden rounded-2xl border p-6
    ${colSpanMap[colSpan] || "md:col-span-2"}
    ${rowSpanMap[rowSpan] || "md:row-span-1"}
    ${
      isDark
        ? "bg-[#0a0a0f] border-white/10 text-white"
        : isGradient
          ? "bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 border-transparent text-white"
          : "bg-white border-slate-200 text-slate-900"
    }
    ${
      hoverable
        ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        : ""
    }
    ${href ? "cursor-pointer" : ""}
  `;

  const accentClass = isDark || isGradient ? glowAccentMap[glow] : glowAccentLightMap[glow];

  const content = (
    <>
      {/* Halo de fond (uniquement variant default ou dark) */}
      {!isGradient && (
        <div
          className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-radial ${glowMap[glow]} via-transparent to-transparent filter blur-2xl pointer-events-none`}
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle, ${
              isDark
                ? `rgba(${
                    glow === "violet"
                      ? "139, 92, 246"
                      : glow === "fuchsia"
                        ? "217, 70, 239"
                        : glow === "indigo"
                          ? "99, 102, 241"
                          : glow === "emerald"
                            ? "16, 185, 129"
                            : glow === "amber"
                              ? "245, 158, 11"
                              : "244, 63, 94"
                  }, 0.25)`
                : `rgba(${
                    glow === "violet"
                      ? "139, 92, 246"
                      : glow === "fuchsia"
                        ? "217, 70, 239"
                        : glow === "indigo"
                          ? "99, 102, 241"
                          : glow === "emerald"
                            ? "16, 185, 129"
                            : glow === "amber"
                              ? "245, 158, 11"
                              : "244, 63, 94"
                  }, 0.15)`
            }, transparent 70%)`,
          }}
        />
      )}

      {badge && (
        <span
          className={`absolute top-4 right-4 z-10 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
            isDark || isGradient
              ? "bg-white/15 text-white border border-white/20"
              : "bg-violet-100 text-violet-700"
          }`}
        >
          {badge}
        </span>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {Icon && (
          <span
            className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 flex-shrink-0 ${
              isDark
                ? "bg-white/10 backdrop-blur-sm"
                : isGradient
                  ? "bg-white/20 backdrop-blur-sm"
                  : "bg-gradient-to-br from-violet-100 to-fuchsia-100"
            } ${accentClass}`}
          >
            <Icon size={20} />
          </span>
        )}

        <h3
          className={`text-lg sm:text-xl font-bold mb-1.5 leading-tight tracking-tight ${
            isDark || isGradient ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h3>

        <p
          className={`text-sm leading-relaxed mb-3 ${
            isDark
              ? "text-slate-400"
              : isGradient
                ? "text-violet-100"
                : "text-slate-600"
          }`}
        >
          {description}
        </p>

        {visual && (
          <div className="flex-1 flex items-end justify-end mt-2">
            {visual}
          </div>
        )}

        {href && (
          <div className="mt-auto pt-2">
            <span
              className={`inline-flex items-center gap-1 text-sm font-semibold ${accentClass} group-hover:gap-2 transition-all`}
            >
              {ctaLabel}
              <ArrowUpRight size={14} />
            </span>
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`group ${baseClasses}`}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}
