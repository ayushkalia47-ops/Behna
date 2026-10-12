import Link from "next/link";

type Tone = "ink" | "ivory" | "outline" | "outline-light" | "sindoor";

const tones: Record<Tone, string> = {
  ink: "bg-ink text-ivory hover:bg-emerald",
  ivory: "bg-ivory text-ink hover:bg-saffron",
  sindoor: "bg-sindoor text-ivory hover:bg-ink",
  outline: "border border-ink text-ink hover:bg-ink hover:text-ivory",
  "outline-light": "border border-ivory/80 text-ivory hover:bg-ivory hover:text-ink",
};

const base =
  "eyebrow inline-flex items-center justify-center gap-3 px-8 h-13 transition-colors duration-300 ease-silk disabled:cursor-not-allowed disabled:opacity-45";

export function buttonClass(tone: Tone = "ink", extra = "") {
  return `${base} ${tones[tone]} ${extra}`;
}

export function ButtonLink({
  href,
  tone = "ink",
  className = "",
  children,
}: {
  href: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(tone, className)}>
      {children}
    </Link>
  );
}
