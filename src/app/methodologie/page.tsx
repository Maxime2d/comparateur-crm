import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ScrollText, Scale, ShieldCheck, Calendar, Users } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Notre méthodologie : comment nous notons les CRM",
  description:
    "Découvrez la méthodologie transparente que nous utilisons pour analyser, noter et classer les 24 logiciels CRM de notre comparateur : critères, pondération, sources, mises à jour.",
  alternates: { canonical: `${SITE_URL}/methodologie` },
  openGraph: {
    title: `Notre méthodologie | ${SITE_NAME}`,
    description:
      "Critères, pondération et sources utilisés pour analyser les CRM. Notre engagement de transparence éditoriale.",
    url: `${SITE_URL}/methodologie`,
    type: "article",
  },
};

const criteria = [
  {
    name: "Fonctionnalités",
    weight: "25 %",
    detail:
      "Couverture des 20 fonctions clés d'un CRM moderne : pipeline visuel, scoring de leads, automatisations, reporting, mobile, multi-devises, CPQ, téléphonie. Chaque fonction présente vaut 0,5 point sur 10.",
  },
  {
    name: "Tarification",
    weight: "20 %",
    detail:
      "Rapport qualité-prix global. Plan gratuit ou essai disponible. Lisibilité de la grille tarifaire. Modularité (par utilisateur vs forfait). Frais cachés (paramétrage, formation, modules add-on).",
  },
  {
    name: "Expérience utilisateur",
    weight: "15 %",
    detail:
      "Modernité de l'interface, courbe d'apprentissage, qualité de l'application mobile, accessibilité. Évalué par tests pratiques et retours d'utilisateurs cumulés sur G2, Capterra et Trustpilot.",
  },
  {
    name: "Intégrations",
    weight: "15 %",
    detail:
      "Nombre d'intégrations natives, présence d'une API publique documentée, intégration Zapier/Make, connecteurs aux outils français incontournables (Pennylane, Sellsy, Aircall, Brevo).",
  },
  {
    name: "Support",
    weight: "10 %",
    detail:
      "Disponibilité (24/7, heures ouvrables), canaux (chat, email, téléphone), langue française, qualité de la documentation et de l'académie de formation, ressources communautaires.",
  },
  {
    name: "Adapté au marché français",
    weight: "10 %",
    detail:
      "Hébergement UE/France, conformité RGPD claire, gestion de la TVA française, intégration Factur-X et plateformes DGFiP, présence d'équipes FR, traduction de qualité.",
  },
  {
    name: "Pérennité",
    weight: "5 %",
    detail:
      "Année de création, croissance financière publique, taille des équipes, fréquence des releases, signaux de stabilité (rachat récent, levée de fonds, plans long-terme).",
  },
];

const principles = [
  {
    icon: ScrollText,
    title: "Tests pratiques",
    text: "Chaque CRM est testé sur un cas réel d'usage avant publication : import de contacts, création d'un pipeline, configuration d'une automatisation, génération d'un rapport.",
  },
  {
    icon: Users,
    title: "Sources tierces croisées",
    text: "Nous compilons systématiquement les avis publics de G2, Capterra, GetApp et Trustpilot pour vérifier nos impressions et capter les angles utilisateurs.",
  },
  {
    icon: Scale,
    title: "Aucun paiement pour figurer",
    text: "Aucune marque ne peut nous payer pour apparaître ou être mieux notée dans notre classement. Notre revenu provient uniquement de commissions d'affiliation post-clic, identiques quel que soit le rang.",
  },
  {
    icon: ShieldCheck,
    title: "Mises à jour régulières",
    text: "Tarifs, fonctionnalités et notes sont revus tous les 3 mois. Une refonte annuelle complète a lieu en janvier de chaque année. La date de dernière mise à jour est toujours indiquée.",
  },
];

const updateLog = [
  { date: "Avril 2026", note: "Refonte du barème, ajout des critères 'adapté au marché français' et 'pérennité'." },
  { date: "Janvier 2026", note: "Mise à jour annuelle complète : tarifs 2026 vérifiés, ajout de 6 nouveaux CRM." },
  { date: "Octobre 2025", note: "Intégration des données G2 et Capterra dans la pondération expérience utilisateur." },
];

export default function MethodologiePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Méthodologie", href: "/methodologie" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Méthodologie de notation des CRM",
          description:
            "Critères, pondération et sources utilisés pour analyser les 24 CRM du comparateur.",
          url: `${SITE_URL}/methodologie`,
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">Méthodologie</li>
            </ol>
          </nav>

          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 mb-4">
              <ScrollText size={14} />
              Transparence éditoriale
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Comment nous notons les logiciels CRM
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Notre méthodologie est volontairement publique. Vous pouvez auditer chaque
              critère, chaque pondération, et reproduire notre analyse vous-même.
            </p>
          </header>

          {/* Principes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Nos principes éditoriaux
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {principles.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="bg-white rounded-2xl border border-slate-200 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">
                          {p.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Score global */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Notre barème de notation
            </h2>
            <p className="text-slate-600 mb-6">
              Chaque CRM est noté sur 10 selon 7 critères pondérés. La note globale
              affichée sur les fiches est la moyenne pondérée.
            </p>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Critère
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Poids
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Détail
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {criteria.map((c) => (
                    <tr key={c.name}>
                      <td className="px-4 py-4 font-semibold text-slate-900 align-top">
                        {c.name}
                      </td>
                      <td className="px-4 py-4 text-violet-700 font-bold align-top whitespace-nowrap">
                        {c.weight}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700 leading-relaxed">
                        {c.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Note globale = (Fonctionnalités × 0,25) + (Tarification × 0,20) +
              (Expérience × 0,15) + (Intégrations × 0,15) + (Support × 0,10) + (Marché
              FR × 0,10) + (Pérennité × 0,05). Arrondie au dixième.
            </p>
          </section>

          {/* Sources */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              D&apos;où viennent nos données
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 text-slate-700 leading-relaxed">
              <p>
                <strong>Tarifs et fonctionnalités</strong> : relevés directement sur
                les sites officiels des éditeurs et confirmés par les équipes
                commerciales lorsque cela est nécessaire.
              </p>
              <p>
                <strong>Avis utilisateurs</strong> : moyenne agrégée de G2, Capterra,
                GetApp et Trustpilot. Chaque source est citée sur la fiche du CRM avec
                le nombre d&apos;avis et la note moyenne.
              </p>
              <p>
                <strong>Tests pratiques</strong> : nous testons chaque CRM en
                conditions réelles via leur essai gratuit ou plan gratuit. Nos retours
                d&apos;expérience nourrissent les sections &quot;avantages&quot; et
                &quot;inconvénients&quot;.
              </p>
              <p>
                <strong>Conformité</strong> : nous lisons et résumons les politiques
                RGPD, ToS et SLA de chaque éditeur. Les zones de risque
                (transferts de données hors UE, clauses ambiguës) sont explicitement
                mentionnées dans les fiches.
              </p>
            </div>
          </section>

          {/* Modèle économique */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Comment ce site se finance (transparence)
            </h2>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 text-slate-700 leading-relaxed space-y-3">
              <p>
                Notre modèle économique repose sur l&apos;<strong>affiliation</strong>{" "}
                : si vous cliquez sur un lien &quot;Essayer&quot; ou &quot;Voir les
                tarifs&quot; et que vous souscrivez ensuite à un CRM, l&apos;éditeur
                nous reverse une commission. Cette commission est{" "}
                <strong>
                  identique quel que soit le rang du CRM dans notre classement
                </strong>{" "}
                — autrement dit, nous n&apos;avons aucun intérêt financier à mieux
                noter HubSpot que Pipedrive ou inversement.
              </p>
              <p>
                Aucun éditeur ne peut payer pour figurer dans notre comparateur, ni
                pour modifier sa note. Les liens sont marqués{" "}
                <code className="bg-white px-1.5 py-0.5 rounded text-xs">
                  rel=&quot;sponsored&quot;
                </code>{" "}
                comme demandé par Google. Nous appliquons les bonnes pratiques de
                divulgation prévues par le décret n° 2017-1434 sur la transparence des
                comparateurs en ligne.
              </p>
            </div>
          </section>

          {/* Fréquence des updates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Historique des mises à jour de la méthodologie
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <ul className="space-y-3">
                {updateLog.map((u, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <Calendar
                      size={16}
                      className="text-violet-500 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <span className="font-semibold text-slate-900">{u.date}</span> —{" "}
                      {u.note}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/comparateur"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Voir le classement
              </h3>
              <p className="text-sm text-slate-600">
                24 CRM analysés selon notre méthodologie.
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
                3 recommandations adaptées en 2 minutes.
              </p>
            </Link>
            <Link
              href="/a-propos"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Qui est derrière le site
              </h3>
              <p className="text-sm text-slate-600">
                Notre équipe et notre démarche éditoriale.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
