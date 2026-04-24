import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { getAllComparisonsFrontmatter } from "@/lib/mdx";
import { getPlatformBySlug } from "@/lib/platforms";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Comparaisons CRM : comparatifs 1:1 entre logiciels CRM",
  description:
    "Tous nos comparatifs face-à-face entre les principaux logiciels CRM : HubSpot, Pipedrive, Salesforce, Sellsy, Zoho et plus.",
  alternates: { canonical: `${SITE_URL}/comparer` },
};

export default function ComparisonsIndexPage() {
  const comparisons = getAllComparisonsFrontmatter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 mb-4">
            <Scale size={14} />
            Comparaisons 1:1
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Quel CRM choisir ? Nos comparatifs face-à-face
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Feature par feature, prix par prix. Nos comparatifs pour trancher
            entre deux logiciels CRM.
          </p>
        </header>

        {comparisons.length === 0 ? (
          <p className="text-center text-slate-500">
            Les premières comparaisons arrivent bientôt.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map(({ slug, data }) => {
              const a = getPlatformBySlug(data.platformA);
              const b = getPlatformBySlug(data.platformB);
              return (
                <Link
                  key={slug}
                  href={`/comparer/${slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3 text-sm text-slate-500">
                    <span className="font-semibold text-slate-900">
                      {a?.name || data.platformA}
                    </span>
                    <span>vs</span>
                    <span className="font-semibold text-slate-900">
                      {b?.name || data.platformB}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 mb-2">
                    {data.title}
                  </h2>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {data.description}
                  </p>
                  <span className="text-sm font-medium text-violet-600 inline-flex items-center gap-1">
                    Voir le comparatif
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
