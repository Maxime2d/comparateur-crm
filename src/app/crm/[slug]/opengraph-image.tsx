import { ImageResponse } from "next/og";
import { getPlatformBySlug, getAllPlatformSlugs } from "@/lib/platforms";

export const alt = "Fiche CRM — comparateurcrm.fr";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllPlatformSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const platform = getPlatformBySlug(params.slug);
  const name = platform?.name ?? "CRM";
  const score = platform?.scores.overall ?? 0;
  const price = platform?.pricing.onQuote
    ? "Sur devis"
    : platform?.pricing.startsAt === 0
      ? "Gratuit"
      : `${platform?.pricing.startsAt ?? "—"}€/mois`;
  const description =
    platform?.shortDescription ??
    "Comparatif indépendant des logiciels CRM en France";
  const badges = platform?.badges?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #1a0d2e 50%, #0a0a0f 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Halo violet */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.5), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217, 70, 239, 0.4), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "22px",
            fontWeight: 600,
            opacity: 0.7,
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, #7c3aed, #d946ef)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: 800,
            }}
          >
            CC
          </div>
          comparateurcrm.fr
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 600,
              opacity: 0.7,
              marginBottom: "8px",
              display: "flex",
            }}
          >
            Fiche CRM · Édition 2026
          </div>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              background: "linear-gradient(135deg, #ffffff 0%, #d8b4fe 70%, #f0abfc 100%)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 400,
              lineHeight: 1.3,
              opacity: 0.85,
              marginBottom: "30px",
              maxWidth: "1000px",
              display: "flex",
            }}
          >
            {description.length > 110 ? description.slice(0, 107) + "…" : description}
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "28px", marginBottom: "26px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "14px 22px",
                borderRadius: "16px",
                background: "rgba(124, 58, 237, 0.18)",
                border: "1px solid rgba(167, 139, 250, 0.4)",
              }}
            >
              <div style={{ fontSize: "16px", opacity: 0.7, fontWeight: 500, display: "flex" }}>
                NOTE
              </div>
              <div style={{ fontSize: "36px", fontWeight: 800, display: "flex" }}>
                {score.toFixed(1)}/10
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "14px 22px",
                borderRadius: "16px",
                background: "rgba(217, 70, 239, 0.18)",
                border: "1px solid rgba(240, 171, 252, 0.4)",
              }}
            >
              <div style={{ fontSize: "16px", opacity: 0.7, fontWeight: 500, display: "flex" }}>
                À PARTIR DE
              </div>
              <div style={{ fontSize: "36px", fontWeight: 800, display: "flex" }}>
                {price}
              </div>
            </div>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {badges.map((badge) => (
                <div
                  key={badge}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "999px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    fontSize: "20px",
                    fontWeight: 600,
                    display: "flex",
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
