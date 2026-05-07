import Link from "next/link";
import { profile } from "@/content/cv";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--border-subtle)] py-12">
      <div className="container-max grid gap-8 md:grid-cols-3 md:items-end">
        <div>
          <Link
            href="/"
            className="font-display text-xl italic tracking-tight text-[var(--text-primary)]"
          >
            Ahmad Nassar<span className="text-[var(--accent)]">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-[var(--text-muted)]">
            {profile.tagline}
          </p>
        </div>

        <div className="font-mono text-xs text-[var(--text-faint)]">
          <span className="text-[var(--text-muted)]">// now studying</span>{" "}
          <span className="text-[var(--text-secondary)]">
            {profile.nowStudying}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm md:items-end">
          <div className="flex gap-4">
            <Link
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              GitHub
            </Link>
            <Link
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href={`mailto:${profile.email}`}
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              Email
            </Link>
          </div>
          <p className="text-xs text-[var(--text-faint)]">
            © {year} · Built in {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
