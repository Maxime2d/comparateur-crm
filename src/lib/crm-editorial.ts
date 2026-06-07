import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";

// ─── Editorial CRM content (long-form analysis added per slug) ────────────
// Stored in src/content/crm-editorial/<slug>.mdx. Loaded optionally by the
// CRM fiche page — missing files render nothing (graceful fallback).

const EDITORIAL_DIR = path.join(
  process.cwd(),
  "src",
  "content",
  "crm-editorial",
);

export interface CrmEditorialFrontmatter {
  slug: string;
  title?: string;
  lastReviewedAt?: string;
}

export function hasCrmEditorial(slug: string): boolean {
  try {
    return fs.existsSync(path.join(EDITORIAL_DIR, `${slug}.mdx`));
  } catch {
    return false;
  }
}

export async function getCrmEditorialBySlug(slug: string) {
  try {
    const filePath = path.join(EDITORIAL_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content: rawContent } = matter(raw);
    const { content } = await compileMDX({
      source: rawContent,
      components: mdxComponents,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });
    return { frontmatter: data as CrmEditorialFrontmatter, content };
  } catch {
    return null;
  }
}
