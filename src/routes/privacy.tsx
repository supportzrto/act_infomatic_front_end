import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, meta } from "@/components/site";
import { company } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => meta("Privacy Policy — Act Informatics", "How Act Informatics handles information shared through this website.", "/privacy"),
  component: Privacy,
});

const sections = [
  ["Information you provide", "When you contact us or send a resume, we receive the information you choose to share, such as your name, email address, phone number, company and message or resume details."],
  ["How we use it", "We use this information to respond to inquiries, consider candidates for opportunities, and provide the services you request. We do not sell your personal information."],
  ["Sharing", "With a job seeker's consent, we may share candidate information with prospective employers for the purpose of placement."],
  ["Your choices", "You may ask us to update or delete information you've provided by contacting us."],
];

function Privacy() {
  return (
    <section className="surface-paper relative min-h-screen pt-24">
      <div className="paper-grid absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-5 py-16">
        <Breadcrumbs tone="paper" items={[{ label: "Privacy Policy" }]} />
        <h1 className="mt-10 text-6xl font-black font-wide md:text-8xl">Privacy <span className="serif-accent">Policy.</span></h1>
        <div className="mt-16 space-y-12">
          {sections.map(([t, d], i) => (
            <div key={t} className="grid gap-4 border-t border-paper-line pt-6 md:grid-cols-[4rem_1fr]">
              <span className="eyebrow text-paper-muted">§{i + 1}</span>
              <div>
                <h2 className="text-2xl font-black">{t}</h2>
                <p className="mt-3 text-lg text-paper-ink/80">{d}</p>
              </div>
            </div>
          ))}
          <div className="grid gap-4 border-t border-paper-line pt-6 md:grid-cols-[4rem_1fr]">
            <span className="eyebrow text-paper-muted">§5</span>
            <div>
              <h2 className="text-2xl font-black">Contact</h2>
              <p className="mt-3 text-lg text-paper-ink/80">
                {company.name}, {company.address}. Email <a className="underline" href={`mailto:${company.email}`}>{company.email}</a> or visit our <Link to="/contact" className="underline">contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
