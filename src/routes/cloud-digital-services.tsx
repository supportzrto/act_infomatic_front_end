import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Btn, FinalCta, PageHero, SectionHead, meta } from "@/components/site";
import { NetworkCanvas } from "@/components/network";
import { EASE, Seam } from "@/components/motion";
import { techServices, visualFor } from "@/data/site";

export const Route = createFileRoute("/cloud-digital-services")({
  head: () => meta(
    "Cloud & Digital Services — Act Informatics",
    "Cloud consulting, digital transformation, application development, data & analytics and managed IT services from Act Informatics.",
    "/cloud-digital-services",
  ),
  component: CloudDigital,
});

function CloudDigital() {
  const [i, setI] = useState(0);
  const s = techServices[i]!;
  return (
    <>
      <PageHero
        eyebrow="Technology Solutions"
        lines={["Cloud &", <span key="d" className="serif-accent text-lime">Digital Services.</span>]}
        intro="From strategy to steady-state support, we modernize applications, data and infrastructure — on-site and off-shore."
        crumbs={[{ label: "Services", to: "/services" }, { label: "Cloud & Digital Services" }]}
        variant="cloud"
      >
        <Btn to="/contact">Discuss your project</Btn>
        <Btn to="/case-studies" variant="ghost">Success stories</Btn>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionHead eyebrow="Five modes of the network" title={["One practice.", <span key="f" className="serif-accent text-lime">Five shapes.</span>]} intro="Select a capability to watch the network reconfigure." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div role="tablist" className="flex flex-col">
            {techServices.map((t, k) => (
              <button
                key={t.slug} role="tab" aria-selected={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)}
                className={`flex items-baseline gap-4 border-b border-border py-5 text-left transition ${k === i ? "text-lime" : "text-paper/60 hover:text-paper"}`}
              >
                <span className="eyebrow">{String(k + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-bold md:text-3xl">{t.title}</span>
              </button>
            ))}
          </div>
          <div className="relative min-h-[26rem] overflow-hidden rounded-lg border border-border bg-card">
            <AnimatePresence mode="wait">
              <motion.div key={s.slug} className="absolute inset-0" initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>
                <NetworkCanvas variant={visualFor(s.slug)} />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-8">
              <p className="font-serif text-3xl italic">{s.tagline}</p>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">{s.intro}</p>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="eyebrow mt-5 inline-block text-lime hover:underline">Explore {s.title} →</Link>
            </div>
          </div>
        </div>
      </section>

      <Seam from="ink" to="paper" />
      <section className="surface-paper">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <SectionHead tone="paper" eyebrow="Our foundation" title={["Rooted in", <span key="e" className="serif-accent">enterprise delivery.</span>]} intro="Our technology services grew from long-standing practices in application development and maintenance, data warehousing, ERP, business intelligence, strategic consulting and managed off-shore services." />
        </div>
        <div className="overflow-hidden border-y border-paper-line py-6">
          <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-5xl font-black md:text-7xl">
            {[0, 1].flatMap((k) => ["Java", ".Net", "Oracle", "SAP", "Informatica", "Cognos", "Business Objects", "SOA"].map((t) => (
              <span key={`${k}${t}`} className="flex items-center gap-12">{t}<span className="serif-accent text-paper-muted">/</span></span>
            )))}
          </div>
        </div>
        <div className="h-20" />
      </section>
      <Seam from="paper" to="ink" />
      <FinalCta title={["Need people", <span key="p" className="serif-accent text-lime">for the project too?</span>]} primary={{ to: "/contact", label: "Contact Us" }} secondary={{ to: "/employers", label: "Hire IT talent" }} />
    </>
  );
}
