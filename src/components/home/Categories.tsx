import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryTiles } from "@/data/editorial";

export function Categories() {
  return (
    <section aria-labelledby="categories-title" className="bg-ivory pb-24 md:pb-40">
      <div className="mx-auto mb-10 flex max-w-[1600px] items-end justify-between px-5 md:mb-14 md:px-10">
        <h2 id="categories-title" data-reveal className="font-serif text-4xl leading-none md:text-6xl">
          Find <em>your</em> silhouette
        </h2>
      </div>
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-10">
        {categoryTiles.map((c, i) => (
          <li key={c.category} data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties} className="w-[78vw] shrink-0 snap-start md:w-auto">
            <Link href={`/shop?category=${c.category}`} className="group relative block aspect-[3/4] overflow-hidden text-ivory">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 78vw"
                className="object-cover transition-transform duration-[1.6s] ease-silk group-hover:scale-[1.05]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7">
                <div>
                  <span className="eyebrow text-saffron">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-3xl leading-none md:text-4xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-ivory/80">{c.note}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-ivory/60 transition-colors group-hover:bg-ivory group-hover:text-ink">
                  <ArrowRight size={16} strokeWidth={1.25} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
