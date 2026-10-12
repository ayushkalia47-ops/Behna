import Link from "next/link";
import { footerNav, site } from "@/config/site";
import { BorderMotif } from "@/components/ui/Motif";

function Column({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <h2 className="eyebrow text-saffron">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-ivory/80">
        {links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-ivory">
                {l.label} ↗
              </a>
            ) : (
              <Link href={l.href} className="link-draw hover:text-ivory">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden bg-emerald-deep text-ivory">
      <BorderMotif className="text-gold/70" />
      <div className="mx-auto max-w-[1600px] px-5 pt-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-4xl leading-[1.05] md:text-5xl">
              Sisterhood,
              <br />
              <em className="text-saffron">in full color.</em>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65">
              <span className="font-deva">बहना</span> (behna) — sister. The one who borrows your clothes, hypes you up
              anyway, and tells you to wear the red one.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <Column title="Shop" links={footerNav.shop} />
            <Column title="The House" links={footerNav.house} />
            <Column title="Help" links={footerNav.help} />
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="mt-20 select-none whitespace-nowrap text-center font-serif text-[23vw] leading-[0.78] tracking-[0.04em] text-ivory/[0.94] md:text-[21vw]"
      >
        BEHNA
      </p>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 border-t border-ivory/15 px-5 py-6 text-xs text-ivory/55 md:flex-row md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>Preview site — imagery, products and prices are placeholders.</p>
      </div>
    </footer>
  );
}
