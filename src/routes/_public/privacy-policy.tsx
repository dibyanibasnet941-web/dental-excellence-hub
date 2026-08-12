import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/_public/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Garg Dental Pvt. Ltd." },
      {
        name: "description",
        content:
          "How Garg Dental Pvt. Ltd. collects, uses and protects information submitted through this website.",
      },
      { property: "og:title", content: "Privacy Policy — Garg Dental" },
      { property: "og:description", content: "Our approach to privacy and data handling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHeader title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
      <section className="container-page max-w-3xl space-y-4 py-12 text-muted-foreground">
        <p>
          This website collects the information you submit through enquiry forms — such as your name,
          organisation, email address, phone number and location — so that our team can respond to your
          request.
        </p>
        <p>
          Enquiry information is stored securely and is used only for responding to your enquiry and
          related follow-up. It is not sold or shared with third parties for marketing purposes.
        </p>
        <p>
          The full, verified privacy policy text for Garg Dental Pvt. Ltd. can be published by the
          company through the admin dashboard.
        </p>
      </section>
    </>
  ),
});
