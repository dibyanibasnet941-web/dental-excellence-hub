import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowRight, CalendarDays } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { blogPostsQuery, blogCategoriesQuery } from "@/lib/queries";
import { formatDate } from "@/lib/site";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_public/blog/")({
  head: () => ({
    meta: [
      {
        title: "Dental Industry Insights & News — Garg Dental Blog",
      },
      {
        name: "description",
        content:
          "Articles, dental news and practice insights from Garg Dental Pvt. Ltd. for dentists, clinics and laboratories in Nepal.",
      },
      {
        property: "og:title",
        content: "Garg Dental Blog",
      },
      {
        property: "og:description",
        content:
          "Dental industry insights, news and practice guidance.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: BlogPage,
});

function BlogPage() {
  const posts = useQuery(blogPostsQuery);
  const categories = useQuery(blogCategoriesQuery);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return (posts.data ?? []).filter((post) => {
      const category = (
        post as {
          blog_categories?: {
            name?: string;
            slug?: string;
          } | null;
        }
      ).blog_categories;

      const matchesCategory =
        selectedCategory === "all" ||
        category?.slug === selectedCategory;

      const matchesSearch =
        !query ||
        [
          post.title,
          post.excerpt,
          post.author,
          category?.name,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(query),
          );

      return matchesCategory && matchesSearch;
    });
  }, [posts.data, search, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights for modern dental practices"
        description="News, product guidance and clinical technology updates from our team."
        crumbs={[{ label: "Blog" }]}
      />

      {/* SEARCH + CATEGORY FILTERS */}
      <section className="border-b border-border bg-muted/20">
        <div className="container-page py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search articles..."
                className="h-11 pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                All
              </button>

              {(categories.data ?? []).map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category.slug)
                  }
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="container-page py-12 md:py-16">
        {posts.isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse"
              >
                <div className="aspect-[16/10] rounded-md bg-muted" />
                <div className="mt-5 h-3 w-24 rounded bg-muted" />
                <div className="mt-3 h-6 w-4/5 rounded bg-muted" />
                <div className="mt-3 h-4 w-full rounded bg-muted" />
                <div className="mt-2 h-4 w-2/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : posts.isError ? (
          <div className="rounded-md border border-border p-12 text-center">
            <p className="font-medium">
              Unable to load articles.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Please try again later.
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-12 text-center">
            <p className="font-medium">
              No articles found.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <>
            {/* FEATURED / LATEST ARTICLE */}
            {featuredPost && (
              <Link
                to="/blog/$slug"
                params={{ slug: featuredPost.slug }}
                className="group mb-12 grid overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg lg:grid-cols-2"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[360px]">
                  {featuredPost.cover_image_url ? (
                    <img
                      src={featuredPost.cover_image_url}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-muted-foreground">
                      Garg Dental
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    {(
                      featuredPost as {
                        blog_categories?: {
                          name?: string;
                        } | null;
                      }
                    ).blog_categories?.name && (
                      <Badge variant="secondary">
                        {
                          (
                            featuredPost as {
                              blog_categories?: {
                                name?: string;
                              } | null;
                            }
                          ).blog_categories?.name
                        }
                      </Badge>
                    )}

                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {formatDate(
                        featuredPost.published_at ??
                          featuredPost.created_at,
                      )}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                    {featuredPost.title}
                  </h2>

                  {featuredPost.excerpt && (
                    <p className="mt-4 line-clamp-4 text-sm leading-7 text-muted-foreground md:text-base">
                      {featuredPost.excerpt}
                    </p>
                  )}

                  {featuredPost.author && (
                    <p className="mt-5 text-xs text-muted-foreground">
                      By {featuredPost.author}
                    </p>
                  )}

                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )}

            {/* ARTICLE GRID */}
            {remainingPosts.length > 0 && (
              <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => {
                  const category = (
                    post as {
                      blog_categories?: {
                        name?: string;
                      } | null;
                    }
                  ).blog_categories;

                  return (
                    <article
                      key={post.id}
                      className="group flex flex-col"
                    >
                      {/* Image */}
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="surface-panel aspect-[16/10] overflow-hidden rounded-md"
                      >
                        {post.cover_image_url ? (
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            Garg Dental
                          </div>
                        )}
                      </Link>

                      {/* Meta */}
                      <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        {category?.name && (
                          <span className="text-accent">
                            {category.name}
                          </span>
                        )}

                        <span>
                          {formatDate(
                            post.published_at ??
                              post.created_at,
                          )}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mt-2 text-lg font-semibold leading-snug">
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="transition-colors hover:text-accent"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Author */}
                      {post.author && (
                        <p className="mt-3 text-xs text-muted-foreground">
                          By {post.author}
                        </p>
                      )}

                      {/* Read More */}
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent"
                      >
                        Read More
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}