"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/** One-click copy of the email address with inline confirmation. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard
      ?.writeText(email)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${email}`}
      className="relative inline-flex h-[46px] items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border-strong)] px-5 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "idle"}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-2"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12l5 5L20 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
              Copy email
            </>
          )}
        </motion.span>
      </AnimatePresence>
      <span role="status" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
