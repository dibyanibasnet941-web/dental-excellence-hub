import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: CategoriesAdmin,
});

function CategoriesAdmin() {
  return (
    <CrudManager
      table="categories"
      title="Categories"
      description="Manage the product categories used across the website."
      queryKey={["admin", "categories"]}
      orderBy="sort_order"
      ascending
      fields={[
        {
          name: "name",
          label: "Category name",
          type: "text",
        },

        {
          name: "slug",
          label: "URL slug",
          type: "slug",
          sourceField: "name",
          help: "Automatically generated from the category name. Used for category URLs.",
        },

        {
          name: "description",
          label: "Description",
          type: "textarea",
          full: true,
        },

        {
          name: "image_url",
          label: "Category image",
          type: "image",
          full: true,
        },

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
          name: "is_active",
          label: "Published",
          type: "boolean",
        },

        {
          name: "seo_title",
          label: "SEO title",
          type: "text",
          full: true,
        },

        {
          name: "seo_description",
          label: "SEO description",
          type: "textarea",
          full: true,
        },
      ]}
      columns={[
        {
          name: "name",
          label: "Category",
        },
        {
          name: "sort_order",
          label: "Order",
        },
        {
          name: "is_active",
          label: "Status",
        },
      ]}
    />
  );
}