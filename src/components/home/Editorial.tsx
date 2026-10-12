import Image from "next/image";
import { editorial } from "@/data/editorial";

function Figure({
  image,
  caption,
  aspect,
  sizes,
  className = "",
  bleed = false,
}: {
  image: { src: string; alt: string };
  caption: React.ReactNode;
  aspect: string;
  sizes: string;
  className?: string;
  bleed?: boolean; // edge-to-edge on mobile
}) {
  return (
    <figure data-reveal className={`${bleed ? "-mx-5 md:mx-0" : ""} ${className}`}>
      <div className={`relative overflow-hidden bg-sand ${aspect}`}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption className={`mt-3 flex gap-3 text-xs text-ink/60 ${bleed ? "px-5 md:px-0" : ""}`}>{caption}</figcaption>
    </figure>
  );
}

export function Editorial() {
  return (
    <section aria-labelledby="editorial-title" className="bg-ivory py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-y-16 md:grid-cols-12 md:gap-x-10">
          <Figure
            image={editorial.campaign}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 58vw, 100vw"
            bleed
            className="md:col-span-7"
            caption={
              <>
                <span className="eyebrow text-[9px] text-ink">Look 01</span>
                <span>Padma in Emerald, golden hour.</span>
              </>
            }
          />

          <div className="flex flex-col md:col-span-5 md:pt-32">
            <div data-reveal>
              <p className="eyebrow text-sindoor">Field Notes</p>
              <h2 id="editorial-title" className="mt-6 font-serif text-[clamp(2.4rem,4.4vw,4.25rem)] leading-[1] tracking-[-0.015em]">
                Mirror work was made to catch the light. <em>So were you.</em>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">
                Every Behna print starts with something we grew up around — a grandmother&rsquo;s dupatta, a wedding
                mandap, the carved windows of a haveli — and asks what it would look like at the pool.
              </p>
            </div>
            <Figure
              image={editorial.mirror}
              aspect="aspect-square"
              sizes="(min-width: 768px) 30vw, 70vw"
              className="mt-14 w-[72%] self-end md:mt-auto md:w-[78%]"
              caption={
                <>
                  <span className="eyebrow text-[9px] text-ink">Detail</span>
                  <span>Shisha — mirror work of Gujarat &amp; Rajasthan.</span>
                </>
              }
            />
          </div>

          <Figure
            image={editorial.trim}
            aspect="aspect-[4/5]"
            sizes="(min-width: 768px) 30vw, 60vw"
            className="w-[62%] md:col-span-4 md:mt-6 md:w-auto"
            caption={
              <>
                <span className="eyebrow text-[9px] text-ink">Detail</span>
                <span>Phulkari geometry, gota trim.</span>
              </>
            }
          />
          <div className="relative mt-10 md:col-span-8 md:mt-48">
            <Figure
              image={editorial.lifestyle}
              aspect="aspect-[3/2]"
              sizes="(min-width: 768px) 66vw, 100vw"
              bleed
              caption={
                <>
                  <span className="eyebrow text-[9px] text-ink">Look 02</span>
                  <span>Poolside, after hours.</span>
                </>
              }
            />
            <p
              data-reveal
              aria-hidden
              className="pointer-events-none absolute -top-8 right-0 font-serif text-[clamp(2.5rem,6vw,6rem)] italic leading-none text-sindoor md:-top-14 md:right-6"
            >
              Summer, but ours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
