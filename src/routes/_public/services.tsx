import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { CTASection } from "@/components/site/CTASection";
import { EnquiryDialog } from "@/components/site/EnquiryDialog";
import { Button } from "@/components/ui/button";
import { servicesQuery } from "@/lib/queries";

export const Route = createFileRoute("/_public/services")({
  head: () => ({
    meta: [
      { title: "Dental Equipment Services & Support — Garg Dental" },
      {
        name: "description",
        content:
          "Consultation, clinic setup, installation, maintenance, training and after-sales support for dental practices from Garg Dental Pvt. Ltd.",
      },
      { property: "og:title", content: "Services & Support — Garg Dental" },
      {
        property: "og:description",
        content: "Installation, maintenance, training and technical support for dental equipment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const services = useQuery(servicesQuery);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Support that continues after the sale"
        description="From selecting the right equipment to keeping it running, our team supports your practice at every stage."
        crumbs={[{ label: "Services" }]}
      />

      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {(services.data ?? []).map((service) => (
            <article
              key={service.id}
              className="flex flex-col overflow-hidden rounded-md border border-border bg-card"
            >
              {service.image_url && (
                <img
                  src={service.image_url}
                  alt={service.title}
                  loading="lazy"
                  className="aspect-16/9 w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-7">
                <h2 className="text-lg font-semibold">{service.title}</h2>
                {service.description && (
                  <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
                )}
                {(service.benefits ?? []).length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm">
                    {(service.benefits ?? []).map((benefit: string) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-6">
                  <EnquiryDialog
                    productName={service.title}
                    trigger={
                      <Button variant="outline" size="sm">
                        Talk to an Expert
                      </Button>
                    }
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
