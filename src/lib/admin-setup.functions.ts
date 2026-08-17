import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const SUPABASE_URL = "https://bcnolnjsrkonvgsnepfv.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbm9sbmpzcmtvbnZnc25lcGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MjczMjgsImV4cCI6MjEwMjEwMzMyOH0.u4MIxT0GgEQ1ZSv3hQnwYShjThRHMs3nIbuOY_d8dR8";

const tokenInput = (data: unknown) =>
  z.object({ accessToken: z.string().min(10).max(4000) }).parse(data);

function adminClient() {
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

async function verifyUser(accessToken: string) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: ANON_KEY, Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Your session is not valid. Sign in again.");
  const user = (await res.json()) as { id?: string; email?: string };
  if (!user.id) throw new Error("Your session is not valid. Sign in again.");
  return { id: user.id, email: user.email ?? "" };
}

export const getAdminSetupStatus = createServerFn({ method: "POST" })
  .inputValidator(tokenInput)
  .handler(async ({ data }) => {
    const user = await verifyUser(data.accessToken);
    const admin = adminClient();
    const { data: rows, error } = await admin.from("user_roles").select("user_id, role");
    if (error) throw new Error(error.message);
    const all = rows ?? [];
    return {
      email: user.email,
      adminCount: all.filter((r) => r.role === "admin").length,
      isAdmin: all.some((r) => r.user_id === user.id && r.role === "admin"),
    };
  });

export const claimAdminRole = createServerFn({ method: "POST" })
  .inputValidator(tokenInput)
  .handler(async ({ data }) => {
    const user = await verifyUser(data.accessToken);
    const admin = adminClient();

    const { data: rows, error } = await admin.from("user_roles").select("user_id, role");
    if (error) throw new Error(error.message);
    const all = rows ?? [];

    if (all.some((r) => r.user_id === user.id && r.role === "admin")) {
      return { granted: false, alreadyAdmin: true as const };
    }
    // Bootstrap rule: only the first account can self-assign admin.
    if (all.some((r) => r.role === "admin")) {
      throw new Error(
        "An administrator already exists. Ask them to grant your account access from the dashboard.",
      );
    }

    const { error: insertError } = await admin
      .from("user_roles")
      .insert({ user_id: user.id, role: "admin" });
    if (insertError) throw new Error(insertError.message);

    return { granted: true, alreadyAdmin: false as const };
  });
