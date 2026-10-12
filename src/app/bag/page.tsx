import type { Metadata } from "next";
import { BagContents } from "@/components/cart/BagContents";

export const metadata: Metadata = {
  title: "Your Bag",
  robots: { index: false },
};

export default function BagPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-32 md:pb-40 md:pt-44">
      <h1 className="font-serif text-6xl leading-none tracking-[-0.02em] md:text-7xl">
        Your <em>Bag</em>
      </h1>
      <div className="mt-10 flex flex-col border-t border-ink/15">
        <BagContents variant="page" />
      </div>
    </div>
  );
}
