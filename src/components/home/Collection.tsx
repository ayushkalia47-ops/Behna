import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/commerce";
import { ProductCard } from "@/components/product/ProductCard";

export async function Collection() {
  const products = await getProducts();
  return (
    <section id="collection" aria-labelledby="collection-title" className="scroll-mt-16 bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header data-reveal className="mb-14 grid gap-6 md:mb-24 md:grid-cols-12 md:items-end">
          <p className="eyebrow text-sindoor md:col-span-12">Nº 01 — {products.length} prints, three silhouettes</p>
          <h2 id="collection-title" className="font-serif text-[clamp(3.4rem,10vw,9rem)] leading-[0.88] tracking-[-0.025em] md:col-span-8">
            The Collection
          </h2>
          <div className="flex items-end justify-between gap-6 md:col-span-4 md:flex-col md:items-end md:text-right">
            <p className="font-serif text-xl italic text-ink/75 md:text-2xl">Rooted in South Asian design.</p>
            <Link href="/shop" className="eyebrow link-draw inline-flex shrink-0 items-center gap-2">
              Shop All <ArrowRight size={14} strokeWidth={1.25} />
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-6 md:gap-y-20 lg:grid-cols-4">
          {products.map((p, i) => (
            <div
              key={p.handle}
              data-reveal
              style={{ "--reveal-delay": `${(i % 4) * 90}ms` } as React.CSSProperties}
              className="lg:[&:nth-child(4n+2)]:mt-16 lg:[&:nth-child(4n+4)]:mt-16"
            >
              <ProductCard product={p} index={i} priority={i < 2} />
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center md:mt-28">
          <Link href="/shop" className="eyebrow group inline-flex items-center gap-3 border-b border-ink pb-2">
            Shop All Pieces
            <ArrowRight size={14} strokeWidth={1.25} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
