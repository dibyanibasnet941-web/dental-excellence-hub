import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, FileText, ImageOff, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { EnquiryDialog } from "@/components/site/EnquiryDialog";
import {
  ProductCard,
  type ProductRow,
} from "@/components/site/ProductCard";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  productBySlugQuery,
  productsQuery,
} from "@/lib/queries";
import { availabilityLabel } from "@/lib/site";
import { getProductSeo } from "@/lib/public.functions";

export const Route = createFileRoute("/_public/products/$slug")({
  loader: ({ params }) =>
    getProductSeo({ data: { slug: params.slug } }),

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product unavailable — Garg Dental" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const title =
      loaderData.seo_title ||
      `${loaderData.name} — Garg Dental`;

    const description =
      loaderData.seo_description ||
      loaderData.short_description ||
      `${loaderData.name} available from Garg Dental Pvt. Ltd. Request a quote.`;

    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ];

    if (loaderData.image_url?.startsWith("https://")) {
      meta.push({
        property: "og:image",
        content: loaderData.image_url,
      });

      meta.push({
        name: "twitter:image",
        content: loaderData.image_url,
      });
    }

    return { meta };
  },

  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { get } = useSiteContent();

  const {
    data: product,
    isLoading,
  } = useQuery(productBySlugQuery(slug));

  const all = useQuery(productsQuery);

  const [activeImage, setActiveImage] =
    useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="container-page py-16">
        <Skeleton className="h-[420px] w-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-bold">
          Product not found
        </h1>

        <p className="mt-2 text-muted-foreground">
          This product may have been moved or unpublished.
        </p>

        <Button asChild className="mt-6">
          <Link to="/products">
            Back to catalogue
          </Link>
        </Button>
      </div>
    );
  }

  const images = [
    ...(product.image_url
      ? [
          {
            id: "main",
            image_url: product.image_url,
          },
        ]
      : []),

    ...((product.product_images ?? []) as {
      id: string;
      image_url: string;
    }[]),
  ];

  const hero =
    activeImage ??
    images[0]?.image_url ??
    null;

  const specs = (
    (product.product_specifications ?? []) as {
      id: string;
      spec_key: string;
      spec_value: string;
      sort_order: number;
    }[]
  ).sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  const related = (
    (all.data ?? []) as (ProductRow & {
      category_id: string | null;
    })[]
  )
    .filter(
      (p) =>
        p.id !== product.id &&
        p.category_id === product.category_id,
    )
    .slice(0, 4);

  const whatsapp = get("contact.whatsapp");

  return (
    <>
      <div className="container-page pt-8">
        <Breadcrumbs
          items={[
            {
              label: "Products",
              to: "/products",
            },
            ...(product.categories
              ? [
                  {
                    label: product.categories.name,
                  },
                ]
              : []),
            {
              label: product.name,
            },
          ]}
        />
      </div>

      <section className="container-page grid gap-12 py-10 lg:grid-cols-2">
        <div>
          <div className="aspect-4/3 overflow-hidden rounded-md border border-border surface-panel">
            {hero ? (
              <img
                src={hero}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-muted-foreground">
                <ImageOff className="h-8 w-8" />
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() =>
                    setActiveImage(img.image_url)
                  }
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-border"
                >
                  <img
                    src={img.image_url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.brands?.name && (
              <Link
                to="/brands/$slug"
                params={{
                  slug: product.brands.slug,
                }}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-accent"
              >
                {product.brands.name}
              </Link>
            )}

            {product.is_new && (
              <Badge className="bg-accent text-accent-foreground">
                New
              </Badge>
            )}

            {product.is_featured && (
              <Badge variant="secondary">
                Featured
              </Badge>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            {product.name}
          </h1>

          {product.short_description && (
            <p className="mt-4 text-muted-foreground">
              {product.short_description}
            </p>
          )}

          <dl className="mt-6 grid gap-3 border-y border-border py-6 text-sm sm:grid-cols-2">
            {product.sku && (
              <div>
                <dt className="text-muted-foreground">
                  Product code
                </dt>

                <dd className="font-medium">
                  {product.sku}
                </dd>
              </div>
            )}

            {product.categories?.name && (
              <div>
                <dt className="text-muted-foreground">
                  Category
                </dt>

                <dd className="font-medium">
                  {product.categories.name}
                </dd>
              </div>
            )}

            <div>
              <dt className="text-muted-foreground">
                Availability
              </dt>

              <dd className="font-medium">
                {availabilityLabel(
                  product.availability,
                )}
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground">
                Price
              </dt>

              <dd className="font-medium">
                {product.show_price &&
                product.price != null
                  ? `${product.currency} ${Number(
                      product.price,
                    ).toLocaleString()}`
                  : "Request Price"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <EnquiryDialog
              productId={product.id}
              productName={product.name}
              trigger={
                <Button size="lg">
                  Request a Quote
                </Button>
              }
            />

            {whatsapp && (
              <Button
                asChild
                size="lg"
                variant="outline"
              >
                <a
                  href={`https://wa.me/${whatsapp.replace(
                    /[^0-9]/g,
                    "",
                  )}?text=${encodeURIComponent(
                    `Hello Garg Dental, I would like information about ${product.name}.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp enquiry
                </a>
              </Button>
            )}
          </div>

          {(product.brochure_url ||
            product.spec_sheet_url) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {product.brochure_url && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                >
                  <a
                    href={product.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View catalogue
                  </a>
                </Button>
              )}

              {product.brochure_url && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                >
                  <a
                    href={product.brochure_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download brochure
                  </a>
                </Button>
              )}

              {product.spec_sheet_url && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                >
                  <a
                    href={product.spec_sheet_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Download specifications
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="container-page pb-16">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">
              Description
            </TabsTrigger>

            <TabsTrigger value="specs">
              Specifications
            </TabsTrigger>

            <TabsTrigger value="features">
              Features
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="description"
            className="pt-6"
          >
            <p className="max-w-3xl whitespace-pre-line text-muted-foreground">
              {product.description ||
                product.short_description ||
                "Detailed description coming soon."}
            </p>
          </TabsContent>

          <TabsContent
            value="specs"
            className="pt-6"
          >
            {specs.length === 0 ? (
              <p className="text-muted-foreground">
                Specifications will be published shortly.
              </p>
            ) : (
              <div className="max-w-3xl overflow-x-auto rounded-md border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map((spec) => (
                      <tr
                        key={spec.id}
                        className="border-b border-border last:border-0"
                      >
                        <th className="w-1/3 bg-surface p-3 text-left font-medium">
                          {spec.spec_key}
                        </th>

                        <td className="p-3 text-muted-foreground">
                          {spec.spec_value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="features"
            className="pt-6"
          >
            <div className="max-w-3xl">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Features
                </h3>

                <ul className="mt-3 space-y-2 text-sm">
                  {(product.features ?? []).length ===
                    0 && (
                    <li className="text-muted-foreground">
                      Not specified yet.
                    </li>
                  )}

                  {(product.features ?? []).map(
                    (f: string) => (
                      <li key={f}>
                        • {f}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {related.length > 0 && (
        <section className="surface-panel border-y border-border">
          <div className="container-page py-16">
            <h2 className="text-2xl font-bold">
              Related products
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}