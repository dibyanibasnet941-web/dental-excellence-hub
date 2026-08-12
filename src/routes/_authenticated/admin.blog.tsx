import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: () => (
    <CrudManager
      table="blog_posts"
      title="Blog posts"
      description="News, clinical insights and company updates."
      queryKey={["admin","blog_posts"]}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "slug", label: "Slug", type: "slug", sourceField: "title" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Content", type: "textarea" },
        { name: "cover_image_url", label: "Cover image URL", type: "text" },
        { name: "author", label: "Author", type: "text" },
        { name: "is_published", label: "Published", type: "boolean" },
      ]}
      columns={[
        { name: "title", label: "Title" },
        { name: "author", label: "Author" },
        { name: "is_published", label: "Published" },
      ]}
    />
  ),
});
