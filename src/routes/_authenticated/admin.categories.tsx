import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: () => (
    <CrudManager
      table="categories"
      title="Categories"
      description="Catalogue categories used for browsing and filtering."
      queryKey={["admin", "categories"]}
      orderBy="sort_order"
      ascending
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "slug", label: "Slug", type: "slug", sourceField: "name" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image_url", label: "Image URL", type: "text" },
        { name: "icon", label: "Icon name", type: "text" },
        { name: "sort_order", label: "Display order", type: "number" },
        { name: "is_active", label: "Published", type: "boolean" },
        { name: "seo_title", label: "SEO title", type: "text" },
        { name: "seo_description", label: "SEO description", type: "textarea" },
      ]}
      columns={[
        { name: "name", label: "Name" },
        { name: "slug", label: "Slug" },
        { name: "sort_order", label: "Order" },
        { name: "is_active", label: "Published" },
      ]}
    />
  ),
});
