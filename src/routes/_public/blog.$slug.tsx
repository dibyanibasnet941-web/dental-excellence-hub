import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { Button } from "@/components/ui/button";
import { blogPostBySlugQuery } from "@/lib/queries";
import { formatDate } from "@/lib/site";
import { getBlogPostSeo } from "@/lib/public.functions";

export const Route = createFileRoute("/_public/blog/$slug")({
  loader: ({ params }) => getBlogPostSeo({ data: { slug: params.slug } }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable — Garg Dental" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = loaderData.seo_title || `${loaderData.title} — Garg Dental`;
    const description = loaderData.seo_description || loaderData.excerpt || loaderData.title;
    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (loaderData.cover_image_url?.startsWith("https://")) {
      meta.push({ property: "og:image", content: loaderData.cover_image_url });
      meta.push({ name: "twitter:image", content: loaderData.cover_image_url });
    }
    return { meta };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: post, isLoading } = useQuery(blogPostBySlugQuery(slug));

  if (isLoading) return <div className="container-page py-24" />;

  if (!post) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <Button asChild className="mt-6">
          <Link to="/blog">Back to blog</Link>
        </Button>
      </div>
    );
  }

  const category = (post as { blog_categories?: { name: string } | null }).blog_categories;

  return (
    <>
      <article className="container-page max-w-3xl py-12">
        <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />
        <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {category?.name && <span className="text-accent">{category.name}</span>}
          <span>{formatDate(post.published_at ?? post.created_at)}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">{post.title}</h1>
        {post.author && <p className="mt-3 text-sm text-muted-foreground">By {post.author}</p>}
        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-8 aspect-16/9 w-full rounded-md object-cover"
          />
        )}
        {post.excerpt && <p className="mt-8 text-lg text-muted-foreground">{post.excerpt}</p>}
        <div className="mt-6 whitespace-pre-line leading-relaxed text-foreground/90">
          {post.content}
        </div>
      </article>

      <CTASection />
    </>
  );
}
