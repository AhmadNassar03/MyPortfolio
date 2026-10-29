"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { sortedSkills, projectsUsing, skills } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * Skills explorer: hover or tap any skill to light up the projects that
 * actually use it. Soft skills have no project mapping and stay static.
 */
export function SkillsMatrix() {
  const [selected, setSelected] = useState<string>("Deepgram STT");
  const [hovered, setHovered] = useState<string | null>(null);
  const focus = hovered ?? selected;
  const used = projectsUsing(focus);
  const total = skills.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="skills" className="section">
      <div className="container-max">
        <SectionHeader
          index="03"
          eyebrow="Skills explorer"
          title={
            <>
              The <em className="font-display italic aurora-text">stack</em>{" "}
              I ship with.
            </>
          }
          description={`${total} tools across ${skills.length} areas. Hover or tap any of them to see where it runs in production.`}
        />

        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {sortedSkills.map((group, i) => {
              const isFeatured = group.category === "AI / LLM";
              const mappable = group.category !== "Soft Skills";
              return (
                <FadeIn
                  key={group.category}
                  delay={0.04 * i}
                  className={isFeatured ? "sm:col-span-2" : ""}
                >
                  <div className="glass h-full rounded-2xl p-5">
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg text-[var(--text-primary)] md:text-xl">
                        {group.category}
                      </h3>
                      {isFeatured && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
                          {"// primary focus"}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => {
                        const count = mappable ? projectsUsing(item).length : 0;
                        const active = focus === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            disabled={!mappable}
                            aria-pressed={selected === item}
                            onClick={() => setSelected(item)}
                            onMouseEnter={() => mappable && setHovered(item)}
                            onMouseLeave={() => setHovered(null)}
                            onFocus={() => mappable && setHovered(item)}
                            onBlur={() => setHovered(null)}
                            className={clsx(
                              "relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-xs transition-all disabled:cursor-default",
                              active
                                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                                : isFeatured
                                  ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] enabled:hover:bg-[var(--accent)]/20"
                                  : "border-[var(--border-default)] bg-[var(--surface-2)]/40 text-[var(--text-secondary)] enabled:hover:border-[var(--border-strong)] enabled:hover:text-[var(--text-primary)]",
                            )}
                          >
                            {item}
                            {count > 0 && (
                              <span
                                className={clsx(
                                  "text-[9px]",
                                  active ? "opacity-70" : "opacity-50",
                                )}
                              >
                                {count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Live "where is it used" panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass overflow-hidden rounded-2xl p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                {"// where it runs"}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={focus}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-display mt-3 text-3xl text-[var(--text-primary)]">
                    {focus}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {used.length === 0
                      ? "Day-to-day tooling — not tied to a single product."
                      : `Used in ${used.length} project${used.length > 1 ? "s" : ""}`}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {used.map((p, i) => (
                      <motion.li
                        key={p.slug}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={`/projects/${p.slug}`}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)]/40 px-4 py-3 transition-colors hover:border-[var(--accent)]"
                        >
                          <span>
                            <span className="block text-[var(--text-primary)]">
                              {p.name}
                            </span>
                            <span className="block text-xs text-[var(--text-muted)]">
                              {p.tagline}
                            </span>
                          </span>
                          <span className="text-[var(--text-faint)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent)]">
                            →
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
