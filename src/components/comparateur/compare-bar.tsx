"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, ArrowRight, Plus } from "lucide-react";
import { Platform } from "@/types/platform";
import { PlatformLogo } from "@/components/shared/platform-logo";

interface CompareBarProps {
  selected: Platform[];
  max: number;
  onRemove: (slug: string) => void;
  onClear: () => void;
  onOpen: () => void;
}

export function CompareBar({
  selected,
  max,
  onRemove,
  onClear,
  onOpen,
}: CompareBarProps) {
  const count = selected.length;
  const slots = Array.from({ length: max });

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-4xl"
          role="region"
          aria-label="Sélection pour comparaison"
        >
          <div className="bg-[#0a0a0f] rounded-2xl shadow-2xl shadow-black/40 border border-white/10 p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            {/* Icon block */}
            <div className="hidden sm:flex flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 items-center justify-center shadow-lg shadow-violet-500/40">
              <Scale className="text-white" size={20} />
            </div>

            {/* Slots */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
              {slots.map((_, i) => {
                const platform = selected[i];
                if (platform) {
                  return (
                    <div
                      key={platform.slug}
                      className="relative flex-1 max-w-[110px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-2 py-1.5 flex items-center gap-2 group transition-colors"
                    >
                      <PlatformLogo
                        website={platform.website}
                        name={platform.name}
                        size={20}
                      />
                      <span className="text-xs sm:text-sm font-medium text-white truncate">
                        {platform.name}
                      </span>
                      <button
                        onClick={() => onRemove(platform.slug)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity"
                        aria-label={`Retirer ${platform.name}`}
                      >
                        <X size={11} strokeWidth={3} />
                      </button>
                    </div>
                  );
                }
                return (
                  <div
                    key={`empty-${i}`}
                    className="hidden sm:flex flex-1 max-w-[110px] border border-dashed border-white/15 rounded-xl px-2 py-1.5 items-center gap-2 text-white/30"
                  >
                    <Plus size={14} />
                    <span className="text-xs">Slot {i + 1}</span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onClear}
                className="hidden sm:inline-flex text-xs text-slate-400 hover:text-white transition-colors px-2 py-1"
              >
                Vider
              </button>
              <button
                onClick={onOpen}
                disabled={count < 2}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  count >= 2
                    ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30 hover:scale-[1.02]"
                    : "bg-white/5 text-white/40 cursor-not-allowed"
                }`}
              >
                <span className="hidden sm:inline">Comparer</span>
                <span className="sm:hidden">Compare</span>
                <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-[10px]">
                  {count}/{max}
                </span>
                {count >= 2 && <ArrowRight size={14} />}
              </button>
            </div>
          </div>
          {count < 2 && (
            <p className="text-center text-[11px] text-slate-500 mt-2 bg-white/80 backdrop-blur-sm rounded-full inline-block px-3 py-1 mx-auto block w-fit">
              Sélectionnez au moins 2 CRM pour lancer la comparaison
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
