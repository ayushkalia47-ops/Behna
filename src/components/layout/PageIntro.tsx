export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
      <p className="eyebrow text-sindoor">{eyebrow}</p>
      <h1 className="mt-4 max-w-[14ch] font-serif text-[clamp(3.2rem,9vw,8rem)] leading-[0.9] tracking-[-0.025em]">{title}</h1>
      {children && <div className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75">{children}</div>}
    </header>
  );
}

/** Simple long-form layout for policies and text pages */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-14 md:px-10 md:pb-40 md:pt-20">
      <div className="max-w-2xl space-y-6 leading-relaxed text-ink/80 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}

export function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-marigold bg-cream px-5 py-4 font-mono text-xs leading-relaxed text-ink/70">{children}</p>
  );
}
