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
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "Slug", type: "slug", sourceField: "title" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "icon", label: "Icon name", type: "text" },
          { name: "display_order", label: "Display order", type: "number" },
          { name: "is_active", label: "Published", type: "boolean" },
        ]}
        columns={[
          { name: "title", label: "Title" },
          { name: "display_order", label: "Order" },
          { name: "is_active", label: "Published" },
        ]}
      />
      <CrudManager
        table="solutions"
        title="Solutions"
        description="Outcome-based solution packages such as clinic setup."
        queryKey={["admin", "solutions"]}
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "Slug", type: "slug", sourceField: "title" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image_url", label: "Image URL", type: "text" },
          { name: "display_order", label: "Display order", type: "number" },
          { name: "is_active", label: "Published", type: "boolean" },
        ]}
        columns={[
          { name: "title", label: "Title" },
          { name: "display_order", label: "Order" },
          { name: "is_active", label: "Published" },
        ]}
      />
    </div>
  );
}
