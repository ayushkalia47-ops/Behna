"use client";

import { X } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";

/** SAMPLE measurements — replace with your manufacturer's fit chart. */
const rows = [
  { size: "XS", us: "0–2", bust: [31, 32], waist: [24, 25], hips: [34, 35] },
  { size: "S", us: "4–6", bust: [33, 34], waist: [26, 27], hips: [36, 37] },
  { size: "M", us: "8–10", bust: [35, 36], waist: [28, 29], hips: [38, 39] },
  { size: "L", us: "12–14", bust: [37, 39], waist: [30, 32], hips: [40, 42] },
  { size: "XL", us: "16", bust: [40, 42], waist: [33, 35], hips: [43, 45] },
];

const cm = ([a, b]: number[]) => `${Math.round(a * 2.54)}–${Math.round(b * 2.54)}`;
const inch = ([a, b]: number[]) => `${a}–${b}`;

export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onClose={onClose} variant="center" label="Size guide" className="bg-ivory p-6 md:p-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="eyebrow text-sindoor">Fit</p>
          <h2 className="mt-2 font-serif text-4xl">Size Guide</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="Close size guide" className="-mr-2 p-2">
          <X size={20} strokeWidth={1.25} />
        </button>
      </div>
      <p className="mt-4 max-w-md text-sm text-ink/70">
        Measure at the fullest part of the bust and hips, and the narrowest part of the waist. Between sizes? Size up
        for more coverage, down for a closer fit.
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <caption className="sr-only">Body measurements by size, inches and centimetres</caption>
          <thead>
            <tr className="eyebrow border-b border-ink/20 text-[10px]">
              <th scope="col" className="py-3 pr-4">Size</th>
              <th scope="col" className="py-3 pr-4">US</th>
              <th scope="col" className="py-3 pr-4">Bust in / cm</th>
              <th scope="col" className="py-3 pr-4">Waist in / cm</th>
              <th scope="col" className="py-3">Hips in / cm</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {rows.map((r) => (
              <tr key={r.size} className="border-b border-ink/10">
                <th scope="row" className="py-3 pr-4 font-serif text-lg font-normal">{r.size}</th>
                <td className="py-3 pr-4">{r.us}</td>
                <td className="py-3 pr-4">{inch(r.bust)} <span className="text-ink/50">/ {cm(r.bust)}</span></td>
                <td className="py-3 pr-4">{inch(r.waist)} <span className="text-ink/50">/ {cm(r.waist)}</span></td>
                <td className="py-3">{inch(r.hips)} <span className="text-ink/50">/ {cm(r.hips)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 font-mono text-[10px] text-ink/50">Sample chart — replace with final fit measurements before launch.</p>
    </Sheet>
  );
}
