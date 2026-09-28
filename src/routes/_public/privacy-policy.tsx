import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Garg Dental Pvt. Ltd." },
      {
        name: "description",
        content:
          "How Garg Dental Pvt. Ltd. collects, uses and protects personal information submitted through this website.",
      },
      {
        property: "og:title",
        content: "Privacy Policy — Garg Dental",
      },
      {
        property: "og:description",
        content:
          "Our approach to privacy and handling of customer information.",
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

  component: () => (
    <>
      {/* =========================================================
          PRIVACY POLICY HEADER
      ========================================================== */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-page py-10 md:py-14">

          {/* Breadcrumb */}
          <div className="mb-7 flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-slate-500">Home</span>

            <span className="text-slate-300">/</span>

            <span className="font-medium text-[#0B2A55]">
              Privacy Policy
            </span>
          </div>

          {/* Eyebrow */}
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-[#0B2A55]/40" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0B2A55]/70">
              Legal & Privacy
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold tracking-tight text-[#0B2A55] sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>

          {/* Intro */}
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Our approach to protecting your personal information and
            maintaining your privacy when using the Garg Dental website.
          </p>
        </div>
      </section>

      {/* =========================================================
          PRIVACY POLICY CONTENT
      ========================================================== */}
      <main className="bg-white">
        <section className="container-page py-10 sm:py-14 md:py-16">
          <div className="mx-auto max-w-4xl">

            {/* Intro Card */}
            <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7">
              <div className="flex gap-4">
                <div className="mt-1 hidden h-9 w-1 shrink-0 rounded-full bg-[#0B2A55] sm:block" />

                <div>
                  <p className="text-sm font-semibold text-[#0B2A55]">
                    Your privacy matters to us
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Garg Dental Pvt. Ltd. respects your privacy and is
                    committed to protecting the personal information you
                    provide when using our website.
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================================
                POLICY SECTIONS
            ====================================================== */}
            <div className="space-y-0">

              {/* 1. Introduction */}
              <section className="border-b border-slate-200 py-8 first:pt-0 sm:py-10">
                <div className="flex gap-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-[#0B2A55] ring-1 ring-slate-200">
                        01
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                      1. Introduction
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      Garg Dental Pvt. Ltd. respects your privacy and is
                      committed to protecting the personal information you
                      provide when using our website. This Privacy Policy
                      explains what information we may collect, how we use it,
                      and how we protect it.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Information We Collect */}
              <section className="border-b border-slate-200 py-8 sm:py-10">
                <div className="flex gap-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-[#0B2A55] ring-1 ring-slate-200">
                    02
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                      2. Information We Collect
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      When you contact us, submit an enquiry, or request
                      information about our products, we may collect
                      information such as:
                    </p>

                    <ul className="mt-4 space-y-2.5 text-sm leading-7 text-slate-600 sm:text-base">
                      <li className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B2A55]/50" />
                        <span>Name</span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B2A55]/50" />
                        <span>Organisation or company name</span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B2A55]/50" />
                        <span>Email address</span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B2A55]/50" />
                        <span>Phone number</span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B2A55]/50" />
                        <span>Location or address</span>
                      </li>

                      <li className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B2A55]/50" />
                        <span>
                          Information included in your enquiry or message
                        </span>
                      </li>
                    </ul>

                    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                      We may also collect basic technical information about
                      your device and browser when you use our website.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Information */}
              <section className="border-b border-slate-200 py-8 sm:py-10">
                <div className="flex gap-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-[#0B2A55] ring-1 ring-slate-200">
                    03
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                      3. How We Use Your Information
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      Information provided through our website may be used to:
                    </p>

                    <ul className="mt-4 space-y-2.5 text-sm leading-7 text-slate-600 sm:text-base">
                      {[
                        "Respond to product enquiries",
                        "Provide product information and quotations",
                        "Communicate with customers",
                        "Provide customer support",
                        "Process and manage enquiries or orders",
                        "Improve our website and services",
                        "Maintain website security",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B2A55]/50" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. Sharing */}
              <section className="border-b border-slate-200 py-8 sm:py-10">
                <div className="flex gap-5">
                  <SectionNumber number="04" />

                  <div className="min-w-0">
                    <SectionTitle title="4. Sharing of Information" />

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      Garg Dental Pvt. Ltd. does not sell or rent your personal
                      information for marketing purposes.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      Information may be shared with trusted service providers
                      when necessary to provide website, communication,
                      delivery, payment, or other services related to your
                      enquiry or order.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Security */}
              <section className="border-b border-slate-200 py-8 sm:py-10">
                <div className="flex gap-5">
                  <SectionNumber number="05" />

                  <div className="min-w-0">
                    <SectionTitle title="5. Data Security" />

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      We take reasonable measures to protect personal
                      information against unauthorized access, alteration,
                      disclosure, or destruction.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      However, no method of transmitting or storing information
                      electronically can be guaranteed to be completely secure.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Cookies */}
              <section className="border-b border-slate-200 py-8 sm:py-10">
                <div className="flex gap-5">
                  <SectionNumber number="06" />

                  <div className="min-w-0">
                    <SectionTitle title="6. Cookies" />

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      Our website may use cookies or similar technologies to
                      support website functionality and understand how
                      visitors interact with the website.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      You can manage or disable cookies through your browser
                      settings. Some website features may not function properly
                      if cookies are disabled.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Third Party Links */}
              <section className="border-b border-slate-200 py-8 sm:py-10">
                <div className="flex gap-5">
                  <SectionNumber number="07" />

                  <div className="min-w-0">
                    <SectionTitle title="7. Third-Party Links" />

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      Our website may contain links to third-party websites,
                      including social media platforms. Garg Dental Pvt. Ltd.
                      is not responsible for the privacy practices or content
                      of external websites.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. Your Rights */}
              <section className="border-b border-slate-200 py-8 sm:py-10">
                <div className="flex gap-5">
                  <SectionNumber number="08" />

                  <div className="min-w-0">
                    <SectionTitle title="8. Your Rights" />

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      You may contact us if you would like to ask about the
                      personal information we hold about you or request
                      correction of inaccurate information.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      Where applicable, you may also request deletion of your
                      personal information.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. Changes */}
              <section className="border-b border-slate-200 py-8 sm:py-10">
                <div className="flex gap-5">
                  <SectionNumber number="09" />

                  <div className="min-w-0">
                    <SectionTitle title="9. Changes to This Privacy Policy" />

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      We may update this Privacy Policy from time to time to
                      reflect changes to our website, services, or
                      information-handling practices. Any updates will be
                      published on this page.
                    </p>
                  </div>
                </div>
              </section>

              {/* 10. Contact */}
              <section className="py-8 sm:py-10">
                <div className="flex gap-5">
                  <SectionNumber number="10" />

                  <div className="min-w-0 w-full">
                    <SectionTitle title="10. Contact Us" />

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      If you have any questions about this Privacy Policy or
                      how your information is handled, you can contact Garg
                      Dental Pvt. Ltd.
                    </p>

                    {/* Contact Card */}
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
                      <p className="text-base font-semibold text-[#0B2A55]">
                        Garg Dental Pvt. Ltd.
                      </p>

                      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                        <p>
                          P88H+RFX, Gairidhara Rd,
                          <br />
                          Kathmandu 23690
                        </p>

                        <p>
                          <span className="font-medium text-slate-900">
                            Phone:
                          </span>{" "}
                          <a
                            href="tel:014536276"
                            className="transition-colors hover:text-[#0B2A55]"
                          >
                            01-4536276
                          </a>
                        </p>

                        <p>
                          <span className="font-medium text-slate-900">
                            Email:
                          </span>{" "}
                          <a
                            href="mailto:info@gargdental.com"
                            className="transition-colors hover:text-[#0B2A55]"
                          >
                            info@gargdental.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* =================================================
                LAST UPDATED
            ================================================== */}
            <div className="mt-4 border-t border-slate-200 pt-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                  Privacy Policy
                </p>

                <p className="text-sm text-slate-500">
                  Last updated: August 2026
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  ),
});

/* =============================================================
   SMALL REUSABLE UI HELPERS
============================================================= */

function SectionNumber({ number }: { number: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-[#0B2A55] ring-1 ring-slate-200">
      {number}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
      {title}
    </h2>
  );
}