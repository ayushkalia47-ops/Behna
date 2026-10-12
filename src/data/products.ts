/**
 * BEHNA CATALOG — the one place to edit products.
 *
 * Everything here is SAMPLE content: prices, copy, sizes and the placeholder
 * artwork in /public/assets/products/. Replace before launch.
 *
 * To add real photography: put files in /public/assets/products/<handle>/ and
 * update `images` below. Use 4:5 portrait images (e.g. 1600×2000 JPG/WebP).
 * Tag each image with the `color` id it shows so the gallery follows the
 * selected colorway.
 *
 * Field names mirror Shopify (handle, title-ish name, variants via colors ×
 * sizes, status) so this file can be swapped for Shopify's Storefront API
 * later — see src/lib/commerce.ts.
 */

export type Category = "bikini-sets" | "one-pieces" | "tankinis";
export type ProductStatus = "available" | "coming-soon" | "sold-out";

export interface ProductColor {
  id: string;
  name: string;
  swatch: string; // hex for the swatch dot
}

export interface ProductImage {
  src: string;
  alt: string;
  color?: string; // ProductColor.id this image shows
  width: number;
  height: number;
}

export interface Product {
  handle: string; // URL slug: /products/<handle>
  name: string;
  style: string; // short descriptor under the name
  category: Category;
  price: number; // USD
  status: ProductStatus;
  badge?: string; // small label on the card, e.g. "New"
  colors: ProductColor[];
  sizes: string[];
  images: ProductImage[];
  inspiration: string; // one line on the cultural reference
  description: string;
  details: string[];
  materials: string;
  care: string[];
}

export const categories: Record<Category, { label: string; singular: string }> = {
  "bikini-sets": { label: "Bikini Sets", singular: "Bikini" },
  "one-pieces": { label: "One-Pieces", singular: "One-Piece" },
  tankinis: { label: "Tankinis", singular: "Tankini" },
};

const SIZES = ["XS", "S", "M", "L", "XL"];

const MATERIALS =
  "Sample copy — confirm fabric composition, lining and origin with your manufacturer before launch.";

const CARE = [
  "Rinse in cool fresh water after every wear",
  "Hand wash gently; do not wring",
  "Dry flat in the shade",
  "Keep embellishment away from rough surfaces",
];

const swatch = {
  emerald: { id: "emerald", name: "Emerald", swatch: "#0E4D3A" },
  marigold: { id: "marigold", name: "Marigold", swatch: "#E8901C" },
  sindoor: { id: "sindoor", name: "Sindoor", swatch: "#C7271E" },
  ivory: { id: "ivory", name: "Ivory", swatch: "#F4EBDD" },
  rani: { id: "rani-pink", name: "Rani Pink", swatch: "#C8336B" },
  saffron: { id: "saffron", name: "Saffron", swatch: "#F2A93B" },
  noir: { id: "noir", name: "Noir", swatch: "#1B1410" },
  sand: { id: "sand", name: "Sand", swatch: "#E6D5B8" },
} satisfies Record<string, ProductColor>;

/** Builds the 4 placeholder images for a product: flat + detail per colorway */
function placeholderImages(handle: string, name: string, style: string, colors: ProductColor[]): ProductImage[] {
  return colors.flatMap((c) => [
    {
      src: `/assets/products/${handle}/${handle}-${c.id}-1.svg`,
      alt: `Placeholder illustration of the ${name} ${style.toLowerCase()} in ${c.name}`,
      color: c.id,
      width: 1200,
      height: 1500,
    },
    {
      src: `/assets/products/${handle}/${handle}-${c.id}-2.svg`,
      alt: `Placeholder print detail of ${name} in ${c.name}`,
      color: c.id,
      width: 1200,
      height: 1500,
    },
  ]);
}

const BIKINI_DETAILS = [
  "Triangle top with adjustable neck and back ties",
  "Tie-side bottom, moderate coverage",
  "Lined",
];
const ONEPIECE_DETAILS = ["Plunging neckline with keyhole cut-out", "High-cut leg, moderate coverage", "Lined"];
const TANKINI_DETAILS = ["Cropped tank top with scoop back", "High-waisted bottom, full coverage", "Lined"];

function product(p: Omit<Product, "images" | "sizes" | "materials" | "care"> & { images?: ProductImage[] }): Product {
  return {
    ...p,
    sizes: SIZES,
    materials: MATERIALS,
    care: CARE,
    images: p.images ?? placeholderImages(p.handle, p.name, p.style, p.colors),
  };
}

export const products: Product[] = [
  product({
    handle: "padma",
    name: "Padma",
    style: "String Bikini",
    category: "bikini-sets",
    price: 128,
    status: "available",
    badge: "New",
    colors: [swatch.emerald, swatch.marigold],
    inspiration: "Padma — the lotus, rising clean out of still water.",
    description:
      "A string triangle bikini scattered with lotus buds and finished with gold-toned ties you can wear high, low, or however the day calls for.",
    details: BIKINI_DETAILS,
  }),
  product({
    handle: "gulabi",
    name: "Gulabi",
    style: "Keyhole One-Piece",
    category: "one-pieces",
    price: 148,
    status: "available",
    colors: [swatch.rani, swatch.sindoor],
    inspiration: "Gulabi — rosy, the color of Jaipur at dusk.",
    description:
      "A plunging one-piece with a keyhole cut-out, printed with a jaali lattice borrowed from the carved stone windows of the Pink City.",
    details: ONEPIECE_DETAILS,
  }),
  product({
    handle: "sindoor",
    name: "Sindoor",
    style: "String Bikini",
    category: "bikini-sets",
    price: 132,
    status: "available",
    colors: [swatch.sindoor, swatch.ivory],
    inspiration: "Sindoor — vermilion, the red that means everything.",
    description:
      "Our boldest red, dotted in bandhani — the tie-dye of Rajasthan and Gujarat. In sindoor, or bridal ivory for the girls who never wear white.",
    details: BIKINI_DETAILS,
  }),
  product({
    handle: "kashmir",
    name: "Kashmir",
    style: "Keyhole One-Piece",
    category: "one-pieces",
    price: 145,
    status: "available",
    colors: [swatch.emerald, swatch.saffron],
    inspiration: "Kashmir — home of the buta, the paisley that travelled the world.",
    description:
      "The paisley left Kashmiri shawls centuries ago and never came back. We brought it home, wrapped around a sculpted one-piece in emerald and marigold.",
    details: ONEPIECE_DETAILS,
  }),
  product({
    handle: "shisha",
    name: "Shisha",
    style: "String Bikini",
    category: "bikini-sets",
    price: 138,
    status: "coming-soon",
    badge: "Coming Soon",
    colors: [swatch.noir, swatch.emerald],
    inspiration: "Shisha — mirror work, stitched into cloth to catch the light.",
    description:
      "Inspired by the mirror work of Gujarat and Rajasthan, made for the hour before sunset when everything glints. A string bikini that sparkles back.",
    details: BIKINI_DETAILS,
  }),
  product({
    handle: "jharoka",
    name: "Jharoka",
    style: "Scoop Tankini",
    category: "tankinis",
    price: 142,
    status: "available",
    colors: [swatch.marigold, swatch.sand],
    inspiration: "Jharokha — the arched palace window, made for watching unseen.",
    description:
      "Rajasthan's jharokhas were built for seeing the world without being seen. This tankini, printed in rows of arches, does the opposite.",
    details: TANKINI_DETAILS,
  }),
  product({
    handle: "chintz",
    name: "Chintz",
    style: "String Bikini",
    category: "bikini-sets",
    price: 124,
    status: "available",
    colors: [swatch.ivory, swatch.emerald],
    inspiration: "Chintz — block-printed calico from the Indian coast.",
    description:
      "Chintz began as hand block-printed cotton from India before Europe made it its own. We're taking it back, in ripe florals on ivory or emerald.",
    details: BIKINI_DETAILS,
  }),
  product({
    handle: "bagh",
    name: "Bagh",
    style: "Scoop Tankini",
    category: "tankinis",
    price: 140,
    status: "coming-soon",
    badge: "Coming Soon",
    colors: [swatch.saffron, swatch.sindoor],
    inspiration: "Bagh — 'garden', the phulkari of Punjab, stitched until the cloth disappears.",
    description:
      "Named for the densest phulkari of all, where embroidery covers every inch. A tankini in geometric blooms of saffron and sindoor.",
    details: TANKINI_DETAILS,
  }),
];
