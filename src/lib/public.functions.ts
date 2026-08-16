import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(
    "https://bcnolnjsrkonvgsnepfv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbm9sbmpzcmtvbnZnc25lcGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MjczMjgsImV4cCI6MjEwMjEwMzMyOH0.u4MIxT0GgEQ1ZSv3hQnwYShjThRHMs3nIbuOY_d8dR8",
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}


const slugInput = (data: unknown) => z.object({ slug: z.string().max(200) }).parse(data);

export const getProductSeo = createServerFn({ method: "GET" })
  .inputValidator(slugInput)
  .handler(async ({ data }) => {
    const { data: row } = await publicClient()
      .from("products")
      .select("name, slug, short_description, seo_title, seo_description, image_url")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    return row;
  });

export const getBlogPostSeo = createServerFn({ method: "GET" })
  .inputValidator(slugInput)
  .handler(async ({ data }) => {
    const { data: row } = await publicClient()
      .from("blog_posts")
      .select("title, slug, excerpt, seo_title, seo_description, cover_image_url, published_at, author")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    return row;
  });
