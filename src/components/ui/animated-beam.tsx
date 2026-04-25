"use client";

import { forwardRef, RefObject, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedBeamProps {
  /** Conteneur dans lequel calculer les coordonnées des points. */
  containerRef: RefObject<HTMLElement | null>;
  /** Élément source du beam. */
  fromRef: RefObject<HTMLElement | null>;
  /** Élément cible. */
  toRef: RefObject<HTMLElement | null>;
  /** Décalage de courbure (px). */
  curvature?: number;
  /** Inverse le sens. */
  reverse?: boolean;
  /** Délai avant le démarrage de l'animation (s). */
  delay?: number;
  /** Durée d'un cycle (s). */
  duration?: number;
  /** Couleur primaire du gradient (par défaut violet→fuchsia→pink). */
  pathColor?: string;
  /** Largeur du trait. */
  pathWidth?: number;
  /** Opacité du trait inactif. */
  pathOpacity?: number;
  /** Couleurs du gradient animé. */
  gradientStartColor?: string;
  gradientStopColor?: string;
}

/**
 * Trait courbe animé qui connecte deux éléments. Inspiré MagicUI.
 * Le SVG suit la position des éléments via ResizeObserver.
 *
 * Usage : place dans un parent `relative`, fournis fromRef, toRef et containerRef.
 */
export const AnimatedBeam = forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      delay = 0,
      duration = 5,
      pathColor = "#cbd5e1",
      pathWidth = 2,
      pathOpacity = 0.25,
      gradientStartColor = "#7c3aed",
      gradientStopColor = "#ec4899",
    },
    ref,
  ) => {
    const id = useId();
    const [pathD, setPathD] = useState("");
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const width = containerRect.width;
      const height = containerRect.height;
      setSvgDimensions({ width, height });

      const startX = fromRect.left - containerRect.left + fromRect.width / 2;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2;
      const endX = toRect.left - containerRect.left + toRect.width / 2;
      const endY = toRect.top - containerRect.top + toRect.height / 2;

      const controlY = startY - curvature;
      const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
      setPathD(d);
    };

    useEffect(() => {
      updatePath();
      if (!containerRef.current) return;
      const ro = new ResizeObserver(() => updatePath());
      ro.observe(containerRef.current);
      window.addEventListener("scroll", updatePath, { passive: true });
      window.addEventListener("resize", updatePath);
      return () => {
        ro.disconnect();
        window.removeEventListener("scroll", updatePath);
        window.removeEventListener("resize", updatePath);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef, fromRef, toRef, curvature]);

    const gradientId = `beam-gradient-${id}`;

    return (
      <svg
        ref={ref}
        fill="none"
        width={svgDimensions.width}
        height={svgDimensions.height}
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute left-0 top-0 transform-gpu stroke-2"
        viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        aria-hidden="true"
      >
        {/* Path inactif */}
        <path
          d={pathD}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
        />
        {/* Path animé avec gradient */}
        <path
          d={pathD}
          stroke={`url(#${gradientId})`}
          strokeWidth={pathWidth}
          strokeOpacity={1}
          strokeLinecap="round"
        />
        <defs>
          <motion.linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            initial={{
              x1: "0%",
              x2: "0%",
              y1: "0%",
              y2: "0%",
            }}
            animate={{
              x1: reverse ? ["90%", "-10%"] : ["-10%", "90%"],
              x2: reverse ? ["100%", "0%"] : ["0%", "100%"],
              y1: ["0%", "0%"],
              y2: ["0%", "0%"],
            }}
            transition={{
              delay,
              duration,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0,
            }}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" />
            <stop stopColor={gradientStartColor} />
            <stop offset="32.5%" stopColor={gradientStopColor} />
            <stop
              offset="100%"
              stopColor={gradientStopColor}
              stopOpacity="0"
            />
          </motion.linearGradient>
        </defs>
      </svg>
    );
  },
);
AnimatedBeam.displayName = "AnimatedBeam";
