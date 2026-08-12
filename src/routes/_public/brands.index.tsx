import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/site/PageHeader";
import { CTASection } from "@/components/site/CTASection";
import { brandsQuery, categoriesQuery, productsQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_public/brands/")({
  head: () => ({
    meta: [
      { title: "Dental Brands We Supply — Garg Dental Pvt. Ltd." },
      {
        name: "description",
        content:
          "Directory of dental equipment, instrument and consumable brands supplied by Garg Dental Pvt. Ltd. in Nepal.",
      },
      { property: "og:title", content: "Dental Brands — Garg Dental" },
      {
        property: "og:description",
        content: "Explore the dental brands available through Garg Dental Pvt. Ltd.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const brands = useQuery(brandsQuery);
  const products = useQuery(productsQuery);
  const categories = useQuery(categoriesQuery);
  const [filter, setFilter] = useState("all");

  const rows = (brands.data ?? []).filter((brand) => {
    if (filter === "all") return true;
    return ((products.data ?? []) as { brand_id: string | null; categories?: { slug: string } | null }[]).some(
      (p) => p.brand_id === brand.id && p.categories?.slug === filter,
    );
  });

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Brands"
        description="The manufacturers and suppliers behind the products in our catalogue."
        crumbs={[{ label: "Brands" }]}
      />

      <section className="container-page py-12">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            All Brands
          </FilterChip>
          {(categories.data ?? []).slice(0, 8).map((c) => (
            <FilterChip key={c.id} active={filter === c.slug} onClick={() => setFilter(c.slug)}>
              {c.name}
            </FilterChip>
          ))}
        </div>

        {brands.isLoading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-44" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-10 rounded-md border border-dashed border-border p-12 text-center">
            <p className="font-medium">No brands published yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Brands added in the admin dashboard will be listed here.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map((brand) => (
              <Link
                key={brand.id}
                to="/brands/$slug"
                params={{ slug: brand.slug }}
                className="group flex flex-col rounded-md border border-border bg-card p-6 transition-shadow hover:shadow-elevated"
              >
                <div className="flex h-16 items-center">
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={`${brand.name} logo`}
                      loading="lazy"
                      className="max-h-12 max-w-[70%] object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold tracking-tight">{brand.name}</span>
                  )}
                </div>
                <h2 className="mt-4 text-base font-semibold group-hover:text-accent">{brand.name}</h2>
                {brand.country && (
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {brand.country}
                  </p>
                )}
                {brand.description && (
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{brand.description}</p>
                )}
                <span className="mt-4 text-xs text-muted-foreground">
                  {
                    ((products.data ?? []) as { brand_id: string | null }[]).filter(
                      (p) => p.brand_id === brand.id,
                    ).length
                  }{" "}
                  products
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Button asChild variant="outline">
            <Link to="/products">Browse all products</Link>
          </Button>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-sm border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-accent",
        active ? "bg-navy text-navy-foreground border-navy" : "bg-card text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}
