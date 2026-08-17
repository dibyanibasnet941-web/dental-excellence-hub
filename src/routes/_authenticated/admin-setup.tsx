import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
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
  const [checking, setChecking] = useState(false);
  const [justGranted, setJustGranted] = useState(false);

  const token = async () => {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    if (!accessToken) throw new Error("You are not signed in.");
    return accessToken;
  };

  const refresh = async () => {
    setChecking(true);
    try {
      const result = await getAdminSetupStatus({ data: { accessToken: await token() } });
      setStatus(result);
      setError(null);
      return result;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const claim = async () => {
    setBusy(true);
    try {
      await claimAdminRole({ data: { accessToken: await token() } });
      // Refresh role state held by the client, then re-verify server-side.
      await supabase.auth.refreshSession();
      const result = await refresh();
      if (result?.isAdmin) {
        setJustGranted(true);
        toast.success("Admin role confirmed for your account.");
      } else {
        toast.error("The role was not confirmed. Try the status check again.");
      }
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
            <div className="rounded-sm border border-border bg-surface p-4 text-sm">
              <p>
                Signed in as <span className="font-medium">{status.email}</span>
              </p>
              <p className="mt-2 flex items-center gap-2">
                Role status:
                {status.isAdmin ? (
                  <span className="inline-flex items-center gap-1 font-medium text-primary">
                    <CheckCircle2 className="h-4 w-4" /> Admin
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-medium text-destructive">
                    <XCircle className="h-4 w-4" /> Not an admin
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {status.adminCount} administrator{status.adminCount === 1 ? "" : "s"} on this
                backend.
              </p>
            </div>

            {justGranted && (
              <p className="rounded-sm border border-primary/40 bg-primary/10 p-3 text-sm">
                Success — your account now has the admin role. You have full access to the
                dashboard.
              </p>
            )}

            {status.isAdmin ? (
              <Button asChild className="w-full">
                <Link to={"/admin" as never}>Open dashboard</Link>
              </Button>
            ) : status.adminCount > 0 ? (
              <p className="text-sm text-muted-foreground">
                An administrator already exists. Ask them to grant your account staff or admin
                access from the User Roles page in the dashboard.
              </p>
            ) : (
              <Button className="w-full" disabled={busy} onClick={() => void claim()}>
                {busy ? "Granting access…" : "Make me admin"}
              </Button>
            )}

            <Button
              variant="outline"
              className="w-full"
              disabled={checking}
              onClick={() => void refresh()}
            >
              {checking ? "Checking…" : "Re-check my role"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
