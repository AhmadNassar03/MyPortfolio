"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/** Read a token from :root so the canvas follows the active theme. */
function token(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

/**
 * Interactive "neural field": drifting nodes that wire themselves together
 * when close, bend away from the pointer and light up the links around it.
 * A click sends a pulse ring through the network.
 *
 * Canvas 2D, DPR-aware, pauses off-screen, and renders a single static
 * frame for prefers-reduced-motion.
 */
export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = { a: "", b: "", c: "" };
    const readColors = () => {
      colors = {
        a: token("--aurora-1"),
        b: token("--aurora-2"),
        c: token("--text-faint"),
      };
    };
    readColors();

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const pulses: { x: number; y: number; t: number }[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, (w * h) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    const LINK = 130;
    const REACH = 170;

    function frame() {
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) {
          // pointer repulsion
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (pointer.active && d2 < REACH * REACH) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / REACH) * 0.6;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
          // pulse shove
          for (const p of pulses) {
            const pd = Math.hypot(n.x - p.x, n.y - p.y);
            const ring = p.t * 9;
            if (Math.abs(pd - ring) < 14) {
              n.vx += ((n.x - p.x) / (pd || 1)) * 0.9;
              n.vy += ((n.y - p.y) / (pd || 1)) * 0.9;
            }
          }
          n.vx *= 0.96;
          n.vy *= 0.96;
          // keep a gentle base drift
          if (Math.abs(n.vx) < 0.05) n.vx += (Math.random() - 0.5) * 0.05;
          if (Math.abs(n.vy) < 0.05) n.vy += (Math.random() - 0.5) * 0.05;
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -10) n.x = w + 10;
          if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10;
          if (n.y > h + 10) n.y = -10;
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const d = Math.sqrt(d2);
          const mx = (a.x + b.x) / 2 - pointer.x;
          const my = (a.y + b.y) / 2 - pointer.y;
          const near = pointer.active && mx * mx + my * my < REACH * REACH;
          ctx!.globalAlpha = (1 - d / LINK) * (near ? 0.9 : 0.28);
          ctx!.strokeStyle = near ? colors.b : colors.c;
          ctx!.lineWidth = near ? 1.1 : 0.6;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        const near =
          pointer.active &&
          Math.hypot(n.x - pointer.x, n.y - pointer.y) < REACH;
        ctx!.globalAlpha = near ? 1 : 0.7;
        ctx!.fillStyle = near ? colors.b : colors.a;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, near ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += 1;
        const radius = p.t * 9;
        ctx!.globalAlpha = Math.max(0, 1 - p.t / 60) * 0.6;
        ctx!.strokeStyle = colors.b;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx!.stroke();
        if (p.t > 60) pulses.splice(i, 1);
      }
      ctx!.globalAlpha = 1;
    }

    let raf = 0;
    let running = false;
    function loop() {
      frame();
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    frame();

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      frame();
    });
    ro.observe(canvas);

    // re-read palette when the theme flips
    const mo = new MutationObserver(() => {
      readColors();
      if (!running) frame();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.y >= 0 && pointer.y <= rect.height && pointer.x >= 0;
    }
    function onLeave() {
      pointer.active = false;
    }
    function onDown(e: PointerEvent) {
      if ((e.target as Element)?.closest("a, button")) return;
      const rect = canvas!.getBoundingClientRect();
      const y = e.clientY - rect.top;
      if (y < 0 || y > rect.height) return;
      pulses.push({ x: e.clientX - rect.left, y, t: 0 });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_85%)]"
    />
  );
}
