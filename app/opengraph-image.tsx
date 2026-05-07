import { ImageResponse } from "next/og";
import { profile } from "@/content/cv";

export const runtime = "edge";
export const alt = `${profile.name} — AI-Focused Full Stack Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#1a1428",
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(154, 86, 230, 0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(94, 200, 220, 0.35), transparent 55%), radial-gradient(circle at 50% 110%, rgba(230, 150, 200, 0.3), transparent 50%)",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        {/* Top — Currently exploring tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 18px",
            borderRadius: "9999px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            fontSize: "20px",
            fontFamily: "monospace",
            color: "rgba(255, 255, 255, 0.75)",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              background: "#5ec8dc",
            }}
          />
          currently exploring › claude-opus-4-7 · mcp · groq-llama
        </div>

        {/* Center — Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.65)",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            Ahmad Nassar —
          </div>
          <div
            style={{
              fontSize: "92px",
              fontFamily: "Georgia, serif",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: "1000px",
            }}
          >
            I build{" "}
            <span
              style={{
                background:
                  "linear-gradient(120deg, #9a56e6, #5ec8dc, #e696c8)",
                backgroundClip: "text",
                color: "transparent",
                fontStyle: "italic",
              }}
            >
              AI products
            </span>{" "}
            that actually ship.
          </div>
        </div>

        {/* Bottom — Stats + url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "48px",
              fontSize: "18px",
              fontFamily: "monospace",
            }}
          >
            <span>4 live AI products</span>
            <span>·</span>
            <span>7 AI certifications</span>
            <span>·</span>
            <span>65+ deployments</span>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            ahmadnassarportfolio.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
