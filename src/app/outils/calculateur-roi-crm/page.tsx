import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calculator, Sparkles } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { RoiCalculator } from "@/components/outils/roi-calculator";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Calculateur ROI CRM gratuit 2026 : estimez le retour sur investissement",
  description:
    "Calculez gratuitement le ROI de votre projet CRM en 30 secondes. Saisissez votre nombre de commerciaux, panier moyen et amélioration attendue : obtenez le gain prévisionnel et le délai d'amortissement.",
  alternates: { canonical: `${SITE_URL}/outils/calculateur-roi-crm` },
  openGraph: {
    title: `Calculateur ROI CRM | ${SITE_NAME}`,
    description: "Estimez le ROI d'un CRM en 30 secondes, gratuit et sans inscription.",
    url: `${SITE_URL}/outils/calculateur-roi-crm`,
    type: "website",
  },
};

export default function CalculateurRoiPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Outils", href: "/outils" },
          { name: "Calculateur ROI CRM", href: "/outils/calculateur-roi-crm" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Calculateur ROI CRM",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: `${SITE_URL}/outils/calculateur-roi-crm`,
          offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
          description:
            "Outil gratuit pour estimer le retour sur investissement d'un projet CRM en fonction de votre activité commerciale.",
        }}
      />

      <PageHero
        eyebrow="Outil gratuit"
        eyebrowIcon={Calculator}
        title="Calculateur ROI CRM"
        highlight="ROI CRM"
        subtitle="Estimez en 30 secondes le retour sur investissement de votre projet CRM, sans inscription. Gain de chiffre d'affaires, ROI annuel, délai d'amortissement."
      />

      <div className="bg-[#fafaff] pb-20">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li>
                <Link href="/outils" className="hover:text-violet-600">
                  Outils
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">Calculateur ROI CRM</li>
            </ol>
          </nav>

          <RoiCalculator />

          {/* Méthodologie */}
          <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-violet-600" size={20} />
              <h2 className="text-2xl font-bold text-slate-900">
                Comment ce calcul fonctionne
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Notre calculateur applique une formule simple et transparente
                basée sur trois variables principales : votre activité actuelle,
                l&apos;amélioration attendue grâce au CRM, et le coût annuel de
                l&apos;outil.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm">
                <div>CA actuel = commerciaux × deals/mois × panier × 12</div>
                <div>CA avec CRM = CA actuel × (1 + amélioration%)</div>
                <div>Gain net = (CA CRM − CA actuel) − coût annuel CRM</div>
                <div>ROI = gain net / coût annuel × 100</div>
              </div>
              <p>
                <strong>L&apos;amélioration de 15 %</strong> proposée par défaut
                est issue d&apos;études Salesforce et Forrester sur l&apos;impact
                d&apos;un CRM bien adopté après 6-12 mois. Ce chiffre varie en
                réalité de 5 % à 30 % selon la maturité de votre équipe et la
                qualité du déploiement.
              </p>
              <p>
                <strong>Les leviers d&apos;amélioration</strong> typiques sont :
                réduction des affaires oubliées (relances automatiques),
                meilleure priorisation (scoring des leads), gain de temps
                administratif (génération automatique de devis), visibilité
                managériale accrue (dashboards en temps réel), et collaboration
                facilitée entre commercial et marketing.
              </p>
            </div>
          </section>

          {/* Conseils pratiques */}
          <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4 conseils pour maximiser votre ROI CRM
            </h2>
            <ol className="space-y-4 text-slate-700">
              <li>
                <strong>1. Démarrer minimaliste.</strong> Configurez un pipeline
                simple, 3-4 stades maximum. Importez les contacts essentiels.
                Évitez de paramétrer 50 champs custom dès le départ — l&apos;équipe
                ne les remplira pas.
              </li>
              <li>
                <strong>2. Former les commerciaux en présentiel.</strong> Une
                formation à distance réussit rarement. Bloquez 2 demi-journées de
                formation pratique avec un cas réel par commercial. ROI immédiat.
              </li>
              <li>
                <strong>3. Connecter le CRM à votre boîte mail.</strong> 80 % de
                la valeur d&apos;un CRM vient de la synchronisation email
                bidirectionnelle Gmail ou Outlook. Sans ça, les commerciaux
                ressaisissent et abandonnent.
              </li>
              <li>
                <strong>4. Faire un point hebdomadaire pendant 2 mois.</strong> Le
                manager doit ouvrir le CRM avec son équipe une fois par semaine
                pendant les 8 premières semaines. Cela ancre l&apos;adoption.
                Sans ce rituel, le CRM meurt en 3 mois.
              </li>
            </ol>
          </section>

          {/* Cross-links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/quiz"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Quiz personnalisé
              </h3>
              <p className="text-sm text-slate-600">
                3 CRM recommandés pour votre profil en 2 minutes.
              </p>
            </Link>
            <Link
              href="/blog/comment-choisir-crm"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Comment choisir
              </h3>
              <p className="text-sm text-slate-600">
                Méthodologie complète en 8 étapes.
              </p>
            </Link>
            <Link
              href="/tarifs"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Tarifs comparés
              </h3>
              <p className="text-sm text-slate-600">
                Prix de 24 CRM filtrables.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
