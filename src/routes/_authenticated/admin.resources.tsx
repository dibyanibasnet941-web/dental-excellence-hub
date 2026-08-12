import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/resources")({
  component: () => (
    <CrudManager
      table="resources"
      title="Resources"
      description="Catalogues, brochures and downloadable documents."
      queryKey={["admin","resources"]}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "file_url", label: "File URL", type: "text" },
        { name: "resource_type", label: "Type", type: "text" },
        { name: "is_active", label: "Published", type: "boolean" },
      ]}
      columns={[
        { name: "title", label: "Title" },
        { name: "resource_type", label: "Type" },
        { name: "is_active", label: "Published" },
      ]}
    />
  ),
});
