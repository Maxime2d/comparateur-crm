import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { getAllGuidesFrontmatter } from "@/lib/mdx";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Guides CRM : méthodes, bonnes pratiques et tutoriels",
  description:
    "Tous nos guides pour choisir, déployer et tirer le meilleur parti d'un logiciel CRM dans votre entreprise.",
  alternates: { canonical: `${SITE_URL}/guide` },
  openGraph: {
    title: `Guides CRM | ${SITE_NAME}`,
    description:
      "Guides pratiques sur les CRM : choix, déploiement, adoption, ROI.",
    url: `${SITE_URL}/guide`,
    type: "website",
  },
};

export default function GuidesIndexPage() {
  const guides = getAllGuidesFrontmatter();

  return (
    <>
      <PageHero
        eyebrow="Guide complet"
        eyebrowIcon={BookOpen}
        title="Tout comprendre aux logiciels CRM"
        highlight="logiciels CRM"
        subtitle="Guides complets pour choisir, déployer et réussir l'adoption de votre CRM."
      />

      <div className="bg-[#fafaff] py-12">
        <div className="max-w-5xl mx-auto px-4">

        {guides.length === 0 ? (
          <p className="text-center text-slate-500">
            Les premiers guides arrivent très bientôt.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(({ slug, data }) => (
              <Link
                key={slug}
                href={`/guide/${slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  {data.readTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {data.readTime}
                    </span>
                  )}
                  {data.category && <span>· {data.category}</span>}
                </div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 mb-2 leading-snug">
                  {data.title}
                </h2>
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {data.description}
                </p>
                <span className="text-sm font-medium text-violet-600 inline-flex items-center gap-1">
                  Lire le guide
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </Link>
            ))}
          </div>
        )}
        </div>
      </div>
    </>
  );
}
