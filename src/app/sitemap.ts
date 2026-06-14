import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllPlatformSlugs } from "@/lib/platforms";
import {
  getAllBlogFrontmatter,
  getAllGuidesFrontmatter,
  getAllComparisonsFrontmatter,
} from "@/lib/mdx";
import { getGeneratedComparisonSlugs } from "@/lib/vs-pairs";
import { HUBS } from "@/lib/hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const guides = getAllGuidesFrontmatter();

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
    // /guide n'est ajouté que s'il existe au moins un guide (cf. plus bas).
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
    {
      url: `${SITE_URL}/crm-gratuit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/crm-tpe`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/crm-startup`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/crm-freelance`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/crm-open-source`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/outils`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/outils/calculateur-roi-crm`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/outils/calculateur-tco-crm`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/outils/comparateur-plans-free`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/observatoire-crm`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
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

  const alternativePages: MetadataRoute.Sitemap = getAllPlatformSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/crm/${slug}/alternatives`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
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

  // La page d'index /guide n'est listée que si des guides existent
  // (évite d'indexer une page vide).
  const guideIndex: MetadataRoute.Sitemap = guides.length
    ? [
        {
          url: `${SITE_URL}/guide`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
      ]
    : [];

  const guidePages: MetadataRoute.Sitemap = guides.map(({ slug, data }) => ({
    url: `${SITE_URL}/guide/${slug}`,
    lastModified: data.date || now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonPages: MetadataRoute.Sitemap =
    getAllComparisonsFrontmatter().map(({ slug, data }) => ({
      url: `${SITE_URL}/comparer/${slug}`,
      lastModified: data.date || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const generatedComparisonPages: MetadataRoute.Sitemap =
    getGeneratedComparisonSlugs().map((slug) => ({
      url: `${SITE_URL}/comparer/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    }));

  const hubPages: MetadataRoute.Sitemap = HUBS.map((h) => ({
    url: `${SITE_URL}/${h.base}/${h.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...platformPages,
    ...alternativePages,
    ...blogPages,
    ...guideIndex,
    ...guidePages,
    ...comparisonPages,
    ...generatedComparisonPages,
    ...hubPages,
  ];
}
