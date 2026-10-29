"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { getProject } from "@/content/cv";
import { CountUp } from "@/components/motion/CountUp";
import { callScript, dialects, type CallEvent, type Dialect } from "./callScript";

type Engine = "pipeline" | "realtime";
type StageId = "caller" | "twilio" | "stt" | "llm" | "tts" | "realtime";

const stages: Record<Engine, { id: StageId; name: string; role: string }[]> = {
  pipeline: [
    { id: "caller", name: "Caller", role: "Real phone line, any network" },
    { id: "twilio", name: "Twilio MediaStream", role: "μ-law audio over WebSocket" },
    { id: "stt", name: "Deepgram STT", role: "Streaming Arabic transcription" },
    { id: "llm", name: "LLM + tools", role: "Function calling, RAG, memory" },
    { id: "tts", name: "ElevenLabs TTS", role: "Dialect voice, streamed back" },
  ],
  realtime: [
    { id: "caller", name: "Caller", role: "Real phone line, any network" },
    { id: "twilio", name: "Twilio MediaStream", role: "μ-law audio over WebSocket" },
    { id: "realtime", name: "OpenAI Realtime", role: "Speech-to-speech, premium tier" },
  ],
};

function activeStages(ev: CallEvent | undefined, engine: Engine): StageId[] {
  if (!ev) return [];
  const map: Record<CallEvent["kind"], StageId[]> = {
    caller: ["caller", "twilio", "stt"],
    tool: ["llm"],
    agent: ["llm", "tts", "twilio", "caller"],
  };
  const ids = map[ev.kind];
  if (engine === "pipeline") return ids;
  return Array.from(
    new Set(ids.map((s) => (s === "stt" || s === "llm" || s === "tts" ? "realtime" : s))),
  ) as StageId[];
}

function Waveform({ speaker }: { speaker: "caller" | "agent" | null }) {
  const bars = 36;
  return (
    <div
      aria-hidden="true"
      className="flex h-10 items-center justify-center gap-[3px]"
    >
      {Array.from({ length: bars }, (_, i) => {
        const base = 0.25 + 0.75 * Math.abs(Math.sin(i * 0.9));
        return (
          <span
            key={i}
            className={clsx(
              "w-[3px] rounded-full transition-colors duration-300",
              speaker ? "wave-bar" : "",
              speaker === "agent"
                ? "bg-[var(--aurora-2)]"
                : speaker === "caller"
                  ? "bg-[var(--aurora-3)]"
                  : "bg-[var(--border-strong)]",
            )}
            style={{
              height: `${Math.round(base * 100)}%`,
              animationDelay: `${(i % 9) * -0.12}s`,
              transform: speaker ? undefined : "scaleY(0.15)",
            }}
          />
        );
      })}
    </div>
  );
}

export function SawtShowcase({ compact = false }: { compact?: boolean }) {
  const sawt = getProject("sawt")!;
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-120px" });

  const [dialect, setDialect] = useState<Dialect>("levantine");
  const [engine, setEngine] = useState<Engine>("pipeline");
  const [step, setStep] = useState(-1); // index of event currently playing
  const [run, setRun] = useState(0); // bumps on every (re)start
  const [elapsed, setElapsed] = useState(0);
  const [showGloss, setShowGloss] = useState(true);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const script = useMemo(() => callScript(dialect), [dialect]);
  const playing = step >= 0 && step < script.length;
  const current = playing ? script[step] : undefined;
  const lit = activeStages(current, engine);
  const speaker =
    current && current.kind !== "tool" ? current.kind : null;

  const play = useCallback(() => {
    setStep(0);
    setElapsed(0);
    setRun((r) => r + 1);
  }, []);

  // autoplay once the panel scrolls into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { rootMargin: "-120px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [play]);

  // advance through the script
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), script[step].ms);
    return () => window.clearTimeout(id);
  }, [playing, step, script, run]);

  // call timer
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [playing]);

  // keep newest line in view
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [step]);

  function pickDialect(d: Dialect) {
    setDialect(d);
    play();
  }

  const shown = script.slice(0, Math.max(0, playing ? step + 1 : step));
  const mmss = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;
  const finished = step >= script.length;

  return (
    <div ref={rootRef} className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
      {/* ── Call panel ───────────────────────────────────────── */}
      <div className="glass flex flex-col overflow-hidden !rounded-3xl">
        {/* dialect switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] p-4">
          <div
            role="tablist"
            aria-label="Dialect"
            className="flex flex-wrap gap-1 rounded-full bg-[var(--surface-2)]/70 p-1"
          >
            {dialects.map((d) => (
              <button
                key={d.id}
                role="tab"
                aria-selected={dialect === d.id}
                onClick={() => pickDialect(d.id)}
                className={clsx(
                  "relative rounded-full px-3 py-1.5 text-xs transition-colors",
                  dialect === d.id
                    ? "text-[var(--on-accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                {dialect === d.id && (
                  <motion.span
                    layoutId={compact ? "dialect-pill-cs" : "dialect-pill"}
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 450, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {d.label}{" "}
                  <span className="font-arabic opacity-70">{d.native}</span>
                </span>
              </button>
            ))}
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-[var(--text-muted)]">
            <input
              type="checkbox"
              checked={showGloss}
              onChange={(e) => setShowGloss(e.target.checked)}
              className="accent-[var(--accent)]"
            />
            English gloss
          </label>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between gap-3 px-5 pt-4">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
            <span className="relative flex h-2 w-2">
              {playing && (
                <span className="absolute inset-0 animate-ping rounded-full bg-[oklch(72%_0.18_145)] opacity-75" />
              )}
              <span
                className={clsx(
                  "relative h-2 w-2 rounded-full",
                  playing ? "bg-[oklch(72%_0.18_145)]" : "bg-[var(--text-faint)]",
                )}
              />
            </span>
            {playing ? "live call" : finished ? "call ended" : "ready"} · clinic
            receptionist · {mmss}
          </div>
          <button
            type="button"
            onClick={play}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
              <path d="M7 4v16l13-8z" />
            </svg>
            {playing ? "Restart" : finished ? "Replay call" : "Play call"}
          </button>
        </div>

        <div className="px-5 py-3">
          <Waveform speaker={speaker} />
        </div>

        {/* transcript */}
        <div
          ref={transcriptRef}
          aria-live="polite"
          className={clsx(
            "flex-1 space-y-3 overflow-y-auto px-5 pb-5",
            compact ? "h-[340px]" : "h-[380px]",
          )}
        >
          <AnimatePresence initial={false}>
            {shown.map((ev, i) =>
              ev.kind === "tool" ? (
                <motion.div
                  key={`${dialect}-${i}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mx-auto w-fit max-w-full rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)]/50 px-3 py-1.5 font-mono text-[10.5px] text-[var(--text-muted)]"
                >
                  <span className="text-[var(--accent)]">ƒ {ev.name}</span>
                  <span className="text-[var(--text-faint)]">({ev.args})</span>
                  <span className="text-[var(--text-faint)]"> → </span>
                  <span className="text-[var(--text-secondary)]">{ev.result}</span>
                </motion.div>
              ) : (
                <motion.div
                  key={`${dialect}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className={clsx(
                    "flex",
                    ev.kind === "agent" ? "justify-start" : "justify-end",
                  )}
                >
                  <div
                    className={clsx(
                      "max-w-[85%] rounded-2xl px-4 py-3",
                      ev.kind === "agent"
                        ? "rounded-bl-sm border border-[var(--accent)]/30 bg-[var(--accent)]/10"
                        : "rounded-br-sm bg-[var(--surface-3)]",
                    )}
                  >
                    <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-[var(--text-faint)]">
                      {ev.kind === "agent" ? "Sawt agent" : "Caller"}
                    </p>
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-[15px] leading-relaxed text-[var(--text-primary)]"
                    >
                      {ev.ar}
                    </p>
                    {showGloss && (
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {ev.en}
                      </p>
                    )}
                  </div>
                </motion.div>
              ),
            )}
          </AnimatePresence>
          {playing && current && current.kind !== "tool" && (
            <div
              className={clsx(
                "flex gap-1 px-2",
                current.kind === "agent" ? "justify-start" : "justify-end",
              )}
              aria-hidden="true"
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-[var(--text-faint)]"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Pipeline + economics ─────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="glass !rounded-3xl p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
              {"// what's running right now"}
            </p>
            <div
              role="tablist"
              aria-label="Voice engine"
              className="flex rounded-full bg-[var(--surface-2)]/70 p-1 text-[11px]"
            >
              {(["pipeline", "realtime"] as const).map((e) => (
                <button
                  key={e}
                  role="tab"
                  aria-selected={engine === e}
                  onClick={() => setEngine(e)}
                  className={clsx(
                    "relative rounded-full px-3 py-1 transition-colors",
                    engine === e
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]",
                  )}
                >
                  {engine === e && (
                    <motion.span
                      layoutId={compact ? "engine-pill-cs" : "engine-pill"}
                      className="absolute inset-0 rounded-full bg-[var(--surface-3)]"
                      transition={{ type: "spring", stiffness: 450, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {e === "pipeline" ? "Sawt pipeline" : "OpenAI Realtime"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <ol className="relative">
            <AnimatePresence mode="popLayout" initial={false}>
              {stages[engine].map((s, i, all) => {
                const on = lit.includes(s.id);
                return (
                  <motion.li
                    layout
                    key={s.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative flex gap-4 pb-4 last:pb-0"
                  >
                    {/* connector */}
                    {i < all.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[11px] top-7 bottom-0 w-px overflow-hidden bg-[var(--border-default)]"
                      >
                        {on && lit.includes(all[i + 1].id) && (
                          <span className="packet-y absolute left-0 h-3 w-px bg-[var(--accent)]" />
                        )}
                      </span>
                    )}
                    <span
                      className={clsx(
                        "relative z-10 mt-1 grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full border font-mono text-[9px] transition-all duration-300",
                        on
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_0_18px_var(--accent-glow)]"
                          : "border-[var(--border-strong)] bg-[var(--surface-1)] text-[var(--text-faint)]",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p
                        className={clsx(
                          "text-sm font-medium transition-colors",
                          on ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]",
                        )}
                      >
                        {s.name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">{s.role}</p>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>

          {/* relative cost */}
          <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
              cost per call-minute · relative
            </p>
            {[
              { id: "realtime" as const, label: "OpenAI Realtime", pct: 100 },
              { id: "pipeline" as const, label: "Sawt pipeline", pct: 43 },
            ].map((row) => (
              <div key={row.id} className="mb-2 last:mb-0">
                <div className="mb-1 flex justify-between text-xs">
                  <span
                    className={
                      engine === row.id
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)]"
                    }
                  >
                    {row.label}
                  </span>
                  <span className="font-mono text-[var(--text-muted)]">
                    {row.pct === 100 ? "baseline" : "−57%"}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <motion.div
                    className={clsx(
                      "h-full rounded-full",
                      row.id === "pipeline"
                        ? "bg-[linear-gradient(90deg,var(--aurora-1),var(--aurora-2))]"
                        : "bg-[var(--text-faint)]",
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${row.pct}%` : 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* metrics + CTAs */}
        {sawt.metrics && (
          <dl className="grid grid-cols-2 gap-3">
            {sawt.metrics.map((m) => (
              <div key={m.label} className="glass !rounded-2xl p-4">
                <dt className="font-display text-3xl text-[var(--text-primary)]">
                  <CountUp value={m.value} />
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        )}
        {!compact && (
          <div className="flex flex-wrap gap-3">
            {sawt.liveUrl && (
              <Link
                href={sawt.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                Open Sawt live
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M14 3h7v7M10 14L21 3M21 14v7H3V3h7" />
                </svg>
              </Link>
            )}
            <Link
              href="/projects/sawt"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Full case study →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
