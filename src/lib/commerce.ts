/**
 * Commerce data access. Every page reads products through these functions —
 * never from the data file directly — so connecting Shopify means changing
 * only this file: replace the bodies with Storefront API queries
 * (products, productByHandle, productRecommendations) and map the response
 * onto the `Product` type.
 */
import { products, type Category, type Product } from "@/data/products";
import { site } from "@/config/site";

export async function getProducts(opts: { category?: Category } = {}): Promise<Product[]> {
  return opts.category ? products.filter((p) => p.category === opts.category) : products;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  return products.find((p) => p.handle === handle);
}

export async function getRelatedProducts(handle: string, limit = 4): Promise<Product[]> {
  const current = products.find((p) => p.handle === handle);
  const others = products.filter((p) => p.handle !== handle);
  // Same category first, then the rest of the collection
  others.sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category));
  return others.slice(0, limit);
}

const formatter = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(amount: number): string {
  return formatter.format(amount);
}
