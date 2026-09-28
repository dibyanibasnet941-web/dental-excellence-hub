import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/site";
import { EnquiryDialog } from "./EnquiryDialog";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpeg";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">

          {/* Logo and Company Name */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Garg Dental logo"
              className="h-10 w-10 rounded-sm object-contain md:h-12 md:w-12"
            />

            <span className="leading-none">
              <span className="block text-base font-bold tracking-tight">
                Garg Dental
              </span>

              <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Pvt. Ltd.
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.to);

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

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">

            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search the website"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            {/* Request a Quote */}
            <EnquiryDialog
              trigger={
                <Button className="hidden sm:inline-flex" size="sm">
                  Request a Quote
                </Button>
              }
            />

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  {open ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
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
                  <EnquiryDialog
                    trigger={
                      <Button className="w-full">
                        Request a Quote
                      </Button>
                    }
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Box */}
        {searchOpen && (
          <div className="border-t border-border bg-background">
            <div className="container-page py-4">
              <div className="relative mx-auto max-w-3xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, articles..."
                  autoFocus
                  className="h-12 w-full rounded-md border border-border bg-background pl-12 pr-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}