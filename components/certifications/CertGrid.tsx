import { certifications } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import clsx from "clsx";

const issuerStyles: Record<string, { ring: string; label: string }> = {
  Anthropic: {
    ring: "border-[oklch(75%_0.16_30)]/40 bg-[oklch(75%_0.16_30)]/5",
    label: "text-[oklch(75%_0.16_30)]",
  },
  Google: {
    ring: "border-[oklch(75%_0.16_200)]/40 bg-[oklch(75%_0.16_200)]/5",
    label: "text-[oklch(75%_0.16_200)]",
  },
  Coursera: {
    ring: "border-[oklch(70%_0.18_260)]/40 bg-[oklch(70%_0.18_260)]/5",
    label: "text-[oklch(70%_0.18_260)]",
  },
};

export function CertGrid() {
  // Sort: Anthropic first (4 certs), Google (2), Coursera (1)
  const issuerOrder = ["Anthropic", "Google", "Coursera"];
  const sorted = [...certifications].sort(
    (a, b) =>
      issuerOrder.indexOf(a.issuer) - issuerOrder.indexOf(b.issuer),
  );

  return (
    <section id="certs" className="section">
      <div className="container-max">
        <SectionHeader
          index="05"
          eyebrow="Certifications"
          title={
            <>
              Certified by{" "}
              <em className="font-display italic aurora-text">
                Anthropic
              </em>{" "}
              & Google.
            </>
          }
          description="Seven AI certifications earned in 2026 — Anthropic's MCP advanced topics, Bedrock & Vertex deployment, plus Google's AI fundamentals."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((cert, i) => {
            const style = issuerStyles[cert.issuer];
            return (
              <FadeIn key={cert.name} delay={0.04 * i}>
                <div
                  className={clsx(
                    "group relative h-full rounded-2xl border p-5 transition-all hover:scale-[1.01] hover-lift",
                    style.ring,
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={clsx(
                        "font-mono text-[10px] uppercase tracking-widest",
                        style.label,
                      )}
                    >
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-faint)]">
                      {cert.year}
                    </span>
                  </div>
                  <p className="mt-3 text-balance leading-snug text-[var(--text-primary)]">
                    {cert.name}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
