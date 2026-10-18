import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion, useScroll } from "framer-motion";
import { FinalCta, PageHero, meta } from "@/components/site";
import { MaskImage } from "@/components/motion";
import { posts } from "@/data/site";

const find = (slug: string) => posts.find((p) => p.slug === slug);

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    if (!find(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const p = find(params.slug);
    if (!p) return { meta: [{ title: "Article not found — Act Informatics" }, { name: "robots", content: "noindex" }] };
    const m = meta(`${p.title} — Act Informatics`, p.excerpt, `/blog/${p.slug}`);
    return { ...m, meta: [...m.meta.filter((x) => !("property" in x && x.property === "og:type")), { property: "og:type", content: "article" }] };
  },
  component: Post,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-40 text-center">
      <h1 className="text-4xl font-black">Article not found</h1>
      <Link to="/blog" className="eyebrow mt-6 inline-block text-lime">Back to insights →</Link>
    </div>
  ),
});

function Post() {
  const { slug } = Route.useLoaderData();
  const p = find(slug)!;
  const { scrollYProgress } = useScroll();
  const next = posts[(posts.indexOf(p) + 1) % posts.length]!;
  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-lime" style={{ scaleX: scrollYProgress }} aria-hidden />
      <PageHero
        eyebrow={`${p.category} · ${p.minutes} min read`}
        lines={[p.title]}
        intro={p.excerpt}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: p.category }]}
        variant="data"
      />
      <article className="surface-paper">
        <div className="mx-auto max-w-5xl px-5 pt-16">
          <MaskImage src={p.image} className="aspect-[21/9] rounded-lg" />
        </div>
        <div className="mx-auto max-w-2xl space-y-6 px-5 py-16 text-lg leading-relaxed text-paper-ink/85">
          {p.body.map((para, i) => (
            <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-black first-letter:leading-[0.8]" : ""}>{para}</p>
          ))}
          <div className="flex justify-between border-t border-paper-line pt-8">
            <Link to="/blog" className="eyebrow hover:underline">← All insights</Link>
            <Link to="/blog/$slug" params={{ slug: next.slug }} className="eyebrow hover:underline">Next: {next.title.slice(0, 32)}… →</Link>
          </div>
        </div>
      </article>
      <FinalCta title={["Put ideas", <span key="a" className="serif-accent text-lime">into action.</span>]} primary={{ to: "/contact", label: "Contact Us" }} secondary={{ to: "/services", label: "View services" }} />
    </>
  );
}
