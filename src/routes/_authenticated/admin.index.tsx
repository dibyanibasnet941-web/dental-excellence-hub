import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  blogPostsQuery,
  brandsQuery,
  categoriesQuery,
  enquiriesQuery,
  productsQuery,
  resourcesQuery,
} from "@/lib/queries";
import { formatDate } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const products = useQuery(productsQuery);
  const brands = useQuery(brandsQuery);
  const categories = useQuery(categoriesQuery);
  const enquiries = useQuery(enquiriesQuery);
  const posts = useQuery(blogPostsQuery);
  const resources = useQuery(resourcesQuery);

  const rows = enquiries.data ?? [];
  const stats = [
    { label: "Total products", value: products.data?.length ?? 0 },
    { label: "Total brands", value: brands.data?.length ?? 0 },
    { label: "Total categories", value: categories.data?.length ?? 0 },
    { label: "New enquiries", value: rows.filter((e) => e.status === "New").length },
    {
      label: "Pending enquiries",
      value: rows.filter((e) => !["Converted", "Closed"].includes(e.status)).length,
    },
    { label: "Blog posts", value: posts.data?.length ?? 0 },
    { label: "Resources", value: resources.data?.length ?? 0 },
    {
      label: "Featured products",
      value: ((products.data ?? []) as { is_featured: boolean }[]).filter((p) => p.is_featured).length,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of catalogue content and incoming sales enquiries.
      </p>

      <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card p-6">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-md border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-semibold">Latest enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm text-accent">
            View all
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {rows.slice(0, 6).map((enquiry) => (
            <li key={enquiry.id} className="flex flex-wrap items-center justify-between gap-2 p-5">
              <div>
                <p className="text-sm font-medium">
                  {enquiry.name}
                  {enquiry.organization ? ` — ${enquiry.organization}` : ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  {enquiry.product_name ?? "General enquiry"} · {formatDate(enquiry.created_at)}
                </p>
              </div>
              <span className="rounded-sm border border-border px-2.5 py-1 text-xs">
                {enquiry.status}
              </span>
            </li>
          ))}
          {rows.length === 0 && (
            <li className="p-8 text-center text-sm text-muted-foreground">No enquiries yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
