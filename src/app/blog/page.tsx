import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getAllBlogFrontmatter } from "@/lib/mdx";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: `Blog CRM : actualités, guides et comparatifs 2026`,
  description:
    "Retrouvez tous nos articles, guides et comparatifs sur les logiciels CRM : choix, tarifs, méthodologie de déploiement, avis utilisateurs.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `Blog CRM | ${SITE_NAME}`,
    description:
      "Articles, guides et comparatifs de logiciels CRM pour TPE, PME et grands comptes.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogFrontmatter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Le blog du Comparateur CRM
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Guides pratiques, comparatifs, et actualités pour choisir, déployer
            et tirer le maximum de votre logiciel CRM.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-center text-slate-500">
            Les premiers articles arrivent très bientôt.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(({ slug, data }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(data.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  {data.readingTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {data.readingTime} min
                    </span>
                  )}
                  {data.category && (
                    <Badge variant="outline" className="text-xs">
                      {data.category}
                    </Badge>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 mb-2 leading-snug">
                  {data.title}
                </h2>
                <p className="text-slate-600 mb-4 line-clamp-3 flex-1">
                  {data.description}
                </p>
                <span className="text-sm font-medium text-violet-600 inline-flex items-center gap-1">
                  Lire l&apos;article
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
  );
}
