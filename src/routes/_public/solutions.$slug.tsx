import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, LayoutGrid, Tag } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard, type ProductRow } from "@/components/site/ProductCard";

import {
  brandsQuery,
  categoriesQuery,
  productsQuery,
  solutionsQuery,
} from "@/lib/queries";

export const Route = createFileRoute("/_public/solutions/$slug")({
  head: ({ params }) => {
    const readable = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${readable} — Dental Solutions by Garg Dental`;

    const description = `${readable} solutions from Garg Dental Pvt. Ltd. — practical dental equipment, products and support for modern dental practices.`;

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
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
    };
  },

  component: SolutionDetail,
});

function SolutionDetail() {
  const { slug } = Route.useParams();

  const solutions = useQuery(solutionsQuery);
  const categories = useQuery(categoriesQuery);
  const brands = useQuery(brandsQuery);
  const products = useQuery(productsQuery);

  const solution = (solutions.data ?? []).find(
    (s) => s.slug === slug
  );

  const featured = ((products.data ?? []) as ProductRow[])
    .filter((p) => p.is_featured)
    .slice(0, 4);

  if (!solution) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">
          Solution not found
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          This solution may have been renamed or removed.
        </p>

        <Link
          to="/solutions"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          Back to Solutions
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  const benefits = Array.isArray(solution.benefits)
    ? solution.benefits
    : [];

  return (
    <>
      {/* PAGE HEADER */}
      <PageHeader
        eyebrow="Solution"
        title={solution.title}
        description={solution.overview}
        crumbs={[
          {
            label: "Solutions",
            to: "/solutions",
          },
          {
            label: solution.title,
          },
        ]}
        backgroundImage={solution.image_url ?? undefined}
      />

      {/* MAIN CONTENT */}
      <section className="container-page py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">

          {/* LEFT */}
          <div>

            {/* SOLUTION IMAGE — only shown standalone when it isn't already used in the header */}
            {solution.image_url && (
              <div className="mb-12 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm shadow-black/[0.02]">
                <img
                  src={solution.image_url}
                  alt={solution.title}
                  className="h-auto max-h-[440px] w-full object-cover"
                />
              </div>
            )}

            {/* OVERVIEW */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Overview
              </h2>

              <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-8 text-muted-foreground">
                {solution.body || solution.overview}
              </p>
            </div>

            {/* BENEFITS */}
            {benefits.length > 0 && (
              <div className="mt-14">
                <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Benefits
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-sm shadow-black/[0.02] transition-colors hover:border-primary/30"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                      <p className="text-sm leading-6 text-muted-foreground">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FEATURED PRODUCTS */}
            {featured.length > 0 && (
              <div className="mt-16">
                <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Recommended Products
                </h2>

                <p className="mt-3 text-sm text-muted-foreground">
                  Selected dental equipment and products that support
                  this solution.
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {featured.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">
            <div className="sticky top-24 space-y-8 rounded-2xl border border-border/70 bg-card/60 p-7 shadow-sm shadow-black/[0.02]">

              {/* CATEGORIES */}
              <div>
                <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <LayoutGrid className="h-3.5 w-3.5 text-primary" />
                  Recommended Categories
                </h3>

                <ul className="mt-4 space-y-1">
                  {(categories.data ?? [])
                    .slice(0, 8)
                    .map((category) => (
                      <li key={category.id}>
                        <Link
                          to="/categories/$slug"
                          params={{
                            slug: category.slug,
                          }}
                          className="block rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-muted/60 hover:text-primary"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* BRANDS */}
              {(brands.data ?? []).length > 0 && (
                <div className="border-t border-border/70 pt-8">
                  <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    <Tag className="h-3.5 w-3.5 text-primary" />
                    Related Brands
                  </h3>

                  <ul className="mt-4 space-y-1">
                    {(brands.data ?? [])
                      .slice(0, 8)
                      .map((brand) => (
                        <li key={brand.id}>
                          <Link
                            to="/brands/$slug"
                            params={{
                              slug: brand.slug,
                            }}
                            className="block rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-muted/60 hover:text-primary"
                          >
                            {brand.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                Need assistance?
              </p>

              <h3 className="mt-3 text-xl font-semibold leading-snug">
                Need help choosing the right equipment?
              </h3>

              <p className="mt-3 text-sm leading-6 opacity-80">
                Talk to our team about your dental practice,
                equipment requirements and solution options.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
              >
                Talk to an Expert
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </aside>
        </div>
      </section>
    </>
  );
}
