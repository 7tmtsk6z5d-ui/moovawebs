import { FLAVORS, priceOf, type Flavor } from "@/lib/catalog";
import { useShop } from "@/lib/store";
import { rupiah } from "@/lib/utils";

export function FlavorMenu() {
  const addLine = useShop((s) => s.addLine);
  const setFlavor = useShop((s) => s.setFlavor);
  const customNote = useShop((s) => s.customNote);
  const setCustomNote = useShop((s) => s.setCustomNote);
  const size = useShop((s) => s.size);

  function add(flavor: Flavor) {
    setFlavor(flavor.id);
    addLine(flavor.id, size, 1, flavor.custom ? customNote : "");
  }

  return (
    <section id="rasa" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-berry">
            Flavors
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Pilih rasamu.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          Murni 7 ribu. Rasa lain 9 ribu untuk 250 ml. Naik ke 350 ml tinggal plus seribu.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLAVORS.map((flavor) => (
          <article
            key={flavor.id}
            className="overflow-hidden rounded-[1.6rem] bg-foam shadow-[var(--shadow-card)]"
          >
            <button
              type="button"
              className="block w-full"
              onClick={() => setFlavor(flavor.id)}
              aria-label={`Lihat ${flavor.name}`}
            >
              <div className="shot overflow-hidden bg-cream">
                <img
                  src={flavor.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </button>
            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-semibold">{flavor.name}</h3>
                  <p className="text-sm text-ink-soft">{flavor.blurb}</p>
                </div>
                <p className="font-display text-lg font-semibold tabular-nums">
                  {rupiah(priceOf(flavor, "250"))}
                </p>
              </div>
              {flavor.custom ? (
                <input
                  className="field"
                  placeholder="Tulis request rasa…"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                />
              ) : null}
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-ink-soft">
                  250 ml {rupiah(flavor.price250)} · 350 ml {rupiah(flavor.price350)}
                </p>
                <button
                  type="button"
                  className="foam-btn h-10 bg-ink px-4 text-sm text-foam hover:bg-ink"
                  onClick={() => add(flavor)}
                >
                  Tambah
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
