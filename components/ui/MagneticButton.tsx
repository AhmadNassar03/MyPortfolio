"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  external = false,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const styles = clsx(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors will-change-transform",
    variant === "primary" &&
      "bg-[var(--accent)] text-[oklch(15%_0.02_280)] hover:bg-[var(--accent-hover)]",
    variant === "outline" &&
      "border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
    variant === "ghost" &&
      "text-[var(--text-primary)] hover:text-[var(--accent)]",
    className,
  );

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 [box-shadow:0_0_40px_-4px_var(--accent-glow)] group-hover:opacity-100"
        />
      )}
    </>
  );

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <motion.span
        style={{ x: sx, y: sy }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="inline-block"
      >
        <Link
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          aria-label={ariaLabel}
          className={clsx(styles, "group")}
          {...externalProps}
        >
          {inner}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.span
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={clsx(styles, "group")}
      >
        {inner}
      </button>
    </motion.span>
  );
}
