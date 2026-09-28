import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  Box,
  ChevronRight,
  FileText,
  FolderTree,
  Layers3,
  MessageSquare,
  Package,
  Plus,
  Tags,
} from "lucide-react";

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

  const productRows = products.data ?? [];
  const brandRows = brands.data ?? [];
  const categoryRows = categories.data ?? [];
  const enquiryRows = enquiries.data ?? [];

  const newEnquiries = enquiryRows.filter(
    (e) => e.status === "New",
  ).length;

  const pendingEnquiries = enquiryRows.filter(
    (e) => !["Converted", "Closed"].includes(e.status),
  ).length;

  const featuredProducts = (
    productRows as { is_featured: boolean }[]
  ).filter((p) => p.is_featured);

  const overview = [
    {
      label: "Products",
      value: productRows.length,
      description: "Catalogue products",
      icon: Package,
      href: "/admin/products",
    },
    {
      label: "Brands",
      value: brandRows.length,
      description: "Partner brands",
      icon: Tags,
      href: "/admin/brands",
    },
    {
      label: "Categories",
      value: categoryRows.length,
      description: "Product categories",
      icon: FolderTree,
      href: "/admin/categories",
    },
    {
      label: "New enquiries",
      value: newEnquiries,
      description: "Require attention",
      icon: MessageSquare,
      href: "/admin/enquiries",
    },
  ];

  return (
    <div className="min-h-full space-y-8 pb-10">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="flex flex-col justify-between gap-5 border-b border-border/70 pb-7 md:flex-row md:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              Administration
            </p>
          </div>

          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage catalogue content and monitor incoming sales enquiries.
          </p>
        </div>

        <Link
          to={"/" as never}
          className="group inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:border-foreground/20 hover:bg-muted/40"
        >
          View website
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </header>

      {/* =========================================================
          OVERVIEW METRICS
      ========================================================= */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Overview
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              A quick look at your catalogue and enquiries.
            </p>
          </div>

          <span className="hidden text-xs text-muted-foreground sm:block">
            Live catalogue data
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {overview.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.href as never}
                className="group relative overflow-hidden rounded-xl border border-border/70 bg-card p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/70">
                    <Icon className="h-[18px] w-[18px] text-foreground/70" />
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-semibold tracking-[-0.04em]">
                    {item.value}
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {item.label}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          QUICK ACTIONS + ENQUIRY SUMMARY
      ========================================================= */}
      <div className="grid gap-5 xl:grid-cols-[1fr_1.35fr]">
        {/* Quick actions */}
        <section className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold">
                Quick actions
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Common catalogue tasks
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/70">
              <Plus className="h-4 w-4" />
            </div>
          </div>

          <div className="p-2">
            <Link
              to={"/admin/products" as never}
              className="group flex items-center gap-3 rounded-lg px-3 py-3.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background">
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Manage products
                </p>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  Add or update catalogue products
                </p>
              </div>

              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link
              to={"/admin/brands" as never}
              className="group flex items-center gap-3 rounded-lg px-3 py-3.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background">
                <Tags className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Manage brands
                </p>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  Maintain partner brand information
                </p>
              </div>

              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link
              to={"/admin/categories" as never}
              className="group flex items-center gap-3 rounded-lg px-3 py-3.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background">
                <FolderTree className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Manage categories
                </p>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  Organise the product catalogue
                </p>
              </div>

              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link
              to={"/admin/enquiries" as never}
              className="group flex items-center gap-3 rounded-lg px-3 py-3.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  View enquiries
                </p>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  Review incoming customer enquiries
                </p>
              </div>

              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* Enquiry summary */}
        <section className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold">
                Enquiry overview
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Current sales enquiry status
              </p>
            </div>

            <Link
              to={"/admin/enquiries" as never}
              className="group flex items-center gap-1 text-xs font-medium text-accent"
            >
              View all
              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2">
            <div className="relative p-6 sm:border-r sm:border-border/70">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  New enquiries
                </p>
              </div>

              <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                {newEnquiries}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Newly received enquiries
              </p>
            </div>

            <div className="relative border-t border-border/70 p-6 sm:border-t-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Pending
                </p>
              </div>

              <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                {pendingEnquiries}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Enquiries awaiting completion
              </p>
            </div>
          </div>

          <div className="border-t border-border/70 bg-muted/20 px-6 py-3.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>
                {enquiryRows.length} total enquiries recorded
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================
          LATEST ENQUIRIES
      ========================================================= */}
      <section className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <div className="flex flex-col gap-3 border-b border-border/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold">
              Latest enquiries
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Most recent customer enquiries
            </p>
          </div>

          <Link
            to={"/admin/enquiries" as never}
            className="group flex w-fit items-center gap-1 text-xs font-medium text-accent"
          >
            View all
            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div>
          {enquiryRows.slice(0, 5).map((enquiry, index) => (
            <div
              key={enquiry.id}
              className={`flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-muted/25 sm:flex-row sm:items-center sm:justify-between ${
                index !== 0 ? "border-t border-border/60" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted/70 text-xs font-semibold uppercase">
                  {enquiry.name?.charAt(0) ?? "?"}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {enquiry.name}
                    {enquiry.organization
                      ? ` — ${enquiry.organization}`
                      : ""}
                  </p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {enquiry.product_name ?? "General enquiry"} ·{" "}
                    {formatDate(enquiry.created_at)}
                  </p>
                </div>
              </div>

              <span
                className={`w-fit rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                  enquiry.status === "New"
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : enquiry.status === "Converted"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : enquiry.status === "Closed"
                        ? "border-gray-200 bg-gray-50 text-gray-600"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {enquiry.status}
              </span>
            </div>
          ))}

          {enquiryRows.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted/70">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </div>

              <p className="mt-3 text-sm font-medium">
                No enquiries yet
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                New customer enquiries will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          CONTENT OVERVIEW
      ========================================================= */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Catalogue content */}
        <section className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="border-b border-border/70 px-5 py-4">
            <h2 className="text-sm font-semibold">
              Catalogue content
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Current website catalogue
            </p>
          </div>

          <div className="p-2">
            <div className="flex items-center gap-4 rounded-lg px-3 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Products</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Items currently listed in the catalogue
                </p>
              </div>

              <span className="text-sm font-semibold">
                {productRows.length}
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-lg px-3 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                <Tags className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Brands</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Brands represented in the catalogue
                </p>
              </div>

              <span className="text-sm font-semibold">
                {brandRows.length}
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-lg px-3 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                <FolderTree className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Categories</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Product catalogue categories
                </p>
              </div>

              <span className="text-sm font-semibold">
                {categoryRows.length}
              </span>
            </div>
          </div>
        </section>

        {/* Website content */}
        <section className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="border-b border-border/70 px-5 py-4">
            <h2 className="text-sm font-semibold">
              Website content
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Other managed website content
            </p>
          </div>

          <div className="p-2">
            <div className="flex items-center gap-4 rounded-lg px-3 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Blog posts</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Published website articles
                </p>
              </div>

              <span className="text-sm font-semibold">
                {posts.data?.length ?? 0}
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-lg px-3 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                <Layers3 className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Resources</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Downloadable website resources
                </p>
              </div>

              <span className="text-sm font-semibold">
                {resources.data?.length ?? 0}
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-lg px-3 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                <Box className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Featured products
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Products highlighted on the website
                </p>
              </div>

              <span className="text-sm font-semibold">
                {featuredProducts.length}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}