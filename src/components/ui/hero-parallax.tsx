"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { Platform } from "@/types/platform";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { ScoreBadge } from "@/components/ui/score-badge";

interface HeroParallaxProps {
  platforms: Platform[];
}

/**
 * Parallax scroll sur 3 rangées de cartes CRM qui glissent à des vitesses différentes.
 * Inspiré d'Aceternity UI.
 *
 * - Au scroll : la rotation X passe de 15° à 0°, l'opacité de 0.2 à 1
 * - Les rangées défilent en X opposées (gauche pour la 1ère et 3ème, droite pour la 2ème)
 */
export function HeroParallax({ platforms }: HeroParallaxProps) {
  // 3 rangées de 5 platforms (15 max)
  const safe = platforms.slice(0, 15);
  const row1 = safe.slice(0, 5);
  const row2 = safe.slice(5, 10);
  const row3 = safe.slice(10, 15);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 280, damping: 30, bounce: 100 };
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 700]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -700]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.4, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-400, 0]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className="h-[200vh] sm:h-[260vh] py-20 overflow-hidden relative bg-[#0a0a0f] [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Halos */}
      <div
        aria-hidden="true"
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/30 rounded-full blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-fuchsia-500/20 rounded-full blur-[90px] pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
          27 logiciels CRM,{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            tous testés
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          De HubSpot à Sellsy en passant par Pipedrive, Axonaut ou Folk : on les
          a tous passés au banc d&apos;essai.
        </p>
      </div>

      {/* Parallax rows */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative z-10"
      >
        <motion.div className="flex flex-row-reverse gap-4 mb-6">
          {row1.map((p) => (
            <ParallaxCard key={p.slug} platform={p} translate={translateX} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row gap-4 mb-6">
          {row2.map((p) => (
            <ParallaxCard
              key={p.slug}
              platform={p}
              translate={translateXReverse}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse gap-4">
          {row3.map((p) => (
            <ParallaxCard key={p.slug} platform={p} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ParallaxCard({
  platform,
  translate,
}: {
  platform: Platform;
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -10 }}
      className="group/card flex-shrink-0 w-[260px] sm:w-[320px] h-[200px] relative rounded-2xl overflow-hidden border border-white/10 bg-white shadow-xl hover:shadow-2xl hover:shadow-violet-500/30 transition-shadow"
    >
      <Link href={`/crm/${platform.slug}`} className="block h-full p-5">
        <div className="flex items-start justify-between mb-3">
          <PlatformLogo
            website={platform.website}
            name={platform.name}
            size={36}
            className="rounded-lg"
          />
          <ScoreBadge score={platform.scores.overall} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {platform.name}
        </h3>
        <p className="text-xs text-slate-600 line-clamp-2 mb-3">
          {platform.shortDescription}
        </p>
        <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-xs">
          <span className="font-bold text-violet-700">
            {platform.pricing.onQuote
              ? "Sur devis"
              : platform.pricing.startsAt === 0
                ? "Gratuit"
                : `dès ${platform.pricing.startsAt}€/mois`}
          </span>
          <span className="text-slate-500 group-hover/card:text-violet-600 transition-colors">
            Voir →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
