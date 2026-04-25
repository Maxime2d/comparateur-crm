"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Minus,
  ExternalLink,
  ArrowRight,
  Trophy,
  Smartphone,
  Gift,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { Platform } from "@/types/platform";
import { CRM_FEATURE_LABELS } from "@/lib/constants";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { ScoreBadge } from "@/components/ui/score-badge";
import { RadarChart } from "@/components/ui/radar-chart";
import { ComparisonBarsSection } from "@/components/ui/animated-comparison-bars";
import { formatPrice, getCtaLabel } from "@/lib/utils";

interface CompareDrawerProps {
  platforms: Platform[];
  open: boolean;
  onClose: () => void;
  onRemove: (slug: string) => void;
}

// Features à afficher dans la matrice de comparaison (ordre = importance perçue)
const COMPARE_FEATURES: (keyof typeof CRM_FEATURE_LABELS)[] = [
  "contactManagement",
  "pipelineManagement",
  "emailIntegration",
  "automation",
  "leadScoring",
  "reportingAnalytics",
  "mobileApp",
  "collaboration",
  "documentManagement",
  "leadNurturing",
  "calendarIntegration",
  "webFormsTracking",
  "forecastingTools",
  "voiceFeatures",
];

export function CompareDrawer({
  platforms,
  open,
  onClose,
  onRemove,
}: CompareDrawerProps) {
  // Lock scroll quand ouvert + escape pour fermer
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Trouver le best score pour le badge "Meilleur score"
  const bestScore = Math.max(...platforms.map((p) => p.scores.overall || 0));
  // Trouver le moins cher (en excluant les onQuote)
  const realPrices = platforms
    .filter((p) => !p.pricing.onQuote)
    .map((p) => p.pricing.startsAt);
  const cheapestPrice = realPrices.length > 0 ? Math.min(...realPrices) : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-slate-900/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-drawer-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-2 sm:inset-x-4 top-4 bottom-4 z-[81] mx-auto max-w-7xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-[#0a0a0f] px-6 sm:px-8 py-5 flex items-center justify-between flex-shrink-0">
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
              >
                <div className="absolute -top-20 left-1/3 w-[400px] h-[200px] bg-violet-600/30 rounded-full filter blur-[80px]" />
                <div className="absolute -bottom-10 right-10 w-[300px] h-[200px] bg-fuchsia-500/20 rounded-full filter blur-[70px]" />
              </div>
              <div className="relative z-10">
                <h2
                  id="compare-drawer-title"
                  className="text-xl sm:text-2xl font-black text-white tracking-tight"
                >
                  Comparaison{" "}
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    côte-à-côte
                  </span>
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  {platforms.length} CRM sélectionnés sur 3 max
                </p>
              </div>
              <button
                onClick={onClose}
                className="relative z-10 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Fermer la comparaison"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content scrollable */}
            <div className="flex-1 overflow-auto bg-[#fafaff]">
              <div className="p-4 sm:p-6">
                {/* Cards header — 1 col sur mobile, N cols sur desktop */}
                <div
                  className={`grid gap-4 mb-6 ${
                    platforms.length === 1
                      ? "grid-cols-1 max-w-md"
                      : platforms.length === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-3"
                  }`}
                >
                  {platforms.map((p) => {
                    const isBestScore =
                      (p.scores.overall || 0) === bestScore && bestScore > 0;
                    const isCheapest =
                      cheapestPrice !== null &&
                      !p.pricing.onQuote &&
                      p.pricing.startsAt === cheapestPrice;
                    return (
                      <div
                        key={p.slug}
                        className="relative bg-white rounded-2xl border border-slate-200 p-5 flex flex-col"
                      >
                        <button
                          onClick={() => onRemove(p.slug)}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                          aria-label={`Retirer ${p.name}`}
                        >
                          <X size={14} />
                        </button>

                        <div className="flex items-center gap-3 mb-3">
                          <PlatformLogo
                            website={p.website}
                            name={p.name}
                            size={40}
                          />
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-slate-900 truncate">
                              {p.name}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-1">
                              {p.shortDescription}
                            </p>
                          </div>
                        </div>

                        {/* Badges Best */}
                        {(isBestScore || isCheapest) && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {isBestScore && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
                                <Trophy size={10} />
                                Meilleur score
                              </span>
                            )}
                            {isCheapest && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                                <Gift size={10} />
                                Le moins cher
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-2xl font-black bg-gradient-to-br from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                              {formatPrice(
                                p.pricing.startsAt,
                                p.pricing.onQuote,
                              )}
                            </div>
                            {p.pricing.startsAt > 0 &&
                              !p.pricing.onQuote && (
                                <div className="text-[11px] text-slate-500">
                                  /utilisateur/mois
                                </div>
                              )}
                          </div>
                          <ScoreBadge score={p.scores.overall} />
                        </div>

                        <div className="mt-auto flex flex-col gap-2">
                          <AffiliateLink
                            href={p.affiliateUrl}
                            platformName={p.name}
                            platformSlug={p.slug}
                            source="compare-drawer"
                            variant="button-primary"
                            size="sm"
                          >
                            {getCtaLabel(p.pricing)}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </AffiliateLink>
                          <Link
                            href={`/crm/${p.slug}`}
                            className="flex items-center justify-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700"
                          >
                            Voir la fiche complète
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Visualisations animées : radar + barres */}
                {platforms.length >= 2 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <RadarChart platforms={platforms} />
                    <ComparisonBarsSection platforms={platforms} />
                  </div>
                )}

                {/* Section : Tarification */}
                <Section title="Tarification">
                  <CompareRow
                    label="À partir de"
                    platforms={platforms}
                    render={(p) =>
                      formatPrice(p.pricing.startsAt, p.pricing.onQuote)
                    }
                  />
                  <CompareRow
                    label="Plan gratuit"
                    platforms={platforms}
                    render={(p) =>
                      p.pricing.hasFreePlan ? <CheckIcon /> : <DashIcon />
                    }
                  />
                  <CompareRow
                    label="Essai gratuit"
                    platforms={platforms}
                    render={(p) =>
                      p.pricing.hasFreeTrial
                        ? `${p.pricing.freeTrialDays} jours`
                        : "—"
                    }
                  />
                </Section>

                {/* Section : Notes & scores */}
                <Section title="Notes par critère">
                  <CompareRow
                    label="Note globale"
                    platforms={platforms}
                    render={(p) => (
                      <span className="font-bold text-violet-700">
                        {(p.scores.overall || 0).toFixed(1)}/10
                      </span>
                    )}
                  />
                  <CompareRow
                    label="Fonctionnalités"
                    platforms={platforms}
                    render={(p) =>
                      `${(p.scores.features || 0).toFixed(1)}/10`
                    }
                  />
                  <CompareRow
                    label="Ergonomie"
                    platforms={platforms}
                    render={(p) => `${(p.scores.ux || 0).toFixed(1)}/10`}
                  />
                  <CompareRow
                    label="Support"
                    platforms={platforms}
                    render={(p) => `${(p.scores.support || 0).toFixed(1)}/10`}
                  />
                  <CompareRow
                    label="Intégrations"
                    platforms={platforms}
                    render={(p) =>
                      `${(p.scores.integrations || 0).toFixed(1)}/10`
                    }
                  />
                  <CompareRow
                    label="Satisfaction"
                    platforms={platforms}
                    render={(p) =>
                      `${(p.scores.satisfaction || 0).toFixed(1)}/10`
                    }
                  />
                </Section>

                {/* Section : Cibles */}
                <Section title="Cible">
                  <CompareRow
                    label="Tailles d'entreprise"
                    platforms={platforms}
                    render={(p) => p.target.sizes.join(", ")}
                  />
                  <CompareRow
                    label="Cible principale"
                    platforms={platforms}
                    render={(p) => p.target.mainTarget}
                  />
                </Section>

                {/* Section : Fonctionnalités matrix */}
                <Section title="Fonctionnalités">
                  {COMPARE_FEATURES.map((featKey) => (
                    <CompareRow
                      key={featKey}
                      label={CRM_FEATURE_LABELS[featKey] || featKey}
                      platforms={platforms}
                      render={(p) =>
                        (p.features as unknown as Record<string, boolean>)[
                          featKey
                        ] ? (
                          <CheckIcon />
                        ) : (
                          <DashIcon />
                        )
                      }
                    />
                  ))}
                </Section>

                {/* Section : Sécurité */}
                <Section title="Sécurité &amp; conformité">
                  <CompareRow
                    label="Hébergement"
                    platforms={platforms}
                    render={(p) => p.security.hosting || "—"}
                  />
                  <CompareRow
                    label="RGPD"
                    platforms={platforms}
                    render={(p) =>
                      p.security.rgpdCompliant ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-sm">
                          <ShieldCheck size={14} />
                          Conforme
                        </span>
                      ) : (
                        <DashIcon />
                      )
                    }
                  />
                  <CompareRow
                    label="Certifications"
                    platforms={platforms}
                    render={(p) =>
                      p.security.certifications.length > 0
                        ? p.security.certifications.join(", ")
                        : "—"
                    }
                  />
                </Section>

                {/* Section : Pros & cons */}
                <Section title="Points forts / faiblesses">
                  <div
                    className={`grid gap-4 ${
                      platforms.length === 1
                        ? "grid-cols-1"
                        : platforms.length === 2
                          ? "grid-cols-1 md:grid-cols-2"
                          : "grid-cols-1 md:grid-cols-3"
                    }`}
                  >
                    {platforms.map((p) => (
                      <div
                        key={p.slug}
                        className="bg-white rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <PlatformLogo
                            website={p.website}
                            name={p.name}
                            size={20}
                          />
                          <span className="font-semibold text-slate-900 text-sm">
                            {p.name}
                          </span>
                        </div>

                        <div className="mb-3">
                          <h5 className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1.5">
                            Points forts
                          </h5>
                          <ul className="space-y-1">
                            {p.prosAndCons.pros.slice(0, 4).map((pro, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-1.5 text-xs text-slate-700"
                              >
                                <Check
                                  size={12}
                                  className="text-emerald-600 mt-0.5 flex-shrink-0"
                                />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-xs font-semibold text-rose-700 uppercase tracking-wide mb-1.5">
                            À noter
                          </h5>
                          <ul className="space-y-1">
                            {p.prosAndCons.cons.slice(0, 3).map((con, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-1.5 text-xs text-slate-700"
                              >
                                <Minus
                                  size={12}
                                  className="text-rose-500 mt-0.5 flex-shrink-0"
                                />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* CTA bar bottom */}
                <div className="mt-8 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 rounded-2xl p-6 text-white text-center shadow-lg shadow-violet-500/25">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 mb-3">
                    <Smartphone size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-1">
                    Pas encore décidé ?
                  </h3>
                  <p className="text-sm text-violet-100 mb-4 max-w-md mx-auto">
                    Faites le quiz en 2 minutes pour obtenir une
                    recommandation personnalisée selon votre profil.
                  </p>
                  <Link
                    href="/quiz"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-[1.02] transition-transform"
                  >
                    Lancer le quiz
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 mb-4 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          {title}
        </h4>
      </div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}

function CompareRow({
  label,
  platforms,
  render,
}: {
  label: string;
  platforms: Platform[];
  render: (p: Platform) => React.ReactNode;
}) {
  return (
    <div
      className="grid divide-x divide-slate-100"
      style={{
        gridTemplateColumns: `minmax(120px, 180px) repeat(${platforms.length}, 1fr)`,
      }}
    >
      <div className="px-3 sm:px-5 py-3 text-xs sm:text-sm text-slate-600 font-medium bg-slate-50/30">
        {label}
      </div>
      {platforms.map((p) => (
        <div
          key={p.slug}
          className="px-3 sm:px-5 py-3 text-xs sm:text-sm text-slate-900 flex items-center"
        >
          {render(p)}
        </div>
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
      <Check size={12} strokeWidth={3} />
    </span>
  );
}

function DashIcon() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400">
      <Minus size={12} />
    </span>
  );
}
