import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  PackageSearch,
  Search,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

import productImage from "@/assets/product.jpg";

import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  brandsQuery,
  categoriesQuery,
  productsQuery,
} from "@/lib/queries";
import { AVAILABILITY_OPTIONS } from "@/lib/site";

type Search = {
  q?: string | undefined;
  category?: string | undefined;
  brand?: string | undefined;
  page?: number | undefined;
};

export const Route = createFileRoute("/_public/products/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category:
      typeof search["category"] === "string"
        ? search["category"]
        : undefined,
    brand:
      typeof search["brand"] === "string"
        ? search["brand"]
        : undefined,
    page:
      typeof search["page"] === "number"
        ? search["page"]
        : undefined,
  }),

  head: () => ({
    meta: [
      {
        title: "Dental Products Catalogue — Garg Dental Pvt. Ltd.",
      },
      {
        name: "description",
        content:
          "Browse dental equipment, instruments, consumables, sterilization, radiology and laboratory products. Search by category or brand and request a quote.",
      },
      {
        property: "og:title",
        content: "Dental Products Catalogue — Garg Dental",
      },
      {
        property: "og:description",
        content:
          "Search dental products by category, brand and availability, then request a quote.",
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

  component: ProductsPage,
});

const PAGE_SIZE = 12;

function ProductsPage() {
  const search = Route.useSearch();
const navigate = Route.useNavigate();

const pageSize = PAGE_SIZE;
const currentPage = search.page ?? 1;

const [term, setTerm] = useState(search.q ?? "");
const [availability, setAvailability] = useState<string[]>([]);

const [flags, setFlags] = useState<{
  featured: boolean;
  isNew: boolean;
}>({
  featured: false,
  isNew: false,
});

const [sort, setSort] = useState("newest");
useEffect(() => {
  if (term === (search.q ?? "")) return;
  const t = setTimeout(() => {
    void navigate({
      search: (prev) => ({ ...prev, q: term || undefined, page: 1 }),
    });
  }, 400);
  return () => clearTimeout(t);
}, [term]);

const categorySlug = search.category;
const brandSlug = search.brand;

const products = useQuery(
  productsQuery({
    page: currentPage,
    pageSize: PAGE_SIZE,
    ...(search.q ? { search: search.q } : {}),
    ...(categorySlug ? { category: categorySlug } : {}),
    ...(brandSlug ? { brand: brandSlug } : {}),
    ...(availability.length > 0 ? { availability } : {}),
    ...(flags.featured ? { featured: true } : {}),
    ...(flags.isNew ? { isNew: true } : {}),
    ...(sort ? { sort } : {}),
  }),
);

const categories = useQuery(categoriesQuery);
const brands = useQuery(brandsQuery);

const totalProducts = products.data?.total ?? 0;

const totalPages = Math.max(
  1,
  Math.ceil(totalProducts / PAGE_SIZE),
);

const current = Math.min(currentPage, totalPages);

const pageRows = products.data?.products ?? [];
 

  const setFilter = (
  key: "category" | "brand",
  value: string,
) => {
  void navigate({
    search: (prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
      page: 1,
    }),
  });
};

  const activeFilterCount =
    (categorySlug ? 1 : 0) +
    (brandSlug ? 1 : 0) +
    availability.length +
    (flags.featured ? 1 : 0) +
    (flags.isNew ? 1 : 0);

  const filters = (
    <div className="space-y-9">
      {/* Category */}
      <div>
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Category
        </h3>

        <Select
          value={categorySlug ?? "all"}
          onValueChange={(v) =>
            setFilter("category", v)
          }
        >
          <SelectTrigger className="mt-3.5 w-full bg-background">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All categories
            </SelectItem>

            {(categories.data ?? []).map((c) => (
              <SelectItem
                key={c.id}
                value={c.slug}
              >
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand */}
      <div className="border-t border-border/70 pt-8">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Brand
        </h3>

        <Select
          value={brandSlug ?? "all"}
          onValueChange={(v) =>
            setFilter("brand", v)
          }
        >
          <SelectTrigger className="mt-3.5 w-full bg-background">
            <SelectValue placeholder="All brands" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All brands
            </SelectItem>

            {(brands.data ?? []).map((b) => (
              <SelectItem
                key={b.id}
                value={b.slug}
              >
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="border-t border-border/70 pt-8">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Availability
        </h3>

        <div className="mt-3.5 space-y-1">
          {AVAILABILITY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="group flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted/60"
            >
              <Checkbox
                checked={availability.includes(
                  option.value,
                )}
                onCheckedChange={(checked) => {
                  setAvailability((prev) =>
                    checked
                      ? [...prev, option.value]
                      : prev.filter(
                          (v) => v !== option.value,
                        ),
                  );
                }}
              />

              <span className="text-foreground/80 transition-colors group-hover:text-foreground">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="border-t border-border/70 pt-8">
        <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Highlights
        </h3>

        <div className="mt-3.5 space-y-1">
          <label className="group flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted/60">
            <Checkbox
              checked={flags.featured}
              onCheckedChange={(c) =>
                setFlags((f) => ({
                  ...f,
                  featured: !!c,
                }))
              }
            />

            <span className="text-foreground/80 transition-colors group-hover:text-foreground">
              Featured products
            </span>
          </label>

          <label className="group flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted/60">
            <Checkbox
              checked={flags.isNew}
              onCheckedChange={(c) =>
                setFlags((f) => ({
                  ...f,
                  isNew: !!c,
                }))
              }
            />

            <span className="text-foreground/80 transition-colors group-hover:text-foreground">
              New products
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* =========================================================
          PAGE HEADER
      ========================================================== */}
      <PageHeader
        eyebrow="Catalogue"
        title="Dental products"
        description="Equipment, instruments, consumables and solutions for clinics, hospitals and laboratories."
        crumbs={[{ label: "Products" }]}
        backgroundImage={productImage}
      />

      {/* =========================================================
          PRODUCTS CONTENT
      ========================================================== */}
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[272px_1fr] lg:gap-16 lg:py-16">
        {/* Desktop Filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border/70 bg-card/60 p-7 shadow-sm shadow-black/[0.02]">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                Refine results
              </h2>

              {activeFilterCount > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  {activeFilterCount} active
                </span>
              )}
            </div>

            <div className="mt-7">{filters}</div>
          </div>
        </aside>

        <div>
          {/* Search + Sort + Mobile Filters */}
          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/60 p-3 shadow-sm shadow-black/[0.02] sm:flex-row sm:items-center">
            <div className="min-w-[220px] flex-1">
              <Label
                htmlFor="product-search"
                className="sr-only"
              >
                Search products
              </Label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="product-search"
                  placeholder="Search products, brands or product codes…"
                  value={term}
                 onChange={(e) => setTerm(e.target.value)}
                 
                  className="border-transparent bg-background pl-10 shadow-none focus-visible:border-input"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select
                value={sort}
                onValueChange={setSort}
              >
                <SelectTrigger className="w-[176px] gap-2 border-transparent bg-background shadow-none">
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="newest">
                    Featured & New first
                  </SelectItem>

                  <SelectItem value="oldest">
                    Oldest first
                  </SelectItem>

                  <SelectItem value="name">
                    Name A–Z
                  </SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative shrink-0 border-transparent bg-background shadow-none lg:hidden"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-medium text-primary-foreground">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-[86vw] max-w-sm overflow-y-auto"
                >
                  <SheetTitle className="mb-6 flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    Filters
                  </SheetTitle>

                  {filters}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Product Count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {totalProducts}
              </span>{" "}
              product
              {totalProducts === 1 ? "" : "s"}
              {activeFilterCount > 0 ? " · filtered" : ""}
            </p>

            {flags.featured && (
              <span className="hidden items-center gap-1.5 text-xs font-medium text-primary sm:flex">
                <Sparkles className="h-3.5 w-3.5" />
                Featured only
              </span>
            )}
          </div>

          {/* Loading */}
          {products.isLoading ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map(
                (_, i) => (
                  <Skeleton
                    key={i}
                    className="h-80 rounded-2xl"
                  />
                ),
              )}
            </div>
          ) : pageRows.length === 0 ? (
            /* Empty State */
            <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border/80 bg-card/40 px-8 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <PackageSearch className="h-5 w-5 text-primary" />
              </div>

              <p className="mt-5 font-medium">
                No products match your search yet.
              </p>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Try clearing a filter or searching a
                different term. Products added in the
                admin dashboard appear here automatically.
              </p>
            </div>
          ) : (
            /* Product Grid */
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageRows.map((product) => (
                <div
                  key={product.id}
                  className="transition-transform duration-300 hover:-translate-y-1"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  disabled={current === 1}
                  
                  onClick={() =>
                  void navigate({
                   search: (prev) => ({
                   ...prev,
                  page: current - 1,
                }),
              })
            }

                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <span className="min-w-[92px] text-center text-sm text-muted-foreground">
                  Page{" "}
                  <span className="font-medium text-foreground">
                    {current}
                  </span>{" "}
                  of {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  disabled={
                    current === totalPages
                  }
                  onClick={() =>
                   void navigate({
                     search: (prev) => ({
                      ...prev,
                      page: current + 1,
                }),
            })
         }
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="h-1 w-40 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{
                    width: `${(current / totalPages) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
