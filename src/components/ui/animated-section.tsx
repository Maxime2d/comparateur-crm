"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "200px" }} variants={fadeInUp} className={className}>
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "200px" }} variants={staggerContainer} className={className}>
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div variants={staggerItem} className={className}>
      {children}
    </m.div>
  );
}
