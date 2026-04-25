import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calculator, BookOpen, Scale } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Outils gratuits CRM 2026 : calculateurs et diagnostics",
  description:
    "Boîte à outils gratuits pour vos projets CRM : calculateur de ROI, diagnostic de maturité, comparateur de TCO. Sans inscription, sans email demandé.",
  alternates: { canonical: `${SITE_URL}/outils` },
  openGraph: {
    title: `Outils CRM gratuits | ${SITE_NAME}`,
    description: "Calculateurs et diagnostics gratuits pour vos projets CRM.",
    url: `${SITE_URL}/outils`,
    type: "website",
  },
};

const tools = [
  {
    href: "/outils/calculateur-roi-crm",
    icon: Calculator,
    title: "Calculateur ROI CRM",
    description:
      "Estimez en 30 secondes le retour sur investissement de votre projet CRM. Gain de CA, ROI annuel, break-even.",
    available: true,
  },
  {
    href: "/quiz",
    icon: BookOpen,
    title: "Quiz CRM personnalisé",
    description:
      "Répondez à 8 questions et obtenez 3 recommandations adaptées à votre profil (taille, secteur, budget).",
    available: true,
  },
  {
    href: "/tarifs",
    icon: Scale,
    title: "Comparateur de tarifs",
    description:
      "Tableau interactif des prix de 24 logiciels CRM. Filtres par plan gratuit, essai, fourchette de prix.",
    available: true,
  },
];

export default function OutilsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Outils", href: "/outils" },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">Outils</li>
            </ol>
          </nav>

          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Outils gratuits pour votre projet CRM
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Calculateurs, diagnostics et comparateurs pour préparer votre choix.
              100% gratuits, sans inscription ni email demandé.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4 group-hover:bg-violet-200 transition-colors">
                    <Icon size={22} />
                  </div>
                  <h2 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2 text-lg">
                    {t.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
