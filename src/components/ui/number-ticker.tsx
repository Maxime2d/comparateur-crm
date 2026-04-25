"use client";

import { useEffect, useRef, useState } from "react";

interface NumberTickerProps {
  value: number;
  /** Décimales à afficher (par défaut 0). */
  decimals?: number;
  /** Durée totale en ms. */
  duration?: number;
  /** Direction : "up" depuis 0, "down" depuis value*1.5 vers value. */
  direction?: "up" | "down";
  /** Délai avant démarrage (ms). */
  delay?: number;
  /** Classe additionnelle. */
  className?: string;
  /** Préfixe (ex : "€"). */
  prefix?: string;
  /** Suffixe (ex : "+"). */
  suffix?: string;
  /** Séparateur de milliers. Defaults to French locale. */
  format?: "fr" | "none";
}

/**
 * Affiche un nombre qui s'anime de 0 (ou d'une valeur de départ) jusqu'à `value`
 * lorsque l'élément entre dans le viewport. EaseOutExpo pour un effet premium.
 */
export function NumberTicker({
  value,
  decimals = 0,
  duration = 1600,
  direction = "up",
  delay = 0,
  className = "",
  prefix = "",
  suffix = "",
  format = "fr",
}: NumberTickerProps) {
  const [display, setDisplay] = useState(direction === "up" ? 0 : value * 1.5);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const start = direction === "up" ? 0 : value * 1.5;
    const end = value;
    let raf = 0;
    let startTime: number | null = null;

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts + delay;
      const elapsed = ts - startTime;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(start + (end - start) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, value, duration, direction, delay]);

  const formatted =
    format === "fr"
      ? display.toLocaleString("fr-FR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : display.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
