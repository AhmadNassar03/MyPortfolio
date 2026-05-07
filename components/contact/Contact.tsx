import { profile } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn } from "@/components/motion/FadeIn";
import Link from "next/link";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-max">
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-16 md:px-16 md:py-24">
          {/* Aurora glow inside the card */}
          <div
            aria-hidden="true"
            className="absolute -inset-32 opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, var(--aurora-1), transparent 60%), radial-gradient(circle at 70% 70%, var(--aurora-2), transparent 60%)",
            }}
          />

          <div className="relative grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <SectionHeader
                index="07"
                eyebrow="Contact"
                title={
                  <>
                    Let's build{" "}
                    <em className="font-display italic aurora-text">
                      something
                    </em>
                    <br />
                    that ships.
                  </>
                }
                description="Open to AI engineering roles — full-time, contract, or interesting collaborations. Based in Amman, available remote or on-site."
              />

              <div className="flex flex-wrap gap-3">
                <MagneticButton
                  href={`mailto:${profile.email}`}
                  variant="primary"
                  external
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M4 6h16v12H4z" />
                    <path d="M4 7l8 6 8-6" />
                  </svg>
                  {profile.email}
                </MagneticButton>
                <MagneticButton
                  href="/ahmad-nassar-cv.pdf"
                  variant="outline"
                  external
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                  </svg>
                  Download CV
                </MagneticButton>
              </div>
            </div>

            <FadeIn delay={0.1}>
              <ul className="space-y-3 text-sm">
                {[
                  {
                    label: "Email",
                    value: profile.email,
                    href: `mailto:${profile.email}`,
                  },
                  {
                    label: "Phone",
                    value: profile.phone,
                    href: `tel:${profile.phone.replace(/\s/g, "")}`,
                  },
                  {
                    label: "GitHub",
                    value: "@AhmadNassar03",
                    href: profile.links.github,
                  },
                  {
                    label: "LinkedIn",
                    value: "ahmad-nassar",
                    href: profile.links.linkedin,
                  },
                  { label: "Location", value: profile.location, href: null },
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-3 last:border-0"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      {row.label}
                    </span>
                    {row.href ? (
                      <Link
                        href={row.href}
                        target={
                          row.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          row.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                      >
                        {row.value}
                      </Link>
                    ) : (
                      <span className="text-[var(--text-primary)]">
                        {row.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
