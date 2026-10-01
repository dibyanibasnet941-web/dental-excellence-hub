import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
});

export const brandsQuery = queryOptions({
  queryKey: ["brands"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
});

export const solutionsQuery = queryOptions({
  queryKey: ["solutions"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("solutions")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
});

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
});

export const resourcesQuery = queryOptions({
  queryKey: ["resources"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});

export const blogPostsQuery = queryOptions({
  queryKey: ["blog_posts"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*, blog_categories(name, slug)")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});

export const blogCategoriesQuery = queryOptions({
  queryKey: ["blog_categories"],
  queryFn: async () => {
    const { data, error } = await supabase.from("blog_categories").select("*").order("name");
    if (error) throw error;
    return data ?? [];
  },
});

export const siteContentQuery = queryOptions({
  queryKey: ["website_content"],
  queryFn: async () => {
    const { data, error } = await supabase.from("website_content").select("*");
    if (error) throw error;
    const map: Record<string, string> = {};
    for (const row of data ?? []) map[`${row.section}.${row.key}`] = row.value ?? "";
    return { rows: data ?? [], map };
  },
});

export const PRODUCT_CARD_SELECT = `
  id,
  name,
  slug,
  sku,
  short_description,
  image_url,
  availability,
  price,
  currency,
  show_price,
  is_featured,
  is_new,
  created_at,
  brand_id,
  category_id,
  categories(name, slug),
  brands(name, slug)
`;

export const PRODUCT_SELECT = `
  *,
  categories(name, slug),
  brands(name, slug)
`;

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_CARD_SELECT)
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("is_new", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  },
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
});

export function productBySlugQuery(slug: string) {
  return queryOptions({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`${PRODUCT_SELECT}, product_images(*), product_specifications(*)`)
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function blogPostBySlugQuery(slug: string) {
  return queryOptions({
    queryKey: ["blog_post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*, blog_categories(name, slug)")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export const enquiriesQuery = queryOptions({
  queryKey: ["enquiries"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});
export const brandProductCountsQuery = queryOptions({
  queryKey: ["brand_product_counts"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("products")
      .select("brand_id, category_id, categories(slug)");

    if (error) throw error;

    return data ?? [];
  },
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
});