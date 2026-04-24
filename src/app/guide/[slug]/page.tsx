import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, ChevronRight } from "lucide-react";
import {
  getAllGuideSlugs,
  getGuideFrontmatter,
  getGuideBySlug,
} from "@/lib/mdx";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { TableOfContents } from "@/components/shared/table-of-contents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fm = getGuideFrontmatter(slug);
  if (!fm) return {};
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: `${SITE_URL}/guide/${slug}` },
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      url: `${SITE_URL}/guide/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return notFound();

  const { frontmatter, content } = guide;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Guides", href: "/guide" },
          { name: frontmatter.title, href: `/guide/${slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: frontmatter.title,
          description: frontmatter.description,
          datePublished: frontmatter.date,
          dateModified: frontmatter.date,
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          mainEntityOfPage: `${SITE_URL}/guide/${slug}`,
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li>
                <Link href="/guide" className="hover:text-violet-600">
                  Guides
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium truncate max-w-xs">
                {frontmatter.title}
              </li>
            </ol>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
          <article className="max-w-3xl">
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
                {frontmatter.title}
              </h1>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                {frontmatter.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                {frontmatter.readTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} />
                    {frontmatter.readTime}
                  </span>
                )}
              </div>
            </header>

            <div>{content}</div>

            <div className="mt-12 pt-6 border-t border-slate-200">
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
              >
                <ArrowLeft size={16} />
                Voir tous les guides
              </Link>
            </div>
          </article>

          <aside className="hidden lg:block">
            <TableOfContents contentRef="article" />
          </aside>
        </div>
      </div>
    </>
  );
}
