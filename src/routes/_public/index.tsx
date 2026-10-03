import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Headset,
  PackageSearch,
  ShieldCheck,
  Truck,
  Stethoscope,
  Monitor,
  ScanLine,
  Bone,
  Syringe,
} from "lucide-react";
import {
  brandsQuery,
  brandProductCountsQuery,
  categoriesQuery,
  productsQuery,
  solutionsQuery,
} from "@/lib/queries";

import heroImage from "@/assets/hero-dental.jpg";
import equipmentImage from "@/assets/equipment.jpg";
import instrumentsImage from "@/assets/instruments.jpg";
import consumableImage from "@/assets/consumable.jpg";
import infectionImage from "@/assets/infection.jpg";
import sterilizationImage from "@/assets/sterilization.jpg";
import radiologyImage from "@/assets/radiology.jpg";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EnquiryDialog } from "@/components/site/EnquiryDialog";
import {
  ProductCard,
  type ProductRow,
} from "@/components/site/ProductCard";
import { useSiteContent } from "@/hooks/useSiteContent";

import { defaultBrandLogos } from "@/lib/brandLogos";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: [
      {
        title:
          "Garg Dental Pvt. Ltd. — Dental Equipment & Solutions in Nepal",
      },
      {
        name: "description",
        content:
          "Professional dental equipment, instruments, consumables and solutions for modern dental practices, clinics and laboratories in Nepal.",
      },
      {
        property: "og:title",
        content:
          "Garg Dental Pvt. Ltd. — Dental Equipment & Solutions",
      },
      {
        property: "og:description",
        content:
          "Explore dental equipment, instruments, consumables and clinic solutions. Request a quote from the Garg Dental team.",
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
  component: HomePage,
});

function HomePage() {
  const { get } = useSiteContent();

  const categories = useQuery(categoriesQuery);
  const products = useQuery(productsQuery());
  const brands = useQuery(brandsQuery);
  const solutions = useQuery(solutionsQuery);
  const counts = useQuery(brandProductCountsQuery);

  const [categorySlide, setCategorySlide] = useState(0);

  const featured = ((products.data?.products ?? []) as ProductRow[])
  .filter((p) => p.is_featured)
  .slice(0, 4);

const latest = ((products.data?.products ?? []) as ProductRow[])
  .slice(0, 4);

  const showcase = featured.length > 0 ? featured : latest;

  /* =========================================================
     CATEGORY IMAGES
  ========================================================== */

  const categoryImages: Record<string, string> = {
    "dental-equipment": equipmentImage,
    equipment: equipmentImage,

    "dental-instruments": instrumentsImage,
    instruments: instrumentsImage,

    "dental-consumables": consumableImage,
    consumables: consumableImage,

    "infection-control": infectionImage,
    infection: infectionImage,

    sterilization: sterilizationImage,

    radiology: radiologyImage,
  };

  const getCategoryImage = (slug: string) => {
    return categoryImages[slug.toLowerCase()];
  };

  const homeCategories = (categories.data ?? [])
    .filter((category) =>
      [
        "dental-equipment",
        "equipment",
        "dental-instruments",
        "instruments",
        "dental-consumables",
        "consumables",
        "infection-control",
        "infection",
        "sterilization",
        "radiology",
      ].includes(category.slug.toLowerCase()),
    )
    .slice(0, 6);

  /* =========================================================
     CATEGORY SLIDER
  ========================================================== */

  const maxCategorySlide = Math.max(
    0,
    homeCategories.length - 3,
  );

  const nextCategory = () => {
    setCategorySlide((current) =>
      current >= maxCategorySlide ? 0 : current + 1,
    );
  };

  const previousCategory = () => {
    setCategorySlide((current) =>
      current <= 0 ? maxCategorySlide : current - 1,
    );
  };

  /* =========================================================
     LUCIDE ICONS FOR SERVICES & SOLUTIONS
  ========================================================== */

  const solutionIcons = [
    Stethoscope,
    ShieldCheck,
    Monitor,
    ScanLine,
    Bone,
    Syringe,
  ];

  return (
    <div className="overflow-hidden bg-background">

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative isolate min-h-[650px] overflow-hidden bg-[#031B43] md:min-h-[720px]">

        {/* =====================================================
            HERO IMAGE
        ====================================================== */}

        <img
          src={heroImage}
          alt="Modern dental operatory with digital equipment"
          width={1920}
          height={1088}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-center contrast-105 saturate-105"
        />

        {/* =====================================================
            DARK LEFT GRADIENT
            This makes the text readable while keeping the
            dental equipment visible on the right.
        ====================================================== */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#031B43]/95 via-[#031B43]/75 via-45% to-[#031B43]/10" />

        {/* Additional subtle bottom gradient */}

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#031B43]/45 to-transparent" />

        {/* Small decorative glow */}

        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#A8DADC]/10 blur-3xl" />

        <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-[#A8DADC]/5 blur-3xl" />

        {/* =====================================================
            HERO CONTENT
        ====================================================== */}

        <div className="container-page relative z-10 flex min-h-[650px] items-center py-20 md:min-h-[720px] md:py-28">

          <div className="max-w-2xl">

            {/* Company label */}

            <div className="fade-up mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

              <span className="h-2 w-2 rounded-full bg-[#A8DADC] shadow-[0_0_12px_rgba(168,218,220,0.8)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
                {get(
                  "hero.eyebrow",
                  "Garg Dental Pvt. Ltd.",
                )}
              </span>

            </div>

            {/* =================================================
                MAIN HERO HEADING
            ================================================== */}

            <h1 className="fade-up max-w-2xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">

              {get(
                "hero.headline",
                "Advancing Dentistry Through Better Technology",
              )}

            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p className="fade-up mt-6 max-w-xl text-base leading-7 text-white/80 md:text-lg md:leading-8">

              {get(
                "hero.subheadline",
                "Professional dental equipment, instruments, consumables and solutions for modern dental practices across Nepal.",
              )}

            </p>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div className="fade-up mt-8 flex flex-wrap gap-3">

              <Button
                asChild
                size="lg"
                className="h-12 rounded-lg bg-white px-7 font-semibold text-[#102A43] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F3F7FC] hover:shadow-xl"
              >
                <Link to="/products">

                  {get(
                    "hero.primary_cta",
                    "Explore Products",
                  )}

                  <ArrowRight className="ml-2 h-4 w-4" />

                </Link>
              </Button>

              <EnquiryDialog
                trigger={
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-lg border-white/40 bg-white/10 px-7 font-semibold text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#102A43]"
                  >
                    {get(
                      "hero.secondary_cta",
                      "Request a Quote",
                    )}
                  </Button>
                }
              />

            </div>

            {/* =================================================
                TRUST LINE
            ================================================== */}

            <div className="fade-up mt-9 flex items-center gap-3 text-sm text-white/70">

              <span className="h-px w-10 bg-[#A8DADC]" />

              <span>
                Trusted dental solutions for practices across Nepal
              </span>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          COMPANY STATS
      ========================================================== */}

      <section className="border-b border-slate-200 bg-white">

        <div className="container-page">

          <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 md:grid-cols-4 md:divide-y-0">

            <div className="px-5 py-8 text-center sm:px-8 md:py-10">

              <div className="text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">
                {get("stats.years_experience", "20+")}
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Years of experience
              </p>

            </div>

            <div className="px-5 py-8 text-center sm:px-8 md:py-10">

              <div className="text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">
  {get(
    "stats.products_count",
    String(products.data?.total ?? 0),
  )}
</div>

<p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
  Products
</p>

            </div>

            <div className="px-5 py-8 text-center sm:px-8 md:py-10">

              <div className="text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">
                {get(
                  "stats.brands_count",
                  String(brands.data?.length ?? 0),
                )}
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Partner brands
              </p>

            </div>

            <div className="px-5 py-8 text-center sm:px-8 md:py-10">

              <div className="text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">
                {get(
                  "stats.customers_served",
                  "500+",
                )}
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Customers served
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          PRODUCT CATEGORY SLIDER
      ========================================================== */}

      <section className="container-page py-20 md:py-28">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div className="max-w-3xl">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7C82]">
              DENTAL PRODUCTS
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#102A43] md:text-5xl">
              Dental products for every stage of practice
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Explore equipment, instruments, sterilization products,
              consumables and other supplies used in modern dental practice.
            </p>

          </div>

          <Button
            asChild
            variant="outline"
            className="group w-fit rounded-full border-slate-300"
          >
            <Link to="/products">

              View full catalogue

              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />

            </Link>
          </Button>

        </div>

        {categories.isLoading ? (

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {Array.from({ length: 3 }).map((_, i) => (

              <Skeleton
                key={i}
                className="h-[390px] rounded-2xl"
              />

            ))}

          </div>

        ) : homeCategories.length > 0 ? (

          <div className="relative mt-10">

            <div className="overflow-hidden">

              <div
                className="flex gap-5 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${categorySlide * (100 / 3)}%)`,
                }}
              >

                {homeCategories.map((category) => {

                  const image = getCategoryImage(category.slug);

                  const productCount = (counts.data ?? []).filter(
                     (row) => row.category_id === category.id,
                   ).length;

                  return (

                    <Link
                      key={category.id}
                      to="/categories/$slug"
                      params={{ slug: category.slug }}
                      className="group relative min-w-[calc((100%_-_40px)/3)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl max-md:min-w-[calc((100%_-_20px)/2)] max-sm:min-w-full"
                    >

                      {image ? (

                        <>

                          <img
                            src={image}
                            alt={category.name}
                            loading="lazy"
                            className="h-[390px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/90 via-[#071827]/30 to-transparent" />

                          <div className="absolute inset-x-0 bottom-0 p-7 text-white">

                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A8DADC]">
                              {productCount} products
                            </p>

                            <div className="flex items-end justify-between gap-4">

                              <div>

                                <h3 className="text-xl font-bold">
                                  {category.name}
                                </h3>

                                {category.description && (

                                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">
                                    {category.description}
                                  </p>

                                )}

                              </div>

                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-[#102A43]">

                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                              </span>

                            </div>

                          </div>

                        </>

                      ) : (

                        <div className="flex h-[390px] flex-col justify-between p-7">

                          <div className="flex justify-between">

                            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                              Catalogue
                            </span>

                            <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />

                          </div>

                          <div>

                            <h3 className="text-xl font-bold text-[#102A43]">
                              {category.name}
                            </h3>

                            {category.description && (

                              <p className="mt-2 text-sm leading-6 text-slate-600">
                                {category.description}
                              </p>

                            )}

                            <p className="mt-5 text-xs uppercase tracking-[0.14em] text-slate-400">
                              {productCount} products
                            </p>

                          </div>

                        </div>

                      )}

                    </Link>

                  );
                })}

              </div>

            </div>

            {homeCategories.length > 3 && (

              <div className="mt-7 flex items-center justify-between">

                <div className="flex gap-2">

                  {Array.from({
                    length: maxCategorySlide + 1,
                  }).map((_, index) => (

                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to category slide ${index + 1}`}
                      onClick={() => setCategorySlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        categorySlide === index
                          ? "w-8 bg-[#3B7C82]"
                          : "w-3 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />

                  ))}

                </div>

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={previousCategory}
                    aria-label="Previous categories"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-[#102A43] transition-all hover:border-[#3B7C82] hover:bg-[#F5FAFA]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={nextCategory}
                    aria-label="Next categories"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-[#102A43] transition-all hover:border-[#3B7C82] hover:bg-[#F5FAFA]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>

                </div>

              </div>

            )}

          </div>

        ) : null}

      </section>

      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================== */}

      {showcase.length > 0 && (

        <section className="border-y border-slate-200 bg-[#F5F8FA]">

          <div className="container-page py-20 md:py-24">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7C82]">
                  OUR CATALOGUE
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#102A43] md:text-4xl">

                  {featured.length > 0
                    ? "Featured products"
                    : "Latest products"}

                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  A selection of equipment, instruments and dental
                  supplies from our catalogue.
                </p>

              </div>

              <Button
                asChild
                variant="outline"
                className="group w-fit rounded-full bg-white"
              >
                <Link to="/products">

                  Browse catalogue

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />

                </Link>
              </Button>

            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {showcase.map((product) => (

                <div
                  key={product.id}
                  className="transition-transform duration-300 hover:-translate-y-1"
                >

                  <ProductCard product={product} />

                </div>

              ))}

            </div>

          </div>

        </section>

      )}

      {/* =========================================================
          SERVICES & SOLUTIONS
          LUCIDE REACT ICONS
      ========================================================== */}

      <section className="container-page py-20 md:py-28">

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3B7C82]">
              SERVICES & SOLUTIONS
            </p>

            <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-[-0.035em] text-[#102A43] sm:text-5xl">
              Solutions built around
              <br />
              your dental practice
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
              From setting up a new clinic to supporting advanced
              procedures, our solutions are designed around practical
              dental requirements.
            </p>

            <Button
              asChild
              className="mt-8 rounded-full bg-[#102A43] px-6 transition-all hover:bg-[#183E5C]"
            >
              <Link to="/solutions">

                Explore all solutions

                <ArrowRight className="ml-2 h-4 w-4" />

              </Link>
            </Button>

          </div>

          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">

            {(solutions.data ?? [])
              .slice(0, 6)
              .map((solution, index) => {

                const Icon =
                  solutionIcons[index] ?? Stethoscope;

                return (

                  <Link
                    key={solution.id}
                    to="/solutions/$slug"
                    params={{ slug: solution.slug }}
                    className="group min-h-[190px] bg-white p-6 transition-colors hover:bg-[#F5FAFA]"
                  >

                    <div className="flex items-start justify-between">

                      {/* Lucide icon */}

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A8DADC]/20 text-[#3B7C82] transition-colors group-hover:bg-[#3B7C82] group-hover:text-white">

                        <Icon className="h-5 w-5" />

                      </div>

                      <span className="text-xs font-medium tracking-[0.12em] text-slate-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>

                    <h3 className="mt-6 text-base font-semibold leading-6 text-[#102A43]">
                      {solution.title}
                    </h3>

                    {solution.overview && (

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {solution.overview}
                      </p>

                    )}

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#3B7C82]">

                      Learn more

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                    </span>

                  </Link>

                );
              })}

          </div>

        </div>

      </section>

      {/* =========================================================
          WHY GARG DENTAL
      ========================================================== */}

      <section className="border-y border-slate-200 bg-[#F5F8FA]">

        <div className="container-page py-20 md:py-24">

          <div className="max-w-2xl">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7C82]">
              WHY GARG DENTAL
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#102A43] md:text-4xl">
              Practical support from catalogue to clinic
            </h2>

          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-4">

            {[

              {
                icon: PackageSearch,
                title: "Curated catalogue",
                text: "Products selected for clinical use in Nepal.",
              },

              {
                icon: ShieldCheck,
                title: "Quality focus",
                text: "Equipment and consumables from partner brands.",
              },

              {
                icon: Truck,
                title: "Supply & installation",
                text: "Delivery, installation and commissioning support.",
              },

              {
                icon: Headset,
                title: "After-sales service",
                text: "Technical support and maintenance programmes.",
              },

            ].map((item) => (

              <div
                key={item.title}
                className="group bg-white p-7 transition-colors hover:bg-[#F9FCFC]"
              >

                <item.icon className="h-5 w-5 text-[#3B7C82]" />

                <h3 className="mt-5 text-sm font-semibold text-[#102A43]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          BRANDS
      ========================================================== */}

      {brands.data && brands.data.length > 0 && (

        <section className="border-t border-slate-200 bg-white">

          <div className="container-page py-20 md:py-24">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7C82]">
                  OUR PARTNER BRANDS
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#102A43] md:text-3xl">
                  Brands we work with
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  We supply products from established dental brands
                  trusted by dental professionals.
                </p>

              </div>

              <Link
                to="/brands"
                className="group text-sm font-semibold text-[#102A43] transition-colors hover:text-[#3B7C82]"
              >

                View all brands

                <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />

              </Link>

            </div>

            <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-3 lg:grid-cols-6">

              {brands.data.slice(0, 6).map((brand) => {

                const logoUrl =
                  brand.logo_url ??
                  defaultBrandLogos[brand.slug];

                return (

                  <Link
                    key={brand.id}
                    to="/brands/$slug"
                    params={{ slug: brand.slug }}
                    className="group flex min-h-[125px] items-center justify-center border-b border-r border-slate-200 bg-white px-6 text-center transition-colors hover:bg-[#F8FAFA]"
                  >

                    <div className="flex flex-col items-center justify-center">

                      {logoUrl ? (

                        <>

                          <img
                            src={logoUrl}
                            alt={`${brand.name} logo`}
                            loading="lazy"
                            className="h-12 max-w-[150px] object-contain opacity-75 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                            onError={(event) => {

                              event.currentTarget.classList.add(
                                "hidden",
                              );

                              event.currentTarget.nextElementSibling?.classList.remove(
                                "hidden",
                              );

                            }}
                          />

                          <div className="hidden text-lg font-bold tracking-tight text-[#102A43]">
                            {brand.name}
                          </div>

                        </>

                      ) : (

                        <div className="text-lg font-bold tracking-tight text-[#102A43] transition-transform duration-300 group-hover:scale-105">
                          {brand.name}
                        </div>

                      )}

                      {brand.country && (

                        <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-400">
                          {brand.country}
                        </div>

                      )}

                    </div>

                  </Link>

                );

              })}

            </div>

          </div>

        </section>

      )}

    </div>
  );
}