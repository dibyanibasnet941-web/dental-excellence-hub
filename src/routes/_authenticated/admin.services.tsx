import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/services")({
  component: ServicesAdmin,
});

function ServicesAdmin() {
  return (
    <div className="space-y-14">
      {/* ─────────────────────────────────────────
          SERVICES
      ───────────────────────────────────────── */}
      <CrudManager
        table="services"
        title="Services"
        description="Manage support, installation, maintenance and training services."
        queryKey={["admin", "services"]}
        orderBy="sort_order"
        ascending
        fields={[
          // ─────────────────────────────────────
          // BASIC INFORMATION
          // ─────────────────────────────────────
          {
            name: "title",
            label: "Service title",
            type: "text",
            help: "Enter the service name displayed on the website.",
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
            help: "Briefly describe what this service provides.",
            full: true,
          },

          // ─────────────────────────────────────
          // BENEFITS
          // ─────────────────────────────────────
          {
            name: "benefits",
            label: "Benefits",
            type: "array",
            help: "Enter one benefit per line.",
            full: true,
          },

          // ─────────────────────────────────────
          // IMAGE
          // ─────────────────────────────────────
          {
            name: "image_url",
            label: "Service image",
            type: "image",
            help: "Upload an image to represent this service.",
            full: true,
          },

          // ─────────────────────────────────────
          // DISPLAY
          // ─────────────────────────────────────
          {
            name: "icon",
            label: "Icon name",
            type: "text",
            help: "Optional icon name used by the website.",
          },

          {
            name: "sort_order",
            label: "Display order",
            type: "number",
            help: "Lower numbers appear first.",
          },

          {
            name: "is_published",
            label: "Published",
            type: "boolean",
            help: "Published services will be visible on the public website.",
          },
        ]}
        columns={[
          {
            name: "title",
            label: "Title",
          },
          {
            name: "sort_order",
            label: "Order",
          },
          {
            name: "is_published",
            label: "Published",
          },
        ]}
      />

      {/* ─────────────────────────────────────────
          SOLUTIONS
      ───────────────────────────────────────── */}
      <CrudManager
        table="solutions"
        title="Solutions"
        description="Manage outcome-based solution packages such as clinic setup."
        queryKey={["admin", "solutions"]}
        orderBy="sort_order"
        ascending
        fields={[
          // ─────────────────────────────────────
          // BASIC INFORMATION
          // ─────────────────────────────────────
          {
            name: "title",
            label: "Solution title",
            type: "text",
            help: "Enter the solution name displayed on the website.",
          },

          {
            name: "slug",
            label: "URL slug",
            type: "slug",
            sourceField: "title",
            help: "Leave blank to generate automatically from the title.",
          },

          {
            name: "overview",
            label: "Overview",
            type: "textarea",
            help: "Provide a short introduction to this solution.",
            full: true,
          },

          {
            name: "body",
            label: "Full description",
            type: "textarea",
            help: "Provide the complete details of the solution.",
            full: true,
          },

          // ─────────────────────────────────────
          // IMAGE
          // ─────────────────────────────────────
          {
            name: "image_url",
            label: "Solution image",
            type: "image",
            help: "Upload an image to represent this solution.",
            full: true,
          },

          // ─────────────────────────────────────
          // DISPLAY
          // ─────────────────────────────────────
          {
            name: "icon",
            label: "Icon name",
            type: "text",
            help: "Optional icon name used by the website.",
          },

          {
            name: "sort_order",
            label: "Display order",
            type: "number",
            help: "Lower numbers appear first.",
          },

          {
            name: "is_published",
            label: "Published",
            type: "boolean",
            help: "Published solutions will be visible on the public website.",
          },

          // ─────────────────────────────────────
          // SEO
          // ─────────────────────────────────────
          {
            name: "seo_title",
            label: "SEO title",
            type: "text",
            help: "Optional title used by search engines.",
          },

          {
            name: "seo_description",
            label: "SEO description",
            type: "textarea",
            help: "Optional description used by search engines.",
            full: true,
          },
        ]}
        columns={[
          {
            name: "title",
            label: "Title",
          },
          {
            name: "sort_order",
            label: "Order",
          },
          {
            name: "is_published",
            label: "Published",
          },
        ]}
      />
    </div>
  );
}