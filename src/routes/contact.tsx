import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero, meta } from "@/components/site";
import { company } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => meta(
    "Contact Us — Act Informatics",
    "Contact Act Informatics in South Windsor, CT: 860-881-6811 or Srini@actinformatics.com.",
    "/contact",
  ),
  component: Contact,
});

const field = "peer w-full border-0 border-b border-border bg-transparent px-0 pb-3 pt-6 text-lg text-paper outline-none transition placeholder:text-transparent focus:border-lime";
const label = "eyebrow pointer-events-none absolute left-0 top-0 text-muted-foreground transition peer-focus:text-lime";
const INTERESTS = ["Hiring talent", "Looking for a job", "Cloud & digital services", "Other"];

function Contact() {
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState(INTERESTS[0]);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nCompany: ${f.get("company")}\nPhone: ${f.get("phone")}\nInterest: ${interest}\n\n${f.get("message")}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Website inquiry: ${interest}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        lines={["Let's", <span key="c" className="serif-accent text-lime">connect.</span>]}
        intro="Hiring, job searching or planning a technology project — reach out and our team will respond."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-24 lg:grid-cols-[1fr_1.5fr]">
        <dl className="space-y-10">
          {[
            ["Office", company.address, null],
            ["Phone", company.phone, company.phoneHref],
            ["General inquiries", company.email, `mailto:${company.email}`],
            ["Resumes", company.jobsEmail, `mailto:${company.jobsEmail}`],
          ].map(([t, v, href]) => (
            <div key={t} className="border-t border-border pt-4">
              <dt className="eyebrow text-lime">{t}</dt>
              <dd className="mt-3 font-display text-2xl font-bold">{href ? <a href={href} className="hover:text-lime">{v}</a> : v}</dd>
            </div>
          ))}
        </dl>
        <form onSubmit={onSubmit} className="grid gap-10 sm:grid-cols-2">
          {[["name", "Full name *", true], ["company", "Company", false], ["phone", "Phone", false]].map(([n, l, req]) => (
            <div key={n as string} className="relative">
              <input id={n as string} name={n as string} required={req as boolean} maxLength={100} placeholder={l as string} className={field} />
              <label htmlFor={n as string} className={label}>{l as string}</label>
            </div>
          ))}
          <div className="sm:col-span-2">
            <p className="eyebrow text-muted-foreground">I'm interested in</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <button key={i} type="button" aria-pressed={interest === i} onClick={() => setInterest(i)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${interest === i ? "border-lime bg-lime text-ink" : "border-border hover:border-lime"}`}>{i}</button>
              ))}
            </div>
          </div>
          <div className="relative sm:col-span-2">
            <textarea id="message" name="message" required maxLength={2000} rows={4} placeholder="How can we help? *" className={field} />
            <label htmlFor="message" className={label}>How can we help? *</label>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 font-semibold text-ink transition hover:glow-lime">
              Send message <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            {sent && <p className="mt-4 text-sm text-muted-foreground">Your email app should open with your message ready to send.</p>}
          </div>
        </form>
      </section>
    </>
  );
}
