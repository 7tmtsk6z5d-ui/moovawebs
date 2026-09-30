import { createFileRoute, Link } from "@tanstack/react-router";
import { FLAVORS, priceOf } from "@/lib/catalog";
import { absoluteUrl, breadcrumbJsonLd, SITE_NAME } from "@/lib/seo";
import { rupiah } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: `Products | ${SITE_NAME}` },
      {
        name: "description",
        content:
          "Pilihan susu segar MŌVA Fresh Milk: Murni, Strawberry, Coklat, Matcha, dan Lainnya. Pilih 250 ml atau 350 ml.",
      },
      { property: "og:title", content: `Products | ${SITE_NAME}` },
      { property: "og:description", content: "Lihat pilihan rasa dan ukuran MŌVA Fresh Milk." },
      { property: "og:url", content: absoluteUrl("/products") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/products") }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <Link to="/" className="font-display text-sm font-semibold text-berry">← MŌVA Fresh Milk</Link>
        <p className="mt-10 font-display text-xs font-semibold uppercase tracking-[0.2em] text-berry">Products</p>
        <h1 className="mt-2 max-w-3xl font-display text-5xl font-semibold tracking-tight md:text-7xl">Pilihan rasa MŌVA.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
          Temukan pilihan rasa MŌVA Fresh Milk yang tersedia di katalog utama.
        </p>
      </header>
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLAVORS.map((flavor) => (
            <article key={flavor.id} className="overflow-hidden rounded-[1.6rem] bg-foam shadow-[var(--shadow-card)]">
              <img src={flavor.image} alt={`${flavor.name} MŌVA Fresh Milk`} className="aspect-[4/3] w-full object-cover" />
              <div className="space-y-3 p-5">
                <h2 className="font-display text-2xl font-semibold">{flavor.name}</h2>
                <p className="text-sm leading-relaxed text-ink-soft">{flavor.blurb}</p>
                <p className="font-display text-lg font-semibold">Mulai {rupiah(priceOf(flavor, "250"))}</p>
                <Link to="/products/$flavor" params={{ flavor: flavor.id }} className="inline-flex foam-btn h-10 px-4 text-sm">Lihat detail</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { "@context": "https://schema.org", "@type": "CollectionPage", name: `Products | ${SITE_NAME}`, url: absoluteUrl("/products") },
        breadcrumbJsonLd([{ name: SITE_NAME, path: "/" }, { name: "Products", path: "/products" }]),
      ]) }} />
    </main>
  );
}
