import Link from "next/link";
import { projects, profile, type Project } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import clsx from "clsx";

const TOP_BUILD_SLUGS = ["omniagent", "workforce-ai", "leadgrade"] as const;

const accentBg: Record<Project["accent"], string> = {
  violet:
    "bg-gradient-to-br from-[oklch(60%_0.22_290)]/15 to-transparent",
  cyan: "bg-gradient-to-br from-[oklch(75%_0.16_200)]/15 to-transparent",
  pink: "bg-gradient-to-br from-[oklch(82%_0.12_350)]/15 to-transparent",
  amber: "bg-gradient-to-br from-[oklch(78%_0.14_75)]/15 to-transparent",
};

const statusDot: Record<Project["status"], string> = {
  live: "bg-[oklch(72%_0.18_145)]",
  private: "bg-[oklch(75%_0.16_75)]",
  archived: "bg-[oklch(60%_0.02_280)]",
};

const statusText: Record<Project["status"], string> = {
  live: "live demo",
  private: "private repo",
  archived: "archived",
};

export function GithubFeed() {
  const top = TOP_BUILD_SLUGS.map(
    (slug) => projects.find((p) => p.slug === slug)!,
  );

  return (
    <section className="section">
      <div className="container-max">
        <SectionHeader
          index="06"
          eyebrow="Top Builds"
          title={
            <>
              The <em className="font-display italic aurora-text">top three</em>
              ,
              <br />
              code & demos.
            </>
          }
          description="Source repos are private — production code stays internal — but the demos are live and the case studies tell the full story."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {top.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.05}>
              <article
                className={clsx(
                  "glass relative h-full overflow-hidden rounded-2xl p-6 hover-lift",
                )}
              >
                {/* accent wash */}
                <div
                  aria-hidden="true"
                  className={clsx(
                    "pointer-events-none absolute inset-0 opacity-60",
                    accentBg[p.accent],
                  )}
                />

                <div className="relative flex h-full flex-col">
                  {/* status row */}
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "h-1.5 w-1.5 rounded-full",
                        statusDot[p.status],
                      )}
                    />
                    {statusText[p.status]} · {p.year}
                  </div>

                  {/* title */}
                  <h3 className="font-display mt-3 text-2xl text-[var(--text-primary)] md:text-3xl">
                    {p.name}
                  </h3>

                  {/* tagline */}
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {p.tagline}
                  </p>

                  {/* spacer */}
                  <div className="flex-1" />

                  {/* primary stack chips (max 3) */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-2)]/40 px-2 py-0.5 text-[10px] font-mono text-[var(--text-secondary)]"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 3 && (
                      <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-2)]/40 px-2 py-0.5 text-[10px] font-mono text-[var(--text-faint)]">
                        +{p.stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                    >
                      Case study
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-3 w-3"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                    {p.liveUrl && (
                      <>
                        <span className="text-[var(--text-faint)]">·</span>
                        <Link
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          Live
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-3 w-3"
                            aria-hidden="true"
                          >
                            <path d="M14 3h7v7M10 14L21 3" />
                          </svg>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            See public repos on GitHub
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
