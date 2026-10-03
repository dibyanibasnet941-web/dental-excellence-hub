import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Brain,
  Cross,
  Hospital,
  Image,
  Monitor,
  ShieldCheck,
  Smile,
  Syringe,
} from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import solutionsHeaderImage from "@/assets/solutions-header.jpg";
import { solutionsQuery } from "@/lib/queries";

export const Route = createFileRoute("/_public/solutions/")({
  head: () => ({
    meta: [
      {
        title:
          "Dental Solutions — Clinic Setup, Sterilization, Digital Dentistry",
      },
      {
        name: "description",
        content:
          "Solution-led dental offerings from Garg Dental: complete clinic setup, sterilization and infection control, digital dentistry, imaging, implantology and more.",
      },
      {
        property: "og:title",
        content: "Dental Solutions — Garg Dental",
      },
      {
        property: "og:description",
        content:
          "Solution-based dental offerings for clinics, hospitals and laboratories.",
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

  component: SolutionsPage,
});

function getSolutionIcon(title: string) {
  const name = title.toLowerCase();

  if (name.includes("clinic") || name.includes("setup")) {
    return Hospital;
  }

  if (
    name.includes("sterilization") ||
    name.includes("infection") ||
    name.includes("control")
  ) {
    return ShieldCheck;
  }

  if (name.includes("digital")) {
    return Monitor;
  }

  if (name.includes("imaging")) {
    return Image;
  }

  if (name.includes("implant")) {
    return Syringe;
  }

  if (name.includes("oral") || name.includes("surgery")) {
    return Cross;
  }

  if (name.includes("endodont")) {
    return Brain;
  }

  if (name.includes("orthodont")) {
    return Smile;
  }

  return ShieldCheck;
}

function SolutionsPage() {
  const solutions = useQuery(solutionsQuery);
  const rows = solutions.data ?? [];

  return (
    <>
      {/* Hero */}
      <PageHeader
        eyebrow="Solutions"
        title="Solutions for every part of your practice"
        description="Instead of browsing product by product, start from the outcome you need."
        crumbs={[{ label: "Solutions" }]}
        backgroundImage={solutionsHeaderImage}
        tall
        imagePosition="center 40%"
      />

      {/* Solutions */}
      <section className="bg-[#f8fbfc] py-14 md:py-16 lg:py-20">
        <div className="container-page">
          {/* Section Introduction */}
          <div className="mb-10 max-w-3xl md:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
              Our Solutions
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy md:text-3xl lg:text-4xl">
              Complete solutions for modern dental practices
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Explore solutions designed to support every stage of your
              dental practice, from clinic setup and infection control to
              advanced digital dentistry and specialized treatments.
            </p>

            {!solutions.isLoading && rows.length > 0 && (
              <p className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-navy">
                  {rows.length}
                </span>{" "}
                solution{rows.length === 1 ? "" : "s"} available
              </p>
            )}
          </div>

          {/* Loading State */}
          {solutions.isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="min-h-[270px] rounded-xl border border-border/70 bg-white p-6"
                >
                  <Skeleton className="h-12 w-12 rounded-xl" />

                  <Skeleton className="mt-6 h-6 w-3/4 rounded-md" />

                  <Skeleton className="mt-4 h-4 w-full rounded-md" />
                  <Skeleton className="mt-2 h-4 w-5/6 rounded-md" />
                  <Skeleton className="mt-2 h-4 w-2/3 rounded-md" />

                  <div className="mt-8 border-t border-border/70 pt-5">
                    <Skeleton className="h-4 w-24 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : rows.length === 0 ? (
            /* Empty State */
            <div className="rounded-xl border border-dashed border-border bg-white px-6 py-16 text-center md:px-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#A8DADC]/20 text-navy">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <p className="mt-5 font-semibold text-navy">
                No solutions published yet.
              </p>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Solutions added in the admin dashboard will be listed here.
              </p>
            </div>
          ) : (
            /* Solution Cards */
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((solution) => {
                const Icon = getSolutionIcon(solution.title);

                return (
                  <Link
                    key={solution.id}
                    to="/solutions/$slug"
                    params={{ slug: solution.slug }}
                    className="group flex min-h-[270px] flex-col rounded-xl border border-border/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A8DADC] hover:shadow-md md:p-7"
                  >
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A8DADC]/20 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                      <Icon className="h-5.5 w-5.5" />
                    </div>

                    {/* Content */}
                    <div className="mt-6">
                      <h2 className="text-lg font-semibold tracking-tight text-navy md:text-xl">
                        {solution.title}
                      </h2>

                      {solution.overview && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                          {solution.overview}
                        </p>
                      )}
                    </div>

                    {/* Learn More */}
                    <div className="mt-auto border-t border-border/70 pt-5">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#f8fbfc] pb-14 md:pb-18 lg:pb-20">
        <div className="container-page">
          <div className="rounded-xl bg-navy px-6 py-9 text-white md:px-10 md:py-11 lg:px-12">
            <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                  Need help?
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                  Not sure which solution is right for your practice?
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 md:text-base">
                  Talk to our team and get guidance on the right equipment,
                  technology and setup for your dental practice.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-navy transition-all duration-300 hover:bg-[#A8DADC] hover:text-navy"
              >
                Contact Our Team
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}