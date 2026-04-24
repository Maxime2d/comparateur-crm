import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPlatformBySlug } from "@/lib/platforms";
import { PlatformLogo } from "@/components/shared/platform-logo";

interface PillarLinksProps {
  /** Array of CRM slugs to link to from within an article */
  platformSlugs: string[];
  title?: string;
}

/**
 * Dense block of internal links from an article back to relevant CRM fiches.
 * Used at the bottom of blog posts to pass link juice + give the reader
 * concrete next steps.
 */
export function PillarLinks({
  platformSlugs,
  title = "CRM évoqués dans cet article",
}: PillarLinksProps) {
  const platforms = platformSlugs
    .map((slug) => getPlatformBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (platforms.length === 0) return null;

  return (
    <aside
      className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
      aria-label={title}
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {platforms.map((p) => (
          <Link
            key={p.slug}
            href={`/crm/${p.slug}`}
            className="group flex items-center gap-3 rounded-xl bg-white border border-slate-200 p-3 hover:border-violet-300 hover:shadow-sm transition-all"
          >
            <PlatformLogo website={p.website} name={p.name} size={32} />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-900 truncate">
                {p.name}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {p.shortDescription}
              </div>
            </div>
            <ArrowRight
              size={16}
              className="text-violet-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        ))}
      </div>
    </aside>
  );
}
