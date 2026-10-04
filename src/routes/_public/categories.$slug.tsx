import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard, type ProductRow } from "@/components/site/ProductCard";
import { categoriesQuery, productsQuery } from "@/lib/queries";

export const Route = createFileRoute("/_public/categories/$slug")({
  head: ({ params }) => {
    const readable = params.slug.replace(/-/g, " ");
    const title = `${readable.replace(/\b\w/g, (c) => c.toUpperCase())} — Garg Dental`;
    const description = `Browse ${readable} products supplied by Garg Dental Pvt. Ltd. and request a quote for your practice.`;
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
  component: CategoryPage,
});

const PAGE_SIZE = 12;

function CategoryPage() {
  const { slug } = Route.useParams();
  const [page, setPage] = useState(1);

  const categories = useQuery(categoriesQuery);
  const products = useQuery(
    productsQuery({ category: slug, page, pageSize: PAGE_SIZE }),
  );

  const category = (categories.data ?? []).find((c) => c.slug === slug);
  const rows = (products.data?.products ?? []) as ProductRow[];
  const total = products.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={category?.name ?? slug.replace(/-/g, " ")}
        {...(category?.description ? { description: category.description } : {})}
        crumbs={[{ label: "Products", to: "/products" }, { label: category?.name ?? slug }]}
      />

      <section className="container-page py-12">
        {products.isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-12 text-center">
            <p className="font-medium">No products published in this category yet.</p>
            <Button asChild className="mt-6">
              <Link to="/products">Browse full catalogue</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{total}</span>{" "}
              product{total === 1 ? "" : "s"}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rows.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <span className="min-w-[92px] text-center text-sm text-muted-foreground">
                  Page <span className="font-medium text-foreground">{page}</span> of {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}