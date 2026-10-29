"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { projects, projectTags, type ProjectTag } from "@/content/cv";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Filter = "All" | ProjectTag;

const filters: Filter[] = [
  "All",
  ...projectTags.filter((t) => projects.some((p) => p.tags.includes(t))),
];

export function FeaturedBento({ index = "04" }: { index?: string }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="section">
      <div className="container-max">
        <SectionHeader
          index={index}
          eyebrow="Featured Work"
          title={
            <>
              Real <em className="font-display italic aurora-text">AI products</em>
              ,
              <br />
              shipped and in the lab.
            </>
          }
          description="Voice agents, 3D configurators, LLM SaaS and computer vision. Filter by what you care about — every card opens a full case study."
        />

        <LayoutGroup>
          <div
            role="tablist"
            aria-label="Filter projects"
            className="mb-8 flex flex-wrap gap-2"
          >
            {filters.map((f) => {
              const count =
                f === "All"
                  ? projects.length
                  : projects.filter((p) => p.tags.includes(f)).length;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={clsx(
                    "relative rounded-full border px-4 py-2 text-sm transition-colors",
                    filter === f
                      ? "border-transparent text-[var(--on-accent)]"
                      : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {f}{" "}
                    <span className="font-mono text-[10px] opacity-60">
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((p) => {
                const feature = p.bentoSize === "feature";
                return (
                  <motion.div
                    layout
                    key={p.slug}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className={clsx(
                      feature && "md:col-span-2 lg:row-span-2",
                      p.bentoSize === "tall" && "lg:row-span-2",
                    )}
                  >
                    <ProjectCard
                      project={p}
                      feature={feature}
                      className={clsx(
                        "h-full",
                        feature ? "min-h-[460px]" : "min-h-[300px]",
                      )}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
