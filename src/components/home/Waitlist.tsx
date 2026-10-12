"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { EMAIL_PATTERN, joinWaitlist, type WaitlistResult } from "@/lib/waitlist";

type State = "idle" | "submitting" | WaitlistResult;

const messages: Record<WaitlistResult, string> = {
  ok: "You're on the list. We'll be in touch before anyone else hears.",
  "not-configured":
    "Thank you — signups aren't open just yet, so your email hasn't been saved. Follow us on Instagram for launch news.",
  error: "Something went wrong on our side. Please try again in a moment.",
};

export function Waitlist() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return setError("Please enter your email address.");
    if (!EMAIL_PATTERN.test(value)) return setError("That email doesn't look quite right.");
    setError(null);
    setState("submitting");
    setState(await joinWaitlist(value));
  }

  const done = state === "ok";

  return (
    <section id="waitlist" aria-labelledby={`${id}-title`} className="scroll-mt-20 bg-marigold text-ink">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div data-reveal className="md:col-span-6">
          <p className="eyebrow text-emerald-deep">Launching soon</p>
          <h2 id={`${id}-title`} className="mt-6 font-serif text-[clamp(3rem,7.5vw,7rem)] leading-[0.9] tracking-[-0.02em]">
            Join the <em>Waitlist</em>
          </h2>
        </div>
        <div data-reveal className="flex flex-col justify-end md:col-span-5 md:col-start-8">
          <p className="text-lg leading-relaxed text-ink/85">
            Be the first to know when Behna products are available for purchase.
          </p>
          {done ? (
            <p role="status" className="mt-10 font-serif text-2xl italic">
              {messages.ok}
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-10">
              <label htmlFor={`${id}-email`} className="eyebrow text-ink/70">
                Email address
              </label>
              <div className="mt-3 flex items-stretch border-b border-ink/50 focus-within:border-ink">
                <input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={!!error}
                  aria-describedby={`${id}-msg`}
                  className="min-w-0 flex-1 bg-transparent py-4 font-serif text-2xl placeholder:text-ink/35 focus:outline-none md:text-3xl"
                />
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="eyebrow flex shrink-0 items-center gap-2 pl-4 transition-colors hover:text-emerald-deep disabled:opacity-50"
                >
                  {state === "submitting" ? "Joining…" : "Sign Up"}
                  <ArrowRight size={16} strokeWidth={1.25} />
                </button>
              </div>
              <p id={`${id}-msg`} role="status" aria-live="polite" className="mt-4 min-h-[2.5rem] text-sm text-ink/85">
                {error ? <span className="font-medium text-emerald-deep">{error}</span> : state !== "idle" && state !== "submitting" && messages[state]}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
