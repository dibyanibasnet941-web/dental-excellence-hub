import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard, type ProductRow } from "@/components/site/ProductCard";
import { CTASection } from "@/components/site/CTASection";
import { brandsQuery, categoriesQuery, productsQuery, solutionsQuery } from "@/lib/queries";

export const Route = createFileRoute("/_public/solutions/$slug")({
  head: ({ params }) => {
    const readable = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const title = `${readable} — Dental Solutions by Garg Dental`;
    const description = `${readable} solutions from Garg Dental Pvt. Ltd. — recommended product categories, featured products and expert support.`;
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
  component: SolutionDetail,
});

function SolutionDetail() {
  const { slug } = Route.useParams();
  const solutions = useQuery(solutionsQuery);
  const categories = useQuery(categoriesQuery);
  const brands = useQuery(brandsQuery);
  const products = useQuery(productsQuery);

  const solution = (solutions.data ?? []).find((s) => s.slug === slug);
  const featured = ((products.data ?? []) as ProductRow[]).filter((p) => p.is_featured).slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Solution"
        title={solution?.title ?? slug.replace(/-/g, " ")}
        {...(solution?.overview ? { description: solution.overview } : {})}
        crumbs={[{ label: "Solutions", to: "/solutions" }, { label: solution?.title ?? slug }]}
      />

      <section className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="mt-4 max-w-3xl whitespace-pre-line text-muted-foreground">
            {solution?.body ||
              solution?.overview ||
              "Detailed information for this solution will be published by the Garg Dental team."}
          </p>

          {featured.length > 0 && (
            <>
              <h2 className="mt-12 text-xl font-semibold">Featured products</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {featured.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="space-y-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Recommended categories
            </h3>
            <ul className="mt-3 space-y-2">
              {(categories.data ?? []).slice(0, 8).map((c) => (
                <li key={c.id}>
                  <Link
                    to="/categories/$slug"
                    params={{ slug: c.slug }}
                    className="text-sm hover:text-accent"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {(brands.data ?? []).length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Related brands
              </h3>
              <ul className="mt-3 space-y-2">
                {(brands.data ?? []).slice(0, 8).map((b) => (
                  <li key={b.id}>
                    <Link to="/brands/$slug" params={{ slug: b.slug }} className="text-sm hover:text-accent">
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>

      <CTASection title="Talk to Our Team" />
    </>
  );
}
