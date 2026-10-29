import { skills } from "@/content/cv";

/** Infinite band of every tool in the stack. Pauses on hover. */
export function StackMarquee() {
  const items = skills
    .filter((g) => g.category !== "Soft Skills")
    .flatMap((g) => g.items);

  const track = (hidden: boolean) => (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2.5 whitespace-nowrap font-display text-2xl italic text-[var(--text-muted)] md:text-3xl"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="border-y border-[var(--border-subtle)] py-6">
      <div className="marquee" aria-label="Technologies I use">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
