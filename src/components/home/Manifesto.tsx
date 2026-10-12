import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArchMark, BorderMotif } from "@/components/ui/Motif";

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="relative overflow-hidden bg-sindoor text-ivory">
      <BorderMotif className="text-saffron" />
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-40">
        <div data-reveal className="flex items-center gap-4">
          <ArchMark className="h-8 w-6 text-saffron" />
          <p className="eyebrow text-saffron">The Behna Manifesto</p>
        </div>

        <h2
          id="manifesto-title"
          data-reveal
          className="mt-10 max-w-[15ch] font-serif text-[clamp(2.9rem,8.4vw,8.25rem)] leading-[0.95] tracking-[-0.02em] md:mt-14"
        >
          Made for the girls who were <em className="text-saffron">never</em> meant to blend in.
        </h2>

        <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-12">
          <p data-reveal className="text-lg leading-relaxed text-ivory/90 md:col-span-5 md:col-start-7 md:text-xl">
            Rooted in South Asian color, craft, and culture. Reimagined for sun-soaked days, late nights, and
            everything in between. Behna is swimwear that refuses to play it safe.
          </p>
          <div data-reveal className="md:col-span-5 md:col-start-7">
            <Link href="/our-story" className="eyebrow link-draw inline-flex items-center gap-2">
              Read Our Story <ArrowRight size={14} strokeWidth={1.25} />
            </Link>
          </div>
        </div>
      </div>
      <span
        aria-hidden
        className="font-deva pointer-events-none absolute -bottom-[0.3em] -left-[0.05em] select-none text-[38vw] leading-none text-black/[0.06] md:text-[24vw]"
      >
        बहना
      </span>
      <BorderMotif className="relative text-saffron" />
    </section>
  );
}
