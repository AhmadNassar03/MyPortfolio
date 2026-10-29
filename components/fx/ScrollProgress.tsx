"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin aurora bar pinned to the top edge that tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[var(--z-modal)] h-[2px] origin-left bg-[linear-gradient(90deg,var(--aurora-1),var(--aurora-2),var(--aurora-3))]"
    />
  );
}
