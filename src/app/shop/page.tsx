import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/commerce";
import { categories, type Category } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Shop the Collection",
  description: "Bikini sets, one-pieces and tankinis in prints drawn from South Asian textiles, color and craft.",
  alternates: { canonical: "/shop" },
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function ShopPage({ searchParams }: Props) {
  const { category: raw } = await searchParams;
  const category = raw && raw in categories ? (raw as Category) : undefined;
  const products = await getProducts({ category });

  const filters: { label: string; href: string; active: boolean }[] = [
    { label: "All", href: "/shop", active: !category },
    ...(Object.keys(categories) as Category[]).map((c) => ({
      label: categories[c].label,
      href: `/shop?category=${c}`,
      active: category === c,
    })),
  ];

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pb-40 md:pt-44">
      <header className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="eyebrow text-sindoor">Collection Nº 01</p>
          <h1 className="mt-4 font-serif text-[clamp(3.2rem,9vw,8rem)] leading-[0.9] tracking-[-0.025em]">
            {category ? categories[category].label : <>Shop <em>All</em></>}
          </h1>
        </div>
        <p className="text-ink/70 md:col-span-4 md:text-right">
          {products.length} {products.length === 1 ? "piece" : "pieces"}. Prints drawn from lotus ponds, palace
          windows, wedding reds and grandmothers&rsquo; wardrobes.
        </p>
      </header>

      <nav aria-label="Filter by category" className="mt-12 border-y border-ink/15 md:mt-16">
        <ul className="-mx-5 flex gap-8 overflow-x-auto px-5 py-5 [scrollbar-width:none] md:mx-0 md:px-0">
          {filters.map((f) => (
            <li key={f.href} className="shrink-0">
              <Link
                href={f.href}
                scroll={false}
                aria-current={f.active ? "page" : undefined}
                className={`eyebrow link-draw ${f.active ? "bg-[length:100%_1px] text-ink" : "text-ink/55 hover:text-ink"}`}
              >
                {f.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-14 md:mt-16 md:gap-x-6 md:gap-y-20 lg:grid-cols-4">
        {products.map((p, i) => (
          <div key={p.handle} data-reveal style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}>
            <ProductCard product={p} index={i} priority={i < 4} />
          </div>
        ))}
      </div>
    </div>
  );
}
