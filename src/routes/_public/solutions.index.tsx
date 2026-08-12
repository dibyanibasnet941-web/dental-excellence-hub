import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { CTASection } from "@/components/site/CTASection";
import { solutionsQuery } from "@/lib/queries";

export const Route = createFileRoute("/_public/solutions/")({
  head: () => ({
    meta: [
      { title: "Dental Solutions — Clinic Setup, Sterilization, Digital Dentistry" },
      {
        name: "description",
        content:
          "Solution-led dental offerings from Garg Dental: complete clinic setup, sterilization and infection control, digital dentistry, imaging, implantology and more.",
      },
      { property: "og:title", content: "Dental Solutions — Garg Dental" },
      {
        property: "og:description",
        content: "Solution-based dental offerings for clinics, hospitals and laboratories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const solutions = useQuery(solutionsQuery);

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Solutions for every part of your practice"
        description="Instead of browsing product by product, start from the outcome you need."
        crumbs={[{ label: "Solutions" }]}
      />

      <section className="container-page py-12">
        <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {(solutions.data ?? []).map((solution) => (
            <Link
              key={solution.id}
              to="/solutions/$slug"
              params={{ slug: solution.slug }}
              className="group bg-card p-7 transition-colors hover:bg-surface"
            >
              <h2 className="text-lg font-semibold">{solution.title}</h2>
              {solution.overview && (
                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{solution.overview}</p>
              )}
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection title="Talk to Our Team" />
    </>
  );
}
