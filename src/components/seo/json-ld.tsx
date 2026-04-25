import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Platform } from "@/types/platform";

interface JsonLdProps { data: Record<string, unknown>; }

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "Comparez les meilleurs logiciels CRM en France. Quiz personnalisé, comparateur interactif, fiches détaillées.",
        inLanguage: "fr-FR",
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/comparateur?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
}: ArticleJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url: `${SITE_URL}${slug}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${slug}` },
        inLanguage: "fr-FR",
        datePublished: datePublished || new Date().toISOString(),
        dateModified: dateModified || datePublished || new Date().toISOString(),
        author: {
          "@type": "Organization",
          name: authorName || SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
        },
        ...(imageUrl ? { image: imageUrl } : {}),
      }}
    />
  );
}

export function PlatformJsonLd({ platform }: { platform: Platform }) {
  const reviews = platform.externalReviews || [];
  const totalReviews = reviews.reduce((sum, r) => sum + r.reviewCount, 0);
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: platform.name, description: platform.description, url: `${SITE_URL}/crm/${platform.slug}`, applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: platform.pricing.startsAt || 0, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: platform.website }, review: { "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: platform.scores.overall, bestRating: 10 }, author: { "@type": "Organization", name: SITE_NAME } }, ...(totalReviews > 0 ? { aggregateRating: { "@type": "AggregateRating", ratingValue: Math.round((reviews.reduce((sum, r) => sum + r.rating * r.reviewCount, 0) / totalReviews) * 10) / 10, bestRating: 10, ratingCount: totalReviews } } : {}) }} />;
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${SITE_URL}${item.href}` })) }} />;
}

export function OrganizationJsonLd() {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: SITE_URL, description: "Comparateur indépendant des meilleurs logiciels CRM en France.", sameAs: ["https://comparateur-efacturation.fr"] }} />;
}

export function ItemListJsonLd({ platforms }: { platforms: Platform[] }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Meilleurs logiciels CRM 2026", description: "Classement des meilleurs CRM en France.", numberOfItems: platforms.length, itemListElement: platforms.map((p, index) => ({ "@type": "ListItem", position: index + 1, name: p.name, url: `${SITE_URL}/crm/${p.slug}` })) }} />;
}

export function HowToJsonLd({ name, description, steps }: { name: string; description: string; steps: { name: string; text: string }[] }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "HowTo", name, description, step: steps.map((step, index) => ({ "@type": "HowToStep", position: index + 1, name: step.name, text: step.text })) }} />;
}
