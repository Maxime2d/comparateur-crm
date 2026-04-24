import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ChevronRight } from "lucide-react";
import {
  getAllBlogSlugs,
  getBlogFrontmatter,
  getBlogPostBySlug,
} from "@/lib/mdx";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { RelatedArticles } from "@/components/shared/related-articles";
import { BlogPlatformCTA } from "@/components/shared/blog-platform-cta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fm = getBlogFrontmatter(slug);
  if (!fm) return {};
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    keywords: fm.tags,
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      publishedTime: fm.date,
      authors: [fm.author],
      tags: fm.tags,
      url: `${SITE_URL}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return notFound();

  const { frontmatter, content } = post;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: frontmatter.title, href: `/blog/${slug}` },
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
          author: {
            "@type": "Organization",
            name: frontmatter.author || SITE_NAME,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
          keywords: frontmatter.tags?.join(", "),
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <nav
            aria-label="Fil d'Ariane"
            className="text-sm text-slate-500 mb-6"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li>
                <Link href="/blog" className="hover:text-violet-600">
                  Blog
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
              {frontmatter.category && (
                <Badge
                  variant="outline"
                  className="mb-4 border-violet-200 text-violet-700 bg-violet-50"
                >
                  {frontmatter.category}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
                {frontmatter.title}
              </h1>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                {frontmatter.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(frontmatter.date)}
                </span>
                {frontmatter.readingTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} />
                    {frontmatter.readingTime} min de lecture
                  </span>
                )}
                {frontmatter.author && (
                  <span>Par {frontmatter.author}</span>
                )}
              </div>
            </header>

            <div className="prose-none">{content}</div>

            {frontmatter.featuredPlatform && (
              <BlogPlatformCTA
                slug={frontmatter.featuredPlatform}
                source="blog-conclusion"
              />
            )}

            <RelatedArticles
              currentSlug={slug}
              tags={frontmatter.tags || []}
            />

            <div className="mt-12 pt-6 border-t border-slate-200">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
              >
                <ArrowLeft size={16} />
                Retour au blog
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
