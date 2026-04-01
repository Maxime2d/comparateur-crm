import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ComparateurClient } from "@/components/comparateur/comparateur-client";

export const metadata: Metadata = {
  title: "Comparateur CRM : Comparez 24+ logiciels CRM en France",
  description: "Filtrez et comparez les meilleurs logiciels CRM selon vos critères : taille d'entreprise, budget, fonctionnalités et intégrations.",
  alternates: { canonical: `${SITE_URL}/comparateur` },
};

export default function ComparateurPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Accueil", href: "/" }, { name: "Comparateur", href: "/comparateur" }]} />
      <ComparateurClient />
    </>
  );
}
