import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllPlatformSlugs } from "@/lib/platforms";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllPlatformSlugs();
  const now = new Date().toISOString();

  const platformPages = slugs.map((slug) => ({
    url: `${SITE_URL}/crm/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/comparateur`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...platformPages,
  ];
}
