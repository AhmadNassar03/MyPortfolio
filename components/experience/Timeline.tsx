"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="experience" className="section">
      <div className="container-max">
        <SectionHeader
          index="05"
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve{" "}
              <em className="font-display italic aurora-text">shipped code</em>.
            </>
          }
        />

        <ol ref={listRef} className="relative space-y-10 pl-8 md:pl-12">
          {/* track + scroll-linked fill */}
          <div
            aria-hidden="true"
            className="absolute left-[5px] top-2 bottom-2 w-px bg-[var(--border-default)] md:left-[7px]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute left-[5px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[var(--aurora-1)] via-[var(--aurora-2)] to-[var(--aurora-3)] shadow-[0_0_12px_var(--accent-glow)] md:left-[7px]"
          />

          {experience.map((job, i) => (
            <li key={`${job.company}-${job.start}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-2 grid h-3 w-3 place-items-center md:-left-12"
              >
                <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-40 blur-md" />
                <span className="relative h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--surface-1)]" />
              </span>

              <FadeIn delay={0.05 * i}>
                <div className="glass rounded-2xl p-6 transition-colors hover:border-[var(--border-strong)] md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl text-[var(--text-primary)] md:text-2xl">
                        {job.role}
                      </h3>
                      <p className="font-medium text-[var(--accent)]">
                        {job.company}
                      </p>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
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
