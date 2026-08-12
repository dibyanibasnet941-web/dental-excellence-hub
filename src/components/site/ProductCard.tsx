import { Link } from "@tanstack/react-router";
import { ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { availabilityLabel } from "@/lib/site";
import { EnquiryDialog } from "./EnquiryDialog";

export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  short_description: string | null;
  image_url: string | null;
  availability: string;
  price: number | null;
  currency: string;
  show_price: boolean;
  is_featured: boolean;
  is_new: boolean;
  categories?: { name: string; slug: string } | null;
  brands?: { name: string; slug: string } | null;
};

export function ProductCard({ product }: { product: ProductRow }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-shadow hover:shadow-elevated">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-4/3 overflow-hidden surface-panel"
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-6 w-6" />
          </span>
        )}
        <div className="absolute left-3 top-3 flex gap-1.5">
          {product.is_new && <Badge className="bg-accent text-accent-foreground">New</Badge>}
          {product.is_featured && <Badge variant="secondary">Featured</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {product.brands?.name && <span className="font-semibold text-accent">{product.brands.name}</span>}
          {product.categories?.name && <span>{product.categories.name}</span>}
        </div>
        <h3 className="mt-2 text-base font-semibold leading-snug">
          <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        {product.short_description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.short_description}</p>
        )}
        <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
          {product.sku && (
            <div className="flex gap-2">
              <dt>Code</dt>
              <dd className="font-medium text-foreground">{product.sku}</dd>
            </div>
          )}
          <div className="flex gap-2">
            <dt>Availability</dt>
            <dd className="font-medium text-foreground">{availabilityLabel(product.availability)}</dd>
          </div>
        </dl>

        <p className="mt-4 text-sm font-semibold">
          {product.show_price && product.price != null
            ? `${product.currency} ${Number(product.price).toLocaleString()}`
            : "Request Price"}
        </p>

        <div className="mt-4 flex gap-2">
          <EnquiryDialog
            productId={product.id}
            productName={product.name}
            trigger={
              <Button size="sm" className="flex-1">
                Request Quote
              </Button>
            }
          />
          <Button asChild size="sm" variant="outline" className="flex-1">
            <Link to="/products/$slug" params={{ slug: product.slug }}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
