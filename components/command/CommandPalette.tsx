"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { profile, projects } from "@/content/cv";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Projects" | "Actions";
  run: () => void;
};

export const OPEN_PALETTE_EVENT = "open-command-palette";

const sections = [
  { id: "sawt", label: "Sawt — live call demo" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills explorer" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "certs", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

/**
 * ⌘K / Ctrl+K command palette: jump to sections, open case studies,
 * copy email, flip theme. Fully keyboard driven.
 */
export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const goTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else router.push(`/#${id}`);
    },
    [router],
  );

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((s) => ({
        id: `nav-${s.id}`,
        label: s.label,
        hint: `#${s.id}`,
        group: "Navigate" as const,
        run: () => goTo(s.id),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        label: p.name,
        hint: p.tagline,
        group: "Projects" as const,
        run: () => router.push(`/projects/${p.slug}`),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        run: () => {
          navigator.clipboard
            ?.writeText(profile.email)
            .then(() => flash("Email copied"))
            .catch(() => {});
        },
      },
      {
        id: "theme",
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`,
        hint: "T",
        group: "Actions",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "sawt-live",
        label: "Open Sawt live",
        hint: "sawtai.app",
        group: "Actions",
        run: () =>
          window.open(
            projects.find((p) => p.slug === "sawt")?.liveUrl,
            "_blank",
            "noopener",
          ),
      },
      {
        id: "cv",
        label: "Download CV",
        hint: "PDF",
        group: "Actions",
        run: () => {
          const a = document.createElement("a");
          a.href = "/ahmad-nassar-cv.pdf";
          a.download = "Ahmad-Nassar-CV.pdf";
          a.click();
        },
      },
      {
        id: "github",
        label: "GitHub",
        hint: "@AhmadNassar03",
        group: "Actions",
        run: () => window.open(profile.links.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "ahmad-nassar",
        group: "Actions",
        run: () => window.open(profile.links.linkedin, "_blank", "noopener"),
      },
    ],
    [goTo, router, resolvedTheme, setTheme, flash],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.group}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Global shortcuts
  useEffect(() => {
    function show() {
      setQuery("");
      setActive(0);
      setOpen(true);
    }
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else show();
      } else if (
        e.key === "/" &&
        !open &&
        !(e.target as HTMLElement)?.closest("input, textarea")
      ) {
        e.preventDefault();
        show();
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, show);
    };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function runAt(i: number) {
    const cmd = filtered[i];
    if (!cmd) return;
    setOpen(false);
    // let the dialog close before scrolling/navigating
    window.setTimeout(cmd.run, 60);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(active);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center px-4 pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              type="button"
              aria-label="Close command palette"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[oklch(0%_0_0/0.45)] backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="glass relative w-full max-w-xl overflow-hidden !rounded-2xl bg-[var(--surface-1)] shadow-[var(--shadow-lg)]"
            >
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4 shrink-0 text-[var(--text-muted)]"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder="Jump to a section, project or action…"
                  aria-label="Search commands"
                  aria-controls="command-list"
                  aria-activedescendant={
                    filtered[active] ? `cmd-${filtered[active].id}` : undefined
                  }
                  className="h-14 w-full bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-none focus-visible:outline-none"
                />
                <kbd className="rounded border border-[var(--border-default)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                  ESC
                </kbd>
              </div>

              <ul
                id="command-list"
                ref={listRef}
                role="listbox"
                className="max-h-[50vh] overflow-y-auto p-2"
              >
                {filtered.length === 0 && (
                  <li className="px-3 py-8 text-center text-sm text-[var(--text-muted)]">
                    Nothing matches “{query}”.
                  </li>
                )}
                {filtered.map((c, i) => {
                  const header = c.group !== lastGroup ? c.group : null;
                  lastGroup = c.group;
                  return (
                    <li key={c.id} role="presentation">
                      {header && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-faint)]">
                          {header}
                        </p>
                      )}
                      <div
                        id={`cmd-${c.id}`}
                        role="option"
                        aria-selected={i === active}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => runAt(i)}
                        className={clsx(
                          "relative flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm",
                          i === active
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)]",
                        )}
                      >
                        {i === active && (
                          <motion.span
                            layoutId="cmd-active"
                            className="absolute inset-0 rounded-lg bg-[var(--surface-3)]"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 40,
                            }}
                          />
                        )}
                        <span className="relative">{c.label}</span>
                        <span className="relative truncate font-mono text-[10px] text-[var(--text-faint)]">
                          {c.hint}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-4 border-t border-[var(--border-subtle)] px-4 py-2.5 font-mono text-[10px] text-[var(--text-faint)]">
                <span>↑↓ navigate</span>
                <span>↵ run</span>
                <span className="ml-auto">⌘K / Ctrl K anywhere</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="glass fixed bottom-6 left-1/2 z-[var(--z-modal)] -translate-x-1/2 !rounded-full px-4 py-2 text-sm text-[var(--text-primary)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
