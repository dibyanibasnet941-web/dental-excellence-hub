import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Building2, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/site/PageHeader";
import partnerLogos from "@/assets/partner-logos.jpg";
import { defaultBrandLogos } from "@/lib/brandLogos";
import { brandsQuery, categoriesQuery, productsQuery } from "@/lib/queries";
import type { Database } from "@/integrations/supabase/types";
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

type Brand = Database["public"]["Tables"]["brands"]["Row"];

function getBrandLogo(brand: Brand) {
  return brand.logo_url ?? defaultBrandLogos[brand.slug];
}

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
        backgroundImage={partnerLogos}
      />

      <section className="container-page py-14">
        <div className="flex flex-wrap gap-2.5">
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
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border/80 bg-card/40 px-8 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-5 font-medium">No brands published yet.</p>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Brands added in the admin dashboard will be listed here.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                productCount={
                  ((products.data ?? []) as { brand_id: string | null }[]).filter(
                    (p) => p.brand_id === brand.id,
                  ).length
                }
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function BrandCard({ brand, productCount }: { brand: Brand; productCount: number }) {
  const logoUrl = getBrandLogo(brand);

  return (
    <Link
      to="/brands/$slug"
      params={{ slug: brand.slug }}
      className="group flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm shadow-black/[0.02] transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex h-16 items-center">
        {logoUrl ? (
          <>
            <img
              src={logoUrl}
              alt={`${brand.name} logo`}
              loading="lazy"
              className="max-h-12 max-w-[70%] object-contain"
              onError={(event) => {
                event.currentTarget.classList.add("hidden");
                event.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="hidden text-lg font-bold tracking-tight">{brand.name}</span>
          </>
        ) : (
          <span className="text-lg font-bold tracking-tight">{brand.name}</span>
        )}
      </div>

      <h2 className="mt-5 text-base font-semibold transition-colors group-hover:text-primary">
        {brand.name}
      </h2>

      {brand.country && (
        <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-primary/60" />
          {brand.country}
        </p>
      )}

      {brand.description && (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {brand.description}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {productCount} product{productCount === 1 ? "" : "s"}
        </span>
      </div>
    </Link>
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
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
        active
          ? "border-navy bg-navy text-navy-foreground shadow-sm"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {active && <Check className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}
