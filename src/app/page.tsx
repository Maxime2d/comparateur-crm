import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlatformCard } from "@/components/platform/platform-card";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ItemListJsonLd, HowToJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getTopPlatforms } from "@/lib/platforms";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { ArrowRight, CheckCircle2, Zap, BarChart3, Smartphone, Mail, Workflow, MessageSquare } from "lucide-react";

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
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-white to-white pt-20 pb-32 sm:pt-32 sm:pb-48">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <AnimatedSection>
              <div className="text-center">
                <Badge className="mb-4 bg-violet-100 text-violet-700 hover:bg-violet-100">Trouvez votre CRM parfait</Badge>
                <h1 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6 leading-tight">Comparez les meilleurs logiciels CRM</h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">Analysez 24+ solutions CRM, comparez leurs fonctionnalités et trouvez celle qui correspond parfaitement à vos besoins commerciaux en 2 minutes.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button size="lg" asChild className="bg-violet-600 hover:bg-violet-700"><Link href="/quiz">Démarrer le quiz <ArrowRight className="h-5 w-5 ml-2" /></Link></Button>
                  <Button size="lg" variant="outline" asChild><Link href="/comparateur">Comparer directement <ArrowRight className="h-5 w-5 ml-2" /></Link></Button>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><span>100% gratuit</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><span>Aucun email requis</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><span>Recommandations personnalisées</span></div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Top 5 */}
        <section className="py-20 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Top 5 des meilleurs CRM</h2>
                <p className="text-xl text-slate-600">Découvrez les solutions les plus populaires et performantes du marché</p>
              </div>
              <StaggerContainer>
                <div className="space-y-6">
                  {topPlatforms.map((platform, index) => (
                    <StaggerItem key={platform.slug}><PlatformCard platform={platform} rank={index + 1} /></StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </AnimatedSection>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-violet-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center"><div className="text-4xl sm:text-5xl font-black text-violet-600 mb-2"><AnimatedCounter end={24} />+</div><p className="text-slate-600 font-medium">CRM comparés</p></div>
                <div className="text-center"><div className="text-4xl sm:text-5xl font-black text-violet-600 mb-2"><AnimatedCounter end={82} decimals={1} /></div><p className="text-slate-600 font-medium">Note moyenne</p></div>
                <div className="text-center"><div className="text-4xl sm:text-5xl font-black text-violet-600 mb-2">100%</div><p className="text-slate-600 font-medium">Gratuit</p></div>
                <div className="text-center"><div className="text-4xl sm:text-5xl font-black text-violet-600 mb-2">2 min</div><p className="text-slate-600 font-medium">Quiz</p></div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Comment ça marche</h2>
                <p className="text-xl text-slate-600">Trouvez votre CRM idéal en 3 étapes simples</p>
              </div>
              <StaggerContainer>
                <div className="grid md:grid-cols-3 gap-8">
                  {howItWorks.map((item) => (
                    <StaggerItem key={item.step}>
                      <div className="relative">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0"><div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 text-white font-black">{item.step}</div></div>
                          <div className="flex-1"><h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3><p className="text-slate-600 leading-relaxed">{item.description}</p></div>
                        </div>
                        {item.step < 3 && <div className="hidden md:block absolute top-12 -right-4 w-8 h-1 bg-gradient-to-r from-violet-200 to-transparent" />}
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </AnimatedSection>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-violet-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Les fonctionnalités essentielles des CRM</h2>
                <p className="text-xl text-slate-600">Découvrez les capacités clés pour transformer votre approche commerciale</p>
              </div>
              <StaggerContainer>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature) => { const Icon = feature.icon; return (
                    <StaggerItem key={feature.title}>
                      <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-3 bg-gradient-to-br from-violet-100 to-violet-50 rounded-xl"><Icon className="h-6 w-6 text-violet-600" /></div>
                          <div className="flex-1"><h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3><p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p></div>
                        </div>
                      </div>
                    </StaggerItem>
                  ); })}
                </div>
              </StaggerContainer>
            </AnimatedSection>
          </div>
        </section>

        {/* Segment hubs */}
        <section className="py-20 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">CRM par profil</h2>
                <p className="text-xl text-slate-600">Trouvez le CRM adapté à votre situation</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { href: "/crm-francais", label: "CRM Français", emoji: "🇫🇷" },
                  { href: "/crm-gratuit", label: "CRM Gratuit", emoji: "🎁" },
                  { href: "/crm-tpe", label: "CRM TPE", emoji: "🏪" },
                  { href: "/crm-startup", label: "CRM Startup", emoji: "🚀" },
                  { href: "/crm-freelance", label: "CRM Freelance", emoji: "👤" },
                  { href: "/crm-open-source", label: "Open Source", emoji: "💻" },
                ].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group bg-white rounded-2xl border border-slate-200 p-6 text-center hover:border-violet-300 hover:shadow-md transition-all"
                  >
                    <div className="text-3xl mb-2">{s.emoji}</div>
                    <div className="font-semibold text-slate-900 group-hover:text-violet-700 text-sm">
                      {s.label}
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Outils gratuits */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-violet-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Nos outils gratuits</h2>
                <p className="text-xl text-slate-600">Pour vous aider à choisir et chiffrer votre projet</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  href="/outils/calculateur-roi-crm"
                  className="group bg-white rounded-2xl border border-slate-200 p-8 hover:border-violet-300 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-3">🧮</div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 mb-2">Calculateur ROI CRM</h3>
                  <p className="text-slate-600">Estimez en 30 secondes le gain de CA et le break-even d&apos;un projet CRM.</p>
                </Link>
                <Link
                  href="/quiz"
                  className="group bg-white rounded-2xl border border-slate-200 p-8 hover:border-violet-300 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 mb-2">Quiz CRM</h3>
                  <p className="text-slate-600">8 questions, 3 CRM recommandés pour votre profil en 2 minutes.</p>
                </Link>
                <Link
                  href="/tarifs"
                  className="group bg-white rounded-2xl border border-slate-200 p-8 hover:border-violet-300 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 mb-2">Comparateur de tarifs</h3>
                  <p className="text-slate-600">Tableau interactif des prix de 24 CRM, filtrable par plan gratuit.</p>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <AnimatedSection>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-violet-800 p-12 sm:p-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10" /></div>
                <div className="relative z-10 text-center">
                  <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Prêt à trouver votre CRM parfait ?</h2>
                  <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">Découvrez en 2 minutes le logiciel CRM qui correspond exactement à vos besoins et à votre budget.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild className="bg-white text-violet-600 hover:bg-violet-50"><Link href="/quiz">Démarrer le quiz <ArrowRight className="h-5 w-5 ml-2" /></Link></Button>
                    <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10"><Link href="/comparateur">Voir le comparateur</Link></Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* SEO Text */}
        <section className="py-20 sm:py-32 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <AnimatedSection>
              <article className="prose prose-lg max-w-none text-slate-700">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Le marché du CRM en France en 2026</h2>
                <p className="mb-6">Le marché des logiciels de gestion de la relation client (CRM) en France connaît une croissance exponentielle. De plus en plus d&apos;entreprises françaises, de la PME au grand groupe, cherchent à optimiser leur approche commerciale en adoptant une solution CRM adaptée à leurs besoins spécifiques.</p>
                <p className="mb-6">Les solutions CRM offrent bien plus que de la gestion de contacts. Elles permettent de créer un véritable écosystème commercial intégré, regroupant le suivi des opportunités, l&apos;automatisation des tâches, le scoring de leads et des analyses avancées.</p>
                <p className="mb-6">Parmi les défis majeurs rencontrés par les entreprises françaises figure le choix du bon CRM. Avec plus de 24 solutions principales disponibles sur le marché, chacune proposant des avantages et des inconvénients spécifiques, la décision peut s&apos;avérer complexe.</p>
                <p>Notre comparateur CRM vous aide à naviguer cette complexité en analysant les 24+ solutions principales du marché et en vous recommandant celle qui correspond le mieux à votre profil spécifique.</p>
              </article>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </>
  );
}
