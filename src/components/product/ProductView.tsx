"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, Ruler } from "lucide-react";
import type { Product } from "@/data/products";
import { categories } from "@/data/products";
import { formatPrice } from "@/lib/commerce";
import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { buttonClass } from "@/components/ui/Button";
import { SizeGuide } from "./SizeGuide";

function Accordion({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-b border-ink/15">
      <summary className="eyebrow flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden className="text-lg font-light transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-6 text-sm leading-relaxed text-ink/75">{children}</div>
    </details>
  );
}

export function ProductView({ product, initialColor }: { product: Product; initialColor?: string }) {
  const { addLine, maxQuantity } = useCart();
  const [colorId, setColorId] = useState(
    product.colors.some((c) => c.id === initialColor) ? initialColor! : product.colors[0].id,
  );
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const sizeGroup = useRef<HTMLFieldSetElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const color = product.colors.find((c) => c.id === colorId)!;
  const available = product.status === "available";

  // Selected colorway's images first, then the rest
  const images = useMemo(
    () => [
      ...product.images.filter((i) => i.color === colorId),
      ...product.images.filter((i) => i.color !== colorId),
    ],
    [product.images, colorId],
  );

  function chooseColor(id: string) {
    setColorId(id);
    setSlide(0);
    scroller.current?.scrollTo({ left: 0, behavior: "smooth" });
    const url = new URL(window.location.href);
    url.searchParams.set("color", id);
    window.history.replaceState(null, "", url);
  }

  function addToBag() {
    if (!size) {
      setSizeError(true);
      sizeGroup.current?.querySelector("input")?.focus();
      return;
    }
    addLine({
      id: `${product.handle}:${colorId}:${size}`,
      handle: product.handle,
      name: product.name,
      style: product.style,
      price: product.price,
      color: { id: color.id, name: color.name },
      size,
      quantity: qty,
      image: { src: images[0].src, alt: images[0].alt },
    });
  }

  return (
    <div className="mx-auto max-w-[1600px] md:px-10">
      <div className="md:grid md:grid-cols-12 md:gap-12 lg:gap-16">
        {/* Gallery — swipeable on mobile, 2-up grid on desktop */}
        <section aria-label={`${product.name} images`} className="md:col-span-7">
          <div
            ref={scroller}
            onScroll={(e) => {
              const el = e.currentTarget;
              setSlide(Math.round(el.scrollLeft / el.clientWidth));
            }}
            className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-2 md:overflow-visible"
          >
            {images.map((img, i) => (
              <div key={img.src} className="relative aspect-[4/5] w-full shrink-0 snap-center bg-sand md:w-auto">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 py-4 md:hidden" aria-hidden>
            {images.map((img, i) => (
              <span key={img.src} className={`h-px w-6 transition-colors ${i === slide ? "bg-ink" : "bg-ink/20"}`} />
            ))}
          </div>
        </section>

        {/* Details */}
        <section aria-labelledby="product-title" className="px-5 pt-4 md:col-span-5 md:px-0 md:pt-0">
          <div className="md:sticky md:top-28">
            <nav aria-label="Breadcrumb" className="eyebrow text-[10px] text-ink/50">
              <Link href="/shop" className="link-draw">Shop</Link>
              <span className="mx-2">/</span>
              <Link href={`/shop?category=${product.category}`} className="link-draw">
                {categories[product.category].label}
              </Link>
            </nav>

            <div className="mt-6 flex items-baseline justify-between gap-4">
              <h1 id="product-title" className="font-serif text-6xl leading-none tracking-[-0.02em] md:text-7xl">
                {product.name}
              </h1>
              <p className="text-lg tabular-nums">{formatPrice(product.price)}</p>
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-ink/60">{product.style}</p>

            <p className="mt-8 font-serif text-xl italic leading-snug text-sindoor">{product.inspiration}</p>
            <p className="mt-4 leading-relaxed text-ink/80">{product.description}</p>

            {/* Color */}
            <fieldset className="mt-10">
              <legend className="eyebrow">
                Color <span className="text-ink/50">— {color.name}</span>
              </legend>
              <div className="mt-4 flex gap-3">
                {product.colors.map((c) => (
                  <label key={c.id} className="cursor-pointer" title={c.name}>
                    <input
                      type="radio"
                      name="color"
                      value={c.id}
                      checked={c.id === colorId}
                      onChange={() => chooseColor(c.id)}
                      className="peer sr-only"
                    />
                    <span
                      className="block h-8 w-8 rounded-full ring-1 ring-ink/20 ring-offset-[3px] ring-offset-ivory transition-shadow peer-checked:ring-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-marigold"
                      style={{ backgroundColor: c.swatch }}
                    />
                    <span className="sr-only">{c.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Size */}
            <fieldset ref={sizeGroup} className="mt-8" aria-describedby={sizeError ? "size-error" : undefined}>
              <legend className="sr-only">Size</legend>
              <div className="flex items-center justify-between">
                <span aria-hidden className="eyebrow">
                  Size {size && <span className="text-ink/50">— {size}</span>}
                </span>
                <button
                  type="button"
                  onClick={() => setGuideOpen(true)}
                  className="eyebrow link-draw flex items-center gap-2 text-[10px] text-ink/70"
                >
                  <Ruler size={14} strokeWidth={1.25} /> Size Guide
                </button>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <label key={s} className="cursor-pointer">
                    <input
                      type="radio"
                      name="size"
                      value={s}
                      checked={size === s}
                      onChange={() => {
                        setSize(s);
                        setSizeError(false);
                      }}
                      className="peer sr-only"
                    />
                    <span className="grid h-12 place-items-center border border-ink/20 text-sm transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-marigold">
                      {s}
                    </span>
                  </label>
                ))}
              </div>
              {sizeError && (
                <p id="size-error" role="alert" className="mt-3 text-sm text-sindoor">
                  Please choose a size.
                </p>
              )}
            </fieldset>

            {/* Add to bag */}
            <div className="mt-8 flex gap-3">
              {available ? (
                <>
                  <QuantityStepper label="Quantity" value={qty} min={1} max={maxQuantity} onChange={setQty} />
                  <button type="button" onClick={addToBag} className={buttonClass("ink", "flex-1")}>
                    Add to Bag — {formatPrice(product.price * qty)}
                  </button>
                </>
              ) : (
                <div className="flex-1">
                  <button type="button" disabled className={buttonClass("ink", "w-full")}>
                    {product.status === "sold-out" ? "Sold Out" : "Coming Soon"}
                  </button>
                  <Link href="/#waitlist" className="eyebrow link-draw mt-4 inline-flex items-center gap-2 text-[10px]">
                    Join the waitlist to hear first <ArrowRight size={12} strokeWidth={1.25} />
                  </Link>
                </div>
              )}
            </div>
            <p className="mt-4 text-xs text-ink/55">
              Preview store: your bag works, but checkout isn&rsquo;t connected yet — no orders or payments are taken.
            </p>

            <div className="mt-10 border-t border-ink/15">
              <Accordion title="Details" defaultOpen>
                <ul className="list-inside list-[square] space-y-1 marker:text-gold">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Materials & Care">
                <p>{product.materials}</p>
                <ul className="mt-3 list-inside list-[square] space-y-1 marker:text-gold">
                  {product.care.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p>
                  Shipping rates, delivery times and our returns policy will be confirmed before launch, and
                  shipping and taxes will be calculated at checkout.
                </p>
                <Link href="/shipping-returns" className="mt-3 inline-block underline underline-offset-2">
                  Shipping &amp; Returns
                </Link>
              </Accordion>
            </div>
          </div>
        </section>
      </div>
      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
