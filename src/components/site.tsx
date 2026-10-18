import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import logo from "@/assets/act-logo.gif";
import { company, services, talentServices, techServices, visualFor, type Service } from "@/data/site";
import { NetworkCanvas, type NetworkVariant } from "@/components/network";
import { EASE, EASE_OUT, KineticLines } from "@/components/motion";

type To = NonNullable<LinkProps["to"]>;

const mainNav = [
  { to: "/about", label: "About" },
  { to: "/industries", label: "Industries" },
  { to: "/employers", label: "Employers" },
  { to: "/careers", label: "Careers" },
  { to: "/case-studies", label: "Stories" },
  { to: "/blog", label: "Insights" },
] as const;

/* ---------------- Mega menu ---------------- */

function MegaPanel({ onNavigate }: { onNavigate: () => void }) {
  const [active, setActive] = useState<Service>(services[0]!);
  const col = (title: string, to: To, items: Service[], offset: number, overview?: ReactNode) => (
    <div>
      <Link to={to} onClick={onNavigate} className="eyebrow text-lime hover:underline">{title} ↗</Link>
      <ul className="mt-5 space-y-1">
        {overview}
        {items.map((s, i) => (
          <li key={s.slug}>
            <Link
              to="/services/$slug" params={{ slug: s.slug }} onClick={onNavigate}
              onMouseEnter={() => setActive(s)} onFocus={() => setActive(s)}
              className="group flex items-baseline gap-4 py-1.5"
            >
              <span className="eyebrow w-6 text-muted-foreground">{String(offset + i + 1).padStart(2, "0")}</span>
              <span className={`font-display text-xl font-semibold transition-all duration-500 ${active.slug === s.slug ? "translate-x-2 text-lime" : "text-paper"}`}>{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1fr_1fr_1.1fr]">
      {col("Talent Solutions", "/services", talentServices, 0)}
      {col("Technology Solutions", "/cloud-digital-services", techServices, 5,
        <li><Link to="/cloud-digital-services" onClick={onNavigate} className="mb-2 block border-b border-border pb-3 font-serif text-lg italic text-muted-foreground hover:text-lime">Cloud & Digital Services overview →</Link></li>)}
      <div className="relative hidden overflow-hidden rounded-lg border border-border bg-ink lg:block">
        <AnimatePresence mode="wait">
          <motion.div key={active.slug} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <NetworkCanvas variant={visualFor(active.slug)} density={0.6} />
          </motion.div>
        </AnimatePresence>
        <div className="relative flex h-full min-h-72 flex-col justify-end bg-gradient-to-t from-ink via-ink/60 to-transparent p-6">
          <p className="eyebrow text-lime">{active.group === "talent" ? "Talent" : "Technology"} · Network mode: {visualFor(active.slug)}</p>
          <p className="mt-2 font-serif text-2xl italic leading-tight">{active.tagline}</p>
        </div>
      </div>
      <Link to="/services" onClick={onNavigate} className="eyebrow text-muted-foreground hover:text-lime lg:col-span-3">All services overview →</Link>
    </div>
  );
}

export function SiteHeader() {
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => { setMega(false); setMobile(false); };
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setMega(false); setMobile(false); }, [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || mega || mobile ? "border-b border-border bg-ink/85 backdrop-blur-xl" : "bg-transparent"}`}
      onMouseLeave={() => setMega(false)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" onClick={close} aria-label="Act Informatics home" className="rounded-md bg-paper px-2 py-1">
          <img src={logo} alt="Act Informatics" className="h-8 w-auto" width={200} height={96} />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          <button
            type="button" aria-expanded={mega} onClick={() => setMega((v) => !v)} onMouseEnter={() => setMega(true)}
            className={`eyebrow rounded-full px-4 py-2 transition ${mega ? "bg-lime text-ink" : "text-paper hover:text-lime"}`}
          >
            Services {mega ? "−" : "+"}
          </button>
          {mainNav.map((n) => (
            <Link key={n.to} to={n.to} onMouseEnter={() => setMega(false)} className="eyebrow rounded-full px-4 py-2 text-paper/80 transition hover:text-lime" activeProps={{ className: "text-lime" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" onClick={close} className="eyebrow hidden rounded-full border border-lime px-4 py-2 text-lime transition hover:bg-lime hover:text-ink sm:inline-block">
            Contact
          </Link>
          <button type="button" aria-expanded={mobile} aria-label="Menu" onClick={() => setMobile((v) => !v)} className="eyebrow rounded-full bg-lime px-4 py-2 text-ink lg:hidden">
            {mobile ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mega && (
          <motion.div
            className="hidden border-t border-border bg-ink/95 backdrop-blur-xl lg:block"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <MegaPanel onNavigate={close} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobile && (
          <motion.div
            className="h-[calc(100dvh-58px)] overflow-y-auto border-t border-border bg-ink px-5 pb-10 pt-6 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          >
            <nav className="grid gap-1">
              {[{ to: "/", label: "Home" }, ...mainNav, { to: "/contact", label: "Contact" }].map((n, i) => (
                <Link key={n.to} to={n.to as To} onClick={close} className="flex items-baseline gap-3 py-1 font-display text-4xl font-bold">
                  <span className="eyebrow text-lime">{String(i).padStart(2, "0")}</span>{n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 grid gap-6 border-t border-border pt-6">
              {[["Talent Solutions", talentServices, "/services"], ["Technology Solutions", techServices, "/cloud-digital-services"]].map(([t, list, to]) => (
                <div key={t as string}>
                  <Link to={to as To} onClick={close} className="eyebrow text-lime">{t as string} ↗</Link>
                  <ul className="mt-3 grid gap-2">
                    {(list as Service[]).map((s) => (
                      <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} onClick={close} className="text-lg text-paper/90">{s.title}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------- Footer ---------------- */

export function SiteFooter() {
  return (
    <footer className="surface-ink grain overflow-hidden border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-20 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="eyebrow text-lime">Act Informatics, Inc.</p>
          <address className="mt-4 text-sm not-italic leading-7 text-muted-foreground">
            {company.address}<br />
            <a href={company.phoneHref} className="hover:text-lime">{company.phone}</a><br />
            <a href={`mailto:${company.email}`} className="hover:text-lime">{company.email}</a>
          </address>
        </div>
        <FooterCol title="Talent" items={talentServices} />
        <FooterCol title="Technology" items={techServices} />
        <div>
          <p className="eyebrow text-lime">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {([
              ["/about", "About Us"], ["/services", "Services Overview"], ["/cloud-digital-services", "Cloud & Digital Services"],
              ["/industries", "Industries We Serve"], ["/employers", "Employers – Hire Talent"], ["/careers", "Job Seekers – Careers"],
              ["/case-studies", "Case Studies"], ["/blog", "Blog / Insights"], ["/contact", "Contact Us"], ["/privacy", "Privacy Policy"],
            ] as const).map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-lime">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <p aria-hidden className="text-outline select-none whitespace-nowrap px-5 font-display text-[16vw] font-black leading-[0.8] font-wide">ACT INFORMATICS</p>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 eyebrow text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Act Informatics, Inc.</span>
        <Link to="/privacy" className="hover:text-lime">Privacy Policy</Link>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: Service[] }) {
  return (
    <div>
      <p className="eyebrow text-lime">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((s) => (
          <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-lime">{s.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Page primitives ---------------- */

export type Crumb = { label: string; to?: To };

export function Breadcrumbs({ items, tone = "ink" }: { items: Crumb[]; tone?: "ink" | "paper" }) {
  const all: Crumb[] = [{ label: "Home", to: "/" }, ...items];
  const muted = tone === "ink" ? "text-muted-foreground" : "text-paper-muted";
  return (
    <nav aria-label="Breadcrumb" className={`eyebrow ${muted}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-lime">/</span>}
            {c.to && i < all.length - 1 ? <Link to={c.to} className="hover:text-lime">{c.label}</Link> : <span aria-current="page" className={tone === "ink" ? "text-paper" : "text-paper-ink"}>{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  index, eyebrow, lines, intro, crumbs, variant = "hero", children,
}: { index?: string; eyebrow: string; lines: ReactNode[]; intro: string; crumbs: Crumb[]; variant?: NetworkVariant; children?: ReactNode }) {
  return (
    <section className="surface-ink grain relative overflow-hidden pt-24">
      <div className="absolute inset-0 tech-grid opacity-40" aria-hidden />
      <div className="absolute inset-y-0 right-0 w-full md:w-[62%]" aria-hidden>
        <NetworkCanvas variant={variant} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 md:pb-28">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 flex items-start gap-6">
          {index && <span className="text-outline hidden font-display text-8xl font-black leading-none md:block">{index}</span>}
          <div className="max-w-4xl">
            <p className="eyebrow text-lime">{eyebrow}</p>
            <KineticLines animateOnMount lines={lines} className="mt-4 text-5xl font-extrabold leading-[0.92] md:text-8xl" />
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: EASE_OUT }} className="mt-8 max-w-xl text-lg text-muted-foreground">
              {intro}
            </motion.p>
            {children && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-10 flex flex-wrap gap-3">{children}</motion.div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Btn({ to, children, variant = "lime" }: { to: To; children: ReactNode; variant?: "lime" | "ghost" | "ink" }) {
  const cls = {
    lime: "bg-lime text-ink hover:glow-lime",
    ghost: "border border-paper/30 text-paper hover:border-lime hover:text-lime",
    ink: "bg-paper-ink text-paper hover:bg-ink",
  }[variant];
  return (
    <Link to={to} className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${cls}`}>
      {children}<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

export function SectionHead({ eyebrow, title, intro, tone = "ink" }: { eyebrow: string; title: ReactNode[]; intro?: string; tone?: "ink" | "paper" }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.6fr] md:items-end">
      <p className={`eyebrow ${tone === "ink" ? "text-lime" : "text-paper-muted"}`}>{eyebrow}</p>
      <div>
        <KineticLines as="h2" lines={title} className="text-4xl font-extrabold leading-[0.95] md:text-6xl" />
        {intro && <p className={`mt-5 max-w-xl text-lg ${tone === "ink" ? "text-muted-foreground" : "text-paper-muted"}`}>{intro}</p>}
      </div>
    </div>
  );
}

/** Editorial, interactive service index with live network preview. */
export function ServiceIndex({ items = services }: { items?: Service[] }) {
  const [active, setActive] = useState<Service>(items[0]!);
  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <ul className="border-t border-border">
        {items.map((s, i) => (
          <li key={s.slug} className="border-b border-border">
            <Link
              to="/services/$slug" params={{ slug: s.slug }}
              onMouseEnter={() => setActive(s)} onFocus={() => setActive(s)}
              className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 overflow-hidden py-5"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-100" aria-hidden />
              <span className="eyebrow relative text-muted-foreground group-hover:text-ink">{String(i + 1).padStart(2, "0")}</span>
              <span className="relative font-display text-2xl font-bold transition-transform duration-500 group-hover:translate-x-3 group-hover:text-ink md:text-4xl">{s.title}</span>
              <span className="eyebrow relative pr-3 text-muted-foreground group-hover:text-ink">{s.group === "talent" ? "Talent" : "Tech"} ↗</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="sticky top-24 hidden h-[28rem] overflow-hidden rounded-lg border border-border lg:block">
        <AnimatePresence mode="wait">
          <motion.div key={active.slug} className="absolute inset-0" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <NetworkCanvas variant={visualFor(active.slug)} density={0.7} />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-6">
          <p className="eyebrow text-lime">{active.short}</p>
          <p className="mt-2 font-serif text-3xl italic leading-tight">{active.tagline}</p>
        </div>
      </div>
    </div>
  );
}

export function FinalCta({ title, primary, secondary }: { title: ReactNode[]; primary: { to: To; label: string }; secondary?: { to: To; label: string } }) {
  return (
    <section className="surface-ink grain relative overflow-hidden">
      <div className="absolute inset-0 opacity-70" aria-hidden><NetworkCanvas variant="hero" density={0.8} /></div>
      <div className="relative mx-auto max-w-7xl px-5 py-28 md:py-40">
        <p className="eyebrow text-lime">Next step</p>
        <KineticLines as="h2" lines={title} className="mt-5 text-5xl font-black leading-[0.9] md:text-[8.5rem] font-wide" />
        <div className="mt-12 flex flex-wrap gap-3">
          <Btn to={primary.to}>{primary.label}</Btn>
          {secondary && <Btn to={secondary.to} variant="ghost">{secondary.label}</Btn>}
        </div>
      </div>
    </section>
  );
}

export function DemoBadge({ children = "Demo placeholder" }: { children?: ReactNode }) {
  return <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-dashed border-lime px-3 py-1 text-lime"><span className="h-1.5 w-1.5 animate-blink rounded-full bg-lime" />{children}</span>;
}

export const meta = (title: string, description: string, path: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: path },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: path }],
});

export { EASE };
