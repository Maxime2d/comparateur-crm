"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickySection {
  /** Titre de la section. */
  title: string;
  /** Contenu de la section (texte explicatif). */
  description: ReactNode;
  /** Visuel à afficher dans le panneau sticky de droite. */
  visual?: ReactNode;
  /** Couleur d'accent. */
  accent?: "violet" | "fuchsia" | "indigo" | "emerald";
}

interface StickyScrollProps {
  sections: StickySection[];
  className?: string;
}

const accentBgMap: Record<string, string> = {
  violet: "from-violet-600 to-fuchsia-500",
  fuchsia: "from-fuchsia-500 to-pink-500",
  indigo: "from-indigo-500 to-violet-500",
  emerald: "from-emerald-500 to-teal-500",
};

const accentBorderMap: Record<string, string> = {
  violet: "border-violet-300",
  fuchsia: "border-fuchsia-300",
  indigo: "border-indigo-300",
  emerald: "border-emerald-300",
};

const accentTextMap: Record<string, string> = {
  violet: "text-violet-700",
  fuchsia: "text-fuchsia-700",
  indigo: "text-indigo-700",
  emerald: "text-emerald-700",
};

/**
 * Sticky Scroll Reveal — inspiré d'Aceternity UI.
 *
 * Layout 2 colonnes :
 *  - Gauche : sections empilées qui défilent normalement.
 *  - Droite (sticky) : visuel qui change selon la section visible.
 *
 * L'index courant est calculé via IntersectionObserver sur les sections gauches.
 */
export function StickyScroll({ sections, className = "" }: StickyScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Progress bar globale liée au scroll dans le conteneur
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 70%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Trouver la section avec le plus grand intersectionRatio
        let maxRatio = 0;
        let maxIndex = activeIndex;
        entries.forEach((entry) => {
          const idx = sectionRefs.current.findIndex(
            (ref) => ref === entry.target,
          );
          if (entry.intersectionRatio > maxRatio && idx !== -1) {
            maxRatio = entry.intersectionRatio;
            maxIndex = idx;
          }
        });
        if (maxRatio > 0) setActiveIndex(maxIndex);
      },
      {
        threshold: [0.4, 0.6, 0.8],
        rootMargin: "-30% 0px -30% 0px",
      },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [activeIndex]);

  const active = sections[activeIndex];
  const accent = active?.accent || "violet";

  return (
    <div
      ref={containerRef}
      className={`relative grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 ${className}`}
    >
      {/* Colonne gauche : index sticky + sections */}
      <div className="relative">
        {/* Index numérique sticky en haut */}
        <div className="hidden lg:block sticky top-24 mb-8 z-10">
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
            <div className="relative w-1 h-12 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleY }}
                className={`absolute inset-x-0 top-0 origin-top h-full bg-gradient-to-b ${
                  accentBgMap[accent]
                }`}
              />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Étape
              </div>
              <div
                className={`text-lg font-black ${accentTextMap[accent]} tabular-nums`}
              >
                {String(activeIndex + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-32 lg:space-y-48">
          {sections.map((section, i) => {
            const isActive = i === activeIndex;
            const sectionAccent = section.accent || "violet";
            return (
              <div
                key={i}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                className="min-h-[40vh]"
              >
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 transition-colors ${
                    isActive
                      ? `bg-gradient-to-r ${accentBgMap[sectionAccent]} text-white`
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  Étape {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className={`text-2xl sm:text-3xl font-black mb-4 tracking-tight transition-colors ${
                    isActive ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {section.title}
                </h3>
                <div
                  className={`text-base sm:text-lg leading-relaxed transition-colors ${
                    isActive ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  {section.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Colonne droite : visuel sticky qui change */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div
            className={`relative aspect-square rounded-3xl bg-gradient-to-br ${
              accentBgMap[accent]
            } p-8 overflow-hidden shadow-2xl border-4 ${
              accentBorderMap[accent]
            } transition-all duration-700`}
          >
            {/* Halo */}
            <div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/20 blur-3xl"
              aria-hidden="true"
            />

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 h-full flex items-center justify-center text-white"
            >
              {active?.visual || (
                <div className="text-center">
                  <div className="text-7xl sm:text-8xl font-black mb-4 opacity-80">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </div>
                  <div className="text-2xl font-bold">{active?.title}</div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
