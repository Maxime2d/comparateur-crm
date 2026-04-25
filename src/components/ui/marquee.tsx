"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Sens du défilement. */
  reverse?: boolean;
  /** Pause au survol. */
  pauseOnHover?: boolean;
  /** Durée de la boucle en secondes. */
  duration?: number;
  /** Espacement entre items. */
  gap?: number;
  /** Classe additionnelle sur le conteneur. */
  className?: string;
  /** Si true, applique un masque dégradé sur les bords. */
  fadeEdges?: boolean;
}

/**
 * Défilement infini fluide. Utilise une duplication des enfants en CSS pour
 * garantir une boucle sans saccade. Aucun JS d'animation : 100% CSS.
 */
export function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  duration = 40,
  gap = 32,
  className = "",
  fadeEdges = true,
}: MarqueeProps) {
  const animationName = reverse ? "marquee-reverse" : "marquee";
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        fadeEdges
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - ${gap}px)); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(calc(-100% - ${gap}px)); }
          to { transform: translateX(0); }
        }
        .marquee-track:hover .marquee-row {
          animation-play-state: ${pauseOnHover ? "paused" : "running"};
        }
      `}</style>
      <div className="marquee-track flex w-max">
        <div
          className="marquee-row flex flex-shrink-0 items-center"
          style={{
            gap: `${gap}px`,
            paddingRight: `${gap}px`,
            animation: `${animationName} ${duration}s linear infinite`,
          }}
        >
          {children}
        </div>
        <div
          className="marquee-row flex flex-shrink-0 items-center"
          aria-hidden="true"
          style={{
            gap: `${gap}px`,
            paddingRight: `${gap}px`,
            animation: `${animationName} ${duration}s linear infinite`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
