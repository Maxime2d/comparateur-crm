import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Platform } from "@/types/platform";

interface JsonLdProps { data: Record<string, unknown>; }

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function WebsiteJsonLd() {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, description: "Comparez les meilleurs logiciels CRM en France. Quiz personnalisé, comparateur interactif, fiches détaillées.", publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } }} />;
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
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: SITE_URL, description: "Comparateur indépendant des meilleurs logiciels CRM en France." }} />;
}

export function ItemListJsonLd({ platforms }: { platforms: Platform[] }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Meilleurs logiciels CRM 2026", description: "Classement des meilleurs CRM en France.", numberOfItems: platforms.length, itemListElement: platforms.map((p, index) => ({ "@type": "ListItem", position: index + 1, name: p.name, url: `${SITE_URL}/crm/${p.slug}` })) }} />;
}

export function HowToJsonLd({ name, description, steps }: { name: string; description: string; steps: { name: string; text: string }[] }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "HowTo", name, description, step: steps.map((step, index) => ({ "@type": "HowToStep", position: index + 1, name: step.name, text: step.text })) }} />;
}
