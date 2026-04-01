"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AffiliateLinkProps {
  href: string;
  platformName: string;
  platformSlug: string;
  source: string;
  children: React.ReactNode;
  className?: string;
  variant?: "text" | "button-primary" | "button-secondary";
}

export function AffiliateLink({ href, platformName, platformSlug, source, children, className, variant = "text" }: AffiliateLinkProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any)._paq) {
      (window as any)._paq.push(["trackEvent", "Affiliate", "Click", `${platformSlug}_${source}`]);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={cn(className)}
      title={`Visiter ${platformName}`}
    >
      {children}
    </a>
  );
}
