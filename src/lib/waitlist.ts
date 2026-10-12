/**
 * Waitlist signups.
 *
 * Nothing is stored until NEXT_PUBLIC_WAITLIST_ENDPOINT is set (see .env.example).
 * The endpoint receives POST { email, source } as JSON. Options:
 *  - Klaviyo: point this at a small API route that calls Klaviyo's
 *    "Create Client Subscription" endpoint with your public company id + list id.
 *  - Shopify: once the store is live, create a customer with
 *    acceptsMarketing=true via the Storefront API `customerCreate` mutation.
 *  - Any form service (Formspree, Zapier, Make) that accepts JSON.
 */
export type WaitlistResult = "ok" | "not-configured" | "error";

const endpoint = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function joinWaitlist(email: string): Promise<WaitlistResult> {
  if (!endpoint) return "not-configured";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, source: "website-waitlist" }),
    });
    return res.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}
