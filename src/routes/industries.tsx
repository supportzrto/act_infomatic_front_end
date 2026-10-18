import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FinalCta, PageHero, meta } from "@/components/site";
import { EASE } from "@/components/motion";
import { industries } from "@/data/site";

export const Route = createFileRoute("/industries")({
  head: () => meta(
    "Industries We Serve — Act Informatics",
    "IT staffing and technology services for healthcare & pharma, financial services & insurance, telecommunications, e-commerce, technology and logistics.",
    "/industries",
  ),
  component: Industries,
});

const pats = ["pat-stripes", "pat-dots", "pat-grid", "pat-rings", "pat-waves", "pat-cross"];

function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        lines={["Context", <span key="c" className="serif-accent text-lime">changes everything.</span>]}
        intro="Our teams bring experience from complex, regulated and large-scale technology environments."
        crumbs={[{ label: "Industries" }]}
      />
      <section className="mx-auto max-w-7xl space-y-6 px-5 py-24">
        {industries.map((ind, i) => (
          <motion.article
            key={ind.name}
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className={`group grid overflow-hidden rounded-lg border border-border md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="relative min-h-56 overflow-hidden bg-navy">
              <div className={`absolute inset-0 opacity-40 transition-transform duration-[1.5s] ease-out group-hover:scale-125 ${pats[i]}`} />
              <span className="text-outline absolute bottom-4 left-6 font-display text-8xl font-black md:text-9xl">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="flex flex-col justify-center bg-card p-8 md:p-12">
              <p className="eyebrow text-lime">Sector {String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 text-4xl font-black md:text-5xl">{ind.name}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{ind.text}</p>
            </div>
          </motion.article>
        ))}
      </section>
      <FinalCta title={["Talk about", <span key="s" className="serif-accent text-lime">your sector.</span>]} primary={{ to: "/contact", label: "Contact Us" }} secondary={{ to: "/services", label: "View services" }} />
    </>
  );
}
