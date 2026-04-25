import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsletterBlock } from "./newsletter-block";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="py-12">
          <NewsletterBlock />
        </div>

        <div className="pb-12 border-b border-slate-800">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Trouvez votre CRM en 2 minutes</h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">Répondez à quelques questions et recevez une recommandation personnalisée parmi les meilleurs logiciels CRM.</p>
            <Button size="lg" asChild className="bg-violet-600 hover:bg-violet-700">
              <Link href="/quiz">Démarrer le quiz <ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
          </div>
        </div>

        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <span className="font-bold">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-slate-400">Comparatif indépendant des meilleurs logiciels CRM en France.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">Outils</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/comparateur" className="text-slate-300 hover:text-white transition-colors">Comparateur</Link></li>
              <li><Link href="/tarifs" className="text-slate-300 hover:text-white transition-colors">Tarifs</Link></li>
              <li><Link href="/quiz" className="text-slate-300 hover:text-white transition-colors">Quiz CRM</Link></li>
              <li><Link href="/outils/calculateur-roi-crm" className="text-slate-300 hover:text-white transition-colors">Calculateur ROI</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">CRM par profil</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/crm-francais" className="text-slate-300 hover:text-white transition-colors">CRM Français</Link></li>
              <li><Link href="/crm-gratuit" className="text-slate-300 hover:text-white transition-colors">CRM Gratuit</Link></li>
              <li><Link href="/crm-tpe" className="text-slate-300 hover:text-white transition-colors">CRM TPE</Link></li>
              <li><Link href="/crm-startup" className="text-slate-300 hover:text-white transition-colors">CRM Startup</Link></li>
              <li><Link href="/crm-freelance" className="text-slate-300 hover:text-white transition-colors">CRM Freelance</Link></li>
              <li><Link href="/crm-open-source" className="text-slate-300 hover:text-white transition-colors">CRM Open Source</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-slate-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/glossaire-crm" className="text-slate-300 hover:text-white transition-colors">Glossaire CRM</Link></li>
              <li><Link href="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/methodologie" className="text-slate-300 hover:text-white transition-colors">Méthodologie</Link></li>
              <li><Link href="/a-propos" className="text-slate-300 hover:text-white transition-colors">À propos</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-slate-800">
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Nos autres comparateurs
            </h3>
            <p className="text-sm text-slate-400 max-w-xl mx-auto mb-4">
              Notre équipe édite plusieurs guides indépendants pour aider les TPE et PME françaises à choisir leurs outils métier.
            </p>
            <a
              href="https://comparateur-efacturation.fr"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg px-4 py-2 transition-colors"
            >
              Comparateur Facturation Électronique
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="py-6 border-t border-slate-800 text-center text-sm text-slate-500">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
            <li>
              <Link
                href="/mentions-legales"
                className="hover:text-slate-300 transition-colors"
              >
                Mentions légales
              </Link>
            </li>
            <li className="text-slate-700">·</li>
            <li>
              <Link
                href="/mentions-legales#cookies"
                className="hover:text-slate-300 transition-colors"
              >
                Cookies
              </Link>
            </li>
            <li className="text-slate-700">·</li>
            <li>
              <Link
                href="/mentions-legales#donnees"
                className="hover:text-slate-300 transition-colors"
              >
                RGPD
              </Link>
            </li>
            <li className="text-slate-700">·</li>
            <li>
              <Link
                href="/methodologie"
                className="hover:text-slate-300 transition-colors"
              >
                Méthodologie
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
