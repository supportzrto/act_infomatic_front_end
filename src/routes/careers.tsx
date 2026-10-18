import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FinalCta, PageHero, SectionHead, meta } from "@/components/site";
import { Reveal, Seam } from "@/components/motion";
import { company } from "@/data/site";

export const Route = createFileRoute("/careers")({
  head: () => meta(
    "Job Seekers – IT Careers — Act Informatics",
    "Build your skill constellation and send your resume. Contract, contract-to-hire and permanent IT roles, plus training and OPT placement support.",
    "/careers",
  ),
  component: Careers,
});

const SKILLS = ["Java", ".Net", "Oracle", "SAP", "Informatica", "Cognos", "Business Objects", "QA", "Cloud", "Data", "Project Mgmt", "Architecture"];
const TYPES = ["Contract", "Contract-to-Hire", "Permanent"];

/** Job-seeker journey: dark, playful "skill constellation" builder. */
function Careers() {
  const [sel, setSel] = useState<string[]>([]);
  const [type, setType] = useState<string>("Permanent");
  const toggle = (s: string) => setSel((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  const pos = (i: number) => {
    const a = (i / SKILLS.length) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 };
  };
  const mail = `mailto:${company.jobsEmail}?subject=${encodeURIComponent(`Resume — ${type}${sel.length ? ` — ${sel.join(", ")}` : ""}`)}&body=${encodeURIComponent(`Hello Act Informatics team,\n\nI'm interested in ${type.toLowerCase()} opportunities.\nSkills: ${sel.join(", ") || "(listed in resume)"}\n\nMy resume is attached.\n`)}`;

  return (
    <>
      <PageHero
        eyebrow="Job Seekers – Careers"
        lines={["Find your place", <span key="n" className="serif-accent text-lime">in the network.</span>]}
        intro="Placement is one of our major strengths. We connect technology professionals with contract, contract-to-hire and permanent opportunities."
        crumbs={[{ label: "Careers" }]}
        variant="talent"
      />

      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionHead eyebrow="Build your constellation" title={["Tap your", <span key="s" className="serif-accent text-lime">skills.</span>]} intro="Select what you know. We'll draft your email so you can attach your resume and send." />
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx="50" cy="50" r="40" className="fill-none stroke-border" strokeWidth="0.2" strokeDasharray="0.6 1.2" />
              {SKILLS.map((s, i) => {
                const p = pos(i);
                return sel.includes(s) ? (
                  <motion.line key={s} x1="50" y1="50" x2={p.x} y2={p.y} className="stroke-lime" strokeWidth="0.35"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                ) : null;
              })}
              {sel.map((s, k) => {
                if (k === 0) return null;
                const a = pos(SKILLS.indexOf(sel[k - 1]!)), b = pos(SKILLS.indexOf(s));
                return <motion.line key={`l${s}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="stroke-lime/40" strokeWidth="0.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />;
              })}
            </svg>
            <motion.div animate={{ scale: 1 + sel.length * 0.03 }} className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lime text-center font-display text-lg font-black text-ink glow-lime">
              You<br /><span className="eyebrow">{sel.length} skills</span>
            </motion.div>
            {SKILLS.map((s, i) => {
              const p = pos(i);
              const on = sel.includes(s);
              return (
                <button
                  key={s} type="button" aria-pressed={on} onClick={() => toggle(s)}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition md:text-sm ${on ? "border-lime bg-lime text-ink" : "border-border bg-ink text-paper hover:border-lime"}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="eyebrow text-lime">Opportunity type</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${type === t ? "border-lime text-lime" : "border-border text-muted-foreground hover:text-paper"}`}>{t}</button>
              ))}
            </div>
            <p className="eyebrow mt-8 text-lime">Your signal</p>
            <p className="mt-3 font-serif text-2xl italic">{sel.length ? sel.join(" · ") : "Select skills on the constellation."}</p>
            <a href={mail} className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition hover:glow-lime">Email your resume →</a>
            <p className="mt-3 text-xs text-muted-foreground">Opens your email app addressed to {company.jobsEmail}. Attach your resume before sending.</p>
          </div>
        </div>
      </section>

      <Seam from="ink" to="paper" />
      <section className="surface-paper">
        <div className="mx-auto grid max-w-7xl gap-px px-5 py-24 md:grid-cols-3">
          {[
            ["Placement", "Our placement team connects you with roles that match your skills and goals."],
            ["Training", "Technical training from industry-experienced, certified instructors who are IT professionals themselves."],
            ["OPT candidates", "Training and placement services for graduating students on OPT."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1} className="border-t-2 border-paper-ink pr-8 pt-6">
              <span className="eyebrow text-paper-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-4xl font-black">{t}</h3>
              <p className="mt-3 text-paper-muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Seam from="paper" to="ink" />
      <FinalCta title={["Your next role", <span key="s" className="serif-accent text-lime">starts here.</span>]} primary={{ to: "/contact", label: "Ask a question" }} secondary={{ to: "/blog", label: "Career insights" }} />
    </>
  );
}
