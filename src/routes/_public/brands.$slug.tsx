import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard, type ProductRow } from "@/components/site/ProductCard";
import { brandsQuery, productsQuery } from "@/lib/queries";
import { ArrowRight, Package, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_public/brands/$slug")({
  head: ({ params }) => {
    const readable = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${readable} Dental Products — Garg Dental`;
    const description = `Products available from ${readable} through Garg Dental Pvt. Ltd. Request a quote for your clinic or laboratory.`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },

  component: BrandDetail,
});

function BrandDetail() {
  const { slug } = Route.useParams();

  const brands = useQuery(brandsQuery);
  const products = useQuery(productsQuery);

  const brand = (brands.data ?? []).find((b) => b.slug === slug);

  const rows = ((products.data ?? []) as ProductRow[]).filter(
    (p) => p.brands?.slug === slug
  );

  const categories = Array.from(
    new Set(
      rows
        .map((p) => p.categories?.name)
        .filter(Boolean)
    )
  );

  const brandName =
    brand?.name ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* =========================================================
          BRAND HEADER
      ========================================================== */}
      <PageHeader
        eyebrow={brand?.country ?? "Trusted Dental Brand"}
        title={brandName}
        {...(brand?.description
          ? { description: brand.description }
          : {})}
        crumbs={[
          { label: "Brands", to: "/brands" },
          { label: brandName },
        ]}
      >
        {categories.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {categories.map((name) => (
              <span
                key={name}
                className="
                  inline-flex items-center
                  rounded-full
                  border border-border/70
                  bg-background/80
                  px-4 py-2
                  text-xs font-medium
                  text-foreground/75
                  shadow-sm
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:border-foreground/20
                  hover:bg-background
                  hover:shadow-md
                "
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </PageHeader>

      {/* =========================================================
          BRAND CONTENT
      ========================================================== */}
      <main className="bg-muted/20">
        <section className="container-page py-10 sm:py-14 lg:py-16">

          {/* TOP INFO BAR */}
          <div
            className="
              mb-8
              flex flex-col gap-5
              rounded-2xl
              border border-border/60
              bg-background
              p-5
              shadow-sm
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-6
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-foreground
                  text-background
                  shadow-sm
                "
              >
                <Package className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-tight">
                  {rows.length}{" "}
                  {rows.length === 1 ? "product" : "products"} available
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Explore the {brandName} collection
                </p>
              </div>
            </div>

            <Link
              to="/products"
              className="
                group
                inline-flex items-center gap-2
                text-sm font-medium
                text-foreground
                transition-colors
                hover:text-muted-foreground
              "
            >
              View complete catalogue
              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>

          {/* =====================================================
              PRODUCT SECTION
          ====================================================== */}
          {rows.length === 0 ? (
            <div
              className="
                relative overflow-hidden
                rounded-3xl
                border border-dashed border-border
                bg-background
                px-6 py-16
                text-center
                shadow-sm
                sm:px-10
                sm:py-20
              "
            >
              {/* Decorative background */}
              <div
                className="
                  pointer-events-none
                  absolute -right-20 -top-20
                  h-48 w-48
                  rounded-full
                  bg-muted/60
                  blur-3xl
                "
              />

              <div className="relative mx-auto max-w-md">
                <div
                  className="
                    mx-auto mb-6
                    flex h-16 w-16
                    items-center justify-center
                    rounded-2xl
                    border border-border
                    bg-muted/40
                  "
                >
                  <Sparkles className="h-7 w-7 text-muted-foreground" />
                </div>

                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Products coming soon
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  No products have been published for this brand yet.
                  Explore our complete catalogue to discover other
                  dental products and solutions.
                </p>

                <Button
                  asChild
                  className="
                    mt-7
                    h-11
                    rounded-xl
                    px-6
                    shadow-sm
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-md
                  "
                >
                  <Link to="/products">
                    Browse full catalogue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* SECTION HEADING */}
              <div className="mb-7 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-px w-7 bg-foreground/40" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Product Collection
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {brandName} products
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Browse our available {brandName} products for
                    dental clinics, laboratories and healthcare
                    professionals.
                  </p>
                </div>

                <div
                  className="
                    hidden shrink-0
                    rounded-full
                    border border-border
                    bg-background
                    px-4 py-2
                    text-xs font-medium
                    text-muted-foreground
                    sm:block
                  "
                >
                  {rows.length}{" "}
                  {rows.length === 1 ? "Product" : "Products"}
                </div>
              </div>

              {/* PRODUCT GRID */}
              <div
                className="
                  grid
                  gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                "
              >
                {rows.map((product, index) => (
                  <div
                    key={product.id}
                    className="
                      group
                      animate-in
                      fade-in
                      slide-in-from-bottom-3
                      duration-500
                    "
                    style={{
                      animationDelay: `${Math.min(index * 60, 500)}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div
                      className="
                        h-full
                        transition-all duration-300
                        group-hover:-translate-y-1
                      "
                    >
                      <ProductCard product={product} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* =======================================================
            BOTTOM CTA
        ======================================================== */}
        {rows.length > 0 && (
          <section className="container-page pb-14 sm:pb-20">
            <div
              className="
                relative overflow-hidden
                rounded-3xl
                border border-border/60
                bg-foreground
                px-6 py-10
                text-background
                shadow-lg
                sm:px-10
                sm:py-12
              "
            >
              {/* Decorative elements */}
              <div
                className="
                  pointer-events-none
                  absolute -right-24 -top-24
                  h-64 w-64
                  rounded-full
                  bg-background/10
                  blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute -bottom-32 left-1/3
                  h-64 w-64
                  rounded-full
                  bg-background/5
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  flex flex-col gap-7
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >
                <div className="max-w-2xl">
                  <p
                    className="
                      mb-3
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-background/60
                    "
                  >
                    Need assistance?
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-semibold
                      tracking-tight
                      sm:text-3xl
                    "
                  >
                    Looking for the right {brandName} product?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-background/65 sm:text-base">
                    Explore the full catalogue or get in touch with
                    our team for product information and enquiries.
                  </p>
                </div>

                <Button
                  asChild
                  variant="secondary"
                  className="
                    group
                    h-11
                    shrink-0
                    rounded-xl
                    px-6
                    shadow-sm
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-lg
                  "
                >
                  <Link to="/products">
                    Explore catalogue
                    <ArrowRight
                      className="
                        ml-2 h-4 w-4
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}