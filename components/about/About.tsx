import { profile, education, languages } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-max grid gap-12 lg:grid-cols-[1fr_2fr]">
        <SectionHeader
          index="01"
          eyebrow="About"
          title={
            <>
              An <em className="font-display italic aurora-text">engineer</em>
              <br />
              who actually
              <br />
              ships AI.
            </>
          }
        />

        <div className="space-y-8">
          <FadeIn>
            <p className="text-balance text-xl leading-relaxed text-[var(--text-secondary)] md:text-2xl">
              {profile.bio}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-[var(--border-subtle)]">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Based
                </p>
                <p className="mt-1 text-[var(--text-primary)]">
                  {profile.location}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Languages
                </p>
                <p className="mt-1 text-[var(--text-primary)]">
                  {languages.join(" · ")}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Education
                </p>
                <p className="mt-1 text-[var(--text-primary)]">
                  {education.degree}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {education.school} · {education.end}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Currently
                </p>
                <p className="mt-1 text-[var(--text-primary)]">
                  Open to AI engineering roles
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  Remote · Hybrid · On-site
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
