/**
 * Site-wide settings. Edit this file to change copy, links and the hero film.
 */
export const site = {
  name: "Behna Bikinis",
  shortName: "Behna",
  tagline: "Sisterhood, in full color.",
  description:
    "Behna is South Asian–inspired swimwear: the colors, prints and embellishment of home, cut for sun-soaked days and late nights.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // PLACEHOLDERS — confirm your real handle and inbox before launch
  instagram: "https://www.instagram.com/behnabikinis",
  email: "hello@behnabikinis.com",
  currency: "USD",
  locale: "en-US",

  /**
   * Show small "placeholder" captions on temporary artwork and the hero film.
   * Set to false once real photography and footage are in place.
   */
  showPlaceholderNotes: true,
} as const;

/**
 * HERO FILM
 * Drop your campaign footage into /public/assets/video/ using these file names
 * (or change the paths here). Keep files muted, 8–20s, H.264 MP4, < 8 MB.
 * The poster shows instantly and is used when video can't play.
 */
export const hero = {
  video: {
    desktop: "/assets/video/hero-desktop.mp4", // 16:9, 1920×1080
    mobile: "/assets/video/hero-mobile.mp4", // 9:16, 1080×1920
  },
  poster: {
    desktop: "/assets/video/hero-poster-desktop.jpg",
    mobile: "/assets/video/hero-poster-mobile.jpg",
  },
  eyebrow: "Collection Nº 01",
  headline: ["Heirloom color,", "cut for the sun."],
  cta: { label: "Shop the Collection", href: "/shop" },
  /** Shown only while showPlaceholderNotes is true */
  placeholderNote: "Placeholder film — replace /public/assets/video/hero-*.mp4",
};

export const nav = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  shop: [
    { label: "Shop All", href: "/shop" },
    { label: "Bikini Sets", href: "/shop?category=bikini-sets" },
    { label: "One-Pieces", href: "/shop?category=one-pieces" },
    { label: "Tankinis", href: "/shop?category=tankinis" },
  ],
  house: [
    { label: "Our Story", href: "/our-story" },
    { label: "Contact", href: "/contact" },
    { label: "Instagram", href: site.instagram, external: true },
  ],
  help: [
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
