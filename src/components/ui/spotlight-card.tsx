"use client";

import React, { useEffect, useRef, ReactNode } from "react";

type GlowColor = "blue" | "purple" | "green" | "red" | "orange" | "violet" | "pink" | "fuchsia";

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  /** Si true, ignore le prop `size` et applique width/height ou className */
  customSize?: boolean;
}

const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
  violet: { base: 270, spread: 280 },
  pink: { base: 320, spread: 220 },
  fuchsia: { base: 300, spread: 240 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

/**
 * Card avec effet spotlight + bordure glow animée qui suit le curseur.
 * Le mouvement de la souris est tracké globalement et propagé via CSS variables
 * pour rester très performant (aucun re-render React).
 */
export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "violet",
  size = "md",
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;
    let scheduled = false;

    const flush = () => {
      const card = cardRef.current;
      if (card) {
        card.style.setProperty("--x", pendingX.toFixed(2));
        card.style.setProperty(
          "--xp",
          (pendingX / window.innerWidth).toFixed(2),
        );
        card.style.setProperty("--y", pendingY.toFixed(2));
        card.style.setProperty(
          "--yp",
          (pendingY / window.innerHeight).toFixed(2),
        );
      }
      scheduled = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!scheduled) {
        scheduled = true;
        rafId = window.requestAnimationFrame(flush);
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return "";
    return sizeMap[size];
  };

  const inlineStyles: React.CSSProperties & Record<string, string | number> = {
    "--base": base,
    "--spread": spread,
    "--radius": "14",
    "--border": "2",
    "--backdrop": "hsl(0 0% 100% / 0.6)",
    "--backup-border": "hsl(220 14% 90% / 1)",
    "--size": "200",
    "--outer": "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.12)),
      transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize:
      "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    touchAction: "none",
  };

  if (width !== undefined) {
    inlineStyles.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height !== undefined) {
    inlineStyles.height = typeof height === "number" ? `${height}px` : height;
  }

  // Styles globaux ::before / ::after pour la bordure glow.
  // Injecté une seule fois par card mais identique à chaque instance.
  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)),
        transparent 100%
      );
      filter: brightness(2);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)),
        transparent 100%
      );
    }
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={inlineStyles}
        className={`${getSizeClasses()} ${
          !customSize ? "aspect-[3/4]" : ""
        } rounded-2xl relative grid grid-rows-[1fr_auto] shadow-[0_1rem_2rem_-1rem_rgba(0,0,0,0.15)] p-4 gap-4 backdrop-blur-[5px] ${className}`}
      >
        <div data-glow />
        {children}
      </div>
    </>
  );
};

export default GlowCard;
