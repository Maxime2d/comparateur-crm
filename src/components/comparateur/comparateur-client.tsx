"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ArrowUpDown, RotateCcw } from "lucide-react";

import { platforms } from "@/lib/platforms";
import { COMPANY_SIZES, CRM_FEATURE_LABELS } from "@/lib/constants";
import { Platform, CompanySize, CRMFeatures } from "@/types/platform";
import { PlatformCard } from "@/components/platform/platform-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ComparateurClient() {
  const allPlatforms = platforms;

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

  // Filter platforms
  const filteredPlatforms = useMemo(() => {
    let result = [...platforms];

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.badges?.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Company size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        selectedSizes.some((size) => p.target.sizes.includes(size))
      );
    }

    // Budget range filter
    result = result.filter((p) => {
      const price = p.pricing.startsAt;
      return price >= budgetRange[0] && price <= budgetRange[1];
    });

    // Score filter
    result = result.filter((p) => {
      const score = p.scores.overall || 75;
      return score >= minScore;
    });

    // Free plan only
    if (freeOnly) {
      result = result.filter((p) => p.pricing.hasFreePlan);
    }

    // Mobile app
    if (mobileApp) {
      result = result.filter((p) => p.features.mobileApp);
    }

    // Selected features
    if (selectedFeatures.length > 0) {
      result = result.filter((p) =>
        selectedFeatures.every((feature) => (p.features as any)[feature])
      );
    }

    // Sort
    if (sortBy === "score") {
      result.sort((a, b) => (b.scores.overall || 0) - (a.scores.overall || 0));
    } else if (sortBy === "price") {
      result.sort((a, b) => a.pricing.startsAt - b.pricing.startsAt);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Comparateur de CRM</h1>
          <p className="text-lg text-gray-600">
            Trouvez et comparez les meilleurs logiciels de CRM pour votre entreprise
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un CRM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-900 bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={18} className="text-gray-400" />
              </button>
            )}
          </div>

          {/* Size Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {COMPANY_SIZES.map((size) => (
              <Badge
                key={size.value}
                onClick={() => handleSizeToggle(size.value as CompanySize)}
                className={`cursor-pointer transition-all ${
                  selectedSizes.includes(size.value as CompanySize)
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                variant={
                  selectedSizes.includes(size.value as CompanySize)
                    ? "default"
                    : "secondary"
                }
              >
                {size.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="score">Classement</option>
              <option value="price">Prix</option>
              <option value="name">Nom</option>
            </select>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 hover:bg-gray-50"
            >
              <SlidersHorizontal size={18} />
              Filtres avancés
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            {filteredPlatforms.length} résultat{filteredPlatforms.length !== 1 ? "s" : ""}
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 ml-4 px-3 py-1 text-violet-600 hover:text-violet-700 font-medium"
              >
                <RotateCcw size={16} />
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h3 className="font-bold text-gray-900 mb-4">Filtres avancés</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget mensuel: {budgetRange[0]}€ - {budgetRange[1]}€
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={budgetRange[1]}
                  onChange={(e) =>
                    setBudgetRange([budgetRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>

              {/* Minimum Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score minimum: {minScore}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minScore}
                  onChange={(e) => setMinScore(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Checkboxes */}
              <div className="col-span-1 md:col-span-2 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={freeOnly}
                    onChange={(e) => setFreeOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-gray-700">Plan gratuit disponible</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mobileApp}
                    onChange={(e) => setMobileApp(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-gray-700">Application mobile</span>
                </label>
              </div>

              {/* Feature Checkboxes */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Fonctionnalités
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(CRM_FEATURE_LABELS)
                    .slice(0, 8)
                    .map(([key, label]) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(key)}
                          onChange={() => handleFeatureToggle(key)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Grid */}
        {filteredPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlatforms.map((platform, index) => (
              <motion.div
                key={platform.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PlatformCard platform={platform} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat</h3>
            <p className="text-gray-600 mb-4">
              Aucun CRM ne correspond à vos critères. Essayez d&apos;ajuster vos filtres.
            </p>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="mr-2" size={18} />
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
