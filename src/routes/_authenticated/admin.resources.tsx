import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/resources")({
  component: ResourcesAdmin,
});

function ResourcesAdmin() {
  return (
    <CrudManager
      table="resources"
      title="Resources"
      description="Manage catalogues, brochures, guides and other downloadable resources."
      queryKey={["admin", "resources"]}
      fields={[
        {
          name: "title",
          label: "Resource title",
          type: "text",
          help: "Enter the title visitors will see on the website.",
        },
        {
          name: "slug",
          label: "URL slug",
          type: "slug",
          sourceField: "title",
          help: "Leave blank to generate automatically from the title.",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          help: "Briefly describe what this resource contains.",
          full: true,
        },
        {
          name: "resource_type",
          label: "Resource type",
          type: "select",
          options: [
            { value: "catalogue", label: "Catalogue" },
            { value: "brochure", label: "Brochure" },
            { value: "guide", label: "Guide" },
            { value: "manual", label: "Product Manual" },
            { value: "technical", label: "Technical Document" },
            { value: "case_study", label: "Case Study" },
            { value: "video", label: "Video" },
          ],
        },
        {
          name: "file_url",
          label: "Resource file URL",
          type: "text",
          help:
            "Add the URL of the catalogue, brochure, guide or downloadable document.",
          full: true,
        },
        {
          name: "video_url",
          label: "Video URL",
          type: "text",
          help: "Use this only when the resource type is Video.",
        },
        {
          name: "thumbnail_url",
          label: "Resource cover",
          type: "image",
          help: "Upload a cover image to use as the resource thumbnail.",
          full: true,
        },
        {
          name: "is_published",
          label: "Published",
          type: "boolean",
          help: "Published resources will be visible on the public website.",
        },
      ]}
      columns={[
        {
          name: "title",
          label: "Title",
        },
        {
          name: "resource_type",
          label: "Type",
        },
        {
          name: "is_published",
          label: "Published",
        },
      ]}
    />
  );
}