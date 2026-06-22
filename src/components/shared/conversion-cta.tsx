import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * Encart de conversion placé HAUT de page sur les pages d'entrée
 * (articles blog, guides). Les visiteurs arrivent majoritairement depuis Google
 * sur une page info et repartent sans atteindre le quiz/comparateur. Ce CTA,
 * au-dessus de la ligne de flottaison, leur ouvre un chemin de conversion
 * dès l'arrivée.
 *
 * Inspiré du même pattern qui fonctionne sur comparateur-efacturation.fr.
 */
export function ConversionCta({
  headline = "Pas sûr du CRM à choisir ?",
  subline = "Recevez la sélection adaptée à votre profil en 2 minutes.",
}: {
  headline?: string;
  subline?: string;
}) {
  return (
    <div className="my-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="flex items-center gap-2 text-sm font-semibold text-violet-700">
            <Sparkles className="h-4 w-4 shrink-0" /> {headline}
          </p>
          <p className="mt-1 text-base font-bold text-slate-900">{subline}</p>
          <p className="text-sm text-slate-500">Gratuit, sans inscription.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors"
          >
            Faire le quiz gratuit <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/comparateur"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-violet-300 transition-colors"
          >
            Comparatif des 27 CRM
          </Link>
        </div>
      </div>
    </div>
  );
}
