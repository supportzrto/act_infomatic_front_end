import { createFileRoute } from "@tanstack/react-router";
import { Btn, FinalCta, PageHero, SectionHead, ServiceIndex, meta } from "@/components/site";
import { Seam } from "@/components/motion";
import { talentServices, techServices } from "@/data/site";

export const Route = createFileRoute("/services/")({
  head: () => meta(
    "Services Overview — Act Informatics",
    "IT staffing, contract staffing, contract-to-hire, direct hire and executive search, plus cloud, digital, application, data and managed IT services.",
    "/services",
  ),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        index="10"
        eyebrow="Services Overview"
        lines={["Ten capabilities.", <span key="o" className="serif-accent text-lime">One connected network.</span>]}
        intro="Talent and technology that work on their own — or together, across the whole lifecycle of a project."
        crumbs={[{ label: "Services" }]}
      >
        <Btn to="/employers">Hire talent</Btn>
        <Btn to="/cloud-digital-services" variant="ghost">Cloud & Digital Services</Btn>
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionHead eyebrow="A / Talent Solutions" title={["People who", <span key="f" className="serif-accent text-lime">fit and deliver.</span>]} intro="Five hiring models, from a single contractor to senior leadership." />
        <div className="mt-12"><ServiceIndex items={talentServices} /></div>
      </section>
      <section className="mx-auto max-w-7xl border-t border-border px-5 py-24">
        <SectionHead eyebrow="B / Technology Solutions" title={["Systems that", <span key="s" className="serif-accent text-lime">scale and last.</span>]} intro="Our Cloud & Digital Services practice, built on decades of enterprise delivery." />
        <div className="mt-12"><ServiceIndex items={techServices} /></div>
      </section>
      <Seam from="ink" to="ink" />
      <FinalCta title={["Not sure", <span key="w" className="serif-accent text-lime">where to start?</span>]} primary={{ to: "/contact", label: "Talk to us" }} />
    </>
  );
}
