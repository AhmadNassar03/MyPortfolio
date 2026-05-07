"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Root motion wrapper.
 * `reducedMotion="user"` makes motion-library respect prefers-reduced-motion
 * automatically — animations become instant for users who prefer it.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
