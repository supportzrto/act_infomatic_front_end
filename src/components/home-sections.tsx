import { Link } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { NetworkCanvas } from "@/components/network";
import { EASE_OUT, useMediaQuery } from "@/components/motion";
import { industries } from "@/data/site";

/** Small, deterministic diagrams: no extra animation loop or image downloads. */
function Diagram({ kind, className = "" }: { kind: number; className?: string }) {
  const nodes = [[20, 40], [50, 18], [80, 40], [50, 62]];
  return (
    <svg viewBox="0 0 100 80" fill="none" aria-hidden className={className}>
      {kind === 0 && <><circle cx="50" cy="40" r="27" /><circle cx="50" cy="40" r="15" /><path d="M50 5v18M50 57v18M15 40h18M67 40h18" /><circle cx="50" cy="40" r="3" className="fill-current" /></>}
      {kind === 1 && <><path d="M15 20h70v40H15zM15 33h70M38 20v40M63 20v40" /><path d="M21 50l9-9 18 4 20-16 12 7" strokeWidth="2" /></>}
      {kind === 2 && <><path d="M20 40L50 18 80 40 50 62zM20 40h60M50 18v44" />{nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" className="fill-current" />)}</>}
      {kind === 3 && <><path d="M10 50h20V30h22v20h20V30h18M10 63h80" /><rect x="30" y="30" width="22" height="20" /><path d="M40 14v9m-4-4l4 4 4-4" /></>}
      {kind === 4 && <><path d="M26 58A27 27 0 1 1 76 54M76 54V39m0 15H61" /><circle cx="50" cy="40" r="12" /><path d="M44 40h12M50 34v12" /></>}
      {kind === 5 && <><path d="M10 50h22V20h34v30h24M10 62h80M32 35h34" /><circle cx="21" cy="62" r="4" /><circle cx="78" cy="62" r="4" /></>}
    </svg>
  );
}

export function Pathways() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <section aria-label="Employers and job seekers" className="refined-pathways relative grid lg:grid-cols-2">
      <motion.div aria-hidden className="pathway-seam" initial={reduce ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE_OUT }} />
      {(["emp", "seek"] as const).map((side, i) => (
        <Link key={side} to={side === "emp" ? "/employers" : "/careers"} className={`pathway-panel group relative flex min-h-[34rem] flex-col justify-between overflow-hidden p-8 outline-none md:p-12 lg:min-h-[38rem] ${side === "emp" ? "surface-paper" : "surface-ink"}`}>
          {side === "emp" ? <div aria-hidden className="paper-grid pointer-events-none absolute inset-0 opacity-40" /> : <div aria-hidden className="pathway-network pointer-events-none absolute inset-0"><NetworkCanvas variant="talent" density={0.45} /></div>}
          <div className="pathway-atmosphere pointer-events-none absolute inset-0" aria-hidden />
          <p className={`eyebrow relative flex items-center justify-between ${side === "emp" ? "text-paper-muted" : "text-lime"}`}><span>Pathway {i === 0 ? "A / Employers" : "B / Job seekers"}</span><span aria-hidden className="pathway-signal h-2 w-2 rounded-full bg-lime" /></p>
          <div className="relative mt-20">
            <h2 className="pathway-title text-6xl font-black leading-[0.95] font-wide md:text-8xl">I'm<br /><span className="block overflow-hidden pb-2"><motion.span className={`serif-accent block ${side === "seek" ? "text-lime" : ""}`} initial={reduce ? false : { y: 12 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75, ease: EASE_OUT }}>{side === "emp" ? "hiring." : "looking."}</motion.span></span></h2>
            <p className={`mt-5 max-w-sm ${side === "emp" ? "text-paper-muted" : "text-muted-foreground"}`}>{side === "emp" ? "Contract, contract-to-hire, direct hire and executive search — built around how your team works." : "Placement, training and opportunities that move your IT career forward."}</p>
            <span className={`pathway-cta mt-8 inline-flex items-center gap-8 rounded-full px-6 py-3.5 text-sm font-semibold ${side === "emp" ? "bg-paper-ink text-paper" : "bg-lime text-ink"}`}>{side === "emp" ? "Hire talent" : "Explore careers"}<span aria-hidden className="pathway-arrow">↗</span></span>
          </div>
        </Link>
      ))}
    </section>
  );
}

const stages = [
  { title: "Discover", text: "We start with the business challenge — the goal, the team, the constraints." },
  { title: "Define", text: "We map the skills, systems and timeline the work actually needs." },
  { title: "Connect", text: "We match people, or architect the technology, to fit that map." },
  { title: "Deliver", text: "On-site and off-shore teams deliver with regular check-ins." },
  { title: "Evolve", text: "We review, refine and scale as your needs change." },
];

function ProcessConnector({ progress, index, reduce }: { progress: MotionValue<number>; index: number; reduce: boolean | null }) {
  const scale = useTransform(progress, [index / 5, (index + 1) / 5], [0, 1]);
  return <span aria-hidden className="process-connector"><motion.span className="process-connector-progress" style={{ scale: reduce ? 1 : scale }} /></span>;
}

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => setActive(Math.min(4, Math.floor(value * 5))));
  return (
    <section aria-label="Engagement process" className="surface-ink refined-process border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow mb-5 text-lime">Engagement model</p><h2 className="text-4xl font-black leading-tight md:text-6xl">How we engage<br /><span className="serif-accent text-lime">a challenge.</span></h2></div>
          <p className="max-w-xs text-sm text-muted-foreground">From understanding the challenge to refining what comes next.</p>
        </div>
        <ol ref={ref} className="process-timeline relative mt-14 grid gap-0 lg:grid-cols-5">
          {stages.map((stage, i) => (
            <li key={stage.title} data-active={reduce || i <= active} className="process-stage relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-9 last:pb-0 lg:block lg:pb-0 lg:pr-6">
              <ProcessConnector progress={scrollYProgress} index={i} reduce={reduce} />
              <span className="process-number relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-ink font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
              <motion.div className="process-content lg:mt-7" initial={reduce ? false : { y: 12 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.06, ease: EASE_OUT }}>
                <Diagram kind={i} className="process-diagram mb-4 h-20 w-24 stroke-current text-muted-foreground" />
                <h3 className="text-2xl font-bold">{stage.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{stage.text}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const industryDiagrams = [0, 1, 2, 3, 4, 5];
export function Industries() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <section className="surface-paper refined-industries" aria-label="Industries">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div><p className="eyebrow mb-5 text-paper-muted">Industries</p><h2 className="text-4xl font-black leading-tight md:text-6xl">Six sectors.<br /><span className="serif-accent">One network.</span></h2></div>
        <ul className="industry-list relative mt-12 border-t border-paper-line">
          {industries.map((industry, i) => (
            <li key={industry.name}>
              <Link to="/industries" className="industry-row group relative grid grid-cols-[2rem_1fr] items-center gap-x-3 border-b border-paper-line py-7 outline-none md:grid-cols-[2.5rem_minmax(0,1.5fr)_minmax(0,1fr)_7rem] md:gap-x-6">
                <span className="industry-index relative z-10 self-start bg-paper py-1 font-mono text-xs text-paper-muted md:self-center">{String(i + 1).padStart(2, "0")}</span>
                <motion.span initial={reduce ? false : { x: -8 }} whileInView={{ x: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.55, ease: EASE_OUT }} className="industry-title font-display text-2xl font-black leading-tight md:text-3xl lg:text-4xl">{industry.name}</motion.span>
                <p className="industry-description col-start-2 mt-3 text-sm leading-relaxed text-paper-muted md:col-start-auto md:mt-0">{industry.text}</p>
                <div aria-hidden className="industry-preview col-start-2 mt-4 flex h-16 w-24 items-center justify-center md:col-start-auto md:mt-0 md:h-20 md:w-full">
                  <Diagram kind={industryDiagrams[i] ?? 0} className="h-full w-full stroke-current" />
                  <span className="industry-arrow ml-2">↗</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}