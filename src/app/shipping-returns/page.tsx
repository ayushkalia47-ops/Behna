import type { Metadata } from "next";
import { DraftNotice, PageIntro, Prose } from "@/components/layout/PageIntro";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Shipping & Returns", alternates: { canonical: "/shipping-returns" } };

export default function ShippingReturnsPage() {
  return (
    <>
      <PageIntro eyebrow="Help" title={<>Shipping &amp; <em>Returns</em></>} />
      <Prose>
        <DraftNotice>
          DRAFT — Behna isn&rsquo;t taking orders yet. Replace this page with your final shipping zones, rates,
          timelines and returns policy before launch (Shopify can generate a returns policy template under
          Settings → Policies).
        </DraftNotice>
        <h2>Shipping</h2>
        <p>Shipping destinations, rates and delivery estimates will be listed here and calculated at checkout.</p>
        <h2>Returns &amp; exchanges</h2>
        <p>Our returns window and conditions for swimwear will be published here before the collection goes on sale.</p>
        <h2>Questions</h2>
        <p>
          Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Prose>
    </>
  );
}
