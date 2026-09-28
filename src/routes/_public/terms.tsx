import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/_public/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Garg Dental Pvt. Ltd." },
      {
        name: "description",
        content:
          "Terms and conditions for using the Garg Dental Pvt. Ltd. website and enquiry services.",
      },
      {
        property: "og:title",
        content: "Terms & Conditions — Garg Dental",
      },
      {
        property: "og:description",
        content:
          "Terms governing use of the Garg Dental website, product information and enquiry services.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      {/* =========================================================
          PAGE HEADER
      ========================================================== */}
      <PageHeader
        eyebrow="Legal & Terms"
        title="Terms & Conditions"
        description="Please read these terms before using the Garg Dental website and enquiry services."
        crumbs={[{ label: "Terms & Conditions" }]}
      />

      {/* =========================================================
          TERMS CONTENT
      ========================================================== */}
      <main className="bg-white">
        <section className="container-page py-10 sm:py-14 md:py-16">
          <div className="mx-auto max-w-4xl">

            {/* Introduction Card */}
            <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7">
              <div className="flex gap-4">
                <div className="mt-1 h-10 w-1 shrink-0 rounded-full bg-[#0B2A55]" />

                <div>
                  <p className="text-sm font-semibold text-[#0B2A55]">
                    Please read these terms carefully
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                    These Terms & Conditions explain the rules and
                    conditions that apply when using the Garg Dental
                    website, product information and enquiry services.
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================================
                TERMS SECTIONS
            ====================================================== */}
            <div className="space-y-0">

              {/* 01 Website Use */}
              <TermSection
                number="01"
                title="1. Website Use"
              >
                <p>
                  This website is provided to help visitors learn about Garg
                  Dental Pvt. Ltd., its dental products, services and
                  solutions. By using this website, you agree to use it only
                  for lawful purposes and in a manner that does not interfere
                  with the operation or security of the website.
                </p>
              </TermSection>

              {/* 02 Product Information */}
              <TermSection
                number="02"
                title="2. Product Information"
              >
                <p>
                  We make reasonable efforts to ensure that product names,
                  descriptions, images, specifications and other information
                  displayed on the website are accurate and up to date.
                  However, product information may change without prior
                  notice.
                </p>

                <p>
                  Product images are provided for reference and may differ
                  slightly from the actual product.
                </p>
              </TermSection>

              {/* 03 Pricing */}
              <TermSection
                number="03"
                title="3. Pricing and Availability"
              >
                <p>
                  Product availability and pricing may vary depending on
                  stock, supplier information, specifications and other
                  factors. Current pricing and availability will be confirmed
                  by Garg Dental Pvt. Ltd. at the time of quotation.
                </p>
              </TermSection>

              {/* 04 Enquiries */}
              <TermSection
                number="04"
                title="4. Product Enquiries and Quotations"
              >
                <p>
                  Submitting an enquiry through the website does not
                  constitute an order or create a contractual obligation to
                  purchase a product.
                </p>

                <p>
                  Our team may contact you to discuss product requirements,
                  availability, pricing and other details before providing a
                  quotation.
                </p>
              </TermSection>

              {/* 05 Orders */}
              <TermSection
                number="05"
                title="5. Orders and Confirmation"
              >
                <p>
                  Orders are subject to confirmation by Garg Dental Pvt. Ltd.
                  An enquiry, quotation request or communication through this
                  website does not automatically constitute acceptance of an
                  order.
                </p>
              </TermSection>

              {/* 06 Intellectual Property */}
              <TermSection
                number="06"
                title="6. Intellectual Property"
              >
                <p>
                  Unless otherwise stated, the content of this website,
                  including text, graphics, logos, images and other materials,
                  is owned by or used with permission by Garg Dental Pvt. Ltd.
                </p>

                <p>
                  Website content may not be copied, reproduced, modified or
                  distributed without appropriate permission.
                </p>
              </TermSection>

              {/* 07 Third Party */}
              <TermSection
                number="07"
                title="7. Third-Party Websites"
              >
                <p>
                  The website may contain links to third-party websites or
                  services. These websites are operated independently and Garg
                  Dental Pvt. Ltd. is not responsible for their content,
                  availability or policies.
                </p>
              </TermSection>

              {/* 08 Information */}
              <TermSection
                number="08"
                title="8. Information Submitted Through the Website"
              >
                <p>
                  Information submitted through enquiry or contact forms may
                  be used by Garg Dental Pvt. Ltd. to respond to enquiries,
                  provide quotations, discuss products and provide requested
                  support.
                </p>
              </TermSection>

              {/* 09 Availability */}
              <TermSection
                number="09"
                title="9. Website Availability"
              >
                <p>
                  We aim to keep the website available and functioning
                  properly. However, temporary interruptions may occur due to
                  maintenance, technical issues, updates or circumstances
                  beyond our control.
                </p>
              </TermSection>

              {/* 10 Changes */}
              <TermSection
                number="10"
                title="10. Changes to These Terms"
              >
                <p>
                  Garg Dental Pvt. Ltd. may update these Terms & Conditions
                  from time to time. Updated terms will be published on this
                  page.
                </p>
              </TermSection>

              {/* 11 Contact */}
              <section className="py-8 sm:py-10">
                <div className="flex gap-5">
                  <SectionNumber number="11" />

                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                      11. Contact Us
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      If you have any questions about these Terms &
                      Conditions, please contact Garg Dental Pvt. Ltd.
                      through the contact information provided on our
                      Contact Us page.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* =====================================================
                IMPORTANT NOTICE
            ====================================================== */}
            <div className="mt-4 rounded-2xl border border-[#A8DADC]/70 bg-[#A8DADC]/10 p-6 sm:p-7">
              <div className="flex gap-4">
                <div className="mt-1 h-8 w-1 shrink-0 rounded-full bg-[#0B2A55]/50" />

                <div>
                  <p className="text-sm font-semibold text-[#0B2A55]">
                    Important Notice
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    These website terms are intended as general website-use
                    terms. Any official company policies, sales conditions,
                    warranties, delivery terms or other legally binding
                    conditions should be reviewed and approved by Garg Dental
                    Pvt. Ltd. before publication.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}

/* =============================================================
   REUSABLE TERM SECTION
============================================================= */

function TermSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 py-8 sm:py-10">
      <div className="flex gap-5">

        <SectionNumber number={number} />

        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            {title}
          </h2>

          <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
            {children}
          </div>
        </div>

      </div>
    </section>
  );
}

/* =============================================================
   SECTION NUMBER
============================================================= */

function SectionNumber({ number }: { number: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-[#0B2A55] ring-1 ring-slate-200">
      {number}
    </div>
  );
}