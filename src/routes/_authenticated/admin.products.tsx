import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: () => (
    <CrudManager
      table="products"
      title="Products"
      description="Manage the product catalogue shown on the website."
      queryKey={["admin","products"]}
      fields={[
        { name: "name", label: "Product name", type: "text" },
        { name: "slug", label: "Slug", type: "slug", sourceField: "name", help: "Leave blank to generate from the name." },
        { name: "model_number", label: "Model number", type: "text" },
        { name: "short_description", label: "Short description", type: "textarea" },
        { name: "description", label: "Full description", type: "textarea" },
        { name: "images", label: "Image URLs (one per line)", type: "array" },
        { name: "price", label: "Price (NPR)", type: "number" },
        { name: "availability", label: "Availability", type: "text" },
        { name: "is_featured", label: "Featured", type: "boolean" },
        { name: "is_active", label: "Published", type: "boolean" },
      ]}
      columns={[
        { name: "name", label: "Name" },
        { name: "model_number", label: "Model" },
        { name: "availability", label: "Availability" },
        { name: "is_active", label: "Published" },
      ]}
    />
  ),
});
