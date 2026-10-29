"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { certifications, type Certification } from "@/content/cv";
import { SectionHeader } from "@/components/ui/SectionHeader";
import clsx from "clsx";

const issuerStyles: Record<
  Certification["issuer"],
  { ring: string; label: string }
> = {
  Anthropic: {
    ring: "border-[oklch(75%_0.16_30)]/40 hover:border-[oklch(75%_0.16_30)]/70",
    label: "text-[oklch(78%_0.16_30)]",
  },
  Google: {
    ring: "border-[oklch(75%_0.16_200)]/40 hover:border-[oklch(75%_0.16_200)]/70",
    label: "text-[oklch(78%_0.16_200)]",
  },
  Coursera: {
    ring: "border-[oklch(70%_0.18_260)]/40 hover:border-[oklch(70%_0.18_260)]/70",
    label: "text-[oklch(75%_0.18_260)]",
  },
};

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const style = issuerStyles[cert.issuer];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index, 12) * 0.025 }}
    >
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "group relative block h-full rounded-2xl border p-5 transition-all hover-lift",
          style.ring,
        )}
        aria-label={`${cert.name} (verify on ${cert.issuer})`}
      >
        <div className="flex items-center justify-between">
          <span
            className={clsx(
              "font-mono text-[10px] uppercase tracking-widest",
              style.label,
            )}
          >
            {cert.issuer}
          </span>
          <span className="font-mono text-[10px] text-[var(--text-faint)]">
            {cert.issueDate}
          </span>
        </div>
        <p className="mt-3 text-balance leading-snug text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">
          {cert.name}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-faint)] opacity-0 transition-opacity group-hover:opacity-100">
          verify
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-2.5 w-2.5"
            aria-hidden="true"
          >
            <path d="M14 3h7v7M10 14L21 3" />
          </svg>
        </div>
      </a>
    </motion.div>
  );
}

type Tab = "Featured" | "Anthropic" | "Google" | "All";

const tabs: { id: Tab; match: (c: Certification) => boolean }[] = [
  { id: "Featured", match: (c) => !!c.featured },
  { id: "Anthropic", match: (c) => c.issuer === "Anthropic" },
  { id: "Google", match: (c) => c.issuer === "Google" },
  { id: "All", match: () => true },
];

export function CertGrid() {
  const [tab, setTab] = useState<Tab>("Featured");
  const shown = certifications.filter(tabs.find((t) => t.id === tab)!.match);

  return (
    <section id="certs" className="section">
      <div className="container-max">
        <SectionHeader
          index="06"
          eyebrow="Certifications"
          title={
            <>
              <em className="font-display italic aurora-text">
                {certifications.length} AI certifications
              </em>{" "}
              from Anthropic & Google.
            </>
          }
          description="Anthropic deep-track (MCP, Bedrock, Vertex, Anthropic API, Claude Code) plus Google's full AI for Work specialization. Every card links to its public verifier."
        />

        <div role="tablist" aria-label="Filter certifications" className="mb-6 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const count = certifications.filter(t.match).length;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={clsx(
                  "relative rounded-full border px-4 py-2 text-sm transition-colors",
                  tab === t.id
                    ? "border-transparent text-[var(--text-primary)]"
                    : "border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="cert-tab"
                    className="absolute inset-0 rounded-full bg-[var(--surface-3)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {t.id} <span className="font-mono text-[10px] opacity-60">{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence initial={false}>
            {shown.map((cert, i) => (
              <CertCard key={cert.credentialId} cert={cert} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
