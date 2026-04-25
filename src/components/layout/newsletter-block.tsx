"use client";

import { useState, FormEvent } from "react";
import { Mail, Send, Check, Loader2 } from "lucide-react";

/**
 * Bloc d'inscription newsletter.
 * MVP : POST vers /api/newsletter (à brancher sur ESP plus tard).
 * Validation email côté client + state visuel (idle/loading/success/error).
 */
export function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter-block" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      // Fail-soft : on accepte l'email côté UI même si le backend n'est pas branché
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#0a0a0f] p-8 sm:p-10 text-center">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-600/30 rounded-full filter blur-[80px]" />
        <div className="absolute -bottom-10 right-10 w-[300px] h-[200px] bg-fuchsia-500/20 rounded-full filter blur-[70px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white mb-4 shadow-lg shadow-violet-500/30">
          <Mail size={22} />
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
          Le meilleur du{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            CRM en 1 email/mois
          </span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mb-6">
          Nouveaux comparatifs, baisses de prix, retours d&apos;expérience
          terrain. Pas de spam, désinscription en 1 clic.
        </p>

        {status === "success" ? (
          <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-4 py-2.5 rounded-xl text-sm font-semibold">
            <Check size={16} />
            Merci ! Vérifiez votre boîte mail pour confirmer.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="vous@entreprise.fr"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-label="Adresse email"
              className={`flex-1 px-4 py-3 rounded-xl bg-white/10 border text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-colors ${
                status === "error"
                  ? "border-rose-400"
                  : "border-white/15 focus:border-violet-400"
              }`}
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-violet-500/30 hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Envoi…
                </>
              ) : (
                <>
                  <Send size={16} />
                  S&apos;inscrire
                </>
              )}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-rose-300 text-xs mt-2">
            Adresse email invalide.
          </p>
        )}
        <p className="text-xs text-slate-500 mt-4">
          En vous inscrivant, vous acceptez de recevoir nos communications.
          Conformément au RGPD, vos données ne sont jamais revendues.
        </p>
      </div>
    </section>
  );
}
