import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/services")({
  component: ServicesAdmin,
});

function ServicesAdmin() {
  return (
    <div className="space-y-14">
      <CrudManager
        table="services"
        title="Services"
        description="Support, installation, maintenance and training services."
        queryKey={["admin", "services"]}
        orderBy="sort_order"
        ascending
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "Slug", type: "slug", sourceField: "title" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "benefits", label: "Benefits (one per line)", type: "array" },
          { name: "image_url", label: "Image URL", type: "text" },
          { name: "icon", label: "Icon name", type: "text" },
          { name: "sort_order", label: "Display order", type: "number" },
          { name: "is_published", label: "Published", type: "boolean" },
        ]}
        columns={[
          { name: "title", label: "Title" },
          { name: "sort_order", label: "Order" },
          { name: "is_published", label: "Published" },
        ]}
      />
      <CrudManager
        table="solutions"
        title="Solutions"
        description="Outcome-based solution packages such as clinic setup."
        queryKey={["admin", "solutions"]}
        orderBy="sort_order"
        ascending
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "Slug", type: "slug", sourceField: "title" },
          { name: "overview", label: "Overview", type: "textarea" },
          { name: "body", label: "Full description", type: "textarea" },
          { name: "image_url", label: "Image URL", type: "text" },
          { name: "icon", label: "Icon name", type: "text" },
          { name: "sort_order", label: "Display order", type: "number" },
          { name: "is_published", label: "Published", type: "boolean" },
          { name: "seo_title", label: "SEO title", type: "text" },
          { name: "seo_description", label: "SEO description", type: "textarea" },
        ]}
        columns={[
          { name: "title", label: "Title" },
          { name: "sort_order", label: "Order" },
          { name: "is_published", label: "Published" },
        ]}
      />
    </div>
  );
}
