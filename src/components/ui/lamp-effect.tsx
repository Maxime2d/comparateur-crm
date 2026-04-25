"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LampEffectProps {
  children: ReactNode;
  className?: string;
  /** Hauteur min de la section. */
  minHeight?: string;
}

/**
 * "Lamp effect" : un cône de lumière violet/fuchsia qui descend du haut
 * et illumine progressivement le contenu. Inspiré d'Aceternity UI.
 *
 * Animation au scroll-in (whileInView) — passe de plat à étendu.
 */
export function LampEffect({
  children,
  className = "",
  minHeight = "60vh",
}: LampEffectProps) {
  return (
    <section
      className={`relative isolate flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] ${className}`}
      style={{ minHeight }}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center">
        {/* Cône de lumière gauche */}
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[26rem] bg-gradient-conic from-violet-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-[#0a0a0f] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-[#0a0a0f] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Cône de lumière droite (fuchsia) */}
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[26rem] bg-gradient-conic from-transparent via-transparent to-fuchsia-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-[#0a0a0f] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-[#0a0a0f] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Halos additionnels pour le glow */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#0a0a0f] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-violet-500 opacity-50 blur-3xl" />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-fuchsia-400 blur-2xl"
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-violet-400"
        />

        {/* Mask top */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#0a0a0f]" />
      </div>

      {/* Contenu */}
      <div className="relative z-50 flex -translate-y-40 flex-col items-center px-5 max-w-5xl mx-auto text-center">
        {children}
      </div>
    </section>
  );
}
