"use client";

/**
 * Accessible overlay built on the native <dialog> element (focus trapping,
 * Escape to close and inert background come for free). Used for the bag
 * drawer, mobile menu and size guide.
 */
import { useEffect, useRef, useState } from "react";

type Variant = "right" | "left" | "center";

// Open-state classes use the data-[shown] variant so they always override the base
const panel: Record<Variant, string> = {
  right: "right-0 top-0 h-full w-full max-w-[440px] translate-x-full data-[shown=true]:translate-x-0",
  left: "left-0 top-0 h-full w-full -translate-x-full data-[shown=true]:translate-x-0",
  center:
    "left-1/2 top-1/2 max-h-[88dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 translate-y-[-46%] overflow-y-auto opacity-0 data-[shown=true]:translate-y-[-50%] data-[shown=true]:opacity-100",
};

export function Sheet({
  open,
  onClose,
  variant = "right",
  label,
  className = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  variant?: Variant;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      // Commit the closed styles before switching to open so the transition runs
      void dialog.offsetWidth;
      setShown(true);
      return;
    }
    setShown(false);
    document.documentElement.style.overflow = "";
    const t = setTimeout(() => dialog.open && dialog.close(), 450);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-ink backdrop:bg-transparent"
    >
      <div
        aria-hidden
        onClick={onClose}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-500 ease-silk ${shown ? "opacity-100" : "opacity-0"}`}
      />
      <div
        data-shown={shown}
        className={`absolute transition-[translate,opacity] duration-500 ease-silk ${panel[variant]} ${className}`}
      >
        {children}
      </div>
    </dialog>
  );
}
