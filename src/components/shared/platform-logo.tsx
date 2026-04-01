import Image from "next/image";

interface PlatformLogoProps {
  website: string;
  name: string;
  size?: number;
  className?: string;
}

export function PlatformLogo({ website, name, size = 32, className }: PlatformLogoProps) {
  const domain = new URL(website).hostname;
  return (
    <Image
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${size * 2}`}
      alt={`Logo ${name}`}
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}
