import clsx from "clsx";

type Props = {
  children: string;
  featured?: boolean;
};

export function TechPill({ children, featured = false }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono whitespace-nowrap transition-all",
        featured
          ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20"
          : "border-[var(--border-default)] bg-[var(--surface-2)]/40 text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]",
      )}
    >
      {children}
    </span>
  );
}
