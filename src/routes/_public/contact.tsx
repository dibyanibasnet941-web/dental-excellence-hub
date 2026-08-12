import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { EnquiryDialog } from "@/components/site/EnquiryDialog";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact Garg Dental Pvt. Ltd. — Enquiries & Support" },
      {
        name: "description",
        content:
          "Contact Garg Dental Pvt. Ltd. for dental product enquiries, quotations, technical support and clinic setup consultations.",
      },
      { property: "og:title", content: "Contact Garg Dental Pvt. Ltd." },
      { property: "og:description", content: "Get in touch for quotations, support and consultations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { get } = useSiteContent();
  const phone = get("contact.phone");
  const email = get("contact.email");
  const address = get("contact.address");
  const hours = get("contact.hours");
  const whatsapp = get("contact.whatsapp");
  const map = get("contact.map_embed_url");

  const details = [
    { icon: Phone, label: "Phone", value: phone, href: phone ? `tel:${phone.replace(/\s/g, "")}` : "" },
    { icon: Mail, label: "Email", value: email, href: email ? `mailto:${email}` : "" },
    { icon: MapPin, label: "Address", value: address, href: "" },
    { icon: Clock, label: "Business hours", value: hours, href: "" },
  ].filter((d) => d.value);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to our team"
        description="Send us an enquiry and our specialists will get back to you with recommendations, availability and pricing."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold">Company contact information</h2>
          {details.length === 0 ? (
            <p className="mt-4 text-muted-foreground">
              Contact details will appear here once the Garg Dental team adds them in the admin
              dashboard.
            </p>
          ) : (
            <dl className="mt-6 space-y-5">
              {details.map((detail) => (
                <div key={detail.label} className="flex gap-4">
                  <detail.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {detail.label}
                    </dt>
                    <dd className="text-sm font-medium">
                      {detail.href ? (
                        <a href={detail.href} className="hover:text-accent">
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <EnquiryDialog trigger={<Button>Request a Quote</Button>} />
            {whatsapp && (
              <Button asChild variant="outline">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            )}
          </div>

          {map && (
            <div className="mt-10 overflow-hidden rounded-md border border-border">
              <iframe
                src={map}
                title="Garg Dental location map"
                loading="lazy"
                className="h-[320px] w-full border-0"
              />
            </div>
          )}
        </div>

        <div className="surface-panel rounded-md border border-border p-8">
          <h2 className="text-xl font-semibold">Send an enquiry</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us what you need — products, quantities and your location — and we will respond
            shortly.
          </p>
          <div className="mt-6">
            <EnquiryDialog trigger={<Button className="w-full">Open enquiry form</Button>} />
          </div>
        </div>
      </section>
    </>
  );
}
