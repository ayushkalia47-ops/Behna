import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageIntro } from "@/components/layout/PageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Behna Bikinis — questions, press and collaborations.",
  alternates: { canonical: "/contact" },
};

const blocks = [
  { label: "General & orders", body: "Questions about fit, prints or the launch.", link: `mailto:${site.email}`, text: site.email },
  { label: "Press & collaborations", body: "Stylists, editors, photographers and creators.", link: `mailto:${site.email}?subject=Press`, text: site.email },
  { label: "Instagram", body: "Behind the scenes, first looks and launch news.", link: site.instagram, text: "@behnabikinis" },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title={<>Say <em>hello,</em> behna.</>}>
        <p>We read everything. Fit questions, print requests, collaboration ideas — send them our way.</p>
      </PageIntro>
      <section className="mx-auto max-w-[1600px] px-5 pb-28 pt-16 md:px-10 md:pb-40 md:pt-24">
        <ul className="grid border-t border-ink/15 md:grid-cols-3">
          {blocks.map((b) => (
            <li key={b.label} className="border-b border-ink/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <h2 className="eyebrow text-sindoor">{b.label}</h2>
              <p className="mt-4 text-ink/70">{b.body}</p>
              <a
                href={b.link}
                {...(b.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="link-draw mt-6 inline-block font-serif text-2xl md:text-3xl"
              >
                {b.text}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
