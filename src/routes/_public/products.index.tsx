import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard, type ProductRow } from "@/components/site/ProductCard";
import { CTASection } from "@/components/site/CTASection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brandsQuery, categoriesQuery, productsQuery } from "@/lib/queries";
import { AVAILABILITY_OPTIONS } from "@/lib/site";

type Search = { q?: string; category?: string; brand?: string; page?: number };

export const Route = createFileRoute("/_public/products/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    brand: typeof search["brand"] === "string" ? search["brand"] : undefined,
    page: typeof search["page"] === "number" ? search["page"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Dental Products Catalogue — Garg Dental Pvt. Ltd." },
      {
        name: "description",
        content:
          "Browse dental equipment, instruments, consumables, sterilization, radiology and laboratory products. Search by category or brand and request a quote.",
      },
      { property: "og:title", content: "Dental Products Catalogue — Garg Dental" },
      {
        property: "og:description",
        content: "Search dental products by category, brand and availability, then request a quote.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const PAGE_SIZE = 12;

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const products = useQuery(productsQuery);
  const categories = useQuery(categoriesQuery);
  const brands = useQuery(brandsQuery);

  const [term, setTerm] = useState(search.q ?? "");
  const [availability, setAvailability] = useState<string[]>([]);
  const [flags, setFlags] = useState<{ featured: boolean; isNew: boolean }>({
    featured: false,
    isNew: false,
  });
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(search.page ?? 1);

  const categorySlug = search.category;
  const brandSlug = search.brand;

  const filtered = useMemo(() => {
    const q = term.trim().toLowerCase();
    let rows = ((products.data ?? []) as (ProductRow & {
      created_at: string;
      category_id: string | null;
      brand_id: string | null;
    })[]).slice();

    if (categorySlug) rows = rows.filter((p) => p.categories?.slug === categorySlug);
    if (brandSlug) rows = rows.filter((p) => p.brands?.slug === brandSlug);
    if (availability.length > 0) rows = rows.filter((p) => availability.includes(p.availability));
    if (flags.featured) rows = rows.filter((p) => p.is_featured);
    if (flags.isNew) rows = rows.filter((p) => p.is_new);
    if (q) {
      rows = rows.filter((p) =>
        [p.name, p.sku, p.short_description, p.brands?.name, p.categories?.name]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(q)),
      );
    }

    rows.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "oldest") return a.created_at.localeCompare(b.created_at);
      return b.created_at.localeCompare(a.created_at);
    });
    return rows;
  }, [products.data, term, categorySlug, brandSlug, availability, flags, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageRows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const setFilter = (key: "category" | "brand", value: string) => {
    setPage(1);
    void navigate({
      search: (prev) => ({ ...prev, [key]: value === "all" ? undefined : value }),
    });
  };

  const filters = (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Category
        </h3>
        <Select value={categorySlug ?? "all"} onValueChange={(v) => setFilter("category", v)}>
          <SelectTrigger className="mt-3 w-full">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {(categories.data ?? []).map((c) => (
              <SelectItem key={c.id} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Brand
        </h3>
        <Select value={brandSlug ?? "all"} onValueChange={(v) => setFilter("brand", v)}>
          <SelectTrigger className="mt-3 w-full">
            <SelectValue placeholder="All brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All brands</SelectItem>
            {(brands.data ?? []).map((b) => (
              <SelectItem key={b.id} value={b.slug}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Availability
        </h3>
        <div className="mt-3 space-y-2.5">
          {AVAILABILITY_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={availability.includes(option.value)}
                onCheckedChange={(checked) => {
                  setPage(1);
                  setAvailability((prev) =>
                    checked ? [...prev, option.value] : prev.filter((v) => v !== option.value),
                  );
                }}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Highlights
        </h3>
        <div className="mt-3 space-y-2.5">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={flags.featured}
              onCheckedChange={(c) => setFlags((f) => ({ ...f, featured: !!c }))}
            />
            Featured products
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={flags.isNew}
              onCheckedChange={(c) => setFlags((f) => ({ ...f, isNew: !!c }))}
            />
            New products
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Dental products"
        description="Equipment, instruments, consumables and solutions for clinics, hospitals and laboratories."
        crumbs={[{ label: "Products" }]}
      />

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-[220px] flex-1">
              <Label htmlFor="product-search" className="sr-only">
                Search products
              </Label>
              <Input
                id="product-search"
                placeholder="Search products, brands or product codes…"
                value={term}
                onChange={(e) => {
                  setTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[170px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="name">Name A–Z</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto">
                <SheetTitle className="mb-6">Filters</SheetTitle>
                {filters}
              </SheetContent>
            </Sheet>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
          </p>

          {products.isLoading ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          ) : pageRows.length === 0 ? (
            <div className="mt-10 rounded-md border border-dashed border-border p-12 text-center">
              <p className="font-medium">No products match your search yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Products added in the admin dashboard appear here automatically.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageRows.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={current === 1}
                onClick={() => setPage(current - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {current} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={current === totalPages}
                onClick={() => setPage(current + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      <CTASection />
    </>
  );
}
