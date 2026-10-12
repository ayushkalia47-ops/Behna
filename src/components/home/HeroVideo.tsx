"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { hero, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Full-bleed campaign film. Paths live in src/config/site.ts (`hero`).
 * - The poster paints immediately and remains if the video can't load.
 * - The mobile cut (9:16) is chosen on narrow screens so phones never
 *   download the desktop file.
 * - With "reduce motion" on, the film doesn't autoplay; the play button starts it.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    video.src = narrow ? hero.video.mobile : hero.video.desktop;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) video.play().catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => setFailed(true));
    else v.pause();
  };

  return (
    <section aria-label="Campaign" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-emerald-deep text-ivory">
      <picture>
        <source media="(max-width: 767px)" srcSet={hero.poster.mobile} />
        <img
          src={hero.poster.desktop}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {!failed && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}

      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-14 md:px-10 md:pb-20">
        <p className="eyebrow animate-rise text-saffron [animation-delay:200ms]">{hero.eyebrow}</p>
        <h1 className="mt-5 font-serif text-[clamp(3.1rem,11.5vw,9.5rem)] leading-[0.9] tracking-[-0.02em]">
          <span className="block animate-rise [animation-delay:350ms]">{hero.headline[0]}</span>
          <em className="block animate-rise pl-[0.6em] [animation-delay:500ms] md:pl-[1.2em]">{hero.headline[1]}</em>
        </h1>
        <div className="mt-10 flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:750ms]">
          <ButtonLink href={hero.cta.href} tone="ivory">
            {hero.cta.label}
            <ArrowRight size={16} strokeWidth={1.25} />
          </ButtonLink>
          <a href="#collection" className="eyebrow link-draw text-ivory/85">
            Explore the Prints
          </a>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 flex items-center gap-4 md:bottom-8 md:right-10">
        {site.showPlaceholderNotes && (
          <span className="hidden font-mono text-[10px] tracking-wider text-ivory/55 lg:inline">{hero.placeholderNote}</span>
        )}
        {!failed && (
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause background video" : "Play background video"}
            className="grid h-9 w-9 place-items-center rounded-full border border-ivory/40 text-ivory/85 transition-colors hover:bg-ivory hover:text-ink"
          >
            {playing ? <Pause size={12} strokeWidth={1.5} /> : <Play size={12} strokeWidth={1.5} />}
          </button>
        )}
      </div>
    </section>
  );
}
