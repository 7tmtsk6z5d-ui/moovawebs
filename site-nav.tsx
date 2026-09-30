import { ShoppingBag } from "lucide-react";
import { WA_LINK } from "@/lib/catalog";
import { cartCount, useShop } from "@/lib/store";
import { useHydrated } from "@/lib/utils";
import { MilkDrop, WhatsAppIcon } from "./icons";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#rasa", label: "Flavors" },
  { href: "#tentang", label: "About" },
  { href: "#pesan", label: "Shop" },
  { href: "#ulasan", label: "Reviews" },
];

export function SiteNav() {
  const cart = useShop((s) => s.cart);
  const open = useShop((s) => s.setDrawerOpen);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(cart) : 0;

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-4 py-4 md:px-8 md:py-5">
      <a href="#home" className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-full bg-foam text-berry md:size-10">
          <MilkDrop className="size-5" />
        </span>
        <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">
          moova
        </span>
      </a>

      <nav className="hidden items-center gap-7 font-display text-sm font-medium text-[var(--stage-muted)] lg:flex">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-[var(--stage-ink)]"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          className="ghost-btn size-10"
          aria-label="Chat WhatsApp"
        >
          <WhatsAppIcon className="size-4" />
        </a>
        <button
          type="button"
          className="foam-btn hidden h-10 px-5 text-sm md:inline-flex"
          onClick={() => open(true)}
        >
          Order now
        </button>
        <button
          type="button"
          className="ghost-btn relative size-10"
          onClick={() => open(true)}
          aria-label="Buka keranjang"
        >
          <ShoppingBag className="size-4" />
          {count > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-foam px-1 font-display text-xs font-semibold leading-4 text-ink">
              {count}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
