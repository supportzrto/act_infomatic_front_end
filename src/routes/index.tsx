import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Btn, DemoBadge, FinalCta, SectionHead, ServiceIndex, meta } from "@/components/site";
import { NetworkCanvas } from "@/components/network";
import { EASE, KineticLines, MaskImage, Reveal, Seam } from "@/components/motion";
import { useIntroDone } from "@/components/intro";
import { caseStudies, posts, getService } from "@/data/site";
import staffing from "@/assets/staffing.jpg";
import data from "@/assets/data.jpg";
import cloud from "@/assets/cloud.jpg";
import { Pathways, Process, Industries } from "@/components/home-sections";

export const Route = createFileRoute("/")({
  head: () => meta(
    "Act Informatics — The right people. The right technology. The next level.",
    "Act Informatics connects exceptional IT talent with cloud, application, data and managed technology services. Based in South Windsor, CT.",
    "/",
  ),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Proposition />
      <Seam from="paper" to="ink" />
      <Pathways />
      <section className="mx-auto max-w-7xl px-5 py-24 md:py-32">
        <SectionHead eyebrow="Service index / 10 capabilities" title={["Talent solutions.", <span key="t" className="serif-accent text-lime">Technology services.</span>]} intro="Hover to see how the network reshapes itself for each capability." />
        <div className="mt-14"><ServiceIndex /></div>
      </section>
      <Process />
      <Seam from="ink" to="paper" />
      <Industries />
      <Seam from="paper" to="ink" />
      <Stories />
      <Seam from="ink" to="paper" />
      <Insights />
      <Seam from="paper" to="ink" />
      <FinalCta title={["Let's build", <span key="n" className="serif-accent text-lime">the next level.</span>]} primary={{ to: "/contact", label: "Start a conversation" }} secondary={{ to: "/services", label: "Explore services" }} />
    </>
  );
}

/* 1 — Cinematic hero */
function Hero() {
  const ready = useIntroDone();
  return (
    <section className="surface-ink grain relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 2 }}>
        <NetworkCanvas variant="hero" />
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_60%,var(--ink),transparent)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-32">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 0.2 }} className="eyebrow mb-6 flex items-center gap-3 text-lime">
          <span className="h-px w-10 bg-lime" /> IT staffing × enterprise technology
        </motion.p>
        <KineticLines
          animateOnMount play={ready}
          className="text-[13vw] font-black leading-[0.86] font-wide md:text-[8.2vw]"
          lines={[
            <>The right <span className="serif-accent text-lime">people.</span></>,
            <>The right <span className="serif-accent">technology.</span></>,
            <>The next <span className="text-outline">level.</span></>,
          ]}
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }} transition={{ delay: 0.7, duration: 1, ease: EASE }} className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg text-muted-foreground">
            We connect exceptional people and specialized skills with cloud, software and data — on-site and off-shore.
          </p>
          <div className="flex flex-wrap gap-3">
            <Btn to="/employers">I'm hiring</Btn>
            <Btn to="/careers" variant="ghost">I'm looking</Btn>
          </div>
        </motion.div>
      </div>
      <div className="relative border-t border-border">
        <div className="flex overflow-hidden py-3">
          <div className="animate-marquee flex shrink-0 gap-10 whitespace-nowrap pr-10 eyebrow text-muted-foreground">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ["People", "Skills", "Cloud", "Software", "Data", "Transformation", "South Windsor, CT", "On-site + Off-shore"].map((w) => (
                <span key={`${k}-${w}`} className="flex items-center gap-10">{w}<span className="text-lime">◆</span></span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2 — Network proposition illustration */
const left = ["People", "Skills"];
const right = ["Cloud", "Software", "Data", "Transformation"];
function Proposition() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <div className="paper-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
        <SectionHead tone="paper" eyebrow="The proposition" title={["Talent is the", <span key="s" className="serif-accent">signal.</span>, "Technology is the network."]} />
        <Reveal className="mt-16">
          <svg viewBox="0 0 1120 420" className="h-auto w-full" role="img" aria-label="People and skills connect through Act Informatics to cloud, software, data and transformation">
            {left.map((l, i) => {
              const y = 140 + i * 140;
              return (
                <g key={l}>
                  <motion.path d={`M140,${y} C320,${y} 360,210 500,210`} className="fill-none stroke-paper-ink" strokeWidth={1.2}
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE, delay: i * 0.15 }} />
                  <circle cx={120} cy={y} r={14} className="fill-lime stroke-paper-ink" />
                  <text x={90} y={y + 6} textAnchor="end" className="fill-paper-ink font-display text-[26px] font-bold">{l}</text>
                </g>
              );
            })}
            {right.map((r, i) => {
              const y = 60 + i * 100;
              return (
                <g key={r}>
                  <motion.path d={`M500,210 C640,210 680,${y} 860,${y}`} className="fill-none stroke-paper-ink" strokeWidth={1.2} strokeDasharray="4 6"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE, delay: 0.8 + i * 0.12 }} />
                  <rect x={862} y={y - 10} width={20} height={20} className="fill-paper-ink" />
                  <text x={896} y={y + 7} className="fill-paper-ink font-display text-[22px] font-semibold">{r}</text>
                </g>
              );
            })}
            <motion.circle cx={500} cy={210} r={62} className="fill-paper-ink" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE, delay: 0.6 }} style={{ transformOrigin: "500px 210px" }} />
            <circle cx={500} cy={210} r={82} className="fill-none stroke-lime" strokeWidth={2} strokeDasharray="2 8" />
            <text x={500} y={220} textAnchor="middle" className="fill-lime font-display text-[30px] font-black">ACT</text>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}

/* 7 — Cinematic stories */
const storyImgs = [data, staffing, cloud];
function Stories() {
  return (
    <section className="surface-ink">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Success stories" title={["Stories in", <span key="m" className="serif-accent text-lime">motion.</span>]} />
          <DemoBadge>Demo narratives — replace with approved case studies</DemoBadge>
        </div>
        <div className="mt-16 space-y-24">
          {caseStudies.map((c, i) => (
            <article key={c.slug} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <MaskImage src={storyImgs[i]!} className="aspect-[4/3] rounded-lg" />
              <div>
                <p className="eyebrow text-lime">Chapter {String(i + 1).padStart(2, "0")} · {c.sector} · {getService(c.service)?.short}</p>
                <KineticLines as="h2" lines={[c.title]} className="mt-4 text-3xl font-black leading-tight md:text-5xl" />
                <p className="mt-5 text-muted-foreground">{c.challenge}</p>
                <Link to="/case-studies" className="eyebrow mt-6 inline-block text-lime hover:underline">Read the narrative →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8 — Editorial insights */
function Insights() {
  return (
    <section className="surface-paper">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <SectionHead tone="paper" eyebrow="Insights" title={["Field", <span key="n" className="serif-accent">notes.</span>]} />
        <ul className="mt-14">
          {posts.map((p, i) => (
            <li key={p.slug} className="border-t border-paper-line last:border-b">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group grid gap-3 py-8 md:grid-cols-[8rem_1fr_auto] md:items-baseline">
                <span className="eyebrow text-paper-muted">{p.category}</span>
                <span className="font-display text-3xl font-black leading-tight transition-all duration-500 group-hover:font-serif group-hover:italic group-hover:font-normal md:text-5xl">{p.title}</span>
                <span className="eyebrow text-paper-muted">{p.minutes} min · {String(i + 1).padStart(2, "0")} ↗</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10"><Btn to="/blog" variant="ink">All insights</Btn></div>
      </div>
    </section>
  );
}
