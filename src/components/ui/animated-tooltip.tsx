"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

interface AnimatedTooltipProps {
  /** Élément déclencheur du tooltip. */
  children: ReactNode;
  /** Contenu du tooltip. Peut être string ou JSX. */
  content: ReactNode;
  /** Position. */
  side?: "top" | "bottom";
  /** Désactive le tooltip. */
  disabled?: boolean;
}

/**
 * Tooltip animé inspiré d'Aceternity UI.
 * Spring + tilt en fonction de la position du curseur.
 */
export function AnimatedTooltip({
  children,
  content,
  side = "top",
  disabled = false,
}: AnimatedTooltipProps) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 5 };

  // Léger tilt 3D selon la position de la souris
  const rotate = useSpring(useTransform(x, [-80, 80], [-15, 15]), springConfig);
  const translateX = useSpring(useTransform(x, [-80, 80], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const halfWidth = target.offsetWidth / 2;
    x.set(e.nativeEvent.offsetX - halfWidth);
  };

  if (disabled) return <>{children}</>;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="popLayout">
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: side === "top" ? 10 : -10, scale: 0.85 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 280, damping: 18 },
            }}
            exit={{ opacity: 0, y: side === "top" ? 10 : -10, scale: 0.85 }}
            style={{
              translateX,
              rotate,
              whiteSpace: "normal",
            }}
            className={`absolute z-[60] left-1/2 -translate-x-1/2 ${
              side === "top" ? "-top-2 -translate-y-full" : "-bottom-2 translate-y-full"
            } pointer-events-none`}
          >
            <div className="relative">
              {/* Halos */}
              <div className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
              <div className="absolute -inset-x-2 -top-2 h-px bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

              <div className="relative max-w-[260px] min-w-[180px] bg-[#0a0a0f] text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl shadow-violet-900/30 border border-white/10">
                {content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
