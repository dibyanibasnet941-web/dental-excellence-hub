import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, Headset, PackageSearch, ShieldCheck, Truck } from "lucide-react";
import heroImage from "@/assets/hero-dental.jpg";
import instrumentsImage from "@/assets/instruments.jpg";
import sterilizationImage from "@/assets/sterilization.jpg";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CTASection } from "@/components/site/CTASection";
import { EnquiryDialog } from "@/components/site/EnquiryDialog";
import { ProductCard, type ProductRow } from "@/components/site/ProductCard";
import { useSiteContent } from "@/hooks/useSiteContent";
import { brandsQuery, categoriesQuery, productsQuery, solutionsQuery } from "@/lib/queries";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: [
      { title: "Garg Dental Pvt. Ltd. — Dental Equipment & Solutions in Nepal" },
      {
        name: "description",
        content:
          "Professional dental equipment, instruments, consumables and solutions for modern dental practices, clinics and laboratories in Nepal.",
      },
      { property: "og:title", content: "Garg Dental Pvt. Ltd. — Dental Equipment & Solutions" },
      {
        property: "og:description",
        content:
          "Explore dental equipment, instruments, consumables and clinic solutions. Request a quote from the Garg Dental team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { get } = useSiteContent();
  const categories = useQuery(categoriesQuery);
  const products = useQuery(productsQuery);
  const brands = useQuery(brandsQuery);
  const solutions = useQuery(solutionsQuery);

  const featured = ((products.data ?? []) as ProductRow[]).filter((p) => p.is_featured).slice(0, 4);
  const latest = ((products.data ?? []) as ProductRow[]).slice(0, 4);
  const showcase = featured.length > 0 ? featured : latest;

  const stats = [
    { label: "Years of experience", value: get("stats.years_experience") },
    { label: "Products", value: get("stats.products_count", String(products.data?.length ?? 0)) },
    { label: "Partner brands", value: get("stats.brands_count", String(brands.data?.length ?? 0)) },
    { label: "Customers served", value: get("stats.customers_served") },
  ].filter((s) => s.value);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <img
          src={heroImage}
          alt="Modern dental operatory with digital equipment"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/90 to-navy/40" />
        <div className="container-page relative py-24 md:py-36">
          <p className="fade-up text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {get("hero.eyebrow", "Garg Dental Pvt. Ltd.")}
          </p>
          <h1 className="fade-up mt-5 max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
            {get("hero.headline", "Advancing Dentistry Through Better Technology")}
          </h1>
          <p className="fade-up mt-6 max-w-2xl text-base text-navy-foreground/75 md:text-xl">
            {get(
              "hero.subheadline",
              "Professional dental equipment, instruments, consumables and solutions for modern dental practices.",
            )}
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/products">
                {get("hero.primary_cta", "Explore Products")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <EnquiryDialog
              trigger={
                <Button
                  size="lg"
                  variant="outline"
                  className="border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
                >
                  {get("hero.secondary_cta", "Request a Quote")}
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="border-b border-border">
          <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold tracking-tight md:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Catalogue</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Product categories</h2>
            <p className="mt-3 text-muted-foreground">
              Find equipment, instruments and consumables organised the way dental practices work.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/products">View all products</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.isLoading &&
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-none" />)}
          {(categories.data ?? []).map((category) => (
            <Link
              key={category.id}
              to="/categories/$slug"
              params={{ slug: category.slug }}
              className="group bg-card p-6 transition-colors hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold">{category.name}</h3>
                  {category.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {
                  ((products.data ?? []) as { category_id: string | null }[]).filter(
                    (p) => p.category_id === category.id,
                  ).length
                }{" "}
                products
              </p>
            </Link>
          ))}
        </div>
      </section>

      {showcase.length > 0 && (
        <section className="surface-panel border-y border-border">
          <div className="container-page py-20 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-bold md:text-4xl">
                {featured.length > 0 ? "Featured products" : "Latest products"}
              </h2>
              <Button asChild variant="outline">
                <Link to="/products">Browse catalogue</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {showcase.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Solutions</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Built around how your practice operates
          </h2>
          <p className="mt-4 text-muted-foreground">
            From complete clinic setups to sterilization workflows and digital dentistry, we help you
            select the right combination of equipment, instruments and consumables.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {(solutions.data ?? []).slice(0, 8).map((solution) => (
              <li key={solution.id}>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: solution.slug }}
                  className="flex items-start gap-2 text-sm hover:text-accent"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {solution.title}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8">
            <Link to="/solutions">Explore solutions</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={instrumentsImage}
            alt="Stainless steel dental instruments arranged on a light surface"
            loading="lazy"
            width={1200}
            height={900}
            className="h-full w-full rounded-md object-cover"
          />
          <img
            src={sterilizationImage}
            alt="Autoclave sterilizer in a dental sterilization room"
            loading="lazy"
            width={1200}
            height={900}
            className="mt-10 h-full w-full rounded-md object-cover"
          />
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28">
        <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
          {[
            { icon: PackageSearch, title: "Curated catalogue", text: "Products selected for clinical use in Nepal." },
            { icon: ShieldCheck, title: "Quality focus", text: "Equipment and consumables from partner brands." },
            { icon: Truck, title: "Supply & installation", text: "Delivery, installation and commissioning support." },
            { icon: Headset, title: "After-sales service", text: "Technical support and maintenance programmes." },
          ].map((item) => (
            <div key={item.title} className="bg-card p-6">
              <item.icon className="h-5 w-5 text-accent" />
              <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
