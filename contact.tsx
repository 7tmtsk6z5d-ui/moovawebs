import { createFileRoute, Link } from "@tanstack/react-router";
import { WA_LINK } from "@/lib/catalog";
import { absoluteUrl, breadcrumbJsonLd, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact | ${SITE_NAME}` },
      { name: "description", content: "Hubungi MŌVA Fresh Milk untuk pemesanan dan pertanyaan." },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contact") }],
  }),
  component: () => (
    <main className="min-h-screen bg-cream px-5 py-12 text-ink md:py-20">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="font-display text-sm font-semibold text-berry">← MŌVA Fresh Milk</Link>
        <p className="mt-12 font-display text-xs font-semibold uppercase tracking-[0.2em] text-berry">Contact</p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-7xl">Hubungi MŌVA.</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">Untuk pemesanan atau request yang termasuk dalam opsi Lainnya, hubungi MŌVA melalui WhatsApp.</p>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="mt-8 inline-flex foam-btn h-11 px-5">Chat WhatsApp</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: SITE_NAME, path: "/" }, { name: "Contact", path: "/contact" }])) }} />
    </main>
  ),
});
