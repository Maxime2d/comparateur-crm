import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Comparateur CRM — Trouvez le meilleur logiciel CRM en France";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
            fontSize: "28px",
            fontWeight: 600,
            opacity: 0.9,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            📊
          </div>
          comparateurcrm.fr
        </div>

        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          Le comparatif CRM indépendant
        </div>

        <div
          style={{
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: 1.4,
            opacity: 0.85,
            maxWidth: "900px",
          }}
        >
          +20 logiciels CRM analysés · Tarifs, avis, fonctionnalités · Édition 2026
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "48px",
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          {["HubSpot", "Salesforce", "Pipedrive", "Sellsy", "Zoho"].map(
            (name) => (
              <div
                key={name}
                style={{
                  padding: "10px 20px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                {name}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
