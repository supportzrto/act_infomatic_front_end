import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageHero, SectionHead, meta } from "@/components/site";
import { KineticLines, Reveal, Seam } from "@/components/motion";
import { clients, company } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => meta(
    "About Us — Act Informatics",
    "Act Informatics, Inc. provides IT services, solutions and staffing on-site and off-shore from South Windsor, Connecticut.",
    "/about",
  ),
  component: About,
});

const pillars = [
  ["On-site + off-shore", "Complete IT services and solutions delivered both on-site and off-shore."],
  ["Skills that keep pace", "We constantly monitor emerging technologies to update the skills of our consultants."],
  ["People first", "Our Employee Development program supports employees' technical and business growth."],
  ["Human capital insight", "A thorough human capital analysis helps organizations address their unique resource challenges."],
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        lines={["Technology is", "the force behind", <span key="b" className="serif-accent text-lime">business initiatives.</span>]}
        intro="Act Informatics, Inc. provides innovative, cost-effective IT services and solutions — and fulfills our customers' strategic resource requirements."
        crumbs={[{ label: "About Us" }]}
        variant="talent"
      />
      <Seam from="ink" to="paper" />
      <section className="surface-paper">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <KineticLines as="h2" className="max-w-5xl text-4xl font-black leading-[1] md:text-6xl" lines={[
            "E-Business Strategy. Application Development.",
            <span key="2" className="serif-accent">Data Warehousing. SOA. ERP.</span>,
            "Business Intelligence. Architecture.",
            <span key="4" className="serif-accent">Strategic Consulting. Managed Off-shore.</span>,
          ]} />
          <div className="mt-20 grid gap-px overflow-hidden rounded-lg bg-paper-line md:grid-cols-2">
            {pillars.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="bg-paper p-10">
                <span className="eyebrow text-paper-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-3xl font-black">{t}</h3>
                <p className="mt-3 text-paper-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Seam from="paper" to="ink" />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow="Clients" title={["A go-to vendor for", <span key="b" className="serif-accent text-lime">some of the biggest names.</span>]} intro="Clients listed on Act Informatics' original website." />
        </div>
        <div className="mt-14 overflow-hidden border-y border-border py-8">
          <div className="animate-marquee flex w-max gap-14 whitespace-nowrap font-display text-4xl font-bold md:text-6xl">
            {[0, 1].flatMap((k) => clients.map((c) => (
              <span key={`${k}${c}`} className="flex items-center gap-14 text-paper/80">{c}<span className="text-lime">◆</span></span>
            )))}
          </div>
        </div>
        <p className="eyebrow mx-auto mt-10 max-w-7xl px-5 text-muted-foreground">Headquarters — {company.address}</p>
      </section>
      <FinalCta title={["Work with", <span key="a" className="serif-accent text-lime">Act Informatics.</span>]} primary={{ to: "/contact", label: "Contact Us" }} secondary={{ to: "/careers", label: "Join our team" }} />
    </>
  );
}
