import type { Metadata } from "next";
import Image from "next/image";
import { editorial } from "@/data/editorial";
import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { BorderMotif } from "@/components/ui/Motif";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Behna means sister. South Asian color, craft and culture, reimagined as swimwear that refuses to play it safe.",
  alternates: { canonical: "/our-story" },
};

// Draft brand copy — edit freely. It deliberately makes no claims about
// founders, sourcing or production; add those once they're confirmed.
const principles = [
  {
    n: "01",
    title: "Color first",
    body: "Sindoor red, marigold, emerald, rani pink. We start with the colors of weddings, markets and festivals, and build every piece around them.",
  },
  {
    n: "02",
    title: "Craft, reimagined",
    body: "Bandhani, shisha, phulkari, block print. Techniques we grew up around, translated into prints and details made for water and sun.",
  },
  {
    n: "03",
    title: "Sisterhood",
    body: "Behna is for the girls who were told to cover up, tone it down, or pick a side. You don't have to choose. Wear the red one.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageIntro eyebrow="Our Story" title={<>Behna means <em>sister.</em></>}>
        <p>
          <span className="font-deva">बहना</span> — the one who borrows your clothes, hypes you up anyway, and tells
          you to wear the red one.
        </p>
      </PageIntro>

      <figure data-reveal className="mx-auto mt-16 max-w-[1600px] md:mt-24 md:px-10">
        <div className="relative aspect-[4/3] overflow-hidden bg-sand md:aspect-[16/9]">
          <Image src={editorial.story.src} alt={editorial.story.alt} fill sizes="100vw" className="object-cover" />
        </div>
      </figure>

      <section className="mx-auto grid max-w-[1600px] gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <h2 data-reveal className="font-serif text-4xl leading-[1.05] md:col-span-5 md:text-6xl">
          Swimwear that looks like <em>where we come from.</em>
        </h2>
        <div data-reveal className="space-y-6 text-lg leading-relaxed text-ink/80 md:col-span-6 md:col-start-7">
          <p>
            South Asian women have always known how to wear color — at weddings, at Eid and Diwali, in the
            embroidered, mirrored, block-printed clothes our mothers and grandmothers kept folded in steel trunks.
            Then summer comes, and the swimwear aisle offers black, navy and a polite floral.
          </p>
          <p>
            Behna brings that visual language to the pool and the beach: prints named for lotus ponds and palace
            windows, color that photographs like a wedding, and cuts that are confident about the body wearing them.
          </p>
          <p>It&rsquo;s not costume. It&rsquo;s not nostalgia. It&rsquo;s just what summer looks like when we design it.</p>
        </div>
      </section>

      <section className="bg-emerald text-ivory">
        <BorderMotif className="text-gold/70" />
        <ol className="mx-auto grid max-w-[1600px] gap-14 px-5 py-24 md:grid-cols-3 md:gap-10 md:px-10 md:py-32">
          {principles.map((p) => (
            <li key={p.n} data-reveal>
              <span className="eyebrow text-saffron">{p.n}</span>
              <h3 className="mt-4 font-serif text-4xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-ivory/80">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 text-center md:px-10 md:py-36">
        <p data-reveal className="mx-auto max-w-[18ch] font-serif text-5xl leading-[1] md:text-7xl">
          Eight prints. <em>Zero</em> apologies.
        </p>
        <div data-reveal className="mt-10">
          <ButtonLink href="/shop">Shop the Collection</ButtonLink>
        </div>
      </section>
    </>
  );
}
