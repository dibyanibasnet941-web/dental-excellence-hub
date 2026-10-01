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
      .select(`
        id,
        name,
        slug,
        logo_url,
        country,
        description,
        sort_order
      `)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) throw error;
    return data ?? [];
  },
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
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

type ProductsQueryOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  brand?: string;
  availability?: string[];
  featured?: boolean;
  isNew?: boolean;
  sort?: string;
};

export function productsQuery(options: ProductsQueryOptions = {}) {
  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? 12;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const search = options?.search?.trim() ?? "";
  const category = options?.category;
  const brand = options?.brand;
  const availability = options?.availability ?? [];
  const featured = options?.featured ?? false;
  const isNew = options?.isNew ?? false;
  const sort = options?.sort ?? "newest";

  return queryOptions({
    queryKey: [
      "products",
      page,
      pageSize,
      search,
      category,
      brand,
      availability,
      featured,
      isNew,
      sort,
    ],

    queryFn: async () => {
      let query = supabase
        .from("products")
        .select(PRODUCT_CARD_SELECT, { count: "exact" });

      // Search
      if (search) {
        const escaped = search.replace(/[%_]/g, "\\$&");

        query = query.or(
          `name.ilike.%${escaped}%,sku.ilike.%${escaped}%,short_description.ilike.%${escaped}%`,
        );
      }

      // Category
      if (category) {
        const { data: categoryRow, error: categoryError } =
          await supabase
            .from("categories")
            .select("id")
            .eq("slug", category)
            .maybeSingle();

        if (categoryError) throw categoryError;

        if (!categoryRow) {
          return {
            products: [],
            total: 0,
          };
        }

        query = query.eq("category_id", categoryRow.id);
      }

      // Brand
      if (brand) {
        const { data: brandRow, error: brandError } =
          await supabase
            .from("brands")
            .select("id")
            .eq("slug", brand)
            .maybeSingle();

        if (brandError) throw brandError;

        if (!brandRow) {
          return {
            products: [],
            total: 0,
          };
        }

        query = query.eq("brand_id", brandRow.id);
      }

      // Availability
      if (availability.length > 0) {
        query = query.in("availability", availability);
      }

      // Featured
      if (featured) {
        query = query.eq("is_featured", true);
      }

      // New
      if (isNew) {
        query = query.eq("is_new", true);
      }

      // Sorting
      if (sort === "name") {
        query = query
          .order("name", { ascending: true })
          .order("id", { ascending: true });
      } else if (sort === "oldest") {
        query = query
          .order("created_at", { ascending: true })
          .order("id", { ascending: true });
      } else {
        query = query
          .order("is_featured", { ascending: false })
          .order("is_new", { ascending: false })
          .order("created_at", { ascending: false })
          .order("id", { ascending: true });
      }

      const { data, error, count } = await query.range(from, to);

      if (error) throw error;

      return {
        products: data ?? [],
        total: count ?? 0,
      };
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
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