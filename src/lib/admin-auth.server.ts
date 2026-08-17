import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const SUPABASE_URL = "https://bcnolnjsrkonvgsnepfv.supabase.co";
export const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbm9sbmpzcmtvbnZnc25lcGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MjczMjgsImV4cCI6MjEwMjEwMzMyOH0.u4MIxT0GgEQ1ZSv3hQnwYShjThRHMs3nIbuOY_d8dR8";

export function adminClient() {
  const key = process.env["EXTERNAL_SUPABASE_SERVICE_ROLE_KEY"];
  if (!key) throw new Error("Service role key is not configured on the server.");
  return createClient<Database>(SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export async function verifyUser(accessToken: string) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: ANON_KEY, Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Your session is not valid. Sign in again.");
  const user = (await res.json()) as { id?: string; email?: string };
  if (!user.id) throw new Error("Your session is not valid. Sign in again.");
  return { id: user.id, email: user.email ?? "" };
}

export async function requireAdmin(accessToken: string) {
  const user = await verifyUser(accessToken);
  const admin = adminClient();
  const { data, error } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Only administrators can manage user roles.");
  return { user, admin };
}
