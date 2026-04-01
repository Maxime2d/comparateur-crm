import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd, HowToJsonLd } from "@/components/seo/json-ld";
import { QuizClient } from "@/components/quiz/quiz-client";

export const metadata: Metadata = {
  title: "Quiz CRM : Trouvez le meilleur CRM pour votre entreprise",
  description: "Répondez à 8 questions simples et recevez une recommandation personnalisée parmi les meilleurs logiciels CRM du marché. Gratuit et sans inscription.",
  alternates: { canonical: `${SITE_URL}/quiz` },
};

export default function QuizPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Accueil", href: "/" }, { name: "Quiz CRM", href: "/quiz" }]} />
      <HowToJsonLd name="Comment trouver le meilleur CRM pour votre entreprise" description="En 8 questions simples, identifiez le CRM idéal pour votre activité." steps={[
        { name: "Décrivez votre entreprise", text: "Taille, secteur et nombre de commerciaux." },
        { name: "Précisez vos besoins", text: "Process de vente, budget et outils existants." },
        { name: "Recevez votre recommandation", text: "Top 3 personnalisé avec scores de compatibilité." },
      ]} />
      <QuizClient />
    </>
  );
}
