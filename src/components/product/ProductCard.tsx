import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/commerce";

export function ProductCard({ product, index, priority }: { product: Product; index?: number; priority?: boolean }) {
  const [primary, secondary] = product.images;
  const soon = product.status === "coming-soon";
  const soldOut = product.status === "sold-out";

  return (
    <article className="group">
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-[1.04]"
          />
          {secondary && (
            <Image
              src={secondary.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-700 ease-silk group-hover:opacity-100"
            />
          )}
          {(product.badge || soldOut) && (
            <span
              className={`eyebrow absolute left-3 top-3 px-2.5 py-1.5 text-[9px] md:left-4 md:top-4 ${
                soon || soldOut ? "bg-ink text-ivory" : "bg-ivory text-ink"
              }`}
            >
              {soldOut ? "Sold Out" : product.badge}
            </span>
          )}
          <span className="eyebrow absolute inset-x-0 bottom-0 hidden translate-y-full bg-ivory/95 py-3 text-center text-[10px] transition-transform duration-500 ease-silk group-hover:translate-y-0 md:block">
            {soon ? "Preview the Print" : "Shop Now"}
          </span>
        </div>

        <div className="mt-4">
          {index !== undefined && (
            <span className="eyebrow text-[9px] text-ink/40">{String(index + 1).padStart(2, "0")}</span>
          )}
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-2xl leading-tight md:text-[1.7rem]">{product.name}</h3>
            <p className="text-sm tabular-nums">{formatPrice(product.price)}</p>
          </div>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink/55 md:text-[11px]">{product.style}</p>
        </div>
      </Link>
      <ul className="mt-3 flex items-center gap-2" aria-label={`Available in ${product.colors.map((c) => c.name).join(" and ")}`}>
        {product.colors.map((c) => (
          <li key={c.id}>
            <Link
              href={`/products/${product.handle}?color=${c.id}`}
              title={c.name}
              className="block h-3 w-3 rounded-full ring-1 ring-ink/20 ring-offset-2 ring-offset-ivory transition-shadow hover:ring-ink"
              style={{ backgroundColor: c.swatch }}
            >
              <span className="sr-only">
                {product.name} in {c.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
