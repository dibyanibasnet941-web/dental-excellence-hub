import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const tokenInput = (data: unknown) =>
  z.object({ accessToken: z.string().min(10).max(4000) }).parse(data);

const mutateInput = (data: unknown) =>
  z
    .object({
      accessToken: z.string().min(10).max(4000),
      userId: z.string().uuid(),
      role: z.enum(["admin", "staff"]),
      action: z.enum(["grant", "revoke"]),
    })
    .parse(data);

export type ManagedUser = {
  id: string;
  email: string;
  createdAt: string;
  roles: ("admin" | "staff")[];
};

export const listUsersWithRoles = createServerFn({ method: "POST" })
  .inputValidator(tokenInput)
  .handler(async ({ data }): Promise<{ currentUserId: string; users: ManagedUser[] }> => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { user, admin } = await requireAdmin(data.accessToken);

    const { data: authList, error: authError } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (authError) throw new Error(authError.message);

    const { data: roleRows, error: roleError } = await admin
      .from("user_roles")
      .select("user_id, role");
    if (roleError) throw new Error(roleError.message);

    const users = authList.users.map((u) => ({
      id: u.id,
      email: u.email ?? "(no email)",
      createdAt: u.created_at,
      roles: (roleRows ?? [])
        .filter((r) => r.user_id === u.id)
        .map((r) => r.role as "admin" | "staff"),
    }));

    return { currentUserId: user.id, users };
  });

export const setUserRole = createServerFn({ method: "POST" })
  .inputValidator(mutateInput)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { user, admin } = await requireAdmin(data.accessToken);

    if (data.action === "revoke" && data.role === "admin") {
      if (data.userId === user.id) {
        throw new Error("You cannot remove your own admin role.");
      }
      const { count, error } = await admin
        .from("user_roles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");
      if (error) throw new Error(error.message);
      if ((count ?? 0) <= 1) throw new Error("At least one administrator must remain.");
    }

    if (data.action === "grant") {
      const { error } = await admin
        .from("user_roles")
        .upsert({ user_id: data.userId, role: data.role }, { onConflict: "user_id,role" });
      if (error) throw new Error(error.message);
    } else {
      const { error } = await admin
        .from("user_roles")
        .delete()
        .eq("user_id", data.userId)
        .eq("role", data.role);
      if (error) throw new Error(error.message);
    }

    return { ok: true };
  });
