import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getRelatedProducts } from "@/lib/commerce";
import { ProductView } from "@/components/product/ProductView";
import { ProductCard } from "@/components/product/ProductCard";
import { site } from "@/config/site";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ color?: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  const title = `${product.name} ${product.style}`;
  return {
    title,
    description: `${product.inspiration} ${product.description}`,
    alternates: { canonical: `/products/${product.handle}` },
    // Social cards use the site default image until real (JPG/PNG) product photography is added:
    // openGraph: { images: [product.images[0].src] },
    openGraph: { title: `${title} — ${site.name}`, description: product.description, type: "website" },
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const { color } = await searchParams;
  const product = await getProduct(handle);
  if (!product) notFound();
  const related = await getRelatedProducts(handle);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${product.style}`,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    color: product.colors.map((c) => c.name).join(", "),
    // Add `offers` (price, availability) once real checkout is live.
  };

  return (
    <div className="pt-18 md:pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ProductView product={product} initialColor={color} />

      <section aria-labelledby="related-title" className="mx-auto mt-28 max-w-[1600px] px-5 pb-28 md:mt-40 md:px-10 md:pb-36">
        <div className="mb-10 flex items-end justify-between md:mb-14">
          <h2 id="related-title" className="font-serif text-4xl leading-none md:text-6xl">
            More from <em>the Collection</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {related.map((p) => (
            <div key={p.handle} data-reveal>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
