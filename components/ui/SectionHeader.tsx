import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: Props) {
  return (
    <header
      id={id}
      className={clsx(
        "mb-12 flex flex-col gap-4",
        align === "center" && "items-center text-center",
      )}
    >
      <div className="flex items-center gap-3 font-mono text-xs tracking-wider text-[var(--text-muted)] uppercase">
        <span className="text-[var(--accent)]">{index}</span>
        <span className="h-px w-8 bg-[var(--border-default)]" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-display text-balance text-3xl text-[var(--text-primary)] md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-base text-[var(--text-muted)]">
          {description}
        </p>
      )}
    </header>
  );
}
