import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getAllBlogFrontmatter } from "@/lib/mdx";

interface RelatedArticlesProps {
  currentSlug: string;
  tags?: string[];
  limit?: number;
}

export function RelatedArticles({
  currentSlug,
  tags = [],
  limit = 3,
}: RelatedArticlesProps) {
  const all = getAllBlogFrontmatter();
  const others = all.filter((p) => p.slug !== currentSlug);

  // Rank by tag overlap, fall back to most recent
  const scored = others
    .map((p) => {
      const overlap = p.data.tags
        ? p.data.tags.filter((t) => tags.includes(t)).length
        : 0;
      return { ...p, score: overlap };
    })
    .sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    })
    .slice(0, limit);

  if (scored.length === 0) return null;

  return (
    <section aria-label="Articles liés" className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        À lire également
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {scored.map(({ slug, data }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="group block rounded-xl border border-slate-200 bg-white p-5 hover:border-violet-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
              <Calendar size={12} />
              {new Date(data.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2 line-clamp-2">
              {data.title}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
              {data.description}
            </p>
            <span className="text-sm text-violet-600 font-medium inline-flex items-center gap-1">
              Lire l&apos;article
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
