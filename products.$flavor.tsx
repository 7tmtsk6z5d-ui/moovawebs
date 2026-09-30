import { createFileRoute, Link } from "@tanstack/react-router";
import { FLAVORS, flavorById } from "@/lib/catalog";
import { absoluteUrl, breadcrumbJsonLd, productDescription, productJsonLd, SITE_NAME } from "@/lib/seo";
import { rupiah } from "@/lib/utils";

export const Route = createFileRoute("/products/$flavor")({
  loader: ({ params }) => flavorById(params.flavor),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.name} Fresh Milk | ${SITE_NAME}` },
      { name: "description", content: productDescription(loaderData) },
      { property: "og:title", content: `${loaderData.name} Fresh Milk | ${SITE_NAME}` },
      { property: "og:description", content: productDescription(loaderData) },
      { property: "og:image", content: absoluteUrl(loaderData.image) },
      { property: "og:url", content: absoluteUrl(`/products/${loaderData.id}`) },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(`/products/${loaderData.id}`) }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const flavor = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="mx-auto max-w-5xl px-5 py-10 md:py-14">
        <Link to="/products" className="font-display text-sm font-semibold text-berry">← Products</Link>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
          <img src={flavor.image} alt={`${flavor.name} MŌVA Fresh Milk`} className="w-full rounded-[1.8rem] bg-foam object-cover shadow-[var(--shadow-card)]" />
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-berry">MŌVA Fresh Milk</p>
            <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-6xl">{flavor.name}</h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{flavor.blurb}</p>
            <p className="mt-5 font-display text-xl font-semibold">250 ml {rupiah(flavor.price250)} · 350 ml {rupiah(flavor.price350)}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{flavor.pitch}</p>
          </div>
        </div>
      </header>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        productJsonLd(flavor),
        breadcrumbJsonLd([
          { name: SITE_NAME, path: "/" },
          { name: "Products", path: "/products" },
          { name: flavor.name, path: `/products/${flavor.id}` },
        ]),
      ]) }} />
    </main>
  );
}

export function getStaticProductIds() {
  return FLAVORS.map((flavor) => flavor.id);
}
