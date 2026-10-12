// Generates the PLACEHOLDER artwork in public/assets/{products,editorial,categories}.
// Every image is clearly labelled "PLACEHOLDER" with a note describing the real
// photograph that should replace it. Run with:  npm run placeholders
//
// These are stand-ins only. Swap each SVG for real photography (JPG/WebP) and update
// the path in src/data/products.ts or src/data/editorial.ts.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets");

const C = {
  emerald: "#0E4D3A",
  emeraldDeep: "#0A3A2C",
  sindoor: "#C7271E",
  marigold: "#E8901C",
  saffron: "#F2A93B",
  rani: "#C8336B",
  blush: "#F2C6CF",
  ivory: "#F7F1E5",
  cream: "#F0E3CC",
  sand: "#E6D5B8",
  gold: "#B8913A",
  ink: "#1B1410",
  mirror: "#E7E3DC",
};

// ---------------------------------------------------------------- motifs ---

const motifs = {
  // Padma — lotus
  lotus: ({ base, a, b }) => {
    const lotus = (x, y) => `
      <g transform="translate(${x} ${y})">
        <path d="M0 -34 C12 -18 12 0 0 12 C-12 0 -12 -18 0 -34Z" fill="${a}"/>
        <path d="M0 -34 C12 -18 12 0 0 12 C-12 0 -12 -18 0 -34Z" fill="${a}" opacity=".85" transform="rotate(-52 0 12) scale(.82)"/>
        <path d="M0 -34 C12 -18 12 0 0 12 C-12 0 -12 -18 0 -34Z" fill="${a}" opacity=".85" transform="rotate(52 0 12) scale(.82)"/>
        <path d="M-22 16 Q0 26 22 16" stroke="${b}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>`;
    return { size: 140, body: `<rect width="140" height="140" fill="${base}"/>${lotus(35, 40)}${lotus(105, 110)}<circle cx="105" cy="35" r="3" fill="${b}"/><circle cx="35" cy="105" r="3" fill="${b}"/>` };
  },
  // Gulabi — Jaipur jaali lattice
  jaali: ({ base, a, b }) => ({
    size: 80,
    body: `<rect width="80" height="80" fill="${base}"/>
      ${[[0, 0], [80, 0], [0, 80], [80, 80], [40, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="40" fill="none" stroke="${a}" stroke-width="2.2"/>`).join("")}
      <circle cx="40" cy="0" r="4" fill="${b}"/><circle cx="0" cy="40" r="4" fill="${b}"/><circle cx="40" cy="80" r="4" fill="${b}"/><circle cx="80" cy="40" r="4" fill="${b}"/>`,
  }),
  // Sindoor — bandhani tie-dye dots
  bandhani: ({ base, a, b }) => {
    const cluster = (x, y) => `<g transform="translate(${x} ${y})" fill="${a}">
      <circle cx="0" cy="-7" r="3.2"/><circle cx="7" cy="0" r="3.2"/><circle cx="0" cy="7" r="3.2"/><circle cx="-7" cy="0" r="3.2"/>
      <circle r="2.2" fill="${b}"/></g>`;
    return { size: 64, body: `<rect width="64" height="64" fill="${base}"/>${cluster(16, 16)}${cluster(48, 48)}<circle cx="48" cy="16" r="2" fill="${a}" opacity=".7"/><circle cx="16" cy="48" r="2" fill="${a}" opacity=".7"/>` };
  },
  // Kashmir — paisley buta
  paisley: ({ base, a, b }) => {
    const buta = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})">
      <path d="M0 30 C-24 30 -28 0 -12 -18 C-2 -28 14 -34 10 -48 C30 -30 26 10 0 30Z" fill="${a}"/>
      <path d="M0 18 C-12 18 -15 2 -6 -8 C0 -14 7 -18 6 -26 C16 -16 14 6 0 18Z" fill="${base}"/>
      <circle cx="-1" cy="4" r="4" fill="${b}"/></g>`;
    return { size: 150, body: `<rect width="150" height="150" fill="${base}"/>${buta(40, 50, -10)}${buta(112, 118, 170)}<circle cx="115" cy="36" r="2.5" fill="${b}"/><circle cx="36" cy="118" r="2.5" fill="${b}"/>` };
  },
  // Shisha — mirror work
  shisha: ({ base, a, b }) => {
    const m = (x, y, r) => `<g transform="translate(${x} ${y})">
      <circle r="${r + 7}" fill="none" stroke="${a}" stroke-width="3" stroke-dasharray="3 3"/>
      <circle r="${r}" fill="url(#mirror)"/>
      ${Array.from({ length: 8 }, (_, i) => `<path d="M0 ${-(r + 10)} l-4 -8 l8 0z" fill="${b}" transform="rotate(${i * 45})"/>`).join("")}
    </g>`;
    return { size: 110, body: `<rect width="110" height="110" fill="${base}"/>${m(27, 27, 13)}${m(82, 82, 13)}<circle cx="82" cy="27" r="3" fill="${a}"/><circle cx="27" cy="82" r="3" fill="${a}"/>` };
  },
  // Jharoka — arched windows
  arches: ({ base, a, b }) => ({
    size: 84,
    body: `<rect width="84" height="104" fill="${base}"/>
      <path d="M12 104 L12 50 Q12 22 42 10 Q72 22 72 50 L72 104" fill="${b}" fill-opacity=".25" stroke="${a}" stroke-width="2.5"/>
      <path d="M24 104 L24 56 Q24 36 42 27 Q60 36 60 56 L60 104" fill="none" stroke="${a}" stroke-width="1.5"/>
      <circle cx="42" cy="4" r="2.5" fill="${a}"/>`,
    height: 104,
  }),
  // Chintz — block-printed florals
  chintz: ({ base, a, b }) => {
    const flower = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-4 6 Q-20 22 -30 18 Q-24 4 -4 6Z" fill="${b}"/><path d="M4 6 Q22 20 30 12 Q22 0 4 6Z" fill="${b}"/>
      ${Array.from({ length: 5 }, (_, i) => `<ellipse cx="0" cy="-11" rx="7" ry="11" fill="${a}" transform="rotate(${i * 72})"/>`).join("")}
      <circle r="5" fill="${base}"/><circle r="2.5" fill="${b}"/></g>`;
    return { size: 150, body: `<rect width="150" height="150" fill="${base}"/>${flower(40, 42, 1)}${flower(112, 112, 0.85)}<circle cx="112" cy="38" r="3" fill="${a}"/><circle cx="126" cy="50" r="2" fill="${b}"/><circle cx="34" cy="116" r="3" fill="${a}"/>` };
  },
  // Bagh — phulkari geometric embroidery
  phulkari: ({ base, a, b }) => ({
    size: 80,
    body: `<rect width="80" height="80" fill="${base}"/>
      <path d="M40 8 L72 40 L40 72 L8 40Z" fill="${a}"/>
      <path d="M40 22 L58 40 L40 58 L22 40Z" fill="${b}"/>
      <path d="M40 32 L48 40 L40 48 L32 40Z" fill="${base}"/>
      ${[[0, 0], [80, 0], [0, 80], [80, 80]].map(([x, y]) => `<path d="M${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8} L${x - 8} ${y}Z" fill="${b}"/>`).join("")}
      ${Array.from({ length: 7 }, (_, i) => `<line x1="${18 + i * 3}" y1="${40 - (22 - i * 3)}" x2="${18 + i * 3}" y2="${40 + (22 - i * 3)}" stroke="${base}" stroke-opacity=".18" stroke-width="1"/>`).join("")}`,
  }),
};

function patternDef(id, motif, colors, scale = 1) {
  const m = motifs[motif](colors);
  const h = m.height ?? m.size;
  return `<pattern id="${id}" width="${m.size}" height="${h}" patternUnits="userSpaceOnUse" patternTransform="scale(${scale})">${m.body}</pattern>`;
}

// --------------------------------------------------------------- helpers ---

const defsCommon = `
  <radialGradient id="mirror" cx="35%" cy="35%" r="75%">
    <stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="${C.mirror}"/><stop offset="1" stop-color="#8E8A84"/>
  </radialGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="lift" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="12" dy="22" stdDeviation="16" flood-color="#1B1410" flood-opacity=".28"/>
  </filter>
  <linearGradient id="sun" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#FFFFFF" stop-opacity=".22"/><stop offset=".55" stop-color="#FFFFFF" stop-opacity="0"/>
    <stop offset="1" stop-color="#000000" stop-opacity=".12"/>
  </linearGradient>`;

// Palm frond shadow, the visual shorthand for "shot outdoors at golden hour"
function palm(x, y, rot, s = 1, opacity = 0.13) {
  const leaflets = Array.from({ length: 16 }, (_, i) => {
    const t = i / 15;
    const px = 40 + t * 620;
    const py = -Math.sin(t * Math.PI * 0.9) * 60;
    const len = 150 * Math.sin(Math.PI * (0.15 + t * 0.8)) + 40;
    return `<ellipse cx="${px}" cy="${py - len / 2}" rx="13" ry="${len / 2}" transform="rotate(${-35 + t * 20} ${px} ${py})"/>
            <ellipse cx="${px}" cy="${py + len / 2}" rx="13" ry="${len / 2}" transform="rotate(${35 - t * 20} ${px} ${py})"/>`;
  }).join("");
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" fill="#1B1410" opacity="${opacity}" filter="url(#soft)">
    <path d="M0 0 Q340 -80 680 -10" stroke="#1B1410" stroke-width="10" fill="none"/>${leaflets}</g>`;
}

function label(w, h, title, note, dark, top = false) {
  const fg = dark ? "#F7F1E5" : "#1B1410";
  const fs = Math.round(w / 52);
  const y1 = top ? fs * 2.6 : h - fs * 3.1;
  const y2 = top ? fs * 4.1 : h - fs * 1.6;
  return `<g font-family="ui-monospace, Menlo, monospace" fill="${fg}" opacity=".62">
    <text x="${fs * 1.6}" y="${y1}" font-size="${fs}" letter-spacing="${fs * 0.12}">PLACEHOLDER — ${title}</text>
    <text x="${fs * 1.6}" y="${y2}" font-size="${fs * 0.82}" opacity=".85">${note}</text>
  </g>`;
}

function isDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v * (1 + amt))));
  const [r, g, b] = [f((n >> 16) & 255), f((n >> 8) & 255), f(n & 255)];
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function write(rel, svg) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.replace(/\n\s+/g, "\n"));
}

// ------------------------------------------------------------- garments ---

const half = (d) => `<path d="${d}"/><path d="${d}" transform="translate(1200 0) scale(-1 1)"/>`;

const garments = {
  bikini: (fill, trim, edge) => `
    <g filter="url(#lift)">
      <g fill="none" stroke="${trim}" stroke-width="7" stroke-linecap="round">
        ${half("M540 412 Q556 320 598 236")}
        <path d="M598 236 q-12 44 -34 76 M602 236 q14 46 38 66"/>
        ${half("M388 640 Q270 656 168 606")}
        ${half("M362 832 Q296 842 236 896")}
      </g>
      <g fill="${trim}">${half("M168 606 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0")}${half("M236 896 m-11 0 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0")}</g>
      <g fill="${fill}" stroke="${edge}" stroke-width="3">
        ${half("M598 642 C540 652 452 654 386 642 C430 560 492 470 540 410 C566 470 590 560 598 642Z")}
        <path d="M360 830 C480 850 720 850 840 830 C820 900 760 962 700 1012 C660 1052 640 1112 636 1172 L564 1172 C560 1112 540 1052 500 1012 C440 962 380 900 360 830Z"/>
      </g>
      <g fill="none" stroke="${edge}" stroke-width="2" stroke-dasharray="7 7" opacity=".55">
        ${half("M584 628 C536 636 470 638 412 630")}
        <path d="M376 846 C490 864 710 864 824 846"/>
      </g>
    </g>`,
  onepiece: (fill, trim, edge, cut) => `
    <g filter="url(#lift)">
      <path fill="${fill}" stroke="${edge}" stroke-width="3" d="M455 236 L482 236 C502 356 532 466 600 498 C668 466 698 356 718 236 L745 236 C760 328 800 428 812 518 C826 640 790 760 800 862 C810 962 850 1032 882 1082 C780 1092 700 1132 662 1244 L538 1244 C500 1132 420 1092 318 1082 C350 1032 390 962 400 862 C410 760 374 640 388 518 C400 428 440 328 455 236Z"/>
      <ellipse cx="600" cy="612" rx="36" ry="72" fill="${cut}" stroke="${trim}" stroke-width="5"/>
      <g fill="none" stroke="${edge}" stroke-width="2" stroke-dasharray="7 7" opacity=".55">
        <path d="M336 1066 C430 1080 500 1120 548 1228"/><path d="M864 1066 C770 1080 700 1120 652 1228"/>
      </g>
      <path d="M455 236 L482 236 M718 236 L745 236" stroke="${trim}" stroke-width="9" stroke-linecap="round"/>
    </g>`,
  tankini: (fill, trim, edge) => `
    <g filter="url(#lift)">
      <path fill="${fill}" stroke="${edge}" stroke-width="3" d="M440 226 L470 226 C490 338 530 418 600 428 C670 418 710 338 730 226 L760 226 C775 318 800 398 820 468 C846 560 850 660 840 790 C760 806 440 806 360 790 C350 660 354 560 380 468 C400 398 425 318 440 226Z"/>
      <path d="M360 790 C440 806 760 806 840 790" fill="none" stroke="${trim}" stroke-width="8"/>
      <path fill="${fill}" stroke="${edge}" stroke-width="3" d="M380 868 C520 884 680 884 820 868 C822 930 800 992 750 1042 C700 1092 662 1132 652 1212 L548 1212 C538 1132 500 1092 450 1042 C400 992 378 930 380 868Z"/>
      <path d="M380 868 C520 884 680 884 820 868" fill="none" stroke="${trim}" stroke-width="8"/>
      <path d="M440 226 L470 226 M730 226 L760 226" stroke="${trim}" stroke-width="9" stroke-linecap="round"/>
    </g>`,
};

// --------------------------------------------------------------- catalog ---

const products = [
  { handle: "padma", name: "Padma", type: "bikini", motif: "lotus", trim: C.gold,
    ways: [
      { key: "emerald", bg: C.sand, base: C.emerald, a: C.saffron, b: C.ivory },
      { key: "marigold", bg: C.ivory, base: C.marigold, a: C.emerald, b: C.ivory },
    ] },
  { handle: "gulabi", name: "Gulabi", type: "onepiece", motif: "jaali", trim: C.gold,
    ways: [
      { key: "rani-pink", bg: "#F0D6CF", base: C.rani, a: C.blush, b: C.saffron },
      { key: "sindoor", bg: C.cream, base: C.sindoor, a: C.saffron, b: C.ivory },
    ] },
  { handle: "sindoor", name: "Sindoor", type: "bikini", motif: "bandhani", trim: C.ivory,
    ways: [
      { key: "sindoor", bg: C.emerald, base: C.sindoor, a: C.ivory, b: C.saffron },
      { key: "ivory", bg: C.sindoor, base: C.ivory, a: C.sindoor, b: C.emerald },
    ] },
  { handle: "kashmir", name: "Kashmir", type: "onepiece", motif: "paisley", trim: C.marigold,
    ways: [
      { key: "emerald", bg: C.ivory, base: C.emerald, a: C.marigold, b: C.ivory },
      { key: "saffron", bg: C.emerald, base: C.saffron, a: "#7A1E14", b: C.ivory },
    ] },
  { handle: "shisha", name: "Shisha", type: "bikini", motif: "shisha", trim: C.mirror,
    ways: [
      { key: "noir", bg: C.marigold, base: C.ink, a: C.saffron, b: C.sindoor },
      { key: "emerald", bg: C.cream, base: C.emerald, a: C.saffron, b: C.ivory },
    ] },
  { handle: "jharoka", name: "Jharoka", type: "tankini", motif: "arches", trim: C.emerald,
    ways: [
      { key: "marigold", bg: C.cream, base: C.marigold, a: "#7A2E12", b: C.ivory },
      { key: "sand", bg: C.emerald, base: C.sand, a: C.emerald, b: C.marigold },
    ] },
  { handle: "chintz", name: "Chintz", type: "bikini", motif: "chintz", trim: C.sindoor,
    ways: [
      { key: "ivory", bg: C.sindoor, base: C.ivory, a: C.sindoor, b: C.emerald },
      { key: "emerald", bg: C.sand, base: C.emerald, a: C.saffron, b: C.ivory },
    ] },
  { handle: "bagh", name: "Bagh", type: "tankini", motif: "phulkari", trim: C.sindoor,
    ways: [
      { key: "saffron", bg: C.sand, base: C.saffron, a: C.sindoor, b: C.emerald },
      { key: "sindoor", bg: C.emerald, base: C.sindoor, a: C.saffron, b: C.ivory },
    ] },
];

const W = 1200;
const H = 1500;

function productFlat(p, way, n) {
  const dark = isDark(way.bg);
  const edge = shade(way.base, -0.35);
  const cut = way.bg;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>${defsCommon}${patternDef("fab", p.motif, way)}</defs>
    <rect width="${W}" height="${H}" fill="${way.bg}"/>
    ${palm(-120, 1380, -38, 1.5, dark ? 0.22 : 0.1)}
    ${garments[p.type]("url(#fab)", p.trim, edge, cut)}
    <rect width="${W}" height="${H}" fill="url(#sun)"/>
    ${label(W, H, `${p.name.toUpperCase()} · ${way.key.toUpperCase()} · ${n}`, "Replace with product photo (flat lay or on-body), 4:5", dark)}
  </svg>`;
}

function productDetail(p, way, n) {
  const dark = isDark(way.base);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>${defsCommon}${patternDef("fab", p.motif, way, 2.6)}
      <linearGradient id="fold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".35" stop-color="#000" stop-opacity="0"/>
        <stop offset=".62" stop-color="#fff" stop-opacity=".16"/><stop offset=".8" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".3"/>
      </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#fab)"/>
    <rect width="${W}" height="${H}" fill="url(#fold)"/>
    <path d="M-20 1040 C300 980 800 1120 1220 1000" stroke="${p.trim}" stroke-width="26" fill="none"/>
    <path d="M-20 1074 C300 1014 800 1154 1220 1034" stroke="${shade(way.base, -0.4)}" stroke-width="3" stroke-dasharray="10 9" fill="none" opacity=".7"/>
    ${palm(1300, -60, 140, 1.6, 0.2)}
    ${label(W, H, `${p.name.toUpperCase()} · ${way.key.toUpperCase()} · ${n}`, "Replace with close-up of fabric, trim or embellishment", dark)}
  </svg>`;
}

for (const p of products) {
  p.ways.forEach((way, i) => {
    write(`products/${p.handle}/${p.handle}-${way.key}-1.svg`, productFlat(p, way, `${i * 2 + 1}/4`));
    write(`products/${p.handle}/${p.handle}-${way.key}-2.svg`, productDetail(p, way, `${i * 2 + 2}/4`));
  });
}

// ------------------------------------------------------------ editorial ---

function archPath(x, y, w, h) {
  return `M${x} ${y + h} L${x} ${y + w * 0.55} C${x} ${y + w * 0.18} ${x + w * 0.28} ${y + w * 0.1} ${x + w / 2} ${y}
    C${x + w * 0.72} ${y + w * 0.1} ${x + w} ${y + w * 0.18} ${x + w} ${y + w * 0.55} L${x + w} ${y + h}Z`;
}

// 01 — tall campaign: sandstone arch framing an emerald pool at golden hour
write("editorial/campaign-arch.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="1200" height="1600">
  <defs>${defsCommon}
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6C36A"/><stop offset=".55" stop-color="${C.marigold}"/><stop offset="1" stop-color="${C.sindoor}"/></linearGradient>
    <linearGradient id="pool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F6B53"/><stop offset="1" stop-color="${C.emeraldDeep}"/></linearGradient>
    <clipPath id="win"><path d="${archPath(250, 170, 700, 1180)}"/></clipPath></defs>
  <rect width="1200" height="1600" fill="#D9B98E"/>
  <rect width="1200" height="1600" fill="url(#sun)"/>
  <g clip-path="url(#win)">
    <rect x="200" y="150" width="800" height="900" fill="url(#sky)"/>
    <circle cx="640" cy="760" r="120" fill="#FFF1D0" opacity=".9"/>
    <rect x="200" y="960" width="800" height="420" fill="url(#pool)"/>
    ${Array.from({ length: 16 }, (_, i) => `<path d="M200 ${990 + i * 24} q100 -10 200 0 t200 0 t200 0 t200 0" stroke="#F7F1E5" stroke-opacity="${0.06 + (i % 3) * 0.04}" stroke-width="2" fill="none"/>`).join("")}
    ${Array.from({ length: 12 }, (_, i) => `<rect x="${560 - (12 - i) * 6 + ((i * 37) % 30)}" y="${976 + i * 26}" width="${(12 - i) * 14}" height="5" fill="${C.saffron}" opacity="${0.55 - i * 0.04}"/>`).join("")}
  </g>
  <path d="${archPath(250, 170, 700, 1180)}" fill="none" stroke="#B8915E" stroke-width="22"/>
  <path d="${archPath(214, 134, 772, 1216)}" fill="none" stroke="#C7A271" stroke-width="6"/>
  ${palm(1250, 120, 150, 1.8, 0.2)}
  ${label(1200, 1600, "CAMPAIGN · 01", "Shoot: model in Padma, framed by an arch, pool at golden hour (3:4)", false)}
</svg>`);

// 02 — mirror-work macro
write("editorial/detail-shisha.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>${defsCommon}${patternDef("fab", "shisha", { base: C.sindoor, a: C.saffron, b: C.ivory }, 3.4)}</defs>
  <rect width="1000" height="1000" fill="url(#fab)"/>
  <rect width="1000" height="1000" fill="url(#sun)"/>
  ${palm(-200, 900, -30, 1.4, 0.18)}
  ${label(1000, 1000, "DETAIL · SHISHA", "Shoot: macro of mirror work catching sunlight (1:1)", true)}
</svg>`);

// 03 — lifestyle: pool tiles, towel, shadow
write("editorial/lifestyle-pool.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1067" width="1600" height="1067">
  <defs>${defsCommon}
    <pattern id="tiles" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="#1A6B57"/><rect x="2" y="2" width="76" height="76" fill="#14604C"/><path d="M2 2 L78 2 L2 78Z" fill="#fff" opacity=".05"/></pattern>
    <pattern id="stripe" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(90)"><rect width="60" height="60" fill="${C.ivory}"/><rect width="18" height="60" fill="${C.sindoor}"/><rect x="26" width="6" height="60" fill="${C.marigold}"/></pattern></defs>
  <rect width="1600" height="1067" fill="url(#tiles)"/>
  ${Array.from({ length: 24 }, (_, i) => `<path d="M0 ${40 + i * 44} q80 -14 160 0 t160 0 t160 0 t160 0 t160 0 t160 0 t160 0 t160 0 t160 0 t160 0" stroke="#F7F1E5" stroke-opacity="${0.05 + (i % 4) * 0.03}" stroke-width="3" fill="none"/>`).join("")}
  <rect x="980" y="-40" width="760" height="1200" fill="#E9D9BC" transform="rotate(8 980 0)"/>
  <rect x="1060" y="120" width="420" height="760" fill="url(#stripe)" transform="rotate(14 1060 120)" filter="url(#lift)"/>
  ${palm(1700, 1000, -150, 2, 0.22)}
  <rect width="1600" height="1067" fill="url(#sun)"/>
  ${label(1600, 1067, "LIFESTYLE · 01", "Shoot: poolside — towels, sunglasses, a swimsuit mid-movement (3:2)", true)}
</svg>`);

// 04 — gota / phulkari trim close-up
write("editorial/detail-trim.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" width="1000" height="1250">
  <defs>${defsCommon}${patternDef("fab", "phulkari", { base: C.emerald, a: C.saffron, b: C.sindoor }, 2.2)}
    <pattern id="gota" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="${C.gold}"/><path d="M0 20 L20 0 L40 20 L20 40Z" fill="#D8B866"/><circle cx="20" cy="20" r="4" fill="#F4E2A8"/></pattern></defs>
  <rect width="1000" height="1250" fill="url(#fab)"/>
  <path d="M-40 520 L1040 380 L1040 470 L-40 610Z" fill="url(#gota)" filter="url(#lift)"/>
  <path d="M-40 660 L1040 520 L1040 548 L-40 688Z" fill="${C.sindoor}"/>
  <rect width="1000" height="1250" fill="url(#sun)"/>
  ${label(1000, 1250, "DETAIL · TRIM", "Shoot: embroidery / gota trim close-up, raking light (4:5)", true)}
</svg>`);

// 05 — wide story image
write("editorial/story-sisters.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>${defsCommon}</defs>
  <rect width="1600" height="1000" fill="${C.sindoor}"/>
  ${[0, 1, 2].map((i) => `<path d="${archPath(220 + i * 420, 170, 330, 830)}" fill="${[C.emerald, C.marigold, C.ivory][i]}"/>`).join("")}
  ${palm(-150, 980, -32, 2.2, 0.2)}
  <rect width="1600" height="1000" fill="url(#sun)"/>
  ${label(1600, 1000, "STORY · 01", "Shoot: group portrait — the Behna sisterhood, golden hour (16:10)", true)}
</svg>`);

// ----------------------------------------------------------- categories ---

const categories = [
  { key: "bikini-sets", p: products[0], way: products[0].ways[0], bg: C.marigold, title: "BIKINI SETS" },
  { key: "one-pieces", p: products[3], way: products[3].ways[0], bg: C.sindoor, title: "ONE-PIECES" },
  { key: "tankinis", p: products[7], way: products[7].ways[1], bg: C.emerald, title: "TANKINIS" },
];
for (const c of categories) {
  const edge = shade(c.way.base, -0.35);
  write(`categories/${c.key}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1333" width="1000" height="1333">
    <defs>${defsCommon}${patternDef("fab", c.p.motif, c.way)}</defs>
    <rect width="1000" height="1333" fill="${c.bg}"/>
    ${palm(-160, 1240, -40, 1.6, 0.22)}
    <g transform="translate(-340 -260) scale(1.15)">${garments[c.p.type]("url(#fab)", c.p.trim, edge, c.bg)}</g>
    <rect width="1000" height="1333" fill="url(#sun)"/>
    ${label(1000, 1333, `CATEGORY · ${c.title}`, "Replace with a strong on-body crop (3:4)", true, true)}
  </svg>`);
}

console.log("Placeholder artwork written to public/assets/");
