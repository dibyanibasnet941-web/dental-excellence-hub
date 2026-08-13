import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CrudManager } from "@/components/admin/CrudManager";
import { blogCategoriesQuery } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: BlogAdmin,
});

function BlogAdmin() {
  const categories = useQuery(blogCategoriesQuery);
  const options = (categories.data ?? []).map((c) => ({ value: c.id, label: c.name }));

  return (
    <div className="space-y-14">
      <CrudManager
        table="blog_posts"
        title="Blog posts"
        description="News, clinical insights and company updates."
        queryKey={["admin", "blog_posts"]}
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "Slug", type: "slug", sourceField: "title" },
          { name: "category_id", label: "Category", type: "select", options },
          { name: "author", label: "Author", type: "text" },
          { name: "excerpt", label: "Excerpt", type: "textarea" },
          { name: "content", label: "Content", type: "textarea" },
          { name: "cover_image_url", label: "Cover image URL", type: "text", full: true },
          { name: "published_at", label: "Publish date (YYYY-MM-DD)", type: "text" },
          { name: "is_published", label: "Published", type: "boolean" },
          { name: "seo_title", label: "SEO title", type: "text" },
          { name: "seo_description", label: "SEO description", type: "textarea" },
        ]}
        columns={[
          { name: "title", label: "Title" },
          { name: "author", label: "Author" },
          { name: "is_published", label: "Published" },
        ]}
      />
      <CrudManager
        table="blog_categories"
        title="Blog categories"
        description="Topic groupings for blog articles."
        queryKey={["admin", "blog_categories"]}
        orderBy="name"
        ascending
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "slug", label: "Slug", type: "slug", sourceField: "name" },
        ]}
        columns={[
          { name: "name", label: "Name" },
          { name: "slug", label: "Slug" },
        ]}
      />
    </div>
  );
}
