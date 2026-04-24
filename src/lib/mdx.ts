import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";

// ─── Content directories ────────────────────────────────────────────────
const CONTENT_ROOT = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_ROOT, "blog");
const GUIDES_DIR = path.join(CONTENT_ROOT, "guides");
const COMPARISONS_DIR = path.join(CONTENT_ROOT, "comparisons");

// ─── Types ──────────────────────────────────────────────────────────────
export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readingTime: number;
  tags: string[];
  /** Optional — slug of a CRM to feature as inline CTA in the article */
  featuredPlatform?: string;
}

export interface GuideFrontmatter {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category?: string;
}

export interface ComparisonFrontmatter {
  title: string;
  description: string;
  date: string;
  /** Slugs of the 2 CRMs being compared */
  platformA: string;
  platformB: string;
  readingTime?: number;
}

// ─── Generic helpers ────────────────────────────────────────────────────
function getSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readMdxFile(dir: string, slug: string) {
  const filePath = path.join(dir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content, filePath };
}

async function compileMdxContent(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
  return content;
}

// ─── Blog helpers ───────────────────────────────────────────────────────
export function getAllBlogSlugs(): string[] {
  return getSlugs(BLOG_DIR);
}

export function getBlogFrontmatter(slug: string): BlogFrontmatter | null {
  try {
    const { data } = readMdxFile(BLOG_DIR, slug);
    return data as BlogFrontmatter;
  } catch {
    return null;
  }
}

export function getAllBlogFrontmatter(): {
  slug: string;
  data: BlogFrontmatter;
}[] {
  return getAllBlogSlugs()
    .map((slug) => ({ slug, data: getBlogFrontmatter(slug)! }))
    .filter((p) => p.data)
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const { data, content: rawContent } = readMdxFile(BLOG_DIR, slug);
    const content = await compileMdxContent(rawContent);
    return { frontmatter: data as BlogFrontmatter, content };
  } catch {
    return null;
  }
}

// ─── Guide helpers ──────────────────────────────────────────────────────
export function getAllGuideSlugs(): string[] {
  return getSlugs(GUIDES_DIR);
}

export function getGuideFrontmatter(slug: string): GuideFrontmatter | null {
  try {
    const { data } = readMdxFile(GUIDES_DIR, slug);
    return data as GuideFrontmatter;
  } catch {
    return null;
  }
}

export function getAllGuidesFrontmatter(): {
  slug: string;
  data: GuideFrontmatter;
}[] {
  return getAllGuideSlugs()
    .map((slug) => ({ slug, data: getGuideFrontmatter(slug)! }))
    .filter((p) => p.data);
}

export async function getGuideBySlug(slug: string) {
  try {
    const { data, content: rawContent } = readMdxFile(GUIDES_DIR, slug);
    const content = await compileMdxContent(rawContent);
    return { frontmatter: data as GuideFrontmatter, content };
  } catch {
    return null;
  }
}

// ─── Comparison (VS pages) helpers ──────────────────────────────────────
export function getAllComparisonSlugs(): string[] {
  return getSlugs(COMPARISONS_DIR);
}

export function getComparisonFrontmatter(
  slug: string,
): ComparisonFrontmatter | null {
  try {
    const { data } = readMdxFile(COMPARISONS_DIR, slug);
    return data as ComparisonFrontmatter;
  } catch {
    return null;
  }
}

export function getAllComparisonsFrontmatter(): {
  slug: string;
  data: ComparisonFrontmatter;
}[] {
  return getAllComparisonSlugs()
    .map((slug) => ({ slug, data: getComparisonFrontmatter(slug)! }))
    .filter((p) => p.data);
}

export async function getComparisonBySlug(slug: string) {
  try {
    const { data, content: rawContent } = readMdxFile(COMPARISONS_DIR, slug);
    const content = await compileMdxContent(rawContent);
    return { frontmatter: data as ComparisonFrontmatter, content };
  } catch {
    return null;
  }
}
