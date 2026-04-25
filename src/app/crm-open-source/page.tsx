import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Code, Server, Shield } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Meilleur CRM open source 2026 : Top 6 des solutions auto-hébergeables",
  description:
    "Comparatif des meilleurs CRM open source en 2026 : SuiteCRM, EspoCRM, Vtiger, Odoo CRM, Mautic, Twenty. Auto-hébergement, prix, communauté, alternatives SaaS.",
  alternates: { canonical: `${SITE_URL}/crm-open-source` },
  openGraph: {
    title: `Meilleur CRM open source | ${SITE_NAME}`,
    description: "Top des CRM open source auto-hébergeables en 2026.",
    url: `${SITE_URL}/crm-open-source`,
    type: "website",
  },
};

const openSourceCrms = [
  {
    name: "SuiteCRM",
    githubStars: "5.5k",
    license: "AGPL v3",
    backend: "PHP",
    description:
      "Fork open source de l'historique SugarCRM Community Edition. Le plus mature et le plus utilisé en entreprise. Modules CRM complets (vente, marketing, service), customisation poussée via Studio. Communauté française active.",
    pros: [
      "Maturité enterprise (millions d'utilisateurs)",
      "Customisation complète sans coder",
      "Modules métier riches (devis, contrats, projets)",
      "Hosted gratuit ou auto-hébergé",
    ],
    cons: [
      "Interface datée comparée aux SaaS modernes",
      "Setup technique non trivial (LAMP stack)",
      "Performance limitée au-delà de 100K contacts",
    ],
    idealFor:
      "PME ETI françaises qui veulent souveraineté maximale et budget licence à zéro",
  },
  {
    name: "EspoCRM",
    githubStars: "2.4k",
    license: "GPL v3",
    backend: "PHP",
    description:
      "CRM open source moderne, plus léger et plus joli que SuiteCRM. Architecture API-first qui rend l'intégration plus simple. Modules de base solides (compta, vente, marketing) avec extensions premium.",
    pros: [
      "Interface moderne et responsive",
      "Architecture API-first élégante",
      "Plus rapide que SuiteCRM",
      "Cloud option managé disponible",
    ],
    cons: [
      "Moins de modules métier que SuiteCRM",
      "Communauté plus petite",
      "Personnalisation avancée demande du dev",
    ],
    idealFor: "TPE PME tech-friendly qui valorisent l'UX et la performance",
  },
  {
    name: "Vtiger CRM",
    githubStars: "1.4k",
    license: "VPL (similaire MPL)",
    backend: "PHP",
    description:
      "Veille communauté open source, version Cloud payante en parallèle. Combine CRM commercial et helpdesk, idéal pour les entreprises qui mélangent vente et support. Workflows visuels et automation correctes.",
    pros: [
      "Helpdesk intégré (tickets)",
      "Workflows visuels intuitifs",
      "Migration cloud simple si besoin",
      "Modules verticaux (immobilier, BTP)",
    ],
    cons: [
      "Le développement open source ralentit (priorité au cloud)",
      "Documentation parfois en retard",
      "Performances moyennes sur gros volumes",
    ],
    idealFor: "PME mixant ventes et support client sur la même plateforme",
  },
  {
    name: "Odoo CRM",
    githubStars: "37k (Odoo)",
    license: "LGPL v3",
    backend: "Python",
    description:
      "Module CRM de la plateforme ERP Odoo, l'un des projets open source les plus dynamiques au monde. Très puissant si vous adoptez l'écosystème Odoo (compta, RH, e-commerce, projet). Plus intégré qu'autonome.",
    pros: [
      "Écosystème Odoo complet (50+ modules)",
      "Communauté massive, releases fréquentes",
      "Cloud hébergé Odoo SA disponible",
      "Modernité et rapidité",
    ],
    cons: [
      "Surdimensionné pour un usage CRM seul",
      "Personnalisation demande Python/XML",
      "Cloud Odoo cher dès qu'on ajoute des modules",
    ],
    idealFor:
      "PME qui veulent un ERP intégré avec CRM dedans, plutôt qu'un CRM seul",
  },
  {
    name: "Twenty",
    githubStars: "20k",
    license: "AGPL v3",
    backend: "TypeScript / NestJS",
    description:
      "Le challenger 2024-2026, qui veut être le 'Notion du CRM' open source. Interface ultra-moderne inspirée de Linear, customisation par no-code, données en GraphQL. Encore jeune mais croissance fulgurante.",
    pros: [
      "Interface moderne unique sur ce segment",
      "Stack technique moderne (TS, GraphQL, React)",
      "Adoption rapide chez les startups tech",
      "Cloud option managé en bêta",
    ],
    cons: [
      "Maturité encore limitée (jeune projet)",
      "Modules métier basiques pour l'instant",
      "Documentation à compléter",
    ],
    idealFor: "Startups tech qui aiment les outils modernes et l'open source",
  },
  {
    name: "Mautic",
    githubStars: "7.5k",
    license: "GPL v3",
    backend: "PHP / Symfony",
    description:
      "Pas un CRM au sens strict mais une plateforme de marketing automation open source qui inclut un CRM léger. Idéal en complément d'un CRM existant pour les workflows marketing puissants. Acheté par Acquia.",
    pros: [
      "Marketing automation puissant gratuit",
      "Alternative crédible à HubSpot Marketing",
      "Énorme bibliothèque d'intégrations",
      "Multi-canaux (email, SMS, social)",
    ],
    cons: [
      "Pas un CRM commercial classique",
      "Setup technique demande un sysadmin",
      "Mieux en complément qu'en remplacement",
    ],
    idealFor:
      "Équipes marketing qui veulent du marketing automation sans payer 800 €/mois HubSpot Pro",
  },
];

export default function CrmOpenSourcePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "CRM Open Source", href: "/crm-open-source" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Meilleurs CRM open source 2026",
          numberOfItems: openSourceCrms.length,
          itemListElement: openSourceCrms.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "SoftwareApplication", name: c.name },
          })),
        }}
      />

      <PageHero
        eyebrow="Open source"
        eyebrowIcon={Code}
        title="Top des CRM open source"
        highlight="open source"
        subtitle="Solutions CRM gratuites, auto-hébergeables, sans verrou éditeur. Pour les entreprises qui valorisent souveraineté et flexibilité technique."
      />

      <div className="bg-[#fafaff] pb-20">
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">CRM Open Source</li>
            </ol>
          </nav>

          <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <Server className="text-violet-600 mb-3" size={24} />
              <h3 className="font-semibold text-slate-900 mb-2">
                Auto-hébergeable
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hébergez sur vos serveurs ou un cloud privé. Aucun verrou éditeur,
                vos données restent chez vous.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <Code className="text-violet-600 mb-3" size={24} />
              <h3 className="font-semibold text-slate-900 mb-2">
                Code source ouvert
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Auditez, modifiez, étendez le code à volonté. Aucune limite
                arbitraire imposée par un éditeur commercial.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <Shield className="text-violet-600 mb-3" size={24} />
              <h3 className="font-semibold text-slate-900 mb-2">
                Souveraineté maximale
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Conformité RGPD native par contrôle total. Pas de Cloud Act, pas
                de transferts de données hors UE.
              </p>
            </div>
          </section>

          <section className="space-y-6 mb-12">
            {openSourceCrms.map((c, i) => (
              <article
                key={c.name}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-violet-700 text-white font-bold flex items-center justify-center text-lg">
                    #{i + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                      {c.name}
                    </h2>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      <span>⭐ {c.githubStars} stars GitHub</span>
                      <span>📜 {c.license}</span>
                      <span>⚙️ {c.backend}</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  {c.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-emerald-700 mb-2">
                      Points forts
                    </h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {c.pros.map((p, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-emerald-600">+</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-rose-700 mb-2">
                      Points faibles
                    </h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {c.cons.map((p, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-rose-600">-</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic border-t border-slate-100 pt-3">
                  <strong>Idéal pour</strong> : {c.idealFor}
                </p>
              </article>
            ))}
          </section>

          <section className="mb-12 bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Open source vs SaaS : que choisir ?
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Les CRM open source ont un atout massif : la <strong>licence
                gratuite à vie</strong>. Mais le coût total réel n&apos;est pas
                zéro. Comptez l&apos;hébergement (serveur dédié, AWS, OVH), la
                maintenance technique (mises à jour, sauvegardes, sécurité), et
                l&apos;adaptation aux besoins métier (souvent des
                développements custom).
              </p>
              <p>
                <strong>Pour une PME standard de 10-50 personnes</strong>, le TCO
                d&apos;un CRM open source bien maintenu rejoint généralement celui
                d&apos;un SaaS comme Pipedrive ou Zoho. La différence se fait sur
                la flexibilité technique (open source) vs la simplicité
                opérationnelle (SaaS).
              </p>
              <p>
                <strong>L&apos;open source devient pertinent quand</strong> :
                vous avez une DSI capable, vous avez des contraintes
                réglementaires fortes (santé, défense, secteur public), vous
                voulez personnaliser à l&apos;extrême, ou vous avez plus de 100
                utilisateurs et l&apos;économie de licence devient significative.
              </p>
              <p>
                <strong>Le SaaS reste plus pertinent quand</strong> : vous voulez
                déployer en moins d&apos;une semaine, vous n&apos;avez pas de
                ressource technique dédiée, vous valorisez les mises à jour
                automatiques et le support fourni par l&apos;éditeur.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/comparateur"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                CRM SaaS
              </h3>
              <p className="text-sm text-slate-600">
                Comparateur des 24 CRM SaaS du marché.
              </p>
            </Link>
            <Link
              href="/crm-francais"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                CRM français
              </h3>
              <p className="text-sm text-slate-600">
                Solutions made in France hébergées UE.
              </p>
            </Link>
            <Link
              href="/methodologie"
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 mb-2">
                Méthodologie
              </h3>
              <p className="text-sm text-slate-600">Comment nous notons.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
