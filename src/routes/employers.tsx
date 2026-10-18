import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Breadcrumbs, Btn, FinalCta, SectionHead, meta } from "@/components/site";
import { EASE, KineticLines, Seam } from "@/components/motion";
import { getService, talentServices } from "@/data/site";

export const Route = createFileRoute("/employers")({
  head: () => meta(
    "Employers – Hire IT Talent — Act Informatics",
    "Find the right hiring model — contract staffing, contract-to-hire, direct hire or executive search — and request IT talent from Act Informatics.",
    "/employers",
  ),
  component: Employers,
});

type Answer = string | null;
type Answers = { role: Answer; term: Answer; trial: Answer };
const questions = [
  { id: "role", q: "What kind of role?", opts: [["lead", "Senior leadership"], ["ic", "Technical professional"]] },
  { id: "term", q: "How long is the need?", opts: [["project", "A defined project"], ["perm", "Permanent"]] },
  { id: "trial", q: "Want to evaluate first?", opts: [["yes", "Yes, try first"], ["no", "No, hire directly"]] },
] as const;

function recommend(a: Answers) {
  if (a.role === "lead") return "executive-search";
  if (a.term === "project") return "contract-staffing";
  if (a.term === "perm" && a.trial === "yes") return "contract-to-hire";
  if (a.term === "perm" && a.trial === "no") return "direct-hire";
  return null;
}

/** Employer journey: crisp "blueprint" paper aesthetic with a hiring-model finder. */
function Employers() {
  const [a, setA] = useState<Answers>({ role: null, term: null, trial: null });
  const visible = questions.filter((q, i) => i === 0 || (a.role === "ic" && (i === 1 || (i === 2 && a.term === "perm"))));
  const rec = recommend(a);
  const s = rec ? getService(rec) : null;

  return (
    <>
      <section className="surface-paper relative overflow-hidden pt-24">
        <div className="paper-grid absolute inset-0" aria-hidden />
        <svg className="absolute right-0 top-20 hidden h-[34rem] w-[34rem] lg:block" viewBox="0 0 400 400" aria-hidden>
          {[60, 110, 160].map((r, i) => (
            <motion.circle key={r} cx="200" cy="200" r={r} className="fill-none stroke-paper-ink" strokeWidth="0.8" strokeDasharray={i === 1 ? "3 6" : undefined}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: EASE, delay: i * 0.2 }} />
          ))}
          <line x1="40" y1="200" x2="360" y2="200" className="stroke-paper-ink" strokeWidth="0.5" />
          <line x1="200" y1="40" x2="200" y2="360" className="stroke-paper-ink" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="10" className="fill-lime stroke-paper-ink" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-10">
          <Breadcrumbs tone="paper" items={[{ label: "Employers" }]} />
          <p className="eyebrow mt-12 text-paper-muted">Employers – Hire Talent</p>
          <KineticLines animateOnMount className="mt-4 text-6xl font-black leading-[0.9] font-wide md:text-9xl" lines={["Hire with", <span key="p" className="serif-accent">precision.</span>]} />
          <p className="mt-8 max-w-xl text-lg text-paper-muted">Answer three questions and we'll point you to the right hiring model — then we handle the search and screening.</p>
        </div>
      </section>

      <section className="surface-paper border-t border-paper-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-10">
            <AnimatePresence initial={false}>
              {visible.map((q, i) => (
                <motion.div key={q.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                  <p className="eyebrow text-paper-muted">Q{i + 1}</p>
                  <h2 className="mt-2 text-3xl font-black md:text-4xl">{q.q}</h2>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {q.opts.map(([val, label]) => {
                      const on = a[q.id] === val;
                      return (
                        <button
                          key={val} type="button" aria-pressed={on}
                          onClick={() => setA((p) => {
                            const next = { ...p, [q.id]: val };
                            if (q.id === "role") { next.term = null; next.trial = null; }
                            if (q.id === "term") next.trial = null;
                            return next;
                          })}
                          className={`rounded-full border px-6 py-3 font-semibold transition ${on ? "border-paper-ink bg-paper-ink text-lime" : "border-paper-ink/30 hover:border-paper-ink"}`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-lg bg-paper-ink p-8 text-paper">
              <p className="eyebrow text-lime">Recommended model</p>
              <AnimatePresence mode="wait">
                <motion.div key={s?.slug ?? "none"} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
                  {s ? (
                    <>
                      <p className="mt-4 text-4xl font-black">{s.title}</p>
                      <p className="mt-3 font-serif text-xl italic text-muted-foreground">{s.tagline}</p>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Btn to="/contact">Request talent</Btn>
                        <Link to="/services/$slug" params={{ slug: s.slug }} className="eyebrow self-center text-lime hover:underline">Details →</Link>
                      </div>
                    </>
                  ) : (
                    <p className="mt-4 font-serif text-2xl italic text-muted-foreground">Answer the questions to reveal your match.</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-paper">
        <div className="mx-auto max-w-7xl px-5 pb-24">
          <SectionHead tone="paper" eyebrow="Compare" title={["All hiring", <span key="m" className="serif-accent">models.</span>]} />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="eyebrow text-paper-muted"><tr><th className="py-3">Model</th><th className="py-3">Best when</th><th /></tr></thead>
              <tbody>
                {talentServices.map((t) => (
                  <tr key={t.slug} className="border-t border-paper-line">
                    <td className="py-5 font-display text-xl font-bold">{t.title}</td>
                    <td className="py-5 text-paper-muted">{t.idealFor[0]}</td>
                    <td className="py-5 text-right"><Link to="/services/$slug" params={{ slug: t.slug }} className="eyebrow hover:underline">View ↗</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Seam from="paper" to="ink" />
      <FinalCta title={["Tell us about", <span key="r" className="serif-accent text-lime">your open roles.</span>]} primary={{ to: "/contact", label: "Request talent" }} secondary={{ to: "/case-studies", label: "Success stories" }} />
    </>
  );
}
