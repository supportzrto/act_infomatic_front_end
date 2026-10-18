import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FinalCta, PageHero, meta } from "@/components/site";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blog/")({
  head: () => meta(
    "Blog & Insights — Act Informatics",
    "Field notes on IT hiring, careers, cloud migration and data from Act Informatics.",
    "/blog",
  ),
  component: Blog,
});

function Blog() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <>
      <PageHero
        eyebrow="Blog / Insights"
        lines={["Field", <span key="n" className="serif-accent text-lime">notes.</span>]}
        intro="Practical guidance on hiring, careers and technology from our talent and technology teams."
        crumbs={[{ label: "Blog" }]}
        variant="data"
      />
      <section className="surface-paper relative">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <ul onMouseLeave={() => setHover(null)}>
            {posts.map((p, i) => (
              <li key={p.slug} className="relative border-t border-paper-line last:border-b" onMouseEnter={() => setHover(i)}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group grid gap-4 py-10 md:grid-cols-[10rem_1fr_14rem] md:items-center">
                  <span className="eyebrow text-paper-muted">{String(i + 1).padStart(2, "0")} / {p.category}</span>
                  <div>
                    <h2 className="text-4xl font-black leading-[0.95] transition-colors md:text-6xl">
                      {p.title.split(" ").map((w, k) => (
                        <span key={k} className={k % 3 === 2 ? "serif-accent" : ""}>{w} </span>
                      ))}
                    </h2>
                    <p className="mt-3 max-w-xl text-paper-muted">{p.excerpt}</p>
                  </div>
                  <motion.div
                    className="hidden aspect-[4/3] overflow-hidden rounded md:block"
                    animate={{ clipPath: hover === i ? "inset(0% 0% 0% 0%)" : "inset(50% 50% 50% 50%)" }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <img src={p.image} alt="" loading="lazy" width={1280} height={800} className="h-full w-full object-cover" />
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta title={["Have a", <span key="q" className="serif-accent text-lime">question?</span>]} primary={{ to: "/contact", label: "Contact Us" }} />
    </>
  );
}
