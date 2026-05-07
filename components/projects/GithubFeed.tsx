import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { fetchTopRepos } from "@/lib/github";

const langColors: Record<string, string> = {
  TypeScript: "oklch(72% 0.16 240)",
  JavaScript: "oklch(85% 0.18 95)",
  "C#": "oklch(60% 0.18 290)",
  Python: "oklch(75% 0.14 80)",
  Java: "oklch(72% 0.16 25)",
  CSS: "oklch(70% 0.16 280)",
  HTML: "oklch(72% 0.18 30)",
};

export async function GithubFeed() {
  const repos = await fetchTopRepos(6);

  return (
    <section className="section">
      <div className="container-max">
        <SectionHeader
          index="06"
          eyebrow="GitHub"
          title={
            <>
              More on{" "}
              <em className="font-display italic aurora-text">GitHub</em>.
            </>
          }
          description="Auto-fetched at build time — recent active repositories."
        />

        {repos.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-[var(--text-muted)]">
              GitHub feed is currently unavailable. Visit{" "}
              <Link
                href="https://github.com/AhmadNassar03"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                github.com/AhmadNassar03
              </Link>{" "}
              directly.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, i) => (
              <FadeIn key={repo.name} delay={0.03 * i}>
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass block h-full rounded-2xl p-5 hover-lift"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {repo.name}
                    </h3>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5 text-[var(--text-faint)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                      aria-hidden="true"
                    >
                      <path d="M14 3h7v7M10 14L21 3" />
                    </svg>
                  </div>
                  {repo.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-4 text-[11px] font-mono text-[var(--text-faint)]">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              langColors[repo.language] ?? "var(--text-muted)",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1">
                        ★ {repo.stars}
                      </span>
                    )}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="https://github.com/AhmadNassar03"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            See all repos on GitHub
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
