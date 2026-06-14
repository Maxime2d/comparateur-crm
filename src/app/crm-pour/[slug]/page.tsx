import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHubsByBase, getHubBySlug } from "@/lib/hubs";
import { HubPage, hubMetadata } from "@/components/segment/hub-page";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getHubsByBase("crm-pour").map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hub = getHubBySlug("crm-pour", slug);
  return hub ? hubMetadata(hub) : {};
}

export default async function CrmPourPage({ params }: Props) {
  const { slug } = await params;
  const hub = getHubBySlug("crm-pour", slug);
  if (!hub) return notFound();
  return <HubPage hub={hub} />;
}
