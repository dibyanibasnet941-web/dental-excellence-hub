import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard, type ProductRow } from "@/components/site/ProductCard";
import { CTASection } from "@/components/site/CTASection";
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

function CategoryPage() {
  const { slug } = Route.useParams();
  const categories = useQuery(categoriesQuery);
  const products = useQuery(productsQuery);

  const category = (categories.data ?? []).find((c) => c.slug === slug);
  const rows = ((products.data ?? []) as ProductRow[]).filter((p) => p.categories?.slug === slug);

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={category?.name ?? slug.replace(/-/g, " ")}
        {...(category?.description ? { description: category.description } : {})}
        crumbs={[{ label: "Products", to: "/products" }, { label: category?.name ?? slug }]}
      />

      <section className="container-page py-12">
        {rows.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-12 text-center">
            <p className="font-medium">No products published in this category yet.</p>
            <Button asChild className="mt-6">
              <Link to="/products">Browse full catalogue</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </>
  );
}
