import Link from "next/link";
import { Platform } from "@/types/platform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreBadge } from "@/components/ui/score-badge";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { formatPrice, getCtaLabel } from "@/lib/utils";
import { ExternalLink, Star, ArrowRight } from "lucide-react";

interface PlatformCardProps {
  platform: Platform;
  rank?: number;
}

export function PlatformCard({ platform, rank }: PlatformCardProps) {
  const rankBadgeColors: Record<number, string> = {
    1: "bg-amber-400 text-amber-900",
    2: "bg-slate-300 text-slate-800",
    3: "bg-amber-600 text-white",
  };

  return (
    <div className="relative group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {rank && (
          <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${rankBadgeColors[rank] || "bg-slate-100 text-slate-600"}`}>
            #{rank}
          </div>
        )}

        <div className="flex items-center gap-4 flex-shrink-0">
          <PlatformLogo website={platform.website} name={platform.name} size={32} />
          <div>
            <h3 className="text-lg font-bold text-slate-900">{platform.name}</h3>
            <p className="text-sm text-slate-500">{platform.shortDescription}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-wrap items-center gap-2">
          {platform.badges.slice(0, 3).map((badge) => (
            <Badge key={badge} className="text-xs">{badge}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">
              {formatPrice(platform.pricing.startsAt, platform.pricing.onQuote)}
            </div>
            {platform.pricing.startsAt > 0 && (
              <div className="text-xs text-slate-500">/utilisateur/mois</div>
            )}
          </div>

          <ScoreBadge score={platform.scores.overall} />
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 sm:justify-end">
        <Link href={`/crm/${platform.slug}`} className="text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1">
          Voir le détail <ArrowRight className="h-4 w-4" />
        </Link>
        <AffiliateLink href={platform.affiliateUrl} platformName={platform.name} platformSlug={platform.slug} source="comparateur" variant="button-secondary">
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white">
            {getCtaLabel(platform.pricing)} <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </AffiliateLink>
      </div>
    </div>
  );
}
