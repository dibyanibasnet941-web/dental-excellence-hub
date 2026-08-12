import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard, type ProductRow } from "@/components/site/ProductCard";
import { CTASection } from "@/components/site/CTASection";
import { brandsQuery, productsQuery } from "@/lib/queries";

export const Route = createFileRoute("/_public/brands/$slug")({
  head: ({ params }) => {
    const readable = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
  const rows = ((products.data ?? []) as ProductRow[]).filter((p) => p.brands?.slug === slug);
  const categories = Array.from(new Set(rows.map((p) => p.categories?.name).filter(Boolean)));

  return (
    <>
      <PageHeader
        eyebrow={brand?.country ?? "Brand"}
        title={brand?.name ?? slug.replace(/-/g, " ")}
        {...(brand?.description ? { description: brand.description } : {})}
        crumbs={[{ label: "Brands", to: "/brands" }, { label: brand?.name ?? slug }]}
      >
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((name) => (
              <span key={name} className="rounded-sm border border-border bg-card px-3 py-1 text-xs">
                {name}
              </span>
            ))}
          </div>
        )}
      </PageHeader>

      <section className="container-page py-12">
        {rows.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-12 text-center">
            <p className="font-medium">No products published for this brand yet.</p>
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
