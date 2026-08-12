import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Boxes,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
  Tag,
  Wrench,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const links: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Boxes },
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/brands", label: "Brands", icon: Tag },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/blog", label: "Blog", icon: BookOpen },
  { to: "/admin/resources", label: "Resources", icon: FileText },
  { to: "/admin/services", label: "Services & Solutions", icon: Wrench },
  { to: "/admin/content", label: "Website Content", icon: Settings },
];

function AdminLayout() {
  const { isStaff, loading, user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-10 text-sm text-muted-foreground">Loading dashboard…</div>;
  }

  if (!isStaff) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="max-w-md rounded-md border border-border bg-card p-8 text-center">
          <h1 className="text-xl font-semibold">Access pending</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            You are signed in as {user?.email}, but this account does not have a staff or admin role
            yet. An administrator can grant access from the backend user roles table.
          </p>
          <Button
            className="mt-6"
            variant="outline"
            onClick={async () => {
              await supabase.auth.signOut();
              void navigate({ to: "/auth", search: { redirect: undefined } });
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex h-16 items-center gap-3 px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-sidebar-accent text-xs font-bold">
            GD
          </span>
          <span className="text-sm font-semibold">Admin</span>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {links.map((link) => {
            const active = link.exact ? pathname === link.to : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent",
                  active && "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm hover:bg-sidebar-accent"
          >
            View website
          </Link>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              void navigate({ to: "/auth", search: { redirect: undefined } });
            }}
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex items-center gap-2 overflow-x-auto border-b border-border bg-card px-4 py-2 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="whitespace-nowrap rounded-sm px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="p-5 md:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
