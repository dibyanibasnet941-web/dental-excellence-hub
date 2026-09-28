import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  Headphones,
  Hospital,
  Lightbulb,
  PlayCircle,
  Settings,
  Stethoscope,
  Wrench,
} from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { EnquiryDialog } from "@/components/site/EnquiryDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import instrumentImage from "@/assets/instruments.jpg";
import { servicesQuery } from "@/lib/queries";

export const Route = createFileRoute("/_public/services")({
  head: () => ({
    meta: [
      {
        title: "Dental Equipment Services & Support — Garg Dental",
      },
      {
        name: "description",
        content:
          "Consultation, clinic setup, installation, maintenance, training and after-sales support for dental practices from Garg Dental Pvt. Ltd.",
      },
      {
        property: "og:title",
        content: "Services & Support — Garg Dental",
      },
      {
        property: "og:description",
        content:
          "Installation, maintenance, training and technical support for dental equipment.",
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

  component: ServicesPage,
});

function getServiceIcon(title: string) {
  const name = title.toLowerCase();

  if (name.includes("consult")) {
    return Stethoscope;
  }

  if (name.includes("clinic") || name.includes("setup")) {
    return Hospital;
  }

  if (name.includes("demonstr")) {
    return PlayCircle;
  }

  if (name.includes("install")) {
    return Settings;
  }

  if (name.includes("technical") || name.includes("support")) {
    return Headphones;
  }

  if (name.includes("maintenance")) {
    return Wrench;
  }

  if (name.includes("after-sales") || name.includes("after sales")) {
    return Handshake;
  }

  if (name.includes("training")) {
    return GraduationCap;
  }

  return Lightbulb;
}

function ServicesPage() {
  const services = useQuery(servicesQuery);
  const rows = services.data ?? [];

  return (
    <>
      {/* Hero */}
      <PageHeader
        eyebrow="Services"
        title="Support that continues after the sale"
        description="From selecting the right equipment to keeping it running, our team supports your practice at every stage."
        crumbs={[{ label: "Services" }]}
        backgroundImage={instrumentImage}
      />

      {/* Services */}
      <section className="container-page py-14 md:py-16">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Our Services
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Complete support for your dental practice
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
            From planning your clinic to maintaining your equipment,
            Garg Dental provides practical support throughout the
            lifecycle of your dental equipment.
          </p>

          {!services.isLoading && rows.length > 0 && (
            <p className="mt-5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {rows.length}
              </span>{" "}
              service{rows.length === 1 ? "" : "s"} available
            </p>
          )}
        </div>

        {services.isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border/80 bg-card/40 px-8 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-5 font-medium">
              No services published yet.
            </p>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Services added in the admin dashboard will be listed here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {rows.map((service) => {
              const Icon = getServiceIcon(service.title);

              return (
                <article
                  key={service.id}
                  className="group flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm shadow-black/[0.02] transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="mt-5">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {service.title}
                    </h3>

                    {service.description && (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {service.description}
                      </p>
                    )}

                    {/* Benefits */}
                    {(service.benefits ?? []).length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {(service.benefits ?? [])
                          .slice(0, 3)
                          .map((benefit: string) => (
                            <li
                              key={benefit}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>

                  {/* Button */}
                  <div className="mt-6 border-t border-border/70 pt-5">
                    <EnquiryDialog
                      productName={service.title}
                      dialogTitle="Talk to an Expert"
                      dialogDescription="Tell us what you need help with and our team will get back to you."
                      fieldLabel="Service"
                      showQuantity={false}
                      trigger={
                        <Button
                          variant="outline"
                          size="sm"
                          className="group/button w-fit"
                        >
                          Talk to an Expert
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                        </Button>
                      }
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="container-page pb-16 md:pb-20">
        <div className="rounded-2xl bg-navy px-6 py-10 text-navy-foreground md:px-10 md:py-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-foreground/70">
                Need assistance?
              </p>

              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Need help choosing the right dental equipment?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-navy-foreground/75 md:text-base">
                Our team can help you select, install and maintain
                the right equipment for your dental practice.
              </p>
            </div>

            <EnquiryDialog
              dialogTitle="Talk to an Expert"
              dialogDescription="Tell us what you need help with and our team will get back to you."
              fieldLabel="Service"
              showQuantity={false}
              trigger={
                <Button
                  size="lg"
                  variant="secondary"
                  className="shrink-0"
                >
                  Talk to an Expert
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
