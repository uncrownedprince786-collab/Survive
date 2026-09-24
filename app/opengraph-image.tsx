import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111827",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="42" height="42" viewBox="0 0 32 32" fill="none">
              <path
                d="M6 9.5 L13 17 L20 20.5 L26 20.5"
                stroke="#168a5b"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="26" cy="20.5" r="2.4" fill="#168a5b" />
            </svg>
          </div>
          <span
            style={{ color: "#fff", fontSize: 32, fontWeight: 700, letterSpacing: 8 }}
          >
            SURVIVE
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#fff", fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>
            Know how long your
          </div>
          <div style={{ color: "#168a5b", fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
            money can last.
          </div>
          <div style={{ color: "#94a3b8", fontSize: 30, marginTop: 26, maxWidth: 900 }}>
            Free, privacy-first financial runway calculator for people and businesses.
          </div>
        </div>

        <div style={{ color: "#64748b", fontSize: 24 }}>
          Runs entirely in your browser · No account · No data collected
        </div>
      </div>
    ),
    { ...size },
  );
}
