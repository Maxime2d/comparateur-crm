import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Wallet, AlertTriangle } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { TcoCalculator } from "@/components/outils/tco-calculator";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Calculateur TCO CRM sur 3 ans : coût total réel",
  description:
    "Calculez le coût total de possession (TCO) de votre CRM sur 3 ans : licence, paramétrage, formation, intégrations. Comparaison réaliste sans frais cachés.",
  alternates: { canonical: `${SITE_URL}/outils/calculateur-tco-crm` },
  openGraph: {
    title: `Calculateur TCO CRM 3 ans | ${SITE_NAME}`,
    description:
      "Le vrai coût d'un CRM sur 3 ans : licence + paramétrage + formation + intégrations. Sans inscription.",
    url: `${SITE_URL}/outils/calculateur-tco-crm`,
    type: "website",
  },
};

export default function CalculateurTcoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Outils", href: "/outils" },
          { name: "Calculateur TCO CRM", href: "/outils/calculateur-tco-crm" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Calculateur TCO CRM sur 3 ans",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: `${SITE_URL}/outils/calculateur-tco-crm`,
          offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
          description:
            "Outil gratuit pour estimer le coût total de possession d'un CRM sur 3 ans (licence, paramétrage, formation, intégrations).",
        }}
      />

      <PageHero
        eyebrow="Outil gratuit"
        eyebrowIcon={Wallet}
        title="Calculateur TCO CRM sur 3 ans"
        highlight="TCO CRM"
        subtitle="Le vrai coût d'un CRM ne se limite pas à la licence. Calculez le coût total de possession (TCO) sur 3 ans en incluant paramétrage, formation et intégrations."
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
              <li className="text-slate-900 font-medium">Calculateur TCO CRM</li>
            </ol>
          </nav>

          <TcoCalculator />

          {/* Pourquoi le TCO */}
          <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-amber-600" size={20} />
              <h2 className="text-2xl font-bold text-slate-900">
                Pourquoi raisonner en TCO (et pas en prix licence)
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Le prix affiché par utilisateur et par mois ne représente
                qu&apos;une fraction du coût réel d&apos;un CRM. Sur 3 ans,
                plusieurs postes peuvent doubler la facture initiale et
                surprennent souvent les directions financières.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Paramétrage initial
                  </h3>
                  <p className="text-sm text-slate-700">
                    Configuration des pipelines, import des données existantes,
                    paramétrage des automatisations, intégration emails.
                    Compter <strong>1500 à 8000 €</strong> selon la complexité
                    (interne ou prestataire).
                  </p>
                </div>
                <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-xl p-4">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Formation utilisateurs
                  </h3>
                  <p className="text-sm text-slate-700">
                    Adoption = succès du CRM. Compter{" "}
                    <strong>100 à 400 € par utilisateur</strong> pour une
                    formation pratique de 2 demi-journées + suivi.
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Intégrations & connecteurs
                  </h3>
                  <p className="text-sm text-slate-700">
                    Synchronisation comptable, ERP, marketing automation,
                    téléphonie : entre <strong>0 et 1200 €/an</strong> selon
                    les outils déjà en place.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Support premium
                  </h3>
                  <p className="text-sm text-slate-700">
                    Sur les CRMs entreprise, l&apos;accès au support prioritaire
                    peut coûter <strong>10 à 25 % en plus</strong> de la
                    licence. À budgéter dès le départ.
                  </p>
                </div>
              </div>
              <p>
                <strong>Notre méthode de calcul</strong> : TCO = (licence Y1
                + Y2 + Y3) + paramétrage initial + formation (Y1 sur tous,
                Y2/Y3 sur les nouveaux entrants) + support × 3 + intégrations
                × 3. La croissance d&apos;équipe est appliquée en composé.
              </p>
            </div>
          </section>

          {/* Cross-links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/outils/calculateur-roi-crm"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Calculateur ROI
              </h3>
              <p className="text-sm text-slate-600">
                Gain de chiffre d&apos;affaires et délai d&apos;amortissement.
              </p>
            </Link>
            <Link
              href="/outils/comparateur-plans-free"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Comparateur Plans Free
              </h3>
              <p className="text-sm text-slate-600">
                Quel CRM offre vraiment un plan gratuit utile.
              </p>
            </Link>
            <Link
              href="/quiz"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Quiz personnalisé
              </h3>
              <p className="text-sm text-slate-600">
                3 CRM recommandés selon votre profil en 2 minutes.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
