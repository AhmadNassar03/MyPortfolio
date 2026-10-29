"use client";

import clsx from "clsx";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";

/** Small "⌘K" trigger that opens the command palette. */
export function PaletteHint({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
      aria-label="Open command palette"
      className={clsx(
        "items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-2)]/60 text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]",
        compact ? "h-9 px-3" : "px-4 py-2.5",
        className,
      )}
    >
      {!compact && <span>Quick jump</span>}
      <kbd className="font-mono text-[10px] tracking-wider">⌘K</kbd>
    </button>
  );
}
