import { Check, X } from "lucide-react";
import type { Platform } from "@/types/platform";
import { formatPrice } from "@/lib/utils";

/**
 * Corps de comparatif généré à partir des données structurées (platforms.ts).
 * Utilisé sur /comparer/{a}-vs-{b} quand aucun MDX rédigé n'existe.
 * Chaque section est dérivée des données → contenu unique par paire.
 */
export function GeneratedVsBody({ a, b }: { a: Platform; b: Platform }) {
  const winnerOn = (key: keyof Platform["scores"]) =>
    a.scores[key] === b.scores[key]
      ? null
      : a.scores[key] > b.scores[key]
        ? a
        : b;

  const cheaper =
    a.pricing.startsAt === b.pricing.startsAt
      ? null
      : a.pricing.startsAt < b.pricing.startsAt
        ? a
        : b;
  const overallWinner = a.scores.overall >= b.scores.overall ? a : b;

  return (
    <div className="space-y-10">
      {/* L'essentiel */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          {a.name} vs {b.name} : l&apos;essentiel
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Sur notre comparateur, <strong>{a.name}</strong> obtient{" "}
          {a.scores.overall}/10 et <strong>{b.name}</strong> {b.scores.overall}
          /10. {overallWinner.name} prend l&apos;avantage sur la note globale
          {cheaper
            ? `, tandis que ${cheaper.name} est le plus accessible à l'entrée (${formatPrice(cheaper.pricing.startsAt, cheaper.pricing.onQuote)}).`
            : `, pour un tarif d'entrée comparable.`}{" "}
          {winnerOn("ux") &&
            `${winnerOn("ux")!.name} est jugé plus simple à prendre en main. `}
          {winnerOn("features") &&
            `${winnerOn("features")!.name} est le plus complet côté fonctionnalités.`}
        </p>
      </section>

      {/* Tarifs */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Comparatif des tarifs
        </h2>
        <ul className="space-y-2 text-slate-700">
          <li>
            <strong>{a.name}</strong> : à partir de{" "}
            {formatPrice(a.pricing.startsAt, a.pricing.onQuote)}
            {a.pricing.hasFreePlan
              ? " — avec un plan gratuit"
              : a.pricing.hasFreeTrial
                ? ` — essai gratuit de ${a.pricing.freeTrialDays} jours`
                : ""}
            . {a.pricing.details}
          </li>
          <li>
            <strong>{b.name}</strong> : à partir de{" "}
            {formatPrice(b.pricing.startsAt, b.pricing.onQuote)}
            {b.pricing.hasFreePlan
              ? " — avec un plan gratuit"
              : b.pricing.hasFreeTrial
                ? ` — essai gratuit de ${b.pricing.freeTrialDays} jours`
                : ""}
            . {b.pricing.details}
          </li>
        </ul>
      </section>

      {/* Pour qui */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Pour qui : forces et limites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[a, b].map((p) => (
            <div
              key={p.slug}
              className="rounded-xl border border-slate-200 p-5"
            >
              <h3 className="font-bold text-slate-900 mb-1">{p.name}</h3>
              <p className="text-sm text-slate-500 mb-3">
                Idéal pour : {p.target.mainTarget}
              </p>
              <ul className="space-y-1.5 mb-3">
                {p.prosAndCons.pros.slice(0, 4).map((pro) => (
                  <li
                    key={pro}
                    className="flex gap-2 text-sm text-slate-700"
                  >
                    <Check
                      size={16}
                      className="text-emerald-600 flex-shrink-0 mt-0.5"
                    />
                    {pro}
                  </li>
                ))}
              </ul>
              <ul className="space-y-1.5">
                {p.prosAndCons.cons.slice(0, 3).map((con) => (
                  <li key={con} className="flex gap-2 text-sm text-slate-500">
                    <X size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Verdict */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Lequel choisir ?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Choisissez <strong>{a.name}</strong> si vous priorisez{" "}
          {strengthPhrase(a, b)}. Optez pour <strong>{b.name}</strong> si votre
          priorité est {strengthPhrase(b, a)}. En cas de doute, {overallWinner.name}{" "}
          reste la valeur sûre au vu de sa note globale ({overallWinner.scores.overall}
          /10), mais le bon choix dépend surtout de votre budget et de votre
          processus de vente.
        </p>
      </section>
    </div>
  );
}

/** Renvoie l'axe sur lequel `p` se distingue le plus face à `other`. */
function strengthPhrase(p: Platform, other: Platform): string {
  const axes: { key: keyof Platform["scores"]; label: string }[] = [
    { key: "ux", label: "la simplicité d'utilisation" },
    { key: "features", label: "la richesse fonctionnelle" },
    { key: "pricing", label: "le rapport qualité-prix" },
    { key: "integrations", label: "les intégrations" },
    { key: "support", label: "la qualité du support" },
  ];
  let best = axes[0];
  let bestDelta = -Infinity;
  for (const ax of axes) {
    const delta = p.scores[ax.key] - other.scores[ax.key];
    if (delta > bestDelta) {
      bestDelta = delta;
      best = ax;
    }
  }
  return best.label;
}
