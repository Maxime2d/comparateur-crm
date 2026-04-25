import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * MVP : on log l'inscription (visible dans Vercel Logs) et on retourne 200.
 * À brancher sur Brevo/Mailchimp/Resend plus tard via NEWSLETTER_API_KEY.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; source?: string };
    const email = body.email?.trim().toLowerCase();
    const source = body.source || "unknown";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 },
      );
    }

    // Log pour Vercel Logs (consultable via dashboard)
    console.log(
      JSON.stringify({
        event: "newsletter_subscribe",
        email,
        source,
        ts: new Date().toISOString(),
      }),
    );

    // Future intégration : Brevo / Resend / Mailchimp
    // if (process.env.NEWSLETTER_API_KEY) { … }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 },
    );
  }
}
