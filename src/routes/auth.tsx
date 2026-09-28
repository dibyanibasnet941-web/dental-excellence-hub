import { useState } from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/dental/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? search["redirect"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Team Sign In — Garg Dental Pvt. Ltd." },
      { name: "description", content: "Sign in to the Garg Dental admin dashboard." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Team Sign In — Garg Dental" },
      { property: "og:description", content: "Staff access to the Garg Dental admin dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [loading, setLoading] = useState(false);

  const target = search.redirect && search.redirect.startsWith("/") ? search.redirect : "/admin";

  const handleEmail = async (mode: "signin" | "signup", event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        });
        if (error) throw error;
        toast.success("Account created. You can sign in now.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        void navigate({ to: target });
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    void navigate({ to: target });
  };

  return (
    <div className="flex min-h-screen items-center justify-center surface-panel px-5 py-16">
      <div className="w-full max-w-md rounded-md border border-border bg-card p-8 shadow-elevated">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy text-navy-foreground text-sm font-bold">
            GD
          </span>
          <div>
            <p className="text-sm font-bold">Garg Dental Pvt. Ltd.</p>
            <p className="text-xs text-muted-foreground">Team dashboard access</p>
          </div>
        </div>

        <Tabs defaultValue="signin" className="mt-8">
          <TabsList className="w-full">
            <TabsTrigger value="signin" className="flex-1">
              Sign in
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex-1">
              Create account
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form className="mt-6 space-y-4" onSubmit={(e) => handleEmail("signin", e)}>
              <Credentials />
              <Button type="submit" className="w-full" disabled={loading}>
                Sign in
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form className="mt-6 space-y-4" onSubmit={(e) => handleEmail("signup", e)}>
              <Credentials />
              <Button type="submit" className="w-full" disabled={loading}>
                Create account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Continue with Google
        </Button>

        <p className="mt-6 text-xs text-muted-foreground">
          Dashboard access is granted by an administrator. New accounts need a staff or admin role
          before content can be managed.
        </p>
      </div>
    </div>
  );
}

function Credentials() {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required minLength={6} />
      </div>
    </>
  );
}
