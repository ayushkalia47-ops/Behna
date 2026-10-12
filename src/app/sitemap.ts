import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getProducts } from "@/lib/commerce";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/shop", "/our-story", "/contact", "/shipping-returns", "/privacy", "/terms"];
  const products = await getProducts();
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.handle}` })),
  ];
}
