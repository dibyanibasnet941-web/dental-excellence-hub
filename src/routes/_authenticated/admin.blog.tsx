import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CrudManager } from "@/components/admin/CrudManager";
import { blogCategoriesQuery } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: BlogAdmin,
});

function BlogAdmin() {
  const categories = useQuery(blogCategoriesQuery);

  const options = (categories.data ?? []).map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="space-y-14">
      {/* ─────────────────────────────────────────
          BLOG POSTS
      ───────────────────────────────────────── */}
      <CrudManager
        table="blog_posts"
        title="Blog posts"
        description="Manage news, clinical insights and company updates."
        queryKey={["admin", "blog_posts"]}
        fields={[
          // ─────────────────────────────────────
          // BASIC INFORMATION
          // ─────────────────────────────────────
          {
            name: "title",
            label: "Blog title",
            type: "text",
            help: "Enter the title of the blog article.",
          },

          {
            name: "slug",
            label: "URL slug",
            type: "slug",
            sourceField: "title",
            help: "Leave blank to generate automatically from the title.",
          },

          {
            name: "category_id",
            label: "Category",
            type: "select",
            options,
            help: "Choose the category that best matches this article.",
          },

          {
            name: "author",
            label: "Author",
            type: "text",
            help: "Enter the author or team name displayed on the article.",
          },

          // ─────────────────────────────────────
          // ARTICLE
          // ─────────────────────────────────────
          {
            name: "excerpt",
            label: "Excerpt",
            type: "textarea",
            help: "A short summary shown on blog cards and article previews.",
            full: true,
          },

          {
            name: "content",
            label: "Article content",
            type: "textarea",
            help: "Write the full blog article content.",
            full: true,
          },

          // ─────────────────────────────────────
          // COVER IMAGE
          // ─────────────────────────────────────
          {
            name: "cover_image_url",
            label: "Cover image",
            type: "image",
            help: "Upload the main image displayed with this blog article.",
            full: true,
          },

          // ─────────────────────────────────────
          // PUBLISHING
          // ─────────────────────────────────────
          {
            name: "published_at",
            label: "Publish date",
            type: "datetime",
            help: "Choose when this article should be published.",
          },

          {
            name: "is_published",
            label: "Published",
            type: "boolean",
            help: "Published articles will be visible on the public website.",
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
            name: "author",
            label: "Author",
          },
          {
            name: "is_published",
            label: "Published",
          },
        ]}
      />

      {/* ─────────────────────────────────────────
          BLOG CATEGORIES
      ───────────────────────────────────────── */}
      <CrudManager
        table="blog_categories"
        title="Blog categories"
        description="Manage the topic categories used to organise blog articles."
        queryKey={["admin", "blog_categories"]}
        orderBy="name"
        ascending
        fields={[
          {
            name: "name",
            label: "Category name",
            type: "text",
            help: "Enter the name of the blog category.",
          },

          {
            name: "slug",
            label: "URL slug",
            type: "slug",
            sourceField: "name",
            help: "Leave blank to generate automatically from the category name.",
          },
        ]}
        columns={[
          {
            name: "name",
            label: "Name",
          },
          {
            name: "slug",
            label: "Slug",
          },
        ]}
      />
    </div>
  );
}