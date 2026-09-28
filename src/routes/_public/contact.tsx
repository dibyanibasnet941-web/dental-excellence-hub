import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import contactImage from "@/assets/contact-dental.jpg";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact Garg Dental Pvt. Ltd. — Enquiries & Support" },
      {
        name: "description",
        content:
          "Contact Garg Dental Pvt. Ltd. for dental product enquiries, quotations, technical support and clinic setup consultations.",
      },
      {
        property: "og:title",
        content: "Contact Garg Dental Pvt. Ltd.",
      },
      {
        property: "og:description",
        content:
          "Get in touch with Garg Dental for quotations, support and consultations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),

  component: ContactPage,
});

function ContactPage() {
  const { get } = useSiteContent();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fixed contact information
  const phoneNumber = "01-4536276";
  const emailAddress = get("contact.email") || "info@gargdental.com";
  const address = "127 Gairidhara Road, Kathmandu 44600, Nepal";

  const map =
    "https://www.google.com/maps?q=Garg%20Dental%20Pvt.%20Ltd.%2C%20127%20Gairidhara%20Road%2C%20Kathmandu%2044600%2C%20Nepal&z=17&output=embed";

  const phoneHref = `tel:${phoneNumber.replace(/\s/g, "")}`;
  const emailHref = `mailto:${emailAddress}`;

  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <PageHeader
        eyebrow="Contact"
        title="Talk to our team"
        description="Tell us what your practice needs and our specialists will get back to you with recommendations, availability and pricing."
        crumbs={[{ label: "Contact" }]}
        backgroundImage={contactImage}
      />

      {/* =====================================================
          CONTACT INTRO + FORM
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f6fbfc] py-10 md:py-14 lg:py-16">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#A8DADC]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />

        <div className="container-page relative">
          <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            {/* =================================================
                LEFT — CONTACT INFORMATION
            ================================================= */}

            <div className="lg:sticky lg:top-24">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A8DADC]/60 bg-[#A8DADC]/15 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-navy" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy">
                    Garg Dental Pvt. Ltd.
                  </p>
                </div>

                <h2 className="mt-6 text-4xl font-bold tracking-[-0.03em] text-navy md:text-5xl">
                  Let&apos;s talk about
                  <span className="block text-foreground">
                    your dental needs.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground md:text-lg">
                  Our team is here to help with dental equipment, instruments,
                  consumables, technical support and other dental practice
                  needs.
                </p>
              </div>

              {/* Contact information cards */}
              <div className="mt-10 space-y-3">
                {/* Phone */}
                <a
                  href={phoneHref}
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A8DADC] hover:shadow-lg hover:shadow-navy/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-semibold text-foreground transition-colors group-hover:text-navy">
                      {phoneNumber}
                    </p>
                  </div>

                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-navy group-hover:opacity-100" />
                </a>

                {/* Email */}
                <a
                  href={emailHref}
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A8DADC] hover:shadow-lg hover:shadow-navy/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Email
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-foreground transition-colors group-hover:text-navy">
                      {emailAddress}
                    </p>
                  </div>

                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-navy group-hover:opacity-100" />
                </a>

                {/* Address */}
                <div className="flex gap-4 rounded-2xl border border-border/60 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A8DADC] hover:shadow-lg hover:shadow-navy/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Address
                    </p>

                    <p className="mt-1 text-sm font-semibold leading-6 text-foreground">
                      {address}
                    </p>
                  </div>
                </div>

                {/* Business hours */}
                <div className="flex gap-4 rounded-2xl border border-border/60 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A8DADC] hover:shadow-lg hover:shadow-navy/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Business Hours
                    </p>

                    <p className="mt-1 text-sm font-semibold leading-6 text-foreground">
                      Sunday – Friday
                      <br />
                      10:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Small reassurance panel */}
              <div className="mt-6 rounded-2xl border border-[#A8DADC]/50 bg-gradient-to-br from-[#A8DADC]/20 to-white p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-navy">
                      Professional support
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Get product guidance, availability information and
                      support from our team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT — CONTACT FORM
            ================================================= */}

            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-2 rounded-[2rem] bg-[#A8DADC]/15 blur-2xl" />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-white p-6 shadow-[0_20px_60px_rgba(11,42,85,0.08)] md:p-9 lg:p-10">
                {/* Top accent */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-navy via-[#A8DADC] to-navy" />

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy">
                    Contact Us
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-navy md:text-4xl">
                    Send us a message
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                    Tell us what you need — products, quantities and your
                    location — and our team will respond shortly.
                  </p>
                </div>

                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  className="mt-9 space-y-7"
                  onSubmit={async (event) => {
                    event.preventDefault();

                    setIsSubmitting(true);
                    setSuccessMessage("");
                    setErrorMessage("");

                    const form = event.currentTarget;
                    const formData = new FormData(form);

                    const name = String(
                      formData.get("name") || "",
                    ).trim();
                    const email = String(
                      formData.get("email") || "",
                    ).trim();
                    const phone = String(
                      formData.get("phone") || "",
                    ).trim();
                    const message = String(
                      formData.get("message") || "",
                    ).trim();

                    try {
                      const { error } = await supabase
                        .from("enquiries")
                        .insert({
                          name,
                          email,
                          phone,
                          message,
                          source: "contact-page",
                          status: "new",
                        });

                      if (error) {
                        console.error(
                          "Contact form submission error:",
                          error,
                        );

                        setErrorMessage(
                          "Sorry, we could not send your message. Please try again.",
                        );

                        return;
                      }

                      setSuccessMessage(
                        "Thank you! Your message has been submitted successfully.",
                      );

                      form.reset();
                    } catch (error) {
                      console.error("Contact form error:", error);

                      setErrorMessage(
                        "Something went wrong. Please try again.",
                      );
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  {/* Name */}
                  <div className="group">
                    <label
                      htmlFor="contact-name"
                      className="mb-2.5 block text-sm font-semibold text-foreground"
                    >
                      Name
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Enter your Name"
                      required
                      className="h-12 w-full rounded-xl border border-border/80 bg-[#fafcfd] px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-[#A8DADC] focus:bg-white focus:ring-4 focus:ring-[#A8DADC]/15"
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label
                      htmlFor="contact-email"
                      className="mb-2.5 block text-sm font-semibold text-foreground"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Enter a valid email address"
                      required
                      className="h-12 w-full rounded-xl border border-border/80 bg-[#fafcfd] px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-[#A8DADC] focus:bg-white focus:ring-4 focus:ring-[#A8DADC]/15"
                    />
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <label
                      htmlFor="contact-phone"
                      className="mb-2.5 block text-sm font-semibold text-foreground"
                    >
                      Phone Number
                    </label>

                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                      className="h-12 w-full rounded-xl border border-border/80 bg-[#fafcfd] px-4 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-[#A8DADC] focus:bg-white focus:ring-4 focus:ring-[#A8DADC]/15"
                    />
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label
                      htmlFor="contact-message"
                      className="mb-2.5 block text-sm font-semibold text-foreground"
                    >
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell us what you need..."
                      required
                      className="w-full resize-none rounded-xl border border-border/80 bg-[#fafcfd] px-4 py-3.5 text-sm leading-6 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-[#A8DADC] focus:bg-white focus:ring-4 focus:ring-[#A8DADC]/15"
                    />
                  </div>

                  {/* Terms */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-2 text-sm text-muted-foreground transition-colors hover:bg-[#f7fbfc]">
                    <input
                      type="checkbox"
                      name="terms"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-[#0B2A55]"
                    />

                    <span className="leading-6">
                      I accept the{" "}
                      <a
                        href="/terms"
                        className="font-semibold text-navy underline-offset-4 transition-colors hover:text-[#5c9fa4] hover:underline"
                      >
                        Terms of Service
                      </a>
                    </span>
                  </label>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="group h-12 w-full rounded-xl bg-navy text-white shadow-lg shadow-navy/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy/90 hover:shadow-xl hover:shadow-navy/20 sm:w-auto sm:min-w-[180px]"
                  >
                    {isSubmitting ? "Sending..." : "Submit"}

                    {!isSubmitting && (
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </Button>
                </form>

                {/* Success message */}
                {successMessage && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                    <p>{successMessage}</p>
                  </div>
                )}

                {/* Error message */}
                {errorMessage && (
                  <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* =====================================================
          MAP
      ====================================================== */}

      {map && (
        <section className="bg-[#f8fbfc] py-6 md:py-10">
          <div className="container-page">
            <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A8DADC]/60 bg-white px-4 py-2 shadow-sm">
                  <MapPin className="h-3.5 w-3.5 text-navy" />

                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy">
                    Find Us
                  </p>
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-[-0.025em] text-navy md:text-4xl">
                  Visit Garg Dental
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                  Our team is based in Kathmandu and is ready to support dental
                  professionals across Nepal.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-white p-2 shadow-[0_20px_60px_rgba(11,42,85,0.08)]">
              <div className="pointer-events-none absolute inset-2 z-10 rounded-[1rem] ring-1 ring-inset ring-black/5" />

              <iframe
                src={map}
                title="Garg Dental location map"
                loading="lazy"
                className="h-[320px] w-full rounded-[1rem] border-0 md:h-[450px] lg:h-[500px]"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}