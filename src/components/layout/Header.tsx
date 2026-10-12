"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { nav, site } from "@/config/site";
import { useCart } from "@/components/cart/CartProvider";
import { Sheet } from "@/components/ui/Sheet";
import { Wordmark } from "./Wordmark";

export function Header() {
  const pathname = usePathname();
  const { count, open: openBag, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const transparent = overHero && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,border-color] duration-500 ease-silk ${
          transparent
            ? "border-b border-transparent bg-transparent text-ivory"
            : "border-b border-ink/10 bg-ivory/92 text-ink backdrop-blur-md"
        }`}
      >
        {transparent && (
          <div aria-hidden className="pointer-events-none absolute inset-0 -bottom-10 bg-gradient-to-b from-black/35 to-transparent" />
        )}
        <div className="relative mx-auto grid h-18 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-10">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="eyebrow link-draw aria-[current=page]:bg-[length:100%_1px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="-ml-2 p-2 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.25} />
          </button>

          <Link href="/" aria-label={`${site.name} — home`} className="justify-self-center">
            <Wordmark />
          </Link>

          <button
            type="button"
            onClick={openBag}
            className="group -mr-2 flex items-center gap-2 justify-self-end p-2"
            aria-label={`Open bag${ready ? `, ${count} ${count === 1 ? "item" : "items"}` : ""}`}
          >
            <span className="eyebrow hidden md:inline">Bag</span>
            <span className="relative">
              <ShoppingBag size={20} strokeWidth={1.25} />
              {ready && count > 0 && (
                <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-sindoor px-1 text-[9px] font-medium text-ivory tabular-nums">
                  {count}
                </span>
              )}
            </span>
          </button>
        </div>
      </header>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} variant="left" label="Menu" className="bg-emerald text-ivory">
        <div className="relative flex h-full flex-col overflow-hidden px-6 pb-10">
          <div className="flex h-18 items-center justify-between">
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="-ml-2 p-2">
              <X size={22} strokeWidth={1.25} />
            </button>
            <Wordmark />
            <span className="w-9" />
          </div>
          <nav aria-label="Mobile" className="mt-12">
            <ol className="space-y-5">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-baseline gap-4" onClick={() => setMenuOpen(false)}>
                    <span className="eyebrow text-saffron">0{i + 1}</span>
                    <span className="font-serif text-5xl">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <ul className="mt-12 space-y-3 border-t border-ivory/20 pt-8 text-sm text-ivory/80">
            <li><Link href="/shop?category=bikini-sets">Bikini Sets</Link></li>
            <li><Link href="/shop?category=one-pieces">One-Pieces</Link></li>
            <li><Link href="/shop?category=tankinis">Tankinis</Link></li>
            <li><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></li>
          </ul>
          <span aria-hidden className="font-deva pointer-events-none absolute -bottom-10 -right-4 text-[9rem] leading-none text-ivory/[0.07]">
            बहना
          </span>
        </div>
      </Sheet>
    </>
  );
}
