import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type FlavorId,
  type SizeId,
  flavorById,
  priceOf,
} from "./catalog";

export type CartLine = {
  key: string;
  flavorId: FlavorId;
  size: SizeId;
  qty: number;
  note: string;
};

type ShopState = {
  flavorId: FlavorId;
  size: SizeId;
  qty: number;
  customNote: string;
  drawerOpen: boolean;
  cart: CartLine[];
  setFlavor: (id: FlavorId) => void;
  cycleFlavor: (dir: 1 | -1) => void;
  setSize: (size: SizeId) => void;
  setQty: (qty: number) => void;
  setCustomNote: (note: string) => void;
  setDrawerOpen: (open: boolean) => void;
  addCurrent: () => boolean;
  addLine: (flavorId: FlavorId, size: SizeId, qty?: number, note?: string) => boolean;
  updateQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
};

const FLAVOR_ORDER: FlavorId[] = [
  "strawberry",
  "coklat",
  "matcha",
  "murni",
  "lainnya",
];

function lineKey(flavorId: FlavorId, size: SizeId, note: string) {
  return `${flavorId}-${size}-${note.trim().toLowerCase()}`;
}

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      flavorId: "strawberry",
      size: "250",
      qty: 1,
      customNote: "",
      drawerOpen: false,
      cart: [],
      setFlavor: (id) => set({ flavorId: id }),
      cycleFlavor: (dir) => {
        const current = get().flavorId;
        const index = FLAVOR_ORDER.indexOf(current);
        const next = FLAVOR_ORDER[(index + dir + FLAVOR_ORDER.length) % FLAVOR_ORDER.length];
        set({ flavorId: next });
      },
      setSize: (size) => set({ size }),
      setQty: (qty) => set({ qty: Math.max(1, Math.min(20, qty)) }),
      setCustomNote: (customNote) => set({ customNote }),
      setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
      addCurrent: () => {
        const { flavorId, size, qty, customNote } = get();
        return get().addLine(flavorId, size, qty, customNote);
      },
      addLine: (flavorId, size, qty = 1, note = "") => {
        const flavor = flavorById(flavorId);
        const trimmed = note.trim();
        if (flavor.custom && !trimmed) return false;
        const key = lineKey(flavorId, size, flavor.custom ? trimmed : "");
        const storedNote = flavor.custom ? trimmed : "";
        set((state) => {
          const existing = state.cart.find((line) => line.key === key);
          if (existing) {
            return {
              cart: state.cart.map((line) =>
                line.key === key ? { ...line, qty: Math.min(20, line.qty + qty) } : line,
              ),
              drawerOpen: true,
            };
          }
          return {
            cart: [...state.cart, { key, flavorId, size, qty, note: storedNote }],
            drawerOpen: true,
          };
        });
        return true;
      },
      updateQty: (key, qty) =>
        set((state) => ({
          cart:
            qty < 1
              ? state.cart.filter((line) => line.key !== key)
              : state.cart.map((line) =>
                  line.key === key ? { ...line, qty: Math.min(20, qty) } : line,
                ),
        })),
      removeLine: (key) =>
        set((state) => ({ cart: state.cart.filter((line) => line.key !== key) })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "moova-shop",
      partialize: (state) => ({
        cart: state.cart,
      }),
    },
  ),
);

export function cartCount(cart: CartLine[]) {
  return cart.reduce((sum, line) => sum + line.qty, 0);
}

export function cartTotal(cart: CartLine[]) {
  return cart.reduce((sum, line) => {
    const flavor = flavorById(line.flavorId);
    return sum + priceOf(flavor, line.size) * line.qty;
  }, 0);
}
