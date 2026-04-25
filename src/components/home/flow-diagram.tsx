"use client";

import { forwardRef, useRef, type Ref, type ReactNode } from "react";
import { Target, Sparkles, Scale, Rocket } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

interface NodeProps {
  children: ReactNode;
  className?: string;
}

const FlowNode = forwardRef<HTMLDivElement, NodeProps>(
  ({ children, className = "" }, ref) => (
    <div
      ref={ref}
      className={`z-10 flex items-center justify-center rounded-2xl border-2 border-white/15 bg-[#1a0d2e]/80 backdrop-blur-sm shadow-lg shadow-violet-900/30 ${className}`}
    >
      {children}
    </div>
  ),
);
FlowNode.displayName = "FlowNode";

/**
 * Schéma "comment ça marche" : 4 nœuds connectés par 3 beams animés.
 * Quiz → Recommandation → Comparaison → Souscription.
 */
export function FlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);

  const nodes: { ref: Ref<HTMLDivElement>; icon: typeof Target; label: string; sub: string; gradient: string }[] = [
    {
      ref: node1Ref,
      icon: Target,
      label: "Quiz personnalisé",
      sub: "8 questions",
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      ref: node2Ref,
      icon: Sparkles,
      label: "Recommandation",
      sub: "3 CRM matchés",
      gradient: "from-fuchsia-500 to-pink-500",
    },
    {
      ref: node3Ref,
      icon: Scale,
      label: "Comparaison",
      sub: "Côte-à-côte",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      ref: node4Ref,
      icon: Rocket,
      label: "Démarrage",
      sub: "Essai gratuit",
      gradient: "from-rose-500 to-amber-500",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-3 w-full max-w-4xl mx-auto px-4 py-12 sm:py-16"
    >
      {nodes.map((n) => {
        const Icon = n.icon;
        return (
          <FlowNode
            key={n.label}
            ref={n.ref}
            className="w-32 h-32 sm:w-36 sm:h-36 flex-col gap-2"
          >
            <span
              className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${n.gradient} text-white shadow-md shadow-black/30`}
            >
              <Icon size={22} />
            </span>
            <div className="text-center px-2">
              <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                {n.label}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {n.sub}
              </div>
            </div>
          </FlowNode>
        );
      })}

      {/* Beams animés (desktop uniquement, sur mobile c'est en colonne) */}
      <div className="hidden sm:block">
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={node1Ref}
          toRef={node2Ref}
          curvature={-30}
          delay={0}
          duration={3.5}
          gradientStartColor="#7c3aed"
          gradientStopColor="#d946ef"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={node2Ref}
          toRef={node3Ref}
          curvature={30}
          delay={0.5}
          duration={3.5}
          gradientStartColor="#d946ef"
          gradientStopColor="#ec4899"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={node3Ref}
          toRef={node4Ref}
          curvature={-30}
          delay={1}
          duration={3.5}
          gradientStartColor="#ec4899"
          gradientStopColor="#f59e0b"
        />
      </div>
    </div>
  );
}
