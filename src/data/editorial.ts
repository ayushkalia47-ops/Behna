/**
 * Homepage editorial + category imagery. All PLACEHOLDERS — replace `src` with
 * real campaign photography in /public/assets/editorial/ and /categories/.
 */

export const editorial = {
  campaign: {
    src: "/assets/editorial/campaign-arch.svg",
    alt: "Placeholder campaign image: a sandstone arch framing a sunset over an emerald pool",
    width: 1200,
    height: 1600,
  },
  mirror: {
    src: "/assets/editorial/detail-shisha.svg",
    alt: "Placeholder detail: mirror work stitched on sindoor-red fabric",
    width: 1000,
    height: 1000,
  },
  lifestyle: {
    src: "/assets/editorial/lifestyle-pool.svg",
    alt: "Placeholder lifestyle image: emerald pool tiles and a striped towel in afternoon shade",
    width: 1600,
    height: 1067,
  },
  trim: {
    src: "/assets/editorial/detail-trim.svg",
    alt: "Placeholder detail: gold gota trim across phulkari-style embroidery",
    width: 1000,
    height: 1250,
  },
  story: {
    src: "/assets/editorial/story-sisters.svg",
    alt: "Placeholder story image: three arches in emerald, marigold and ivory on sindoor red",
    width: 1600,
    height: 1000,
  },
};

export const categoryTiles = [
  {
    category: "bikini-sets",
    title: "The Bikini Sets",
    note: "Strings, triangles, ties",
    image: { src: "/assets/categories/bikini-sets.svg", alt: "Placeholder: Padma bikini on marigold" },
  },
  {
    category: "one-pieces",
    title: "The One-Pieces",
    note: "Plunge, keyhole, high leg",
    image: { src: "/assets/categories/one-pieces.svg", alt: "Placeholder: Kashmir one-piece on sindoor red" },
  },
  {
    category: "tankinis",
    title: "The Tankinis",
    note: "Cover where you want it",
    image: { src: "/assets/categories/tankinis.svg", alt: "Placeholder: Bagh tankini on emerald" },
  },
] as const;
