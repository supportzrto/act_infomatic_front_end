import { useEffect, useRef } from "react";

/**
 * The recurring visual signature: a living talent-to-technology network.
 * One lightweight 2D canvas, several "modes" that the network evolves into:
 *  - hero:    people (lime) + technology (paper squares) constellation with signal pulses
 *  - talent:  people clustered around skill hubs
 *  - cloud:   nodes snapped to an infrastructure grid with orthogonal links
 *  - data:    particles flowing through converging streams
 *  - modules: modular blocks assembling into a system
 * Pointer-reactive, paused off-screen, static under reduced motion, lighter on mobile.
 */
export type NetworkVariant = "hero" | "talent" | "cloud" | "data" | "modules";

type Node = { x: number; y: number; bx: number; by: number; vx: number; vy: number; r: number; kind: 0 | 1 | 2; phase: number };

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export function NetworkCanvas({
  variant = "hero",
  className = "",
  density = 1,
  tone = "dark",
}: {
  variant?: NetworkVariant;
  className?: string;
  density?: number;
  tone?: "dark" | "paper";
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const css = getComputedStyle(document.documentElement);
    const LIME = css.getPropertyValue("--lime").trim() || "#c8ff3d";
    const FG = tone === "paper" ? css.getPropertyValue("--paper-ink").trim() : css.getPropertyValue("--paper").trim();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);

    let w = 0, h = 0, nodes: Node[] = [], raf = 0, visible = true, t = 0;
    const pointer = { x: -9999, y: -9999, active: false };
    const pulses: { a: number; b: number; p: number; s: number }[] = [];
    let links: [number, number][] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r = rng(variant.length * 7919 + 13);
      const area = (w * h) / 14000;
      const count = Math.round(Math.min(mobile ? 38 : 110, Math.max(18, area)) * density);
      nodes = []; pulses.length = 0;
      if (variant === "cloud") {
        const g = mobile ? 56 : 72;
        for (let x = g / 2; x < w; x += g)
          for (let y = g / 2; y < h; y += g)
            if (r() > 0.55) nodes.push(mk(x, y, r() > 0.8 ? 2 : 1, r));
      } else if (variant === "modules") {
        const g = mobile ? 64 : 88;
        for (let x = g / 2; x < w; x += g)
          for (let y = g / 2; y < h; y += g)
            if (r() > 0.45) nodes.push(mk(x, y, 1, r));
      } else if (variant === "talent") {
        const hubs = mobile ? 3 : 5;
        for (let i = 0; i < hubs; i++) {
          const hx = w * (0.15 + 0.7 * r()), hy = h * (0.2 + 0.6 * r());
          nodes.push(mk(hx, hy, 2, r));
          const n = Math.round(count / hubs);
          for (let j = 0; j < n; j++) {
            const a = r() * Math.PI * 2, d = 30 + r() * Math.min(w, h) * 0.22;
            nodes.push(mk(hx + Math.cos(a) * d, hy + Math.sin(a) * d, 0, r));
          }
        }
      } else if (variant === "data") {
        for (let i = 0; i < count * 1.4; i++) nodes.push(mk(r() * w, r() * h, r() > 0.85 ? 1 : 0, r));
      } else {
        for (let i = 0; i < count; i++) nodes.push(mk(r() * w, r() * h, r() > 0.62 ? 1 : 0, r));
      }
      // links
      links = [];
      const maxD = variant === "cloud" ? (mobile ? 60 : 76) : variant === "modules" ? (mobile ? 68 : 92) : Math.min(170, Math.max(110, w / 9));
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!, b = nodes[j]!;
          const d = Math.hypot(a.bx - b.bx, a.by - b.by);
          if (variant === "talent") {
            if ((a.kind === 2 || b.kind === 2) && d < Math.min(w, h) * 0.26) links.push([i, j]);
            else if (a.kind === 2 && b.kind === 2) links.push([i, j]);
          } else if (variant !== "data" && d < maxD) links.push([i, j]);
        }
    };

    function mk(x: number, y: number, kind: 0 | 1 | 2, r: () => number): Node {
      return { x, y, bx: x, by: y, vx: 0, vy: 0, r: kind === 2 ? 4 : 1.2 + r() * 1.8, kind, phase: r() * Math.PI * 2 };
    }

    const spawnPulse = () => {
      if (!links.length) return;
      const l = links[Math.floor(Math.random() * links.length)]!;
      pulses.push({ a: l[0], b: l[1], p: 0, s: 0.006 + Math.random() * 0.012 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 1;
      // update positions
      for (const n of nodes) {
        if (variant === "data") {
          n.bx += 0.6 + n.r * 0.35;
          const cy = h / 2 + Math.sin(n.bx / w * Math.PI * 2 + n.phase) * h * 0.18 * (1 - n.bx / w * 0.6);
          n.by += (cy + (n.phase - Math.PI) * 18 - n.by) * 0.02;
          if (n.bx > w + 10) { n.bx = -10; n.by = Math.random() * h; }
        }
        const drift = variant === "cloud" || variant === "modules" ? 0 : 6;
        let tx = n.bx + Math.cos(t * 0.01 + n.phase) * drift;
        let ty = n.by + Math.sin(t * 0.012 + n.phase) * drift;
        if (pointer.active) {
          const dx = tx - pointer.x, dy = ty - pointer.y, d = Math.hypot(dx, dy);
          if (d < 140 && d > 0.1) { const f = (140 - d) / 140; tx += (dx / d) * f * 26; ty += (dy / d) * f * 26; }
        }
        n.vx += (tx - n.x) * 0.06; n.vy += (ty - n.y) * 0.06;
        n.vx *= 0.75; n.vy *= 0.75;
        n.x += n.vx; n.y += n.vy;
      }
      // links
      ctx.lineWidth = 1;
      for (const [i, j] of links) {
        const a = nodes[i]!, b = nodes[j]!;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const alpha = variant === "talent" ? 0.22 : Math.max(0, 0.32 - d / 600);
        ctx.strokeStyle = withAlpha(FG, alpha);
        ctx.beginPath();
        if (variant === "cloud" || variant === "modules") {
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, a.y); ctx.lineTo(b.x, b.y);
        } else { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }
        ctx.stroke();
      }
      // pointer links
      if (pointer.active && variant !== "data") {
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < 180) {
            ctx.strokeStyle = withAlpha(LIME, (1 - d / 180) * 0.6);
            ctx.beginPath(); ctx.moveTo(pointer.x, pointer.y); ctx.lineTo(n.x, n.y); ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        const pulse = 0.6 + 0.4 * Math.sin(t * 0.04 + n.phase);
        if (variant === "modules") {
          const lit = Math.sin(t * 0.015 + n.phase * 3) > 0.7;
          const s = 22;
          ctx.strokeStyle = withAlpha(lit ? LIME : FG, lit ? 0.9 : 0.28);
          ctx.fillStyle = withAlpha(LIME, lit ? 0.14 : 0);
          ctx.fillRect(n.x - s / 2, n.y - s / 2, s, s);
          ctx.strokeRect(n.x - s / 2, n.y - s / 2, s, s);
          continue;
        }
        if (n.kind === 1) {
          const s = n.r * 2.6;
          ctx.fillStyle = withAlpha(FG, 0.75);
          ctx.fillRect(n.x - s / 2, n.y - s / 2, s, s);
        } else if (n.kind === 2) {
          ctx.strokeStyle = withAlpha(LIME, 0.9);
          ctx.beginPath(); ctx.arc(n.x, n.y, 9 + pulse * 4, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = LIME; ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = withAlpha(LIME, variant === "data" ? 0.5 + n.r / 6 : 0.55 + pulse * 0.45);
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        }
      }
      // pulses
      if (!reduce && t % (mobile ? 22 : 9) === 0) spawnPulse();
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]!; p.p += p.s;
        if (p.p >= 1) { pulses.splice(k, 1); continue; }
        const a = nodes[p.a]!, b = nodes[p.b]!;
        let x: number, y: number;
        if (variant === "cloud" || variant === "modules") {
          const lx = Math.abs(b.x - a.x), ly = Math.abs(b.y - a.y), tot = lx + ly || 1, dist = p.p * tot;
          if (dist < lx) { x = a.x + Math.sign(b.x - a.x) * dist; y = a.y; } else { x = b.x; y = a.y + Math.sign(b.y - a.y) * (dist - lx); }
        } else { x = a.x + (b.x - a.x) * p.p; y = a.y + (b.y - a.y) * p.p; }
        ctx.fillStyle = LIME; ctx.shadowColor = LIME; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop); };

    build();
    if (reduce) { for (let i = 0; i < 3; i++) draw(); } else raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left; pointer.y = e.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };
    const onLeave = () => { pointer.active = false; };
    const ro = new ResizeObserver(() => { build(); if (reduce) draw(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; });
    io.observe(canvas);
    if (!mobile && !reduce) { window.addEventListener("pointermove", onMove, { passive: true }); document.addEventListener("pointerleave", onLeave); }

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave);
    };
  }, [variant, density, tone]);

  return <canvas ref={ref} aria-hidden className={`block h-full w-full ${className}`} />;
}

function withAlpha(color: string, a: number) {
  const al = Math.max(0, Math.min(1, a)).toFixed(3);
  if (color.startsWith("oklch(")) return color.replace(/\)$/, ` / ${al})`).replace(/\/[^/]*\/\s*/, "/ ");
  return `color-mix(in oklab, ${color} ${Math.round(Number(al) * 100)}%, transparent)`;
}
