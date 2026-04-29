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
  const externalReviews = platform.externalReviews || [];
  const totalExternalReviews = externalReviews.reduce(
    (sum, r) => sum + r.reviewCount,
    0,
  );

  // Note moyenne pondérée : si on a des reviews externes (G2, Capterra…),
  // on les utilise. Sinon on tombe sur notre note interne.
  const aggregateRating = totalExternalReviews > 0
    ? {
        "@type": "AggregateRating",
        ratingValue:
          Math.round(
            (externalReviews.reduce((s, r) => s + r.rating * r.reviewCount, 0) /
              totalExternalReviews) * 10,
          ) / 10,
        bestRating: 5,
        worstRating: 1,
        ratingCount: totalExternalReviews,
      }
    : {
        // Pas de reviews externes → on émet quand même une AggregateRating
        // basée sur notre score éditorial (sur 10, ramené sur 5)
        "@type": "AggregateRating",
        ratingValue: Math.round((platform.scores.overall / 2) * 10) / 10,
        bestRating: 5,
        worstRating: 1,
        ratingCount: 1,
      };

  // Review array : notre review éditoriale + les reviews externes si on les a
  const reviewList = [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: Math.round((platform.scores.overall / 2) * 10) / 10,
        bestRating: 5,
        worstRating: 1,
      },
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      datePublished: platform.lastUpdated || "2026-04-01",
      reviewBody: platform.description.slice(0, 500),
      name: `Avis ${platform.name} par ${SITE_NAME}`,
    },
    ...externalReviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: { "@type": "Organization", name: r.source },
      url: r.url,
    })),
  ];

  // Image : on utilise l'OG image dynamique générée par Next.js
  // (route /crm/[slug]/opengraph-image.tsx) qui produit du PNG 1200×630
  const imageUrl = `${SITE_URL}/crm/${platform.slug}/opengraph-image`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        // Garde SoftwareApplication (plus précis) mais ajoute les champs
        // que Google attend pour les Product Snippets
        "@type": ["SoftwareApplication", "Product"],
        name: platform.name,
        description: platform.description,
        url: `${SITE_URL}/crm/${platform.slug}`,
        // Champ critique manquant signalé par GSC
        image: [imageUrl],
        // Brand (équivaut à GTIN pour les softwares)
        brand: {
          "@type": "Brand",
          name: platform.name,
        },
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "CRM",
        operatingSystem: "Web, iOS, Android",
        inLanguage: "fr-FR",
        offers: {
          "@type": "Offer",
          price: platform.pricing.startsAt || 0,
          priceCurrency: "EUR",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: platform.website,
          seller: {
            "@type": "Organization",
            name: platform.name,
            url: platform.website,
          },
          // Pour un SaaS : livraison instantanée gratuite (logiciel digital)
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: 0,
              currency: "EUR",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "FR",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 0,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 0,
                unitCode: "DAY",
              },
            },
          },
          // Délai légal de rétractation FR (14 jours)
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "FR",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 14,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
        },
        aggregateRating,
        review: reviewList,
      }}
    />
  );
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
