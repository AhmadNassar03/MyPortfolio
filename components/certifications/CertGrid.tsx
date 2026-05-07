import { certifications, type Certification } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import clsx from "clsx";

const issuerStyles: Record<
  Certification["issuer"],
  { ring: string; label: string }
> = {
  Anthropic: {
    ring: "border-[oklch(75%_0.16_30)]/40 hover:border-[oklch(75%_0.16_30)]/70",
    label: "text-[oklch(78%_0.16_30)]",
  },
  Google: {
    ring: "border-[oklch(75%_0.16_200)]/40 hover:border-[oklch(75%_0.16_200)]/70",
    label: "text-[oklch(78%_0.16_200)]",
  },
  Coursera: {
    ring: "border-[oklch(70%_0.18_260)]/40 hover:border-[oklch(70%_0.18_260)]/70",
    label: "text-[oklch(75%_0.18_260)]",
  },
};

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const style = issuerStyles[cert.issuer];
  return (
    <FadeIn delay={Math.min(index, 8) * 0.03}>
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "group relative block h-full rounded-2xl border p-5 transition-all hover-lift",
          style.ring,
        )}
        aria-label={`${cert.name} (verify on ${cert.issuer})`}
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
            {cert.issueDate}
          </span>
        </div>
        <p className="mt-3 text-balance leading-snug text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">
          {cert.name}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-faint)] opacity-0 transition-opacity group-hover:opacity-100">
          verify
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-2.5 w-2.5"
            aria-hidden="true"
          >
            <path d="M14 3h7v7M10 14L21 3" />
          </svg>
        </div>
      </a>
    </FadeIn>
  );
}

export function CertGrid() {
  const featured = certifications.filter((c) => c.featured);
  const rest = certifications.filter((c) => !c.featured);

  const restByIssuer: Record<string, Certification[]> = {
    Anthropic: rest.filter((c) => c.issuer === "Anthropic"),
    Google: rest.filter((c) => c.issuer === "Google"),
    Coursera: rest.filter((c) => c.issuer === "Coursera"),
  };

  return (
    <section id="certs" className="section">
      <div className="container-max">
        <SectionHeader
          index="05"
          eyebrow="Certifications"
          title={
            <>
              <em className="font-display italic aurora-text">
                26 AI certifications
              </em>{" "}
              from Anthropic & Google.
            </>
          }
          description="Anthropic deep-track (MCP, Bedrock, Vertex, Anthropic API, Claude Code) plus Google's full AI for Work specialization. Every card links to its public verifier."
        />

        {/* Featured row */}
        <div className="mb-10">
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
            // featured — production AI
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((cert, i) => (
              <CertCard key={cert.credentialId} cert={cert} index={i} />
            ))}
          </div>
        </div>

        {/* Rest grouped by issuer */}
        <div className="space-y-10">
          {Object.entries(restByIssuer).map(([issuer, certs]) => {
            if (certs.length === 0) return null;
            return (
              <div key={issuer}>
                <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  // {issuer.toLowerCase()} —{" "}
                  <span className="text-[var(--text-faint)]">
                    {certs.length} more
                  </span>
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {certs.map((cert, i) => (
                    <CertCard
                      key={cert.credentialId}
                      cert={cert}
                      index={featured.length + i}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
