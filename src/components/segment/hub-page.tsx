import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { platforms } from "@/lib/platforms";
import { SITE_URL } from "@/lib/constants";
import type { HubConfig } from "@/lib/hubs";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/json-ld";
import { SegmentHub } from "@/components/segment/segment-hub";

/**
 * Rendu générique d'un hub d'intention (config-driven).
 * Filtre platforms.ts via hub.match, trie par note, top 8.
 */
export function HubPage({ hub }: { hub: HubConfig }) {
  const matched = platforms
    .filter(hub.match)
    .sort((a, b) => b.scores.overall - a.scores.overall)
    .slice(0, 8);

  if (matched.length < 3) return notFound();

  const href = `/${hub.base}/${hub.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: hub.label, href },
        ]}
      />
      <ItemListJsonLd platforms={matched} />

      <SegmentHub
        segmentLabel={hub.label}
        breadcrumbName={hub.label}
        breadcrumbHref={href}
        pageTitle={hub.pageTitle}
        highlight={hub.highlight}
        intro={hub.intro}
        prosCards={hub.prosCards.map((c) => ({
          icon: <CheckCircle2 size={24} />,
          title: c.title,
          text: c.text,
        }))}
        platforms={matched}
        longProse={
          <div className="space-y-4 text-slate-700 leading-relaxed">
            {hub.prose.map((block, i) => (
              <div key={i}>
                <h2
                  className={`text-2xl font-bold text-slate-900 mb-4${i > 0 ? " mt-8" : ""}`}
                >
                  {block.h}
                </h2>
                {block.p.map((para, j) => (
                  <p key={j} className="mb-4">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        }
      />
    </>
  );
}

/** Métadonnées Next à partir d'une config de hub. */
export function hubMetadata(hub: HubConfig) {
  const url = `${SITE_URL}/${hub.base}/${hub.slug}`;
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      url,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: hub.metaTitle,
      description: hub.metaDescription,
    },
  };
}
