import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, Trash2, X } from "lucide-react";
import {
  BCA_ACCOUNT,
  BCA_BANK,
  WA_E164,
  flavorById,
  priceOf,
} from "@/lib/catalog";
import { cartTotal, useShop } from "@/lib/store";
import { rupiah } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

type PayMethod = "qris" | "bca";

export function OrderDrawer() {
  const open = useShop((s) => s.drawerOpen);
  const setOpen = useShop((s) => s.setDrawerOpen);
  const cart = useShop((s) => s.cart);
  const updateQty = useShop((s) => s.updateQty);
  const removeLine = useShop((s) => s.removeLine);
  const total = cartTotal(cart);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [pay, setPay] = useState<PayMethod>("qris");
  const [error, setError] = useState("");

  const message = useMemo(() => {
    const lines = cart.map((line) => {
      const flavor = flavorById(line.flavorId);
      const sub = priceOf(flavor, line.size) * line.qty;
      const extra = line.note ? ` (${line.note})` : "";
      return `• ${flavor.name}${extra} ${line.size}ml x${line.qty} = ${rupiah(sub)}`;
    });
    return [
      "Halo Moova! Saya mau pesan:",
      "",
      ...lines,
      "",
      `Total: ${rupiah(total)}`,
      `Bayar: ${pay === "qris" ? "QRIS" : `Transfer ${BCA_BANK} ${BCA_ACCOUNT}`}`,
      "",
      `Nama: ${name || "-"}`,
      `WA: ${phone || "-"}`,
      `Alamat: ${address || "-"}`,
      notes ? `Catatan: ${notes}` : "",
    ]
      .filter((row) => row !== "")
      .join("\n");
  }, [address, cart, name, notes, pay, phone, total]);

  function send() {
    if (cart.length === 0) {
      setError("Keranjang masih kosong.");
      return;
    }
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Isi nama, WhatsApp, dan alamat dulu ya.");
      return;
    }
    setError("");
    const url = `https://wa.me/${WA_E164}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] overflow-y-auto rounded-t-[1.8rem] bg-cream outline-none md:inset-y-3 md:right-3 md:left-auto md:w-[min(100%,28rem)] md:rounded-[1.8rem]">
          <div className="flex items-center justify-between px-5 py-4">
            <Dialog.Title className="font-display text-2xl font-semibold">Pesananmu</Dialog.Title>
            <Dialog.Description className="sr-only">
              Keranjang belanja dan form pesanan Moova Fresh Milk
            </Dialog.Description>
            <Dialog.Close className="grid size-10 place-items-center rounded-full bg-cream-deep" aria-label="Tutup">
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div className="space-y-5 px-5 pb-8">
            {cart.length === 0 ? (
              <p className="rounded-2xl bg-foam p-5 text-sm text-ink-soft">
                Keranjang masih kosong. Pilih rasa di halaman, lalu Order now.
              </p>
            ) : (
              <ul className="space-y-2">
                {cart.map((line) => {
                  const flavor = flavorById(line.flavorId);
                  const sub = priceOf(flavor, line.size) * line.qty;
                  return (
                    <li
                      key={line.key}
                      className="flex items-center gap-3 rounded-2xl bg-foam p-3"
                    >
                      <img
                        src={flavor.image}
                        alt=""
                        className="size-14 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display font-semibold">
                          {flavor.name}
                          {line.note ? ` · ${line.note}` : ""}
                        </p>
                        <p className="text-xs text-ink-soft">
                          {line.size} ml · {rupiah(sub)}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <button
                            type="button"
                            className="grid size-7 place-items-center rounded-full bg-cream"
                            onClick={() => updateQty(line.key, line.qty - 1)}
                            aria-label="Kurangi"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-4 text-center font-display text-sm tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            className="grid size-7 place-items-center rounded-full bg-cream"
                            onClick={() => updateQty(line.key, line.qty + 1)}
                            aria-label="Tambah"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="grid size-8 place-items-center text-ink-soft"
                        onClick={() => removeLine(line.key)}
                        aria-label="Hapus"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <p className="flex items-center justify-between font-display text-xl font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{rupiah(total)}</span>
            </p>

            <div className="space-y-3">
              <input
                className="field"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="field"
                placeholder="Nomor WhatsApp"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className="field min-h-20 resize-y"
                placeholder="Alamat pengiriman"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <textarea
                className="field min-h-16 resize-y"
                placeholder="Catatan (opsional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Pembayaran
              </legend>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`rounded-2xl border p-3 text-sm ${
                    pay === "qris" ? "border-berry bg-foam" : "border-transparent bg-foam/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    className="sr-only"
                    checked={pay === "qris"}
                    onChange={() => setPay("qris")}
                  />
                  QRIS
                </label>
                <label
                  className={`rounded-2xl border p-3 text-sm ${
                    pay === "bca" ? "border-berry bg-foam" : "border-transparent bg-foam/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    className="sr-only"
                    checked={pay === "bca"}
                    onChange={() => setPay("bca")}
                  />
                  BCA {BCA_ACCOUNT}
                </label>
              </div>
            </fieldset>

            {pay === "qris" ? (
              <img src="/qris.png" alt="QRIS Moova" className="w-full rounded-2xl" />
            ) : (
              <p className="rounded-2xl bg-foam p-4 text-sm text-ink-soft">
                Transfer {BCA_BANK} <strong className="text-ink">{BCA_ACCOUNT}</strong> lalu
                kirim bukti di WhatsApp.
              </p>
            )}

            {error ? <p className="text-sm text-berry-deep">{error}</p> : null}

            <button
              type="button"
              className="foam-btn h-12 w-full bg-wa px-4 text-wa-ink hover:bg-wa"
              onClick={send}
            >
              <WhatsAppIcon className="size-4" />
              Kirim via WhatsApp
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
