"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface HoverCardItem {
  /** Clé unique. */
  id: string;
  /** Lien de la card. */
  href?: string;
  /** Contenu de la card. */
  content: ReactNode;
}

interface HoverCardGridProps {
  items: HoverCardItem[];
  /** Nombre de colonnes (par défaut : 3 desktop / 1 mobile). */
  columns?: 2 | 3 | 4;
  /** Couleur du blob qui suit le curseur. */
  hoverColor?: "violet" | "fuchsia" | "indigo";
  className?: string;
}

const colMap: Record<number, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const blobMap: Record<string, string> = {
  violet: "bg-violet-200/60",
  fuchsia: "bg-fuchsia-200/60",
  indigo: "bg-indigo-200/60",
};

/**
 * Grille de cards avec un blob coloré qui suit le hover entre cards.
 * Inspiré d'Aceternity UI.
 */
export function HoverCardGrid({
  items,
  columns = 3,
  hoverColor = "violet",
  className = "",
}: HoverCardGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`grid gap-4 ${colMap[columns]} ${className}`}>
      {items.map((item, idx) => {
        const inner = (
          <div
            className="relative h-full rounded-2xl bg-white border border-slate-200 p-5 group-hover:border-violet-300 transition-colors"
          >
            {item.content}
          </div>
        );
        const wrapperClasses =
          "relative group block h-full p-2";

        return (
          <div
            key={item.id}
            className={wrapperClasses}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className={`absolute inset-0 rounded-3xl block ${blobMap[hoverColor]} ${
                    hoverColor === "violet"
                      ? "shadow-[0_0_40px_rgba(139,92,246,0.25)]"
                      : hoverColor === "fuchsia"
                        ? "shadow-[0_0_40px_rgba(217,70,239,0.25)]"
                        : "shadow-[0_0_40px_rgba(99,102,241,0.25)]"
                  }`}
                  layoutId="hoverCardBlob"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
                />
              )}
            </AnimatePresence>
            <div className="relative h-full">
              {item.href ? (
                <Link href={item.href} className="block h-full">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
