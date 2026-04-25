"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  Filter,
} from "lucide-react";

import { platforms } from "@/lib/platforms";
import { COMPANY_SIZES, CRM_FEATURE_LABELS } from "@/lib/constants";
import { CompanySize } from "@/types/platform";
import { PlatformCard } from "@/components/platform/platform-card";
import { Button } from "@/components/ui/button";

export function ComparateurClient() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<CompanySize[]>([]);
  const [sortBy, setSortBy] = useState<"score" | "price" | "name">("score");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Advanced filter states
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 500]);
  const [minScore, setMinScore] = useState(0);
  const [freeOnly, setFreeOnly] = useState(false);
  const [mobileApp, setMobileApp] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const filteredPlatforms = useMemo(() => {
    let result = [...platforms];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.badges?.some((t) => t.toLowerCase().includes(query)),
      );
    }
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        selectedSizes.some((size) => p.target.sizes.includes(size)),
      );
    }
    result = result.filter((p) => {
      const price = p.pricing.startsAt;
      return price >= budgetRange[0] && price <= budgetRange[1];
    });
    result = result.filter((p) => {
      const score = p.scores.overall || 75;
      return score >= minScore;
    });
    if (freeOnly) result = result.filter((p) => p.pricing.hasFreePlan);
    if (mobileApp) result = result.filter((p) => p.features.mobileApp);
    if (selectedFeatures.length > 0) {
      result = result.filter((p) =>
        selectedFeatures.every(
          (feature) =>
            (p.features as unknown as Record<string, boolean>)[feature],
        ),
      );
    }
    if (sortBy === "score") {
      result.sort((a, b) => (b.scores.overall || 0) - (a.scores.overall || 0));
    } else if (sortBy === "price") {
      result.sort((a, b) => a.pricing.startsAt - b.pricing.startsAt);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [
    searchQuery,
    selectedSizes,
    budgetRange,
    minScore,
    freeOnly,
    mobileApp,
    selectedFeatures,
    sortBy,
  ]);

  const handleSizeToggle = (size: CompanySize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature],
    );
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedSizes([]);
    setSortBy("score");
    setShowAdvanced(false);
    setBudgetRange([0, 500]);
    setMinScore(0);
    setFreeOnly(false);
    setMobileApp(false);
    setSelectedFeatures([]);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedSizes.length > 0 ||
    budgetRange[0] > 0 ||
    budgetRange[1] < 500 ||
    minScore > 0 ||
    freeOnly ||
    mobileApp ||
    selectedFeatures.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero compact dark */}
      <section className="relative overflow-hidden bg-[#0a0a0f] pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/30 rounded-full filter blur-[100px]" />
          <div className="absolute top-0 right-10 w-[400px] h-[300px] bg-fuchsia-500/20 rounded-full filter blur-[90px]" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-indigo-500/20 rounded-full filter blur-[90px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 backdrop-blur-sm text-violet-300 text-xs font-semibold px-4 py-1.5 mb-6">
            <Sparkles size={12} />
            {platforms.length} CRM analysés · Édition 2026
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tight">
            Comparateur de{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              logiciels CRM
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Filtrez par taille, budget et fonctionnalités. Trouvez celui qui
            correspond à votre profil en quelques secondes.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-[#fafaff] pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* Body */}
      <section className="relative bg-[#fafaff] flex-1 pt-8 pb-20 overflow-hidden">
        <div
          className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-violet-200/20 rounded-full filter blur-[80px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Search bar premium */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="flex items-center px-5 py-4 border-b border-slate-100">
              <Search className="text-slate-400 mr-3 flex-shrink-0" size={20} />
              <input
                type="search"
                placeholder="Rechercher un CRM par nom, description ou tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-slate-900 bg-transparent placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 hover:bg-slate-100 rounded-md transition-colors"
                  aria-label="Effacer la recherche"
                >
                  <X size={16} className="text-slate-400" />
                </button>
              )}
            </div>

            {/* Size chips */}
            <div className="flex flex-wrap gap-2 px-5 py-4">
              <span className="inline-flex items-center text-xs font-semibold text-slate-500 mr-2">
                Taille d&apos;entreprise :
              </span>
              {COMPANY_SIZES.map((size) => {
                const active = selectedSizes.includes(
                  size.value as CompanySize,
                );
                return (
                  <button
                    key={size.value}
                    onClick={() =>
                      handleSizeToggle(size.value as CompanySize)
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      active
                        ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-sm shadow-violet-500/30"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort + filter toggle + count */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "score" | "price" | "name")
                  }
                  className="appearance-none pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 cursor-pointer"
                >
                  <option value="score">Trier par classement</option>
                  <option value="price">Trier par prix</option>
                  <option value="name">Trier par nom</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all ${
                  showAdvanced
                    ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-500/25"
                    : "bg-white border-slate-200 text-slate-700 hover:border-violet-300"
                }`}
              >
                <SlidersHorizontal size={16} />
                Filtres avancés
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-600">
                <span className="font-bold text-slate-900">
                  {filteredPlatforms.length}
                </span>{" "}
                CRM
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-semibold"
                >
                  <RotateCcw size={14} />
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* Advanced filters panel */}
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-5 text-slate-700">
                <Filter size={16} className="text-violet-600" />
                <h3 className="font-semibold">Filtres avancés</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Budget range */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Budget mensuel max :{" "}
                    <span className="font-bold text-violet-600">
                      {budgetRange[1]} €
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={budgetRange[1]}
                    onChange={(e) =>
                      setBudgetRange([
                        budgetRange[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full accent-violet-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0 €</span>
                    <span>500 €</span>
                  </div>
                </div>

                {/* Score min */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Note minimum :{" "}
                    <span className="font-bold text-violet-600">
                      {minScore}/10
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={minScore}
                    onChange={(e) => setMinScore(parseFloat(e.target.value))}
                    className="w-full accent-violet-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>

                {/* Quick filters */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 cursor-pointer rounded-xl border p-3 transition-all ${
                      freeOnly
                        ? "border-violet-300 bg-violet-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={freeOnly}
                      onChange={(e) => setFreeOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 accent-violet-600"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                      Plan gratuit disponible
                    </span>
                  </label>

                  <label
                    className={`flex items-center gap-3 cursor-pointer rounded-xl border p-3 transition-all ${
                      mobileApp
                        ? "border-violet-300 bg-violet-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={mobileApp}
                      onChange={(e) => setMobileApp(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 accent-violet-600"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                      Application mobile native
                    </span>
                  </label>
                </div>

                {/* Features */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Fonctionnalités requises
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(CRM_FEATURE_LABELS)
                      .slice(0, 12)
                      .map(([key, label]) => {
                        const active = selectedFeatures.includes(key);
                        return (
                          <button
                            key={key}
                            onClick={() => handleFeatureToggle(key)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              active
                                ? "bg-violet-600 text-white shadow-sm shadow-violet-500/25"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {filteredPlatforms.length > 0 ? (
            <div className="space-y-4">
              {filteredPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.04, 0.4),
                  }}
                >
                  <PlatformCard
                    platform={platform}
                    rank={sortBy === "score" ? index + 1 : undefined}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
                <Search size={26} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Aucun CRM ne correspond
              </h3>
              <p className="text-slate-600 mb-5 max-w-sm mx-auto">
                Essayez d&apos;ajuster vos filtres ou utilisez notre quiz pour
                obtenir une recommandation personnalisée.
              </p>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="mr-2" size={16} />
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
