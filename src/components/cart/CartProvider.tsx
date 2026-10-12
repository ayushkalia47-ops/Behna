"use client";

/**
 * Client-side shopping bag. Lines persist in localStorage on this device only.
 *
 * SHOPIFY: replace the reducer with Storefront API Cart mutations
 * (cartCreate / cartLinesAdd / cartLinesUpdate / cartLinesRemove), keep the
 * cart id in a cookie, and send shoppers to `cart.checkoutUrl` for checkout.
 * The component API below (addLine, updateQuantity, …) can stay the same.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

export interface CartLine {
  id: string; // handle:color:size — Shopify: the variant (merchandise) id
  handle: string;
  name: string;
  style: string;
  price: number;
  color: { id: string; name: string };
  size: string;
  quantity: number;
  image: { src: string; alt: string };
}

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "quantity"; id: string; quantity: number }
  | { type: "remove"; id: string };

const MAX_QTY = 10;
const STORAGE_KEY = "behna.bag.v1";

function reducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const existing = lines.find((l) => l.id === action.line.id);
      if (existing) {
        return lines.map((l) =>
          l.id === action.line.id ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + action.line.quantity) } : l,
        );
      }
      return [...lines, action.line];
    }
    case "quantity":
      if (action.quantity <= 0) return lines.filter((l) => l.id !== action.id);
      return lines.map((l) => (l.id === action.id ? { ...l, quantity: Math.min(MAX_QTY, action.quantity) } : l));
    case "remove":
      return lines.filter((l) => l.id !== action.id);
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addLine: (line: CartLine) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  maxQuantity: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "hydrate", lines: JSON.parse(saved) });
    } catch {
      /* storage unavailable — start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  const addLine = useCallback((line: CartLine) => {
    dispatch({ type: "add", line });
    setOpen(true);
  }, []);
  const updateQuantity = useCallback((id: string, quantity: number) => dispatch({ type: "quantity", id, quantity }), []);
  const removeLine = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.quantity * l.price, 0),
      ready,
      isOpen,
      open,
      close,
      addLine,
      updateQuantity,
      removeLine,
      maxQuantity: MAX_QTY,
    }),
    [lines, ready, isOpen, open, close, addLine, updateQuantity, removeLine],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
