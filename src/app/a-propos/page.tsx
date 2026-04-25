import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Users, Mail, Sparkles, Target } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "À propos : qui est derrière Comparateur CRM",
  description:
    "Découvrez l'équipe et la démarche éditoriale derrière Comparateur CRM, le comparateur indépendant des logiciels CRM en France. Notre mission, nos valeurs, notre histoire.",
  alternates: { canonical: `${SITE_URL}/a-propos` },
  openGraph: {
    title: `À propos | ${SITE_NAME}`,
    description:
      "L'équipe et la démarche éditoriale derrière Comparateur CRM.",
    url: `${SITE_URL}/a-propos`,
    type: "website",
  },
};

export default function AProposPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "À propos", href: "/a-propos" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `À propos de ${SITE_NAME}`,
          description:
            "L'équipe et la démarche éditoriale derrière le comparateur indépendant des logiciels CRM en France.",
          url: `${SITE_URL}/a-propos`,
          mainEntity: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            foundingDate: "2026",
            sameAs: ["https://comparateur-efacturation.fr"],
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
        <div className="max-w-3xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">À propos</li>
            </ol>
          </nav>

          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 mb-4">
              <Users size={14} />
              Qui sommes-nous
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              L&apos;équipe derrière Comparateur CRM
            </h1>
            <p className="text-lg text-slate-600">
              Un comparateur indépendant, pensé pour aider les TPE et PME françaises
              à choisir le bon logiciel CRM sans perdre des semaines en recherche.
            </p>
          </header>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mt-0 mb-4 flex items-center gap-2">
              <Target size={20} className="text-violet-600" />
              Notre mission
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Le marché français du CRM compte plus de 50 logiciels actifs, chacun
              avec sa promesse, sa grille tarifaire opaque et ses dizaines de
              fonctionnalités. Pour un dirigeant de PME ou un commercial, choisir
              prend des semaines de recherche, de démos et d&apos;essais. Notre
              mission : compresser cette recherche en 30 minutes, avec des données
              fiables et une méthodologie publique.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Nous ne sommes ni revendeurs, ni intégrateurs, ni partenaires
              privilégiés d&apos;un éditeur. Nous sommes une équipe éditoriale
              indépendante, financée uniquement par des commissions
              d&apos;affiliation post-souscription, identiques quel que soit le CRM
              choisi par l&apos;utilisateur.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-violet-600" />
              Notre approche
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Chaque fiche CRM publiée passe par un test pratique, un croisement avec
              les avis utilisateurs publics (G2, Capterra, GetApp, Trustpilot) et une
              vérification des conditions tarifaires officielles. Notre méthodologie
              est publiée publiquement et auditable :{" "}
              <Link
                href="/methodologie"
                className="text-violet-600 hover:text-violet-700 underline underline-offset-2"
              >
                voir la méthodologie complète
              </Link>
              .
            </p>
            <p className="text-slate-700 leading-relaxed">
              Nous mettons à jour les fiches tous les 3 mois pour refléter les
              changements de tarifs, de fonctionnalités et de positionnement. Une
              refonte annuelle complète a lieu en janvier de chaque année.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
              Pourquoi vous pouvez nous faire confiance
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li>
                <strong>Indépendance financière</strong> : aucun éditeur ne peut
                payer pour figurer dans notre classement ou améliorer sa note.
              </li>
              <li>
                <strong>Transparence des affiliations</strong> : tous nos liens
                affiliés sont marqués <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">rel=&quot;sponsored&quot;</code>. Nous appliquons les
                obligations de divulgation prévues par le décret n° 2017-1434.
              </li>
              <li>
                <strong>Conformité RGPD</strong> : nous ne collectons aucune donnée
                personnelle au-delà des analytics anonymisés (Vercel Analytics).
                Aucun email demandé, aucun cookie publicitaire tiers.
              </li>
              <li>
                <strong>Source ouverte</strong> : tarifs, fonctionnalités et notes
                sont sourcés. Si une donnée vous semble erronée, contactez-nous, nous
                corrigeons sous 48 heures.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
              Nos autres comparateurs
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Notre équipe édite également{" "}
              <a
                href="https://comparateur-efacturation.fr"
                target="_blank"
                rel="noopener"
                className="text-violet-600 hover:text-violet-700 underline underline-offset-2"
              >
                Comparateur e-Facturation
              </a>
              , dédié aux plateformes agréées DGFiP pour la facturation électronique
              obligatoire en France. La même méthodologie s&apos;applique : tests
              pratiques, sources tierces croisées, transparence totale du modèle
              économique.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 flex items-center gap-2">
              <Mail size={20} className="text-violet-600" />
              Nous contacter
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Vous représentez un éditeur de CRM et souhaitez nous signaler une
              donnée à corriger ? Vous êtes journaliste ou analyste et avez besoin de
              nos données ? Vous êtes un utilisateur souhaitant partager votre retour
              d&apos;expérience ?{" "}
              <a
                href="mailto:contact@comparateurcrm.fr"
                className="text-violet-600 hover:text-violet-700 underline underline-offset-2"
              >
                contact@comparateurcrm.fr
              </a>
            </p>
          </article>

          {/* Cross-links */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/methodologie"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Notre méthodologie
              </h3>
              <p className="text-sm text-slate-600">
                Critères, pondération, sources de données.
              </p>
            </Link>
            <Link
              href="/comparateur"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Le classement
              </h3>
              <p className="text-sm text-slate-600">
                24 logiciels CRM filtrables et triables.
              </p>
            </Link>
            <Link
              href="/quiz"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Quiz CRM
              </h3>
              <p className="text-sm text-slate-600">
                Recommandation personnalisée en 2 minutes.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
