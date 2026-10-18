import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.76, 0, 0.24, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function useMediaQuery(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}

/** Scroll-triggered reveal: fade + rise. Use sparingly. */
export function Reveal({ children, delay = 0, className = "", y = 32 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

const lineV: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1.1, ease: EASE, delay: i * 0.09 } }),
};

/** Kinetic typography: each line slides up from a mask. Lines may contain ReactNodes. */
export function KineticLines({ lines, className = "", delay = 0, as = "h1", animateOnMount = false, play = true }: { lines: ReactNode[]; className?: string; delay?: number; as?: "h1" | "h2"; animateOnMount?: boolean; play?: boolean }) {
  const Tag = as === "h1" ? motion.h1 : motion.h2;
  const trigger = animateOnMount ? { animate: play ? "show" : "hidden" } : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } };
  return (
    <Tag className={className} initial="hidden" {...trigger} transition={{ delayChildren: delay }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={lineV} custom={i + delay * 10}>{l}</motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Image revealed through an expanding mask. */
export function MaskImage({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(18% 18% 18% 18% round 24px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 8px)" }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <motion.img
        src={src} alt={alt} loading="lazy" width={1280} height={800}
        className="h-full w-full object-cover"
        initial={{ scale: 1.25 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      />
    </motion.div>
  );
}

/**
 * Signature section transition: a signal line draws across the seam as you scroll,
 * lighting nodes, while the surface shifts from one tone to the next.
 */
export function Seam({ from, to }: { from: "ink" | "paper"; to: "ink" | "paper" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const len = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const dot = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);
  const bg = from === "ink" ? "bg-ink" : "bg-paper";
  const fill = to === "ink" ? "fill-ink" : "fill-paper";
  return (
    <div ref={ref} aria-hidden className={`relative h-28 md:h-40 ${bg}`}>
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,160 L0,110 C240,110 300,40 520,40 S820,120 1040,90 S1300,30 1440,60 L1440,160 Z" className={fill} />
        <motion.path
          d="M0,110 C240,110 300,40 520,40 S820,120 1040,90 S1300,30 1440,60"
          className="fill-none stroke-lime" strokeWidth={1.5} vectorEffect="non-scaling-stroke"
          style={{ pathLength: len }}
        />
      </svg>
      <motion.span className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-lime glow-lime" style={{ left: dot }} />
    </div>
  );
}

/** Horizontal scroll track on desktop (sticky), native swipe on mobile / reduced motion. */
export function HorizontalTrack({ children, className = "" }: { children: ReactNode; className?: string }) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const m = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    m(); window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, [desktop]);

  if (!desktop || reduce) {
    return (
      <div ref={ref} className="relative">
        <div className={`flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 ${className}`}>{children}</div>
      </div>
    );
  }
  return (
    <div ref={ref} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className={`flex gap-6 px-12 ${className}`}>{children}</motion.div>
      </div>
    </div>
  );
}

/** Animated SVG connector that draws when in view. */
export function DrawLine({ className = "", d = "M0,50 C200,0 400,100 600,50 S1000,0 1200,50", viewBox = "0 0 1200 100" }: { className?: string; d?: string; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} preserveAspectRatio="none" aria-hidden className={className}>
      <motion.path d={d} className="fill-none stroke-lime" strokeWidth={1.5} vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: EASE }} />
    </svg>
  );
}
