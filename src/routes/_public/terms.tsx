import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/_public/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Garg Dental Pvt. Ltd." },
      {
        name: "description",
        content: "Terms and conditions for using the Garg Dental Pvt. Ltd. website and enquiry services.",
      },
      { property: "og:title", content: "Terms & Conditions — Garg Dental" },
      { property: "og:description", content: "Terms governing use of this website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHeader title="Terms & Conditions" crumbs={[{ label: "Terms & Conditions" }]} />
      <section className="container-page max-w-3xl space-y-4 py-12 text-muted-foreground">
        <p>
          Product information on this website is provided for reference. Specifications, availability
          and pricing are confirmed at the time of quotation.
        </p>
        <p>
          Submitting an enquiry does not constitute an order. Orders are confirmed in writing by Garg
          Dental Pvt. Ltd.
        </p>
        <p>
          The full, verified terms and conditions for Garg Dental Pvt. Ltd. can be published by the
          company through the admin dashboard.
        </p>
      </section>
    </>
  ),
});
