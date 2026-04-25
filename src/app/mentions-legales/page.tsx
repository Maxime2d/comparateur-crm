import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Mentions légales et politique de confidentialité",
  description:
    "Mentions légales, politique de confidentialité et gestion des cookies de Comparateur CRM. Données personnelles, RGPD, hébergeur, propriété intellectuelle.",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Mentions légales | ${SITE_NAME}`,
    description:
      "Mentions légales et politique de confidentialité du comparateur indépendant des logiciels CRM.",
    url: `${SITE_URL}/mentions-legales`,
    type: "website",
  },
};

export default function MentionsLegalesPage() {
  const lastUpdated = "24 avril 2026";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: "/" },
          { name: "Mentions légales", href: "/mentions-legales" },
        ]}
      />

      <PageHero
        eyebrow="Mentions légales"
        eyebrowIcon={FileText}
        title="Mentions légales & confidentialité"
        highlight="confidentialité"
        subtitle={`Informations légales, politique de gestion des données personnelles et des cookies. Dernière mise à jour : ${lastUpdated}.`}
        size="sm"
      />

      <div className="bg-[#fafaff] pb-20">
        <div className="max-w-3xl mx-auto px-4 pt-8">
          <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500 mb-6">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-violet-600">
                  Accueil
                </Link>
              </li>
              <ChevronRight size={14} className="text-slate-400" />
              <li className="text-slate-900 font-medium">Mentions légales</li>
            </ol>
          </nav>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-a:text-violet-600 prose-a:font-medium hover:prose-a:text-violet-700">
            {/* Sommaire */}
            <nav aria-label="Sommaire" className="not-prose mb-8 p-4 rounded-xl bg-violet-50/60 border border-violet-100">
              <h2 className="text-sm font-bold text-violet-900 uppercase tracking-wide mb-3">
                Sommaire
              </h2>
              <ol className="space-y-1.5 text-sm text-slate-700">
                <li><a href="#editeur" className="hover:text-violet-700">1. Éditeur du site</a></li>
                <li><a href="#hebergeur" className="hover:text-violet-700">2. Hébergement</a></li>
                <li><a href="#propriete" className="hover:text-violet-700">3. Propriété intellectuelle</a></li>
                <li><a href="#donnees" className="hover:text-violet-700">4. Données personnelles & RGPD</a></li>
                <li><a href="#cookies" className="hover:text-violet-700">5. Cookies & traceurs</a></li>
                <li><a href="#affiliation" className="hover:text-violet-700">6. Liens d&apos;affiliation</a></li>
                <li><a href="#responsabilite" className="hover:text-violet-700">7. Limitation de responsabilité</a></li>
                <li><a href="#contact" className="hover:text-violet-700">8. Contact</a></li>
                <li><a href="#droit" className="hover:text-violet-700">9. Droit applicable</a></li>
              </ol>
            </nav>

            <h2 id="editeur">1. Éditeur du site</h2>
            <p>
              Le site <strong>{SITE_NAME}</strong>, accessible à l&apos;adresse{" "}
              <Link href={SITE_URL}>{SITE_URL.replace("https://", "")}</Link>,
              est édité par&nbsp;:
            </p>
            <ul>
              <li><strong>Éditeur</strong> : Maxime — éditeur indépendant</li>
              <li><strong>Statut</strong> : entrepreneur individuel</li>
              <li>
                <strong>Email</strong> :{" "}
                <a href="mailto:contact@comparateurcrm.fr">
                  contact@comparateurcrm.fr
                </a>
              </li>
              <li>
                <strong>Directeur de la publication</strong> : l&apos;éditeur
              </li>
            </ul>

            <h2 id="hebergeur">2. Hébergement</h2>
            <p>
              Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon
              Ave #4133, Walnut CA 91789, États-Unis. Le réseau de diffusion
              utilisé inclut des points de présence en Europe pour servir le
              contenu au plus près des utilisateurs français. Pour toute
              question liée à l&apos;hébergement&nbsp;:{" "}
              <a
                href="https://vercel.com/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com/contact
              </a>
              .
            </p>

            <h2 id="propriete">3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur {SITE_NAME} (textes,
              graphismes, logos, icônes, comparaisons, méthodologie, scores)
              sont la propriété exclusive de l&apos;éditeur, sauf mention
              contraire explicite. Les marques, logos et noms commerciaux
              cités appartiennent à leurs propriétaires respectifs (HubSpot,
              Salesforce, Pipedrive, Sellsy, Axonaut, etc.) et sont mentionnés
              dans un cadre éditorial protégé par le droit à l&apos;information
              et à la critique.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou
              adaptation de tout ou partie des éléments du site, par quelque
              procédé que ce soit, est strictement interdite sans
              l&apos;autorisation écrite préalable de l&apos;éditeur.
            </p>

            <h2 id="donnees">4. Données personnelles & RGPD</h2>
            <h3>Quelles données sont collectées ?</h3>
            <p>
              {SITE_NAME} ne demande aucune création de compte. Les seules
              données collectées le sont&nbsp;:
            </p>
            <ul>
              <li>
                <strong>Mesure d&apos;audience anonyme</strong> via Vercel
                Analytics (visiteurs uniques, pages vues, source de trafic) —
                aucune donnée personnelle identifiable, conforme au mode «
                cookieless » et exempt de consentement préalable selon les
                recommandations CNIL.
              </li>
              <li>
                <strong>Email</strong> si vous vous inscrivez à notre
                newsletter — uniquement pour vous envoyer les communications
                auxquelles vous avez consenti.
              </li>
              <li>
                <strong>Réponses au quiz CRM</strong> — traitées localement
                dans votre navigateur (jamais envoyées à un serveur).
              </li>
              <li>
                <strong>Historique de navigation local</strong> (CRMs
                récemment consultés) — stocké uniquement dans le{" "}
                <code>localStorage</code> de votre navigateur.
              </li>
            </ul>

            <h3>Vos droits</h3>
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (UE 2016/679) et à la loi Informatique et Libertés modifiée,
              vous disposez à tout moment des droits suivants&nbsp;: accès,
              rectification, effacement, limitation, portabilité, opposition.
              Pour les exercer, écrivez à{" "}
              <a href="mailto:contact@comparateurcrm.fr">
                contact@comparateurcrm.fr
              </a>
              . Vous pouvez également déposer une réclamation auprès de la{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                CNIL
              </a>
              .
            </p>

            <h3>Durée de conservation</h3>
            <p>
              Les emails de la newsletter sont conservés tant que vous restez
              abonné. Vous pouvez vous désinscrire à tout moment via le lien
              présent en bas de chaque email. Les données analytiques sont
              agrégées et anonymisées au-delà de 14 mois.
            </p>

            <h2 id="cookies">5. Cookies & traceurs</h2>
            <p>
              {SITE_NAME} utilise un nombre minimal de cookies. À votre
              première visite, un bandeau vous propose de les accepter ou de
              les refuser, à choix égal et sans paywall.
            </p>
            <ul>
              <li>
                <strong>Cookies fonctionnels</strong> (toujours actifs) —
                nécessaires au fonctionnement du site (préférence du bandeau
                cookies, consentement, historique de navigation locale).
              </li>
              <li>
                <strong>Mesure d&apos;audience anonyme</strong> (Vercel
                Analytics et Speed Insights) — désactivable en cliquant sur «
                Refuser » dans le bandeau cookies.
              </li>
            </ul>
            <p>
              Aucun cookie publicitaire, aucune revente de données, aucun
              traceur tiers à des fins marketing. Vous pouvez à tout moment
              révoquer votre consentement en effaçant les données du site
              dans votre navigateur.
            </p>

            <h2 id="affiliation">6. Liens d&apos;affiliation</h2>
            <p>
              {SITE_NAME} est financé par des <strong>commissions
              d&apos;affiliation</strong> versées par les éditeurs de
              logiciels CRM lorsqu&apos;un visiteur souscrit après avoir
              cliqué sur un lien depuis le site. Les liens d&apos;affiliation
              sont signalés explicitement par les boutons «&nbsp;Essai
              gratuit&nbsp;», «&nbsp;Demander une démo&nbsp;» ou
              «&nbsp;Commencer&nbsp;».
            </p>
            <p>
              <strong>Ces commissions ne modifient pas le prix payé par
              l&apos;utilisateur</strong> et n&apos;influencent pas notre
              classement éditorial. Notre méthodologie de notation est
              publiée publiquement et auditable&nbsp;:{" "}
              <Link href="/methodologie">consulter notre méthodologie</Link>.
              Nous publions également des avis négatifs ou nuancés lorsque
              c&apos;est justifié, y compris sur des CRM avec lesquels nous
              avons un partenariat d&apos;affiliation.
            </p>

            <h2 id="responsabilite">7. Limitation de responsabilité</h2>
            <p>
              Les informations publiées sur {SITE_NAME} (tarifs,
              fonctionnalités, scores) sont vérifiées à la date indiquée sur
              chaque fiche («&nbsp;Dernière mise à jour&nbsp;»). Nous nous
              efforçons de maintenir ces informations à jour mais ne pouvons
              garantir l&apos;exactitude permanente face à l&apos;évolution
              rapide des éditeurs. Avant toute souscription, nous
              recommandons de vérifier les conditions tarifaires officielles
              sur le site de l&apos;éditeur.
            </p>
            <p>
              {SITE_NAME} ne saurait être tenu responsable des décisions
              prises par les utilisateurs sur la base des informations
              publiées, ni des dommages directs ou indirects résultant de
              l&apos;utilisation des logiciels recommandés.
            </p>

            <h2 id="contact">8. Contact</h2>
            <p>
              Pour toute question, signalement, demande de rectification ou
              proposition de partenariat&nbsp;:
            </p>
            <ul>
              <li>
                Email&nbsp;:{" "}
                <a href="mailto:contact@comparateurcrm.fr">
                  contact@comparateurcrm.fr
                </a>
              </li>
              <li>Délai de réponse moyen&nbsp;: 48 heures ouvrées</li>
            </ul>

            <h2 id="droit">9. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit
              français. En cas de litige et après tentative de résolution
              amiable, les tribunaux français seront seuls compétents.
            </p>

            <p className="not-prose mt-10 text-xs text-slate-500 border-t border-slate-200 pt-6">
              Dernière mise à jour&nbsp;: {lastUpdated}.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
