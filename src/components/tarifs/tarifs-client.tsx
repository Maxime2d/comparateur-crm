"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Check, Search, ArrowUpDown } from "lucide-react";
import type { Platform } from "@/types/platform";
import { Badge } from "@/components/ui/badge";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { formatPrice, getCtaLabel } from "@/lib/utils";

type SortKey = "price" | "name" | "score";
type SortDir = "asc" | "desc";
type FilterKey = "all" | "free-plan" | "free-trial" | "under-30" | "on-quote";

interface TarifsClientProps {
  platforms: Platform[];
}

export function TarifsClient({ platforms }: TarifsClientProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filtered = useMemo(() => {
    let list = platforms.filter((p) => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.shortDescription.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      switch (filter) {
        case "free-plan":
          return p.pricing.hasFreePlan;
        case "free-trial":
          return p.pricing.hasFreeTrial;
        case "under-30":
          return (
            !p.pricing.onQuote &&
            p.pricing.startsAt > 0 &&
            p.pricing.startsAt < 30
          );
        case "on-quote":
          return p.pricing.onQuote;
        default:
          return true;
      }
    });

    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "price") {
        // Sur devis à la fin, gratuit en premier
        const getRank = (p: Platform) => {
          if (p.pricing.hasFreePlan) return -1;
          if (p.pricing.onQuote) return 99999;
          return p.pricing.startsAt;
        };
        cmp = getRank(a) - getRank(b);
      } else if (sortKey === "name") {
        cmp = a.name.localeCompare(b.name);
      } else if (sortKey === "score") {
        cmp = a.scores.overall - b.scores.overall;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [platforms, query, filter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "score" ? "desc" : "asc");
    }
  };

  const filterOptions: { value: FilterKey; label: string; count: number }[] = [
    { value: "all", label: "Tous", count: platforms.length },
    {
      value: "free-plan",
      label: "Plan gratuit",
      count: platforms.filter((p) => p.pricing.hasFreePlan).length,
    },
    {
      value: "free-trial",
      label: "Essai gratuit",
      count: platforms.filter((p) => p.pricing.hasFreeTrial).length,
    },
    {
      value: "under-30",
      label: "< 30 €/mois",
      count: platforms.filter(
        (p) => !p.pricing.onQuote && p.pricing.startsAt > 0 && p.pricing.startsAt < 30,
      ).length,
    },
    {
      value: "on-quote",
      label: "Sur devis",
      count: platforms.filter((p) => p.pricing.onQuote).length,
    },
  ];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            placeholder="Rechercher un CRM..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 text-slate-900"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === opt.value
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-700 hover:shadow-sm"
              }`}
            >
              {opt.label}{" "}
              <span
                className={
                  filter === opt.value ? "text-white/75" : "text-slate-400"
                }
              >
                ({opt.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-slate-500 mb-4">
        {filtered.length} CRM{filtered.length > 1 ? "s" : ""} affiché
        {filtered.length > 1 ? "s" : ""}
      </p>

      {/* Desktop table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                <button
                  onClick={() => toggleSort("name")}
                  className="inline-flex items-center gap-1 hover:text-violet-700"
                >
                  CRM <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                <button
                  onClick={() => toggleSort("price")}
                  className="inline-flex items-center gap-1 hover:text-violet-700"
                >
                  Tarif d&apos;entrée <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Plan gratuit
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Essai gratuit
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                <button
                  onClick={() => toggleSort("score")}
                  className="inline-flex items-center gap-1 hover:text-violet-700"
                >
                  Note <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <tr
                key={p.slug}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <PlatformLogo
                      website={p.website}
                      name={p.name}
                      size={32}
                    />
                    <div>
                      <Link
                        href={`/crm/${p.slug}`}
                        className="font-semibold text-slate-900 hover:text-violet-700"
                      >
                        {p.name}
                      </Link>
                      <div className="text-xs text-slate-500 line-clamp-1 max-w-xs">
                        {p.shortDescription}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-semibold text-slate-900">
                    {formatPrice(p.pricing.startsAt, p.pricing.onQuote)}
                  </div>
                  {p.pricing.startsAt > 0 && (
                    <div className="text-xs text-slate-500">
                      /utilisateur/mois
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">
                  {p.pricing.hasFreePlan ? (
                    <Badge
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 bg-emerald-50"
                    >
                      <Check size={12} className="mr-1" />
                      Oui
                    </Badge>
                  ) : (
                    <span className="text-slate-300 text-sm">—</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {p.pricing.hasFreeTrial ? (
                    <Badge
                      variant="outline"
                      className="border-violet-200 text-violet-700 bg-violet-50"
                    >
                      <Check size={12} className="mr-1" />
                      Oui
                    </Badge>
                  ) : (
                    <span className="text-slate-300 text-sm">—</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="font-bold text-slate-900">
                    {p.scores.overall}
                    <span className="text-xs text-slate-400">/10</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <AffiliateLink
                    href={p.affiliateUrl}
                    platformName={p.name}
                    platformSlug={p.slug}
                    source="comparateur"
                    variant="button-primary"
                    size="sm"
                  >
                    {getCtaLabel(p.pricing)}
                    <ExternalLink size={12} />
                  </AffiliateLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {filtered.map((p) => (
          <div
            key={p.slug}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <PlatformLogo website={p.website} name={p.name} size={36} />
              <div className="flex-1 min-w-0">
                <Link
                  href={`/crm/${p.slug}`}
                  className="font-semibold text-slate-900 hover:text-violet-700"
                >
                  {p.name}
                </Link>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {p.shortDescription}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-slate-900 text-sm">
                  {p.scores.overall}/10
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-semibold text-slate-900">
                  {formatPrice(p.pricing.startsAt, p.pricing.onQuote)}
                </div>
                {p.pricing.startsAt > 0 && (
                  <div className="text-xs text-slate-500">
                    /utilisateur/mois
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.pricing.hasFreePlan && (
                  <Badge
                    variant="outline"
                    className="border-emerald-200 text-emerald-700 bg-emerald-50 text-xs"
                  >
                    Gratuit
                  </Badge>
                )}
                {p.pricing.hasFreeTrial && (
                  <Badge
                    variant="outline"
                    className="border-violet-200 text-violet-700 bg-violet-50 text-xs"
                  >
                    Essai
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/crm/${p.slug}`}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm text-center font-medium text-slate-700 hover:border-violet-300 hover:text-violet-700"
              >
                Détails
              </Link>
              <AffiliateLink
                href={p.affiliateUrl}
                platformName={p.name}
                platformSlug={p.slug}
                source="comparateur"
                variant="button-primary"
                size="sm"
                fullWidth
                className="flex-1"
              >
                {getCtaLabel(p.pricing)}
                <ArrowRight size={14} />
              </AffiliateLink>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500">
            Aucun CRM ne correspond à votre recherche.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="mt-4 text-violet-600 hover:text-violet-700 font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
