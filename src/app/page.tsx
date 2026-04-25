import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlatformCard } from "@/components/platform/platform-card";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ItemListJsonLd, HowToJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getTopPlatforms } from "@/lib/platforms";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { ArrowRight, CheckCircle2, Zap, BarChart3, Smartphone, Mail, Workflow, MessageSquare, Sparkles, Flag, Gift, Store, Rocket, User, Code, Calculator, Target, Euro } from "lucide-react";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { Marquee } from "@/components/ui/marquee";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { platforms } from "@/lib/platforms";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { LampEffect } from "@/components/ui/lamp-effect";
import { FlowDiagram } from "@/components/home/flow-diagram";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { HoverCardGrid } from "@/components/ui/hover-card-grid";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Comparez les meilleurs logiciels CRM en 2026`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} - Comparez les meilleurs logiciels CRM`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "fr_FR",
  },
  alternates: { canonical: SITE_URL },
};

const topPlatforms = getTopPlatforms(5);

const howItWorks = [
  { step: 1, title: "Décrivez votre entreprise", description: "Répondez à quelques questions sur votre secteur, votre taille et vos besoins spécifiques en gestion de la relation client." },
  { step: 2, title: "Comparez automatiquement", description: "Notre algorithme analyse 24+ solutions CRM et les classe selon vos critères pour vous proposer les meilleures options." },
  { step: 3, title: "Choisissez et démarrez", description: "Consultez les fiches détaillées, comparez les fonctionnalités et accédez directement aux offres les plus pertinentes." },
];

const features = [
  { icon: Zap, title: "Gestion du pipeline", description: "Organisez vos opportunités commerciales de manière visuelle avec des pipelines intuitifs." },
  { icon: MessageSquare, title: "Scoring de leads", description: "Identifiez automatiquement les prospects les plus prometteurs grâce au scoring intelligent." },
  { icon: Mail, title: "Emailing intégré", description: "Envoyez des campagnes emailings directement depuis votre CRM avec suivi des interactions." },
  { icon: Workflow, title: "Automatisation", description: "Créez des workflows automatisés pour gagner du temps et améliorer votre productivité." },
  { icon: BarChart3, title: "Reporting avancé", description: "Générez des rapports détaillés pour suivre vos performances commerciales en temps réel." },
  { icon: Smartphone, title: "Application mobile", description: "Gérez vos contacts et ventes en déplacement avec une application mobile native." },
];

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Accueil", href: "/" }, { name: "Comparateur CRM", href: "/" }]} />
      <ItemListJsonLd platforms={topPlatforms} />
      <HowToJsonLd name="Comment trouver le meilleur CRM" description="Trouvez le CRM idéal pour votre entreprise en 3 étapes simples." steps={howItWorks.map((s) => ({ name: s.title, text: s.description }))} />

      <main className="min-h-screen flex flex-col">
        {/* Hero — dark mode avec halos et typewriter */}
        <section className="relative overflow-hidden bg-[#0a0a0f] pt-24 pb-28 sm:pt-32 sm:pb-40">
          {/* Halos colorés en arrière-plan (statiques pour perf) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/30 rounded-full filter blur-[100px] will-change-transform" />
            <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full filter blur-[90px]" />
            <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-indigo-500/20 rounded-full filter blur-[90px]" />
          </div>

          {/* Grid pattern subtil */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <AnimatedSection>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 backdrop-blur-sm text-violet-300 text-xs font-semibold px-4 py-1.5 mb-8">
                  <Sparkles size={12} className="text-violet-300" />
                  Édition 2026 · 27 logiciels CRM analysés
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                  <span className="block">Trouvez le meilleur CRM</span>
                  <span className="block mt-2">
                    pour{" "}
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                      <TypewriterText
                        phrases={[
                          "votre TPE",
                          "vos commerciaux",
                          "votre PME",
                          "votre startup",
                          "votre e-commerce",
                          "votre cabinet",
                        ]}
                        cursorClassName="bg-violet-300"
                      />
                    </span>
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                  Comparez 27 logiciels CRM en 2 minutes. Tarifs, fonctionnalités, avis vérifiés. Recommandation personnalisée gratuite.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                  <Link
                    href="/quiz"
                    className="group inline-flex items-center justify-center gap-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-200 active:scale-[0.98]"
                  >
                    Démarrer le quiz
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/comparateur"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 hover:border-white/25 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-200"
                  >
                    Comparer directement
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>100 % gratuit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Sans email requis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Méthodologie publique</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Fade vers la section suivante (transition longue et progressive) */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-[#fafaff] pointer-events-none" aria-hidden="true" />
        </section>

        {/* Stats — bridge entre hero dark et contenu light */}
        <section className="relative bg-[#fafaff] py-16 sm:py-20 -mt-px overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[300px] bg-violet-300/20 rounded-full filter blur-[80px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: 27, suffix: "+", label: "CRM analysés", decimals: 0 },
                  { value: 8.2, suffix: "/10", label: "Note moyenne", decimals: 1 },
                  { value: 100, suffix: "%", label: "Indépendant", decimals: 0 },
                  { value: 2, suffix: " min", label: "Quiz personnalisé", decimals: 0 },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center bg-white/60 backdrop-blur-sm rounded-2xl border border-violet-100 p-6"
                  >
                    <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                      <NumberTicker
                        value={s.value}
                        decimals={s.decimals}
                        suffix={s.suffix}
                      />
                    </div>
                    <p className="text-slate-600 font-medium text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Marquee logos CRM — preuve sociale */}
        <section className="relative bg-[#fafaff] py-10 border-y border-violet-100/50 overflow-hidden">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
            Les logiciels CRM analysés sur cette plateforme
          </p>
          <Marquee duration={50} gap={48} pauseOnHover fadeEdges>
            {platforms.map((p) => (
              <div
                key={p.slug}
                className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity"
                title={p.name}
              >
                <PlatformLogo
                  website={p.website}
                  name={p.name}
                  size={26}
                  className="grayscale hover:grayscale-0 transition-all"
                />
                <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                  {p.name}
                </span>
              </div>
            ))}
          </Marquee>
        </section>

        {/* Top 5 — fond pastel avec halo */}
        <section className="relative bg-[#fafaff] py-20 sm:py-28 overflow-hidden">
          <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-violet-200/25 rounded-full filter blur-[80px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white text-violet-700 text-xs font-semibold px-4 py-1.5 mb-4">
                  <Sparkles size={12} />
                  Sélection 2026
                </div>
                <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
                  <span className="bg-gradient-to-br from-slate-900 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
                    Top 5 des meilleurs CRM
                  </span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Notre classement éditorial indépendant, basé sur 27 logiciels analysés selon notre méthodologie publique.
                </p>
              </div>
              <HoverCardGrid
                layout="list"
                hoverColor="violet"
                groupId="top5"
                bare
                items={topPlatforms.map((platform, index) => ({
                  id: platform.slug,
                  content: <PlatformCard platform={platform} rank={index + 1} />,
                }))}
              />
            </AnimatedSection>
          </div>
        </section>

        {/* How It Works — diagramme animé + texte 3 étapes */}
        <section className="relative bg-[#0a0a0f] py-20 sm:py-28 overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[300px] bg-violet-600/25 rounded-full filter blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-32 right-1/4 w-[500px] h-[300px] bg-fuchsia-500/20 rounded-full filter blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 backdrop-blur-sm text-violet-300 text-xs font-semibold px-4 py-1.5 mb-4">
                  <Sparkles size={12} />
                  Comment ça marche
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
                  De l&apos;idée au CRM en{" "}
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    moins de 10 minutes
                  </span>
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Notre méthode en 4 étapes pour trouver et déployer le CRM
                  qui correspond vraiment à votre activité.
                </p>
              </div>

              <FlowDiagram />

              <div className="grid md:grid-cols-3 gap-5 mt-8 max-w-5xl mx-auto">
                {howItWorks.map((item, idx) => (
                  <div
                    key={item.step}
                    className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-violet-300 mb-2">
                      Étape {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Segment hubs — cards premium avec emoji + halo */}
        <section className="relative bg-[#fafaff] py-20 sm:py-28 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-pink-200/25 rounded-full filter blur-[80px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white text-violet-700 text-xs font-semibold px-4 py-1.5 mb-4">
                  Par profil
                </div>
                <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
                  <span className="bg-gradient-to-br from-slate-900 via-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
                    Trouvez le CRM adapté à votre situation
                  </span>
                </h2>
                <p className="text-lg text-slate-600">6 sélections curées pour chaque type de structure</p>
              </div>
              <HoverCardGrid
                columns={6}
                hoverColor="fuchsia"
                groupId="hubs"
                items={[
                  { href: "/crm-francais", label: "CRM Français", Icon: Flag, gradient: "from-blue-500 to-indigo-500" },
                  { href: "/crm-gratuit", label: "CRM Gratuit", Icon: Gift, gradient: "from-emerald-500 to-teal-500" },
                  { href: "/crm-tpe", label: "CRM TPE", Icon: Store, gradient: "from-amber-500 to-orange-500" },
                  { href: "/crm-startup", label: "CRM Startup", Icon: Rocket, gradient: "from-fuchsia-500 to-pink-500" },
                  { href: "/crm-freelance", label: "CRM Freelance", Icon: User, gradient: "from-violet-500 to-purple-500" },
                  { href: "/crm-open-source", label: "Open Source", Icon: Code, gradient: "from-slate-500 to-zinc-500" },
                ].map((s) => {
                  const SegIcon = s.Icon;
                  return {
                    id: s.href,
                    href: s.href,
                    content: (
                      <div className="text-center py-2">
                        <div className={`mx-auto mb-3 w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                          <SegIcon size={22} />
                        </div>
                        <div className="font-semibold text-slate-900 group-hover:text-violet-700 text-sm transition-colors">
                          {s.label}
                        </div>
                      </div>
                    ),
                  };
                })}
              />
            </AnimatedSection>
          </div>
        </section>

        {/* Outils gratuits — 3 cards visuelles */}
        <section className="relative bg-white py-20 sm:py-28 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-200/30 rounded-full filter blur-[80px] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white text-violet-700 text-xs font-semibold px-4 py-1.5 mb-4">
                  100 % gratuit
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                  Nos outils pour votre projet
                </h2>
                <p className="text-lg text-slate-600">Calculateur ROI, quiz personnalisé, comparateur de tarifs</p>
              </div>
              <BentoGrid>
                {/* Card vedette — calculateur ROI (4×2) */}
                <BentoCard
                  href="/outils/calculateur-roi-crm"
                  icon={Calculator}
                  title="Calculateur ROI CRM"
                  description="Estimez en 30 secondes le gain de chiffre d'affaires et le délai d'amortissement de votre projet. Notre formule prend en compte taille d'équipe, gains de productivité et durée de retour sur investissement."
                  ctaLabel="Lancer le simulateur"
                  colSpan={4}
                  rowSpan={2}
                  glow="violet"
                  variant="dark"
                  badge="Le + utilisé"
                  visual={
                    <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                      <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">ROI moyen</div>
                        <div className="text-2xl font-black bg-gradient-to-br from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">+212%</div>
                      </div>
                      <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Amortissement</div>
                        <div className="text-2xl font-black bg-gradient-to-br from-fuchsia-300 to-pink-400 bg-clip-text text-transparent">4,2 mois</div>
                      </div>
                    </div>
                  }
                />

                {/* Quiz (2×1) */}
                <BentoCard
                  href="/quiz"
                  icon={Target}
                  title="Quiz CRM personnalisé"
                  description="8 questions · 3 CRM recommandés en 2 min"
                  ctaLabel="Démarrer"
                  colSpan={2}
                  rowSpan={1}
                  glow="fuchsia"
                  variant="default"
                />

                {/* Tarifs (2×1) */}
                <BentoCard
                  href="/tarifs"
                  icon={Euro}
                  title="Comparateur de tarifs"
                  description="27 CRM, plans visibles en un clin d'œil"
                  ctaLabel="Voir les tarifs"
                  colSpan={2}
                  rowSpan={1}
                  glow="emerald"
                  variant="default"
                />

                {/* Glossaire (3×1) */}
                <BentoCard
                  href="/glossaire-crm"
                  icon={BarChart3}
                  title="Glossaire CRM 2026"
                  description="30+ termes essentiels expliqués clairement (lead scoring, pipeline, MQL, churn…)"
                  ctaLabel="Parcourir le lexique"
                  colSpan={3}
                  rowSpan={1}
                  glow="indigo"
                  variant="default"
                />

                {/* Comparateur (3×1) gradient */}
                <BentoCard
                  href="/comparateur"
                  icon={Sparkles}
                  title="Comparateur interactif"
                  description="Filtres avancés et comparaison de 3 CRM côte-à-côte"
                  ctaLabel="Comparer maintenant"
                  colSpan={3}
                  rowSpan={1}
                  variant="gradient"
                  glow="fuchsia"
                />
              </BentoGrid>
            </AnimatedSection>
          </div>
        </section>

        {/* Hero Parallax — défilement 3D des CRMs */}
        <HeroParallax platforms={platforms} />

        {/* CTA — Lamp Effect immersif */}
        <LampEffect minHeight="80vh">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-5 tracking-tight bg-gradient-to-br from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent leading-[1.05]">
            Prêt à trouver votre CRM ?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            En 2 minutes, recevez 3 recommandations personnalisées parmi 27 logiciels analysés selon notre méthodologie publique.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quiz"
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-violet-500/40 hover:shadow-xl hover:shadow-violet-500/60 transition-all duration-200 active:scale-[0.98]"
            >
              Démarrer le quiz
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/comparateur"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 hover:border-white/25 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-200"
            >
              Voir le comparateur
            </Link>
          </div>
        </LampEffect>

        {/* SEO Text — sobre */}
        <section className="bg-[#fafaff] py-20 sm:py-28">
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <AnimatedSection>
              <article className="prose prose-lg max-w-none text-slate-700">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
                  Le marché du CRM en France en 2026
                </h2>
                <p className="mb-5 leading-relaxed">
                  Le marché des logiciels de gestion de la relation client en France connaît une croissance soutenue. De plus en plus d&apos;entreprises françaises, de la TPE au grand groupe, cherchent à optimiser leur approche commerciale en adoptant une solution CRM adaptée à leurs besoins spécifiques.
                </p>
                <p className="mb-5 leading-relaxed">
                  Les CRM modernes offrent bien plus que de la gestion de contacts. Ils créent un écosystème commercial intégré : suivi des opportunités, automatisation des tâches, scoring de leads, analyses avancées, et de plus en plus d&apos;intelligence artificielle pour prédire et personnaliser.
                </p>
                <p className="leading-relaxed">
                  Notre comparateur indépendant analyse 27 solutions principales selon une <Link href="/methodologie" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">méthodologie publique</Link> et vous aide à choisir celle qui correspond le mieux à votre profil — sans email demandé, sans inscription.
                </p>
              </article>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </>
  );
}
