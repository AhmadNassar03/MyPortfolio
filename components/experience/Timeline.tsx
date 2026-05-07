import { experience } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function Timeline() {
  return (
    <section id="experience" className="section">
      <div className="container-max">
        <SectionHeader
          index="04"
          eyebrow="Experience"
          title={
            <>
              Where I've{" "}
              <em className="font-display italic aurora-text">shipped code</em>.
            </>
          }
        />

        <ol className="relative space-y-10 pl-8 md:pl-12">
          {/* vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-[5px] md:left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border-default)] to-transparent"
          />

          {experience.map((job, i) => (
            <li key={`${job.company}-${job.start}`} className="relative">
              {/* node */}
              <span
                aria-hidden="true"
                className="absolute -left-8 top-2 grid h-3 w-3 place-items-center md:-left-12"
              >
                <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-40 blur-md" />
                <span className="relative h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--surface-1)]" />
              </span>

              <FadeIn delay={0.05 * i}>
                <div className="glass rounded-2xl p-6 md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl text-[var(--text-primary)] md:text-2xl">
                        {job.role}
                      </h3>
                      <p className="text-[var(--accent)] font-medium">
                        {job.company}
                      </p>
                    </div>
                    <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                      {job.start} – {job.end} · {job.location}
                    </p>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-[var(--text-secondary)]">
                    {job.bullets.map((b) => (
                      <li
                        key={b}
                        className="relative pl-5 text-pretty before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent-muted)]"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
