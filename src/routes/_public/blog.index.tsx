import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/site/PageHeader";
import { CTASection } from "@/components/site/CTASection";
import { blogPostsQuery } from "@/lib/queries";
import { formatDate } from "@/lib/site";

export const Route = createFileRoute("/_public/blog/")({
  head: () => ({
    meta: [
      { title: "Dental Industry Insights & News — Garg Dental Blog" },
      {
        name: "description",
        content:
          "Articles, dental news and practice insights from Garg Dental Pvt. Ltd. for dentists, clinics and laboratories in Nepal.",
      },
      { property: "og:title", content: "Garg Dental Blog" },
      { property: "og:description", content: "Dental industry insights, news and practice guidance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const posts = useQuery(blogPostsQuery);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights for modern dental practices"
        description="News, product guidance and clinical technology updates from our team."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="container-page py-12">
        {(posts.data ?? []).length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-12 text-center">
            <p className="font-medium">No articles published yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Posts created in the admin dashboard will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(posts.data ?? []).map((post) => (
              <article key={post.id} className="group flex flex-col">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="aspect-16/10 overflow-hidden rounded-md surface-panel"
                >
                  {post.cover_image_url && (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </Link>
                <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {(post as { blog_categories?: { name: string } | null }).blog_categories?.name && (
                    <span className="text-accent">
                      {(post as { blog_categories?: { name: string } | null }).blog_categories?.name}
                    </span>
                  )}
                  <span>{formatDate(post.published_at ?? post.created_at)}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold leading-snug">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                )}
                {post.author && <p className="mt-3 text-xs text-muted-foreground">By {post.author}</p>}
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-4 text-sm font-medium text-accent"
                >
                  Read More
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </>
  );
}
