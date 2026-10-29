"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Soft aurora light that trails the pointer, plus a ring that snaps to it
 * and grows over anything clickable. Fine pointers only — touch devices
 * never mount it.
 */
export function CursorGlow() {
  const enabled = useMediaQuery("(pointer: fine)");
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glowX = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 });
  const ringX = useSpring(x, { stiffness: 600, damping: 40, mass: 0.2 });
  const ringY = useSpring(y, { stiffness: 600, damping: 40, mass: 0.2 });

  useEffect(() => {
    if (!enabled) return;
    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setHovering(
        !!t?.closest("a, button, [role='button'], input, [data-cursor]"),
      );
    }
    function onLeave() {
      setVisible(false);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 -z-10 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full opacity-0 [background:radial-gradient(circle,var(--accent-glow),transparent_60%)] blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 44 : 14,
          height: hovering ? 44 : 14,
          marginLeft: hovering ? -22 : -7,
          marginTop: hovering ? -22 : -7,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="pointer-events-none fixed left-0 top-0 z-[var(--z-modal)] rounded-full border border-[var(--accent)] mix-blend-difference"
      />
    </>
  );
}
