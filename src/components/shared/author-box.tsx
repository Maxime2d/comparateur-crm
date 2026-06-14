import Link from "next/link";
import { BadgeCheck, ArrowUpRight } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

/**
 * Bloc auteur / confiance (E-E-A-T) affiché en tête d'article.
 * Renforce les signaux d'expertise et renvoie vers la méthodologie de test.
 */
export function AuthorBox({
  author = `Équipe ${SITE_NAME}`,
  date,
  updated,
}: {
  author?: string;
  date?: string;
  updated?: string;
}) {
  const fmt = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : null;
  const publishedLabel = fmt(date);
  const updatedLabel = updated && updated !== date ? fmt(updated) : null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
      <span className="inline-flex items-center gap-2 font-semibold text-slate-800">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
          <BadgeCheck size={15} />
        </span>
        {author}
      </span>
      {publishedLabel && (
        <span className="text-slate-500">
          Publié le {publishedLabel}
          {updatedLabel && <> · Mis à jour le {updatedLabel}</>}
        </span>
      )}
      <Link
        href="/methodologie"
        className="ml-auto inline-flex items-center gap-1 font-medium text-violet-600 hover:text-violet-700"
      >
        Notre méthodologie de test
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}
