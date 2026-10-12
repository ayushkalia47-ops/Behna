import type { Metadata } from "next";
import { DraftNotice, PageIntro, Prose } from "@/components/layout/PageIntro";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title={<>Privacy <em>Policy</em></>} />
      <Prose>
        <DraftNotice>
          DRAFT — replace with a privacy policy prepared for your business and the regions you sell to (Shopify
          provides a generator under Settings → Policies). Update it when you connect email marketing or analytics.
        </DraftNotice>
        <h2>What this preview site collects</h2>
        <p>
          This preview site doesn&rsquo;t collect personal data. Items you add to your bag are stored only in your own
          browser (local storage) and are never sent to us. The waitlist form does not store emails until an email
          provider is connected.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about privacy: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Prose>
    </>
  );
}
