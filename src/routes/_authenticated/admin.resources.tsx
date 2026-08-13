import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/resources")({
  component: () => (
    <CrudManager
      table="resources"
      title="Resources"
      description="Catalogues, brochures and downloadable documents."
      queryKey={["admin", "resources"]}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "slug", label: "Slug", type: "slug", sourceField: "title" },
        { name: "description", label: "Description", type: "textarea" },
        {
          name: "resource_type",
          label: "Type",
          type: "select",
          options: [
            { value: "brochure", label: "Brochure" },
            { value: "catalogue", label: "Catalogue" },
            { value: "guide", label: "Guide" },
            { value: "video", label: "Video" },
          ],
        },
        { name: "file_url", label: "File URL", type: "text" },
        { name: "video_url", label: "Video URL", type: "text" },
        { name: "thumbnail_url", label: "Thumbnail URL", type: "text", full: true },
        { name: "is_published", label: "Published", type: "boolean" },
      ]}
      columns={[
        { name: "title", label: "Title" },
        { name: "resource_type", label: "Type" },
        { name: "is_published", label: "Published" },
      ]}
    />
  ),
});
