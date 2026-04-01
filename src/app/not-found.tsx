import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-black text-violet-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Page introuvable</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">La page que vous recherchez n&apos;existe pas ou a été déplacée.</p>
        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-violet-600 hover:bg-violet-700"><Link href="/">Retour à l&apos;accueil</Link></Button>
          <Button variant="outline" asChild><Link href="/comparateur">Voir le comparateur</Link></Button>
        </div>
      </div>
    </div>
  );
}
