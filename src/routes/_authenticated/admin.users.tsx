import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShieldCheck, UserCog } from "lucide-react";
import { supabase } from "@/integrations/supabase/app-client";
import { listUsersWithRoles, setUserRole } from "@/lib/user-roles.functions";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: UserRolesAdmin,
});

async function accessToken() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("You are not signed in.");
  return token;
}

function UserRolesAdmin() {
  const client = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "user-roles"],
    queryFn: async () => listUsersWithRoles({ data: { accessToken: await accessToken() } }),
  });

  const mutate = useMutation({
    mutationFn: async (input: {
      userId: string;
      role: "admin" | "staff";
      action: "grant" | "revoke";
    }) => setUserRole({ data: { ...input, accessToken: await accessToken() } }),
    onSuccess: () => {
      toast.success("Roles updated");
      void client.invalidateQueries({ queryKey: ["admin", "user-roles"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">User roles</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Everyone who has signed up for the dashboard. Promote trusted accounts to staff or admin, or
        remove access at any time.
      </p>

      {isLoading && <p className="mt-8 text-sm text-muted-foreground">Loading users…</p>}
      {error && (
        <p className="mt-8 rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {(error as Error).message}
        </p>
      )}

      <div className="mt-8 space-y-3">
        {(data?.users ?? []).map((user) => {
          const isAdmin = user.roles.includes("admin");
          const isStaff = user.roles.includes("staff");
          const self = user.id === data?.currentUserId;
          return (
            <article
              key={user.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-border bg-card p-5"
            >
              <div>
                <h2 className="flex items-center gap-2 font-semibold">
                  {isAdmin ? (
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  ) : (
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                  )}
                  {user.email}
                  {self && <span className="text-xs text-muted-foreground">(you)</span>}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Joined {formatDate(user.createdAt)} ·{" "}
                  {user.roles.length ? user.roles.join(", ") : "no role"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={isStaff ? "outline" : "secondary"}
                  disabled={mutate.isPending}
                  onClick={() =>
                    mutate.mutate({
                      userId: user.id,
                      role: "staff",
                      action: isStaff ? "revoke" : "grant",
                    })
                  }
                >
                  {isStaff ? "Remove staff" : "Make staff"}
                </Button>
                <Button
                  size="sm"
                  variant={isAdmin ? "outline" : "default"}
                  disabled={mutate.isPending || (isAdmin && self)}
                  onClick={() =>
                    mutate.mutate({
                      userId: user.id,
                      role: "admin",
                      action: isAdmin ? "revoke" : "grant",
                    })
                  }
                >
                  {isAdmin ? "Remove admin" : "Make admin"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
