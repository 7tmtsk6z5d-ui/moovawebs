import { BCA_ACCOUNT, WA_LINK, WA_NUMBER } from "@/lib/catalog";
import { MilkDrop } from "./icons";

export function SiteFooter() {
  return (
    <footer className="bg-berry px-5 py-12 text-foam">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-2 font-display text-3xl font-semibold">
            <MilkDrop className="size-7" />
            moova
          </p>
          <p className="mt-2 text-sm text-foam/80">Fresh milk. Bottled to sip.</p>
        </div>
        <div className="space-y-1 text-sm">
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="block underline-offset-4 hover:underline">
            WhatsApp {WA_NUMBER}
          </a>
          <p>BCA {BCA_ACCOUNT}</p>
          <p className="text-foam/70">QRIS GoPay Merchant · Moova Fresh Milk</p>
        </div>
      </div>
    </footer>
  );
}
