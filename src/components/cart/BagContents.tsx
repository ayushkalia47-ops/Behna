"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { buttonClass } from "@/components/ui/Button";
import { formatPrice } from "@/lib/commerce";

/** Shared by the slide-out drawer and the /bag page */
export function BagContents({ onNavigate, variant = "drawer" }: { onNavigate?: () => void; variant?: "drawer" | "page" }) {
  const { lines, subtotal, updateQuantity, removeLine, maxQuantity, ready } = useCart();

  if (!ready) return <div className="flex-1" />;

  if (lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6 py-16 md:px-8">
        <p className="font-serif text-4xl leading-tight">
          Your bag is <em>empty</em>.
        </p>
        <p className="max-w-xs text-sm text-ink/70">Eight prints, three silhouettes. Start with the one that scares you a little.</p>
        <Link href="/shop" onClick={onNavigate} className={buttonClass("ink")}>
          Shop the Collection
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className={`flex-1 divide-y divide-ink/10 overflow-y-auto ${variant === "drawer" ? "px-6 md:px-8" : ""}`}>
        {lines.map((line) => (
          <li key={line.id} className="flex gap-5 py-6">
            <Link
              href={`/products/${line.handle}?color=${line.color.id}`}
              onClick={onNavigate}
              className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-sand"
            >
              <Image src={line.image.src} alt={line.image.alt} fill sizes="96px" className="object-cover" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <Link href={`/products/${line.handle}`} onClick={onNavigate} className="font-serif text-xl link-draw">
                  {line.name}
                </Link>
                <span className="text-sm tabular-nums">{formatPrice(line.price * line.quantity)}</span>
              </div>
              <p className="mt-1 text-xs text-ink/65">
                {line.style} · {line.color.name} · {line.size}
              </p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <QuantityStepper
                  size="sm"
                  label={`Quantity of ${line.name}`}
                  value={line.quantity}
                  min={1}
                  max={maxQuantity}
                  onChange={(n) => updateQuantity(line.id, n)}
                />
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="eyebrow text-[10px] text-ink/60 link-draw hover:text-sindoor"
                  aria-label={`Remove ${line.name} (${line.color.name}, ${line.size}) from bag`}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={`border-t border-ink/15 py-6 ${variant === "drawer" ? "px-6 md:px-8" : ""}`}>
        <div className="flex items-baseline justify-between">
          <span className="eyebrow">Subtotal</span>
          <span className="font-serif text-2xl tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-ink/60">Shipping and taxes are calculated at checkout.</p>
        {/* SHOPIFY: replace with <a href={cart.checkoutUrl}> once the Storefront Cart API is connected */}
        <button type="button" disabled className={buttonClass("ink", "mt-6 w-full")}>
          Checkout opens at launch
        </button>
        <p className="mt-3 text-xs leading-relaxed text-ink/60">
          This is a preview store. Checkout isn&rsquo;t connected yet, so no orders are placed and no payments are
          taken. <Link href="/#waitlist" onClick={onNavigate} className="underline underline-offset-2">Join the waitlist</Link>{" "}
          to hear when it opens.
        </p>
      </div>
    </>
  );
}
