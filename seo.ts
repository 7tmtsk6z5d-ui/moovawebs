import type { Flavor } from "./catalog";

// GitHub Pages project-site fallback. If you later use a custom domain,
// change this single value and the sitemap/robots host accordingly.
export const SITE_URL = "https://7tmtsk6z5d-ui.github.io/moovaweb";
export const SITE_NAME = "MŌVA Fresh Milk";

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function productDescription(flavor: Flavor) {
  return `${flavor.name} MŌVA Fresh Milk — ${flavor.blurb} Tersedia dalam ukuran 250 ml dan 350 ml.`;
}

export function productJsonLd(flavor: Flavor) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${flavor.name} MŌVA Fresh Milk`,
    description: productDescription(flavor),
    image: [absoluteUrl(flavor.image)],
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: flavor.price250,
      highPrice: flavor.price350,
      offerCount: 2,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/products/${flavor.id}`),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
