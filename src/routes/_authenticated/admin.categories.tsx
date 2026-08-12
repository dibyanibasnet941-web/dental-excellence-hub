import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: () => (
    <CrudManager
      table="categories"
      title="Categories"
      description="Catalogue categories used for browsing and filtering."
      queryKey={["admin","categories"]}
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "slug", label: "Slug", type: "slug", sourceField: "name" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image_url", label: "Image URL", type: "text" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_active", label: "Published", type: "boolean" },
      ]}
      columns={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
        { name: "display_order", label: "Order" },
        { name: "is_active", label: "Published" },
      ]}
    />
  ),
});
