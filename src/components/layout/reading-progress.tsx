"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Barre de progression de lecture en haut de page (3px gradient violet→pink).
 * Active uniquement sur les routes "longues" : /blog/[slug], /guide/[slug],
 * et les pages de plus de ~3 sections statiques (méthodologie, glossaire, faq).
 *
 * Implémentation : passive scroll listener + RAF throttle. CSS transform-only
 * pour rester GPU-cheap.
 */
export function ReadingProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  // Active uniquement sur les pages de contenu long
  const isContentPage =
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/guide/") ||
    pathname === "/methodologie" ||
    pathname === "/glossaire-crm" ||
    pathname === "/faq" ||
    pathname.startsWith("/comparer/") ||
    pathname.startsWith("/crm/");

  useEffect(() => {
    if (!isContentPage) {
      setProgress(0);
      return;
    }
    let raf = 0;
    let scheduled = false;

    const compute = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, pct)));
      scheduled = false;
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        raf = requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isContentPage]);

  if (!isContentPage) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500"
        style={{
          width: `${progress}%`,
          transition: "width 80ms linear",
          boxShadow: progress > 1 ? "0 0 10px rgba(168, 85, 247, 0.5)" : "none",
        }}
      />
    </div>
  );
}
