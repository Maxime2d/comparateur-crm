import { ExternalLink, Sparkles } from "lucide-react";
import { getPlatformBySlug } from "@/lib/platforms";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getCtaLabel } from "@/lib/utils";
import type { AffiliateSource } from "@/lib/affiliate";

interface BlogPlatformCTAProps {
  /** Slug of the CRM to feature */
  slug: string;
  /** Where this CTA is placed, for tracking */
  source?: AffiliateSource;
  /** Optional custom blurb — defaults to the platform's shortDescription */
  blurb?: string;
}

/**
 * Inline CTA block designed to be dropped in the middle or end of a blog
 * article. Combines brand signal, key pricing info, and an affiliate link.
 */
export function BlogPlatformCTA({
  slug,
  source = "blog-mid-article",
  blurb,
}: BlogPlatformCTAProps) {
  const platform = getPlatformBySlug(slug);
  if (!platform) return null;

  return (
    <aside
      className="my-10 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-slate-50 p-6 md:p-8 shadow-sm"
      aria-label={`Solution recommandée : ${platform.name}`}
    >
      <div className="flex items-center gap-2 text-xs font-semibold text-violet-700 uppercase tracking-wider mb-4">
        <Sparkles size={14} />
        Solution recommandée
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-start gap-4 flex-1">
          <PlatformLogo website={platform.website} name={platform.name} size={48} />
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h3 className="text-xl font-bold text-slate-900">{platform.name}</h3>
              <span className="text-sm text-slate-500">
                {formatPrice(platform.pricing.startsAt, platform.pricing.onQuote)}
                {platform.pricing.startsAt > 0 && "/mois"}
              </span>
              {platform.pricing.hasFreePlan && (
                <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                  Plan gratuit
                </Badge>
              )}
            </div>
            <p className="text-slate-700 leading-relaxed">
              {blurb || platform.shortDescription}
            </p>
          </div>
        </div>
        <AffiliateLink
          href={platform.affiliateUrl}
          platformName={platform.name}
          platformSlug={platform.slug}
          source={source}
          variant="button-primary"
          size="md"
          className="flex-shrink-0"
        >
          {getCtaLabel(platform.pricing)}
          <ExternalLink size={16} />
        </AffiliateLink>
      </div>
    </aside>
  );
}
