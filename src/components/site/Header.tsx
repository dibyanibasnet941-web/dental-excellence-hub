import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/site";
import { EnquiryDialog } from "./EnquiryDialog";
import { SearchDialog } from "./SearchDialog";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy text-navy-foreground text-sm font-bold tracking-tight">
            GD
          </span>
          <span className="leading-none">
            <span className="block text-base font-bold tracking-tight">Garg Dental</span>
            <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Pvt. Ltd.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-foreground",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "mx-auto mt-1 block h-px w-0 bg-accent transition-all",
                    active && "w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <SearchDialog
            trigger={
              <Button variant="ghost" size="icon" aria-label="Search the website">
                <Search className="h-4 w-4" />
              </Button>
            }
          />
          <EnquiryDialog
            trigger={
              <Button className="hidden sm:inline-flex" size="sm">
                Request a Quote
              </Button>
            }
          />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-10 flex flex-col">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3.5 text-base font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/blog"
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3.5 text-base font-medium"
                >
                  Blog
                </Link>
              </nav>
              <div className="mt-6">
                <EnquiryDialog trigger={<Button className="w-full">Request a Quote</Button>} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
