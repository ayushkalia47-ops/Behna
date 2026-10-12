"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  label: string;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-13";
  const w = size === "sm" ? "w-9" : "w-12";
  return (
    <div role="group" aria-label={label} className={`inline-flex items-stretch border border-ink/25 ${h}`}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${w} grid place-items-center transition-colors hover:bg-ink/5 disabled:opacity-30`}
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <output aria-live="polite" className={`grid ${w} place-items-center text-sm tabular-nums`}>
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`${w} grid place-items-center transition-colors hover:bg-ink/5 disabled:opacity-30`}
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}
