import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Btn, FinalCta, PageHero, SectionHead, meta, type Crumb } from "@/components/site";
import { EASE, Reveal, Seam } from "@/components/motion";
import { NetworkCanvas } from "@/components/network";
import { getService, services, visualFor } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ params }) => {
    const s = getService(params.slug);
    if (!s) return { meta: [{ title: "Service not found — Act Informatics" }, { name: "robots", content: "noindex" }] };
    return meta(`${s.title} — Act Informatics`, `${s.tagline} ${s.intro.slice(0, 110)}…`, `/services/${s.slug}`);
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-40 text-center">
      <h1 className="text-4xl font-black">Service not found</h1>
      <Link to="/services" className="eyebrow mt-6 inline-block text-lime">View all services →</Link>
    </div>
  ),
});

const modeLabel: Record<string, string> = {
  talent: "Network mode: people ↔ skills",
  cloud: "Network mode: infrastructure",
  data: "Network mode: data flow",
  modules: "Network mode: modular systems",
  hero: "Network mode: transformation",
};

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug)!;
  const isTech = s.group === "technology";
  const idx = services.findIndex((x) => x.slug === s.slug) + 1;
  const v = visualFor(s.slug);
  const crumbs: Crumb[] = isTech
    ? [{ label: "Services", to: "/services" }, { label: "Cloud & Digital", to: "/cloud-digital-services" }, { label: s.short }]
    : [{ label: "Services", to: "/services" }, { label: s.short }];
  const words = s.title.split(" ");
  const half = Math.ceil(words.length / 2);

  return (
    <>
      <PageHero
        index={String(idx).padStart(2, "0")}
        eyebrow={`${isTech ? "Technology Solutions" : "Talent Solutions"} · ${modeLabel[v]}`}
        lines={[words.slice(0, half).join(" "), <span key="b" className="serif-accent text-lime">{words.slice(half).join(" ") || "."}</span>]}
        intro={s.tagline}
        crumbs={crumbs}
        variant={v}
      >
        <Btn to="/contact">{isTech ? "Discuss your project" : "Request talent"}</Btn>
        <Btn to={isTech ? "/cloud-digital-services" : "/employers"} variant="ghost">{isTech ? "All technology services" : "Compare hiring models"}</Btn>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow text-lime">Overview</p>
          <p className="mt-6 font-serif text-3xl italic leading-snug md:text-4xl">{s.intro}</p>
        </Reveal>
        <ol className="border-t border-border">
          {s.offerings.map((o, i) => (
            <motion.li
              key={o.title}
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-7"
            >
              <span className="eyebrow pt-2 text-lime">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-2xl font-bold md:text-3xl">{o.title}</h3>
                <p className="mt-2 text-muted-foreground">{o.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      <Seam from="ink" to="paper" />
      <section className="surface-paper">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <SectionHead tone="paper" eyebrow="Process" title={["How it", <span key="w" className="serif-accent">works.</span>]} />
          <div className="relative mt-16">
            <svg className="absolute left-0 right-0 top-6 hidden h-2 w-full md:block" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden>
              <motion.line x1="0" y1="1" x2="100" y2="1" className="stroke-paper-ink" strokeWidth="0.15" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }} />
            </svg>
            <ol className="grid gap-10 md:grid-cols-4">
              {s.process.map((p, i) => (
                <Reveal key={p} delay={0.3 + i * 0.15}>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-paper-ink font-display font-black text-lime">{i + 1}</span>
                  <p className="mt-6 text-xl font-bold">{p}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="mt-20 grid gap-8 rounded-lg bg-paper-ink p-8 text-paper md:grid-cols-[1fr_2fr] md:p-12">
            <div className="relative h-48 overflow-hidden rounded md:h-auto"><NetworkCanvas variant={v} density={0.5} /></div>
            <div>
              <p className="eyebrow text-lime">Ideal for</p>
              <ul className="mt-6 space-y-4">
                {s.idealFor.map((x) => <li key={x} className="flex gap-4 text-2xl font-semibold"><span className="text-lime">↳</span>{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Seam from="paper" to="ink" />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="eyebrow text-lime">Connected services</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {s.related.map((r) => getService(r)).filter(Boolean).map((r) => (
            <Link key={r!.slug} to="/services/$slug" params={{ slug: r!.slug }} className="rounded-full border border-border px-5 py-3 font-display text-lg font-semibold transition hover:border-lime hover:text-lime">
              {r!.title} ↗
            </Link>
          ))}
        </div>
      </section>

      <FinalCta
        title={["Ready for", <span key="s" className="serif-accent text-lime">{s.short}?</span>]}
        primary={{ to: "/contact", label: "Contact Us" }}
        secondary={isTech ? { to: "/case-studies", label: "Success stories" } : { to: "/careers", label: "Looking for a job?" }}
      />
    </>
  );
}
