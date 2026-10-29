"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PaletteHint } from "@/components/command/PaletteHint";

const links = [
  { id: "sawt", label: "Sawt" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "certs", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight whichever section owns the middle of the viewport
  useEffect(() => {
    if (!onHome) return;
    const els = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="container-max">
        <nav
          aria-label="Main"
          className={clsx(
            "flex items-center justify-between gap-6 rounded-full px-5 py-2.5 transition-all",
            scrolled
              ? "glass shadow-[var(--shadow-md)]"
              : "border border-transparent",
          )}
        >
          <Link
            href="/"
            className="font-display text-lg italic tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
          >
            Ahmad Nassar<span className="text-[var(--accent)]">.</span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  href={href(l.id)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={clsx(
                    "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                    active === l.id
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[var(--surface-3)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <PaletteHint compact className="hidden sm:inline-flex" />
            <ThemeToggle />
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border-default)] bg-[var(--surface-2)]/60 text-[var(--text-secondary)] lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mt-3 overflow-hidden rounded-2xl lg:hidden"
          >
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  href={href(l.id)}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "block px-5 py-3 text-sm hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]",
                    active === l.id
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)]",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </header>
  );
}
