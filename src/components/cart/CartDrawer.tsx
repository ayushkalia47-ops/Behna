"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { useCart } from "./CartProvider";
import { BagContents } from "./BagContents";

export function CartDrawer() {
  const { isOpen, close, count } = useCart();
  const pathname = usePathname();

  // Close when navigating away
  useEffect(() => close(), [pathname, close]);

  return (
    <Sheet open={isOpen} onClose={close} variant="right" label="Shopping bag" className="flex flex-col bg-ivory">
      <div className="flex h-20 items-center justify-between border-b border-ink/15 px-6 md:px-8">
        <h2 className="eyebrow">
          Your Bag <span className="text-ink/50">({count})</span>
        </h2>
        <button type="button" onClick={close} aria-label="Close bag" className="-mr-2 p-2 transition-transform hover:rotate-90">
          <X size={20} strokeWidth={1.25} />
        </button>
      </div>
      <BagContents onNavigate={close} />
    </Sheet>
  );
}
