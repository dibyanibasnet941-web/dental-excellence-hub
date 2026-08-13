import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CrudManager } from "@/components/admin/CrudManager";
import { brandsQuery, categoriesQuery } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: ProductsAdmin,
});

function ProductsAdmin() {
  const categories = useQuery(categoriesQuery);
  const brands = useQuery(brandsQuery);

  const categoryOptions = (categories.data ?? []).map((c) => ({ value: c.id, label: c.name }));
  const brandOptions = (brands.data ?? []).map((b) => ({ value: b.id, label: b.name }));

  return (
    <CrudManager
      table="products"
      title="Products"
      description="Manage the product catalogue shown on the website."
      queryKey={["admin", "products"]}
      select="*, categories(name), brands(name)"
      fields={[
        { name: "name", label: "Product name", type: "text" },
        {
          name: "slug",
          label: "Slug",
          type: "slug",
          sourceField: "name",
          help: "Leave blank to generate from the name.",
        },
        { name: "sku", label: "SKU / model number", type: "text" },
        { name: "category_id", label: "Category", type: "select", options: categoryOptions },
        { name: "brand_id", label: "Brand", type: "select", options: brandOptions },
        { name: "product_type", label: "Product type", type: "text" },
        { name: "short_description", label: "Short description", type: "textarea" },
        { name: "description", label: "Full description", type: "textarea" },
        { name: "features", label: "Features (one per line)", type: "array" },
        { name: "applications", label: "Applications (one per line)", type: "array" },
        { name: "image_url", label: "Main image URL", type: "text", full: true },
        {
          name: "availability",
          label: "Availability",
          type: "select",
          options: [
            { value: "available", label: "Available" },
            { value: "preorder", label: "Pre-order" },
            { value: "out_of_stock", label: "Out of stock" },
          ],
        },
        { name: "price", label: "Price (NPR)", type: "number" },
        { name: "show_price", label: "Show price publicly", type: "boolean" },
        { name: "is_featured", label: "Featured", type: "boolean" },
        { name: "is_new", label: "New arrival", type: "boolean" },
        { name: "is_published", label: "Published", type: "boolean" },
        { name: "brochure_url", label: "Brochure URL", type: "text" },
        { name: "spec_sheet_url", label: "Spec sheet URL", type: "text" },
        { name: "seo_title", label: "SEO title", type: "text" },
        { name: "seo_description", label: "SEO description", type: "textarea" },
      ]}
      columns={[
        { name: "name", label: "Name" },
        { name: "sku", label: "SKU" },
        { name: "availability", label: "Availability" },
        { name: "is_published", label: "Published" },
      ]}
    />
  );
}
