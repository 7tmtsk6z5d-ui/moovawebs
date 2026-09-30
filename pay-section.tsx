import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { BCA_ACCOUNT, BCA_BANK, WA_LINK, WA_NUMBER } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export function PaySection() {
  const [copied, setCopied] = useState(false);
  const open = useShop((s) => s.setDrawerOpen);

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(BCA_ACCOUNT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="pesan" className="bg-cream-deep/40 px-5 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-berry">
            Shop
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Scan, transfer, chat.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
            Pesanan dikirim langsung ke WhatsApp Moova. Bayar pakai QRIS GoPay Merchant
            atau transfer BCA — setelah transfer, kirim bukti di chat.
          </p>
          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                WhatsApp
              </dt>
              <dd>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-2xl font-semibold text-ink underline decoration-berry/40 underline-offset-4"
                >
                  {WA_NUMBER}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Transfer {BCA_BANK}
              </dt>
              <dd className="mt-1 flex flex-wrap items-center gap-3">
                <span className="font-display text-2xl font-semibold tabular-nums">
                  {BCA_ACCOUNT}
                </span>
                <button
                  type="button"
                  onClick={copyAccount}
                  className="foam-btn h-9 bg-ink px-3 text-xs text-foam hover:bg-ink"
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? "Tersalin" : "Salin"}
                </button>
              </dd>
              <p className="mt-1 text-sm text-ink-soft">Transfer Bank Central Asia</p>
            </div>
          </dl>
          <button
            type="button"
            className="foam-btn mt-8 h-12 bg-berry px-6 text-foam hover:bg-berry"
            onClick={() => open(true)}
          >
            Order now
          </button>
        </div>

        <figure className="overflow-hidden rounded-[1.8rem] bg-foam p-3 shadow-[var(--shadow-card)]">
          <img
            src="/qris.png"
            alt="QRIS Moova Fresh Milk — GoPay Merchant"
            className="w-full rounded-[1.3rem]"
          />
          <figcaption className="px-2 py-3 text-center text-sm text-ink-soft">
            QRIS nasional — GoPay, BCA, Mandiri, BNI, BRI, dan bank lainnya
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
