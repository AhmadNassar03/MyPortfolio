"use client";

import Link from "next/link";
import clsx from "clsx";
import type { Project } from "@/content/cv";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { statusColor, statusLabel } from "./status";

const accentMap: Record<Project["accent"], string> = {
  violet: "from-[oklch(60%_0.22_290)] to-[oklch(70%_0.18_260)]",
  cyan: "from-[oklch(75%_0.16_200)] to-[oklch(70%_0.14_180)]",
  pink: "from-[oklch(82%_0.12_350)] to-[oklch(70%_0.18_320)]",
  amber: "from-[oklch(78%_0.14_75)] to-[oklch(72%_0.16_50)]",
};


type Props = {
  project: Project;
  className?: string;
  feature?: boolean;
};

/**
 * Project card with a pointer-tracked 3D tilt and a spotlight that follows
 * the cursor across the glass. Tilt is skipped for coarse pointers.
 */
export function ProjectCard({ project, className, feature = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    px.set(x / r.width);
    py.set(y / r.height);
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const stackShown = feature ? 9 : 5;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={clsx(
        "group glass spotlight relative overflow-hidden rounded-2xl p-6 md:p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-lg),var(--shadow-aurora)]",
        className,
      )}
    >
      {/* Accent gradient halo */}
      <div
        aria-hidden="true"
        className={clsx(
          "absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50",
          feature && "h-96 w-96",
          accentMap[project.accent],
        )}
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              {project.status === "live" && (
                <span
                  className={clsx(
                    "absolute inset-0 animate-ping rounded-full opacity-70",
                    statusColor.live,
                  )}
                />
              )}
              <span
                className={clsx(
                  "relative h-1.5 w-1.5 rounded-full",
                  statusColor[project.status],
                )}
              />
            </span>
            {statusLabel[project.status]} · {project.year}
          </div>
          <div className="hidden flex-wrap justify-end gap-1 sm:flex">
            {project.tags.slice(0, feature ? 4 : 2).map((t) => (
              <span
                key={t}
                className="rounded-full bg-[var(--surface-2)]/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Title + tagline */}
        <h3
          className={clsx(
            "font-display mt-4 text-[var(--text-primary)]",
            feature ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl",
          )}
        >
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)] md:text-base">
          {project.tagline}
        </p>

        <p className="mt-4 text-pretty text-[var(--text-muted)]">
          {project.description}
        </p>

        {feature && project.metrics && (
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-display text-2xl text-[var(--text-primary)] md:text-3xl">
                  {m.value}
                </dt>
                <dd className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="flex-1" />

        {/* Stack pills */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, stackShown).map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-2)]/40 px-2.5 py-1 font-mono text-[10px] text-[var(--text-secondary)]"
            >
              {s}
            </span>
          ))}
          {project.stack.length > stackShown && (
            <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-2)]/40 px-2.5 py-1 font-mono text-[10px] text-[var(--text-faint)]">
              +{project.stack.length - stackShown}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)] after:absolute after:inset-0 after:content-['']"
          >
            Case study
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
          {project.liveUrl && (
            <>
              <span className="text-[var(--text-faint)]">·</span>
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                Live demo
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7M10 14L21 3M21 14v7H3V3h7" />
                </svg>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
