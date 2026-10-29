"use client";

import { motion } from "motion/react";

/**
 * Word-by-word masked reveal for display headlines. Each word rises out
 * of its own clipping box; screen readers get the plain sentence.
 */
export function SplitWords({
  text,
  delay = 0,
  className,
  accentFrom,
  accentClassName = "aurora-text italic pr-[0.08em]",
}: {
  text: string;
  delay?: number;
  className?: string;
  /** Words at or after this index get `accentClassName`. */
  accentFrom?: number;
  accentClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className={`inline-block ${accentFrom !== undefined && i >= accentFrom ? accentClassName : ""}`}
              initial={{ y: "110%", rotate: 4 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </span>
  );
}
