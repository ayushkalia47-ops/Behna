import { ImageResponse } from "next/og";

// Default social sharing card. Replace with a campaign still later by adding
// src/app/opengraph-image.jpg (1200×630) and deleting this file.
export const alt = "Behna Bikinis — South Asian–inspired swimwear";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0E4D3A",
          color: "#F7F1E5",
          padding: 72,
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, letterSpacing: 10, color: "#F2A93B" }}>COLLECTION Nº 01</div>
          <div style={{ fontSize: 150, letterSpacing: 24, marginTop: 12, fontFamily: "serif" }}>BEHNA</div>
          <div style={{ fontSize: 34, marginTop: 8, opacity: 0.85 }}>Heirloom color, cut for the sun.</div>
        </div>
        <svg width="220" height="300" viewBox="0 0 40 56">
          <path d="M4 56 V24 C4 12 13 7 20 2 C27 7 36 12 36 24 V56Z" fill="#E8901C" />
          <circle cx="20" cy="30" r="4" fill="#C7271E" />
        </svg>
      </div>
    ),
    size,
  );
}
