import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoBadge, FinalCta, PageHero, meta } from "@/components/site";
import { DrawLine, KineticLines, MaskImage, Reveal } from "@/components/motion";
import { caseStudies, getService } from "@/data/site";
import data from "@/assets/data.jpg";
import staffing from "@/assets/staffing.jpg";
import cloud from "@/assets/cloud.jpg";

export const Route = createFileRoute("/case-studies")({
  head: () => meta(
    "Case Studies & Success Stories — Act Informatics",
    "Narrative-style engagement stories showing how Act Informatics applies contract staffing, contract-to-hire and managed IT services. Demo content.",
    "/case-studies",
  ),
  component: CaseStudies,
});

const imgs = [data, staffing, cloud];

function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies / Success Stories"
        lines={["Every engagement", <span key="s" className="serif-accent text-lime">is a story.</span>]}
        intro="Each narrative follows the same arc: challenge, approach, outcome. The stories below are demo placeholders until approved client case studies are supplied."
        crumbs={[{ label: "Case Studies" }]}
        variant="data"
      >
        <DemoBadge>All narratives on this page are demo content</DemoBadge>
      </PageHero>

      {caseStudies.map((c, i) => {
        const s = getService(c.service)!;
        return (
          <section key={c.slug} id={c.slug} className={i % 2 ? "surface-paper" : ""}>
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[14rem_1fr]">
              <div className="lg:sticky lg:top-28 lg:h-fit">
                <span className={`font-display text-9xl font-black leading-none ${i % 2 ? "text-paper-ink" : "text-outline"}`}>{String(i + 1).padStart(2, "0")}</span>
                <p className={`eyebrow mt-4 ${i % 2 ? "text-paper-muted" : "text-lime"}`}>{c.sector} · Demo</p>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="eyebrow mt-2 block underline-offset-4 hover:underline">{s.title} ↗</Link>
              </div>
              <div>
                <KineticLines as="h2" lines={[c.title]} className="text-4xl font-black leading-[1] md:text-6xl" />
                <MaskImage src={imgs[i]!} className="mt-12 aspect-[21/9] rounded-lg" />
                <DrawLine className="mt-12 h-10 w-full" />
                <div className="grid gap-10 md:grid-cols-3">
                  {[["Challenge", c.challenge], ["Approach", c.approach], ["Outcome", c.outcome]].map(([h, t], k) => (
                    <Reveal key={h} delay={k * 0.15}>
                      <p className={`eyebrow ${i % 2 ? "text-paper-muted" : "text-lime"}`}>{String(k + 1).padStart(2, "0")} — {h}</p>
                      <p className="mt-4 font-serif text-2xl italic leading-snug">{t}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <FinalCta title={["Write the", <span key="n" className="serif-accent text-lime">next chapter.</span>]} primary={{ to: "/contact", label: "Start a conversation" }} secondary={{ to: "/services", label: "Explore services" }} />
    </>
  );
}
