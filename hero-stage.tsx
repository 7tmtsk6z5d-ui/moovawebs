import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, Truck } from "lucide-react";
import { FLAVORS, SIZES, flavorById, priceOf } from "@/lib/catalog";
import { useShop } from "@/lib/store";
import { rupiah } from "@/lib/utils";
import { SiteNav } from "./site-nav";

const TICKER = [
  "Fresh milk",
  "Tanpa pengawet",
  "250 ml & 350 ml",
  "Request rasa ke CS",
  "Antar dingin",
  "Pesan sebelum jam 6",
];

export function HeroStage() {
  const flavorId = useShop((s) => s.flavorId);
  const size = useShop((s) => s.size);
  const qty = useShop((s) => s.qty);
  const customNote = useShop((s) => s.customNote);
  const setFlavor = useShop((s) => s.setFlavor);
  const cycleFlavor = useShop((s) => s.cycleFlavor);
  const setSize = useShop((s) => s.setSize);
  const setQty = useShop((s) => s.setQty);
  const setCustomNote = useShop((s) => s.setCustomNote);
  const addCurrent = useShop((s) => s.addCurrent);
  const [hint, setHint] = useState("");

  const flavor = flavorById(flavorId);
  const price = priceOf(flavor, size);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") cycleFlavor(1);
      if (event.key === "ArrowLeft") cycleFlavor(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycleFlavor]);

  function order() {
    const ok = addCurrent();
    if (!ok) setHint("Tulis request rasanya dulu ya.");
    else setHint("");
  }

  return (
    <div className="pack-shell" id="home">
      <div className="pack-inner stage" data-flavor={flavor.id}>
        <SiteNav />

        <div className="ticker">
          <div className="ticker-track py-2.5">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center">
                {TICKER.map((item) => (
                  <span key={`${copy}-${item}`} className="flex items-center">
                    <span className="px-4 opacity-80">{item}</span>
                    <span className="opacity-40">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid items-center gap-6 px-4 pb-8 pt-4 md:px-8 lg:grid-cols-12 lg:gap-4 lg:pb-10 lg:pt-2">
          <div className="z-10 order-2 space-y-5 lg:order-1 lg:col-span-3">
            <article className="promo-card max-w-xs p-5">
              <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-berry text-foam">
                <Truck className="size-4" />
              </div>
              <p className="font-display text-lg font-semibold leading-tight">Free delivery</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Pesan sebelum jam 6 sore, antar hari ini. Dingin sampai depan pintu.
              </p>
            </article>
            <p className="hidden max-w-[16rem] text-sm leading-relaxed text-[var(--stage-muted)] lg:block">
              Bottled milkshakes from fresh milk — playful, cold, and made to sip now.
            </p>
          </div>

          <div className="relative order-1 flex min-h-80 items-center justify-center lg:order-2 lg:col-span-6 lg:min-h-[min(40rem,calc(100dvh-13rem))]">
            <p className="wordmark absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-[58%]">
              moova
            </p>
            <button
              type="button"
              className="ghost-btn absolute left-0 z-20 size-11 md:left-2"
              onClick={() => cycleFlavor(-1)}
              aria-label="Rasa sebelumnya"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="bottle-frame relative z-10">
              <img
                key={flavor.id}
                src={flavor.image}
                alt={`Botol Moova rasa ${flavor.name}`}
                className="bottle-photo rise-in"
              />
            </div>
            <button
              type="button"
              className="ghost-btn absolute right-0 z-20 size-11 md:right-2"
              onClick={() => cycleFlavor(1)}
              aria-label="Rasa berikutnya"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <div className="z-10 order-3 space-y-5 lg:col-span-3 lg:justify-self-end lg:text-left">
            <ul className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1.5 lg:overflow-visible">
              {FLAVORS.map((item) => {
                const active = item.id === flavor.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setFlavor(item.id)}
                      className={`flex items-center gap-2 rounded-full px-3 py-2 font-display text-sm whitespace-nowrap transition-colors lg:px-2 ${
                        active ? "bg-[var(--stage-ghost)] font-semibold" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <span
                        className={`grid size-3.5 place-items-center rounded-full border border-current ${
                          active ? "bg-foam text-ink" : ""
                        }`}
                      >
                        {active ? <span className="size-1.5 rounded-full bg-ink" /> : null}
                      </span>
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div>
              <p className="font-display text-xs uppercase tracking-[0.18em] text-[var(--stage-muted)]">
                {flavor.english}
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold leading-none md:text-4xl">
                {flavor.name}
              </h1>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--stage-muted)]">
                {flavor.pitch}
              </p>
            </div>

            {flavor.custom ? (
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--stage-muted)]">
                  Request ke CS
                </span>
                <input
                  className="field"
                  placeholder="Contoh: vanilla, tarik, kurang manis"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                />
                {hint ? <p className="mt-1 text-xs text-foam">{hint}</p> : null}
              </label>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              {SIZES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSize(item.id)}
                  className={`rounded-full px-3 py-2 font-display text-sm ${
                    size === item.id ? "bg-foam text-ink" : "ghost-btn px-3 py-2"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <p className="font-display text-3xl font-semibold tabular-nums">{rupiah(price)}</p>
              <div className="stepper text-[var(--stage-ink)]">
                <button
                  type="button"
                  className="grid size-9 place-items-center"
                  onClick={() => setQty(qty - 1)}
                  aria-label="Kurangi"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-6 text-center font-display tabular-nums">{qty}</span>
                <button
                  type="button"
                  className="grid size-9 place-items-center"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Tambah"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <button type="button" className="foam-btn h-12 w-full px-6 text-base md:w-auto" onClick={order}>
              Order now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
