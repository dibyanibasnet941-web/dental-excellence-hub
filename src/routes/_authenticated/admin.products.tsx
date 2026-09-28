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

  const categoryOptions = (categories.data ?? []).map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const brandOptions = (brands.data ?? []).map((b) => ({
    value: b.id,
    label: b.name,
  }));

  return (
    <CrudManager
      table="products"
      title="Products"
      description="Manage the product catalogue shown on the website."
      queryKey={["admin", "products"]}
      select="*, categories(name), brands(name), product_specifications(spec_key, spec_value, sort_order)"
      
      fields={[
        {
          name: "name",
          label: "Product name",
          type: "text",
        },

        {
          name: "slug",
          label: "URL slug (optional)",
          type: "slug",
          sourceField: "name",
          help: "Leave blank to create it automatically from the product name.",
        },

        {
          name: "sku",
          label: "SKU / model number",
          type: "text",
        },

        {
          name: "category_id",
          label: "Category",
          type: "select",
          options: categoryOptions,
        },

        {
          name: "brand_id",
          label: "Brand",
          type: "select",
          options: brandOptions,
        },

        {
          name: "product_type",
          label: "Product type",
          type: "text",
        },

        {
          name: "short_description",
          label: "Short description",
          type: "textarea",
        },

        {
          name: "features",
          label: "Features",
          type: "array",
          help: "Enter one feature per line.",
          full: true,
        },

        {
          name: "specifications",
          label: "Specifications",
          type: "specifications",
          help: "Enter one specification per line. Use Key: Value when applicable; plain entries are also saved.",
          full: true,
        },

        {
          name: "brochure_url",
          label: "Catalogue URL",
          type: "text",
          help: "Optional. Paste the catalogue link from the manufacturer's website.",
          full: true,
        },

        {
          name: "image_url",
          label: "Product Image",
          type: "image",
          full: true,
        },

        {
          name: "availability",
          label: "Availability",
          type: "select",
          options: [
            {
              value: "available",
              label: "Available",
            },
            {
              value: "preorder",
              label: "Pre-order",
            },
            {
              value: "out_of_stock",
              label: "Out of stock",
            },
          ],
        },

        {
          name: "price",
          label: "Price (NPR)",
          type: "number",
        },

        {
          name: "show_price",
          label: "Show price publicly",
          type: "boolean",
        },

        {
          name: "is_featured",
          label: "Featured",
          type: "boolean",
        },

        {
          name: "is_new",
          label: "New arrival",
          type: "boolean",
        },

        {
          name: "is_published",
          label: "Published",
          type: "boolean",
        },
      ]}

      columns={[
        {
          name: "name",
          label: "Name",
        },
        {
          name: "sku",
          label: "SKU",
        },
        {
          name: "availability",
          label: "Availability",
        },
        {
          name: "is_published",
          label: "Published",
        },
      ]}
    />
  );
}
