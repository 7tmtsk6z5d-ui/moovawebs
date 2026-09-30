import { createFileRoute, Link } from "@tanstack/react-router";
import { absoluteUrl, breadcrumbJsonLd, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Us | ${SITE_NAME}` },
      { name: "description", content: "Tentang MŌVA Fresh Milk dan pilihan susu segar yang tersedia." },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
  }),
  component: () => (
    <main className="min-h-screen bg-cream px-5 py-12 text-ink md:py-20">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="font-display text-sm font-semibold text-berry">← MŌVA Fresh Milk</Link>
        <p className="mt-12 font-display text-xs font-semibold uppercase tracking-[0.2em] text-berry">About Us</p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-7xl">Tentang MŌVA.</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">MŌVA Fresh Milk menghadirkan pilihan susu segar dengan rasa yang sudah tersedia di katalog utama kami.</p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: SITE_NAME, path: "/" }, { name: "About Us", path: "/about" }])) }} />
    </main>
  ),
});
