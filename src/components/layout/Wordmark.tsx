import Image from "next/image";
import { brand } from "@/config/brand";

/**
 * The Behna wordmark. Typeset by default; set `brand.logo` in
 * src/config/brand.ts to use your own logo file instead.
 */
export function Wordmark({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  if (brand.logo) {
    return (
      <Image
        src={brand.logo.src}
        alt="Behna Bikinis"
        width={brand.logo.width}
        height={brand.logo.height}
        priority
        className={`h-auto ${size === "lg" ? "w-40" : "w-28"} ${className}`}
      />
    );
  }
  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <span className={`font-serif tracking-[0.22em] ${size === "lg" ? "text-4xl" : "text-[1.65rem]"}`}>BEHNA</span>
      <span className="mt-1 text-[0.5rem] font-medium tracking-[0.62em] pl-[0.62em]">BIKINIS</span>
    </span>
  );
}
