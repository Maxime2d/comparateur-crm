import { Sparkles } from "lucide-react";
import type { ReactNode, ElementType } from "react";

interface PageHeroProps {
  /** Texte du badge en haut (ex: "Édition 2026"). */
  eyebrow?: string;
  /** Icône optionnelle dans le badge (Lucide). */
  eyebrowIcon?: ElementType;
  /** Titre principal. Le contenu après " · " ou markdown ** est mis en gradient. */
  title: ReactNode;
  /** Mot ou groupe de mots à mettre en gradient violet→fuchsia→pink. */
  highlight?: string;
  /** Sous-titre / accroche. */
  subtitle?: ReactNode;
  /** Boutons / contenu personnalisé sous le subtitle. */
  children?: ReactNode;
  /** Padding vertical. */
  size?: "sm" | "md" | "lg";
}

/**
 * Mini-hero dark cohérent à utiliser en tête de chaque page.
 * Reprend la charte de la home : fond #0a0a0f, halos violet/fuchsia/indigo,
 * grille subtile, badge violet, h1 gradient sur le mot-clé, fade vers le contenu.
 */
export function PageHero({
  eyebrow,
  eyebrowIcon: EyebrowIcon = Sparkles,
  title,
  highlight,
  subtitle,
  children,
  size = "md",
}: PageHeroProps) {
  const padding =
    size === "sm"
      ? "pt-14 pb-10 sm:pt-20 sm:pb-12"
      : size === "lg"
        ? "pt-20 pb-16 sm:pt-28 sm:pb-20"
        : "pt-16 pb-12 sm:pt-24 sm:pb-16";

  // Si highlight est fourni et que title est une string, on splitte
  let renderedTitle: ReactNode = title;
  if (highlight && typeof title === "string" && title.includes(highlight)) {
    const [before, after] = title.split(highlight);
    renderedTitle = (
      <>
        {before}
        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          {highlight}
        </span>
        {after}
      </>
    );
  }

  return (
    <section
      className={`relative overflow-hidden bg-[#0a0a0f] ${padding}`}
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/30 rounded-full filter blur-[100px]" />
        <div className="absolute top-0 right-10 w-[400px] h-[300px] bg-fuchsia-500/20 rounded-full filter blur-[90px]" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-indigo-500/20 rounded-full filter blur-[90px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 backdrop-blur-sm text-violet-300 text-xs font-semibold px-4 py-1.5 mb-6">
            <EyebrowIcon size={12} />
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tight">
          {renderedTitle}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-[#fafaff] pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
