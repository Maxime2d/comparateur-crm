import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="py-12 border-b border-slate-800">
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
              <li><Link href="/quiz" className="text-slate-300 hover:text-white transition-colors">Quiz CRM</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">CRM populaires</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/crm/hubspot-crm" className="text-slate-300 hover:text-white transition-colors">HubSpot CRM</Link></li>
              <li><Link href="/crm/salesforce" className="text-slate-300 hover:text-white transition-colors">Salesforce</Link></li>
              <li><Link href="/crm/pipedrive" className="text-slate-300 hover:text-white transition-colors">Pipedrive</Link></li>
              <li><Link href="/crm/sellsy" className="text-slate-300 hover:text-white transition-colors">Sellsy</Link></li>
              <li><Link href="/crm/zoho-crm" className="text-slate-300 hover:text-white transition-colors">Zoho CRM</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-400">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="text-slate-300 hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" className="text-slate-300 hover:text-white transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
