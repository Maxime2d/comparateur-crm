import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAllPlatformSlugs, getPlatformBySlug } from "@/lib/platforms";

// ─── SEO helpers : FAQ + maillage interne ───────────────────────────────
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Extrait les paires question/réponse d'une section FAQ d'un MDX.
 * Repère un h2 contenant "FAQ" ou "questions fréquentes", puis collecte
 * les h3 (questions) et le texte qui suit (réponse) jusqu'au h2 suivant.
 * Sert à générer le schema FAQPage (rich snippets Google).
 */
export function extractFaqs(raw: string): FaqItem[] {
  const lines = raw.split("\n");
  const faqs: FaqItem[] = [];
  let inFaq = false;
  let current: { question: string; answer: string[] } | null = null;

  const flush = () => {
    if (current && current.answer.join(" ").trim()) {
      faqs.push({
        question: current.question.trim(),
        answer: stripMarkdown(current.answer.join(" ")).trim(),
      });
    }
    current = null;
  };

  for (const line of lines) {
    const h2 = /^##\s+(.*)$/.exec(line);
    if (h2) {
      // Nouveau h2 : on quitte la FAQ si on y était.
      if (inFaq) {
        flush();
        inFaq = false;
      }
      if (/faq|questions?\s+fr[ée]quentes/i.test(h2[1])) inFaq = true;
      continue;
    }
    if (!inFaq) continue;
    // Question = h3 (### …) OU ligne entièrement en gras (**…**).
    const h3 = /^###\s+(.*)$/.exec(line);
    const boldQ = /^\*\*(.+?)\*\*:?\s*$/.exec(line.trim());
    if (h3) {
      flush();
      current = { question: h3[1].replace(/[#*]/g, "").trim(), answer: [] };
    } else if (boldQ) {
      flush();
      current = { question: boldQ[1].trim(), answer: [] };
    } else if (current && line.trim()) {
      current.answer.push(line.trim());
    }
  }
  if (inFaq) flush();
  return faqs.filter((f) => f.question && f.answer);
}

function stripMarkdown(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // liens -> texte
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ");
}

function brandAlias(name: string): string {
  return name
    .replace(/\.io/i, "")
    .replace(/\bSales\b/i, "")
    .replace(/\bCRM\b/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Détecte les CRM mentionnés dans un contenu (par nom de marque ou lien
 * /crm/{slug}) pour alimenter un bloc de liens internes (PillarLinks).
 */
export function detectPlatformSlugs(
  raw: string,
  opts: { priority?: string; max?: number } = {},
): string[] {
  const { priority, max = 6 } = opts;
  const found: string[] = [];
  for (const slug of getAllPlatformSlugs()) {
    const p = getPlatformBySlug(slug);
    if (!p) continue;
    const alias = brandAlias(p.name);
    const matched =
      raw.includes(`/crm/${slug}`) ||
      raw.includes(p.name) ||
      (alias.length >= 3 && raw.includes(alias));
    if (matched) found.push(slug);
  }
  // Met le CRM prioritaire (featuredPlatform / platformA) en tête.
  const ordered = priority
    ? [priority, ...found.filter((s) => s !== priority)]
    : found;
  return Array.from(new Set(ordered)).slice(0, max);
}

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
  /** Optional — date de dernière mise à jour (dateModified). Fallback: date. */
  updated?: string;
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
  /** Optional — date de dernière mise à jour (dateModified). Fallback: date. */
  updated?: string;
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

/**
 * Retourne le slug de l'article d'avis/test correspondant à un CRM
 * (frontmatter featuredPlatform === platformSlug + nom de fichier "…-avis-…").
 * Sert au lien croisé fiche ↔ article (anti-cannibalisation).
 */
export function getReviewSlugForPlatform(platformSlug: string): string | null {
  const match = getAllBlogSlugs().find((slug) => {
    if (!/avis/.test(slug)) return false;
    return getBlogFrontmatter(slug)?.featuredPlatform === platformSlug;
  });
  return match || null;
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const { data, content: rawContent } = readMdxFile(BLOG_DIR, slug);
    const content = await compileMdxContent(rawContent);
    const fm = data as BlogFrontmatter;
    return {
      frontmatter: fm,
      content,
      faqs: extractFaqs(rawContent),
      mentionedSlugs: detectPlatformSlugs(rawContent, {
        priority: fm.featuredPlatform,
      }),
    };
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
    return {
      frontmatter: data as GuideFrontmatter,
      content,
      faqs: extractFaqs(rawContent),
      mentionedSlugs: detectPlatformSlugs(rawContent),
    };
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
    return {
      frontmatter: data as ComparisonFrontmatter,
      content,
      faqs: extractFaqs(rawContent),
    };
  } catch {
    return null;
  }
}

/**
 * Comparaisons connexes : autres pages VS partageant l'un des 2 CRM.
 * Sert au maillage interne en bas des pages /comparer/{slug}.
 */
export function getRelatedComparisons(
  currentSlug: string,
  platformA: string,
  platformB: string,
  max = 4,
): { slug: string; data: ComparisonFrontmatter }[] {
  return getAllComparisonsFrontmatter()
    .filter(
      ({ slug, data }) =>
        slug !== currentSlug &&
        (data.platformA === platformA ||
          data.platformB === platformA ||
          data.platformA === platformB ||
          data.platformB === platformB),
    )
    .slice(0, max);
}
