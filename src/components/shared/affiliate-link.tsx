"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  buildAffiliateUrl,
  trackAffiliateClick,
  type AffiliateSource,
} from "@/lib/affiliate";

type Variant =
  | "text"
  | "button-primary"
  | "button-secondary"
  | "button-outline"
  | "unstyled";
type Size = "sm" | "md" | "lg";

interface AffiliateLinkProps {
  /** Raw affiliate URL (from platform data). UTM params are added automatically. */
  href: string;
  platformName: string;
  platformSlug: string;
  source: AffiliateSource;
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  /** Render full-width (useful for sticky mobile CTAs). */
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  text: "text-violet-600 hover:text-violet-700 underline-offset-2 hover:underline inline-flex items-center gap-1.5",
  "button-primary":
    "inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold rounded-xl shadow-md shadow-violet-600/20 hover:shadow-lg hover:shadow-violet-600/30 transition-all duration-200",
  "button-secondary":
    "inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-violet-700 font-semibold rounded-xl border border-violet-200 hover:border-violet-400 transition-all duration-200",
  "button-outline":
    "inline-flex items-center justify-center gap-2 bg-transparent hover:bg-violet-50 text-violet-700 font-semibold rounded-xl border-2 border-violet-600 transition-all duration-200",
  unstyled: "",
};

const SIZES: Record<Size, string> = {
  sm: "text-sm px-3.5 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3",
};

export function AffiliateLink({
  href,
  platformName,
  platformSlug,
  source,
  children,
  className,
  variant = "text",
  size = "md",
  fullWidth = false,
}: AffiliateLinkProps) {
  const trackedHref = buildAffiliateUrl({
    baseUrl: href,
    platformSlug,
    source,
  });

  const handleClick = () => {
    trackAffiliateClick(platformName, platformSlug, source);
  };

  const variantClass = VARIANTS[variant];
  const needsSize = variant.startsWith("button-");
  const sizeClass = needsSize ? SIZES[size] : "";
  const fullClass = fullWidth ? "w-full" : "";

  return (
    <a
      href={trackedHref}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      onClick={handleClick}
      className={cn(variantClass, sizeClass, fullClass, className)}
      title={`Visiter ${platformName} (lien affilié)`}
      data-platform={platformSlug}
      data-source={source}
    >
      {children}
    </a>
  );
}
