"use client";

import { profile } from "@/content/cv";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function CurrentlyExploring() {
  const items = profile.currentlyExploring;
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 2400);
    return () => clearInterval(id);
  }, [items.length]);

  const visible = items[index];

  return (
    <div
      role="status"
      aria-live="polite"
      className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-mono"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-75 animate-ping" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      </span>
      <span className="text-[var(--text-muted)]">currently exploring</span>
      <span className="text-[var(--accent)]">›</span>
      {mounted ? (
        <AnimatePresence mode="wait">
          <motion.span
            key={visible}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[var(--text-primary)] caret-blink"
          >
            {visible}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className="text-[var(--text-primary)] caret-blink">
          {items[0]}
        </span>
      )}
    </div>
  );
}
