import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/app-client";
import { claimAdminRole, getAdminSetupStatus } from "@/lib/admin-setup.functions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin-setup")({
  head: () => ({
    meta: [
      { title: "Admin Setup — Garg Dental Pvt. Ltd." },
      { name: "description", content: "One-time setup to grant admin access to your account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminSetup,
});

type Status = { email: string; adminCount: number; isAdmin: boolean };

function AdminSetup() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const token = async () => {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    if (!accessToken) throw new Error("You are not signed in.");
    return accessToken;
  };

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const result = await getAdminSetupStatus({ data: { accessToken: await token() } });
        if (active) setStatus(result);
      } catch (err) {
        if (active) setError((err as Error).message);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const claim = async () => {
    setBusy(true);
    try {
      await claimAdminRole({ data: { accessToken: await token() } });
      toast.success("Admin access granted.");
      // Refresh role state held by the client before entering the dashboard.
      await supabase.auth.refreshSession();
      void navigate({ to: "/admin" as never });
    } catch (err) {
      toast.error((err as Error).message);
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center surface-panel px-5 py-16">
      <div className="w-full max-w-md rounded-md border border-border bg-card p-8 shadow-elevated">
        <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy text-navy-foreground">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-xl font-semibold">Admin setup</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Grant your signed-in account the administrator role for the dashboard. This is a one-time
          step — only the first account can claim admin access.
        </p>

        {error && (
          <p className="mt-5 rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {!status && !error && (
          <p className="mt-6 text-sm text-muted-foreground">Checking your account…</p>
        )}

        {status && (
          <div className="mt-6 space-y-4">
            <p className="text-sm">
              Signed in as <span className="font-medium">{status.email}</span>
            </p>
            {status.isAdmin ? (
              <>
                <p className="text-sm text-muted-foreground">
                  This account already has the admin role.
                </p>
                <Button asChild className="w-full">
                  <Link to={"/admin" as never}>Open dashboard</Link>
                </Button>
              </>
            ) : status.adminCount > 0 ? (
              <p className="text-sm text-muted-foreground">
                An administrator already exists. Ask them to grant your account staff or admin
                access from the dashboard.
              </p>
            ) : (
              <Button className="w-full" disabled={busy} onClick={() => void claim()}>
                {busy ? "Granting access…" : "Make me admin"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
