"use client";

import Link from "next/link";
import clsx from "clsx";
import type { Project } from "@/content/cv";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";

const accentMap: Record<Project["accent"], string> = {
  violet:
    "from-[oklch(60%_0.22_290)] to-[oklch(70%_0.18_260)]",
  cyan: "from-[oklch(75%_0.16_200)] to-[oklch(70%_0.14_180)]",
  pink: "from-[oklch(82%_0.12_350)] to-[oklch(70%_0.18_320)]",
  amber: "from-[oklch(78%_0.14_75)] to-[oklch(72%_0.16_50)]",
};

const statusColor: Record<Project["status"], string> = {
  live: "bg-[oklch(72%_0.18_145)]",
  private: "bg-[oklch(75%_0.16_75)]",
  archived: "bg-[oklch(60%_0.02_280)]",
};

const statusLabel: Record<Project["status"], string> = {
  live: "live",
  private: "private",
  archived: "archived",
};

type Props = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={clsx(
        "group glass relative overflow-hidden rounded-2xl p-6 md:p-8 hover-lift",
        className,
      )}
    >
      {/* Accent gradient halo */}
      <div
        aria-hidden="true"
        className={clsx(
          "absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40",
          accentMap[project.accent],
        )}
      />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            <span
              className={clsx(
                "h-1.5 w-1.5 rounded-full",
                statusColor[project.status],
              )}
              aria-hidden="true"
            />
            {statusLabel[project.status]} · {project.year}
          </div>
        </div>

        {/* Title + tagline */}
        <h3 className="font-display mt-4 text-3xl text-[var(--text-primary)] md:text-4xl">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)] md:text-base">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="mt-4 text-[var(--text-muted)]">{project.description}</p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Stack pills */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-2)]/40 px-2.5 py-1 text-[10px] font-mono text-[var(--text-secondary)]"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-2)]/40 px-2.5 py-1 text-[10px] font-mono text-[var(--text-faint)]">
              +{project.stack.length - 6}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
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
                className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
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
