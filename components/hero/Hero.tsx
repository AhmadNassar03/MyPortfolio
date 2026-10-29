import Link from "next/link";
import { profile } from "@/content/cv";
import { AuroraCanvas } from "./AuroraCanvas";
import { NeuralField } from "./NeuralField";
import { CurrentlyExploring } from "./CurrentlyExploring";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NoiseLayer } from "@/components/ui/NoiseLayer";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitWords } from "@/components/motion/SplitWords";
import { CountUp } from "@/components/motion/CountUp";
import { PaletteHint } from "@/components/command/PaletteHint";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32 pb-20"
    >
      <AuroraCanvas />
      <NeuralField />
      <NoiseLayer />

      <div className="container-max relative z-[var(--z-content)]">
        <FadeIn delay={0.05} y={12}>
          <div className="flex flex-wrap items-center gap-3">
            <CurrentlyExploring />
            <Link
              href="#sawt"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-2)]/50 px-3.5 py-2 text-xs text-[var(--text-secondary)] backdrop-blur transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            >
              <span className="rounded-full bg-[var(--accent)] px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-wider text-[var(--on-accent)]">
                new
              </span>
              Sawt is live — try the call demo
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </FadeIn>

        <h1 className="font-display mt-8 max-w-5xl text-balance leading-[0.98]">
          <FadeIn delay={0.1} y={8}>
            <span className="mb-3 block text-2xl font-normal tracking-tight text-[var(--text-muted)] md:text-3xl">
              Hi, I&apos;m Ahmad —
            </span>
          </FadeIn>
          <span className="block" style={{ fontSize: "var(--text-hero)" }}>
            <SplitWords
              text="I build AI products"
              delay={0.2}
              accentFrom={2}
            />
            <br />
            <SplitWords text="that actually ship." delay={0.48} />
          </span>
        </h1>

        <FadeIn delay={0.75} y={16}>
          <p className="mt-8 max-w-2xl text-balance text-lg text-[var(--text-secondary)]">
            {profile.tagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.9} y={12}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" variant="primary">
              View work
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Get in touch
            </MagneticButton>
            <MagneticButton
              href={profile.links.github}
              variant="ghost"
              external
              ariaLabel="GitHub profile"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.34-3.37-1.34-.45-1.17-1.11-1.48-1.11-1.48-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
              </svg>
            </MagneticButton>
            <PaletteHint className="hidden md:inline-flex" />
          </div>
        </FadeIn>

        <FadeIn delay={1.05} y={20}>
          <dl className="mt-20 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 md:gap-x-12">
            {profile.highlights.map((h) => (
              <div key={h.label} className="flex flex-col gap-1">
                <dt className="font-display text-3xl text-[var(--text-primary)] md:text-4xl">
                  <CountUp value={h.value} />
                </dt>
                <dd className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  {h.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[var(--text-faint)] [@media(min-height:880px)]:md:flex"
      >
        <span>CLICK THE FIELD · SCROLL</span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>
    </section>
  );
}
