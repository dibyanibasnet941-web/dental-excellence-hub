import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/brands")({
  component: () => (
    <CrudManager
      table="brands"
      title="Brands"
      description="Partner brands represented by Garg Dental."
      queryKey={["admin","brands"]}
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "slug", label: "Slug", type: "slug", sourceField: "name" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "logo_url", label: "Logo URL", type: "text" },
        { name: "country", label: "Country", type: "text" },
        { name: "website_url", label: "Website", type: "text" },
        { name: "is_active", label: "Published", type: "boolean" },
      ]}
      columns={[
        { name: "name", label: "Name" },
        { name: "country", label: "Country" },
        { name: "is_active", label: "Published" },
      ]}
    />
  ),
});
