import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects, profile } from "@/content/cv";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { NoiseLayer } from "@/components/ui/NoiseLayer";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { projectSchema, breadcrumbSchema, SITE_URL } from "@/lib/jsonld";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — ${profile.name}`,
      description: project.tagline,
      url: `${SITE_URL}/projects/${project.slug}`,
    },
    alternates: { canonical: `${SITE_URL}/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const schema = projectSchema(project.slug);
  const crumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Projects", url: `${SITE_URL}/projects` },
    { name: project.name, url: `${SITE_URL}/projects/${project.slug}` },
  ]);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      <Nav />

      <main className="relative pt-32 pb-12">
        <NoiseLayer />

        <article className="container-narrow relative">
          <FadeIn>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All projects
            </Link>
          </FadeIn>

          <header className="mt-8 mb-12">
            <FadeIn delay={0.05}>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                <span className="text-[var(--accent)]">case study</span>
                <span className="h-px w-8 bg-[var(--border-default)]" />
                <span>{project.year}</span>
                <span className="text-[var(--text-faint)]">·</span>
                <span className="capitalize">{project.status}</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display mt-5 text-balance leading-[1] text-5xl text-[var(--text-primary)] md:text-7xl">
                {project.name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p className="mt-5 text-balance text-lg text-[var(--text-secondary)] md:text-xl">
                {project.tagline}
              </p>
            </FadeIn>
            <FadeIn delay={0.26}>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <MagneticButton
                    href={project.liveUrl}
                    variant="primary"
                    external
                  >
                    Visit live
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M14 3h7v7M10 14L21 3" />
                    </svg>
                  </MagneticButton>
                )}
                {project.repoUrl && (
                  <MagneticButton
                    href={project.repoUrl}
                    variant="outline"
                    external
                  >
                    GitHub
                  </MagneticButton>
                )}
              </div>
            </FadeIn>
          </header>

          {/* Stack */}
          <FadeIn delay={0.05}>
            <section className="glass rounded-2xl p-6 md:p-8 mb-12">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
                Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--border-default)] bg-[var(--surface-2)]/40 px-3 py-1 text-xs font-mono text-[var(--text-secondary)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* Long description */}
          <FadeIn delay={0.05}>
            <section className="container-prose !px-0 mb-12">
              <h2 className="font-display text-2xl text-[var(--text-primary)] md:text-3xl mb-4">
                Overview
              </h2>
              <p className="text-balance text-lg leading-relaxed text-[var(--text-secondary)]">
                {project.longDescription}
              </p>
            </section>
          </FadeIn>

          {/* Highlights */}
          <FadeIn delay={0.05}>
            <section className="mb-16">
              <h2 className="font-display text-2xl text-[var(--text-primary)] md:text-3xl mb-6">
                Highlights
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li
                    key={h}
                    className="glass flex gap-4 rounded-xl p-5 hover-lift"
                  >
                    <span className="font-mono text-xs text-[var(--accent)] mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-pretty text-[var(--text-secondary)]">
                      {h}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          {/* Footer CTA */}
          <FadeIn delay={0.05}>
            <div className="border-t border-[var(--border-subtle)] pt-12 text-center">
              <p className="text-[var(--text-muted)]">
                Want to talk about how this was built?
              </p>
              <div className="mt-4">
                <MagneticButton
                  href={`mailto:${profile.email}`}
                  variant="primary"
                  external
                >
                  Get in touch
                </MagneticButton>
              </div>
            </div>
          </FadeIn>
        </article>
      </main>

      <Footer />
    </>
  );
}
