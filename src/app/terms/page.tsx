import type { Metadata } from "next";
import { DraftNotice, PageIntro, Prose } from "@/components/layout/PageIntro";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title={<>Terms of <em>Service</em></>} />
      <Prose>
        <DraftNotice>
          DRAFT — replace with terms of service prepared for your business before accepting orders (Shopify provides
          a template under Settings → Policies).
        </DraftNotice>
        <p>
          This is a preview of the Behna Bikinis website. Products, prices and imagery shown are samples and
          placeholders, and no orders can be placed.
        </p>
      </Prose>
    </>
  );
}
