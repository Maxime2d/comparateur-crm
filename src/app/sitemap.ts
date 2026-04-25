import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllPlatformSlugs } from "@/lib/platforms";
import {
  getAllBlogFrontmatter,
  getAllGuidesFrontmatter,
  getAllComparisonsFrontmatter,
} from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/comparateur`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tarifs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/quiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/comparer`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/crm-francais`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/methodologie`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/a-propos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/glossaire-crm`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const platformPages: MetadataRoute.Sitemap = getAllPlatformSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/crm/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const blogPages: MetadataRoute.Sitemap = getAllBlogFrontmatter().map(
    ({ slug, data }) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: data.date || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const guidePages: MetadataRoute.Sitemap = getAllGuidesFrontmatter().map(
    ({ slug, data }) => ({
      url: `${SITE_URL}/guide/${slug}`,
      lastModified: data.date || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const comparisonPages: MetadataRoute.Sitemap =
    getAllComparisonsFrontmatter().map(({ slug, data }) => ({
      url: `${SITE_URL}/comparer/${slug}`,
      lastModified: data.date || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...platformPages,
    ...blogPages,
    ...guidePages,
    ...comparisonPages,
  ];
}
