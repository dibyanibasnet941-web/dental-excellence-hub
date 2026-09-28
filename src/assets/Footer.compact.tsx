import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Categories", to: "/products" },
      { label: "Brands", to: "/brands" },
      { label: "Request a Quote", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Downloads", to: "/resources" },
    ],
  },
];

export function Footer() {
  const { get } = useSiteContent();
  const socials = [
    { icon: Facebook, href: get("social.facebook"), label: "Facebook" },
    { icon: Instagram, href: get("social.instagram"), label: "Instagram" },
    { icon: Linkedin, href: get("social.linkedin"), label: "LinkedIn" },
  ].filter((s) => s.href);

  return (
    <footer className="mt-16 bg-navy text-navy-foreground">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-navy-foreground/10 text-xs font-bold">
              GD
            </span>
            <span className="text-sm font-bold tracking-tight">Garg Dental Pvt. Ltd.</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-navy-foreground/70">
            {get(
              "footer.tagline",
              "Dental products, equipment and solutions for professionals in Nepal.",
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-navy-foreground/70">
            {get("contact.phone") && <span>{get("contact.phone")}</span>}
            {get("contact.email") && <span>{get("contact.email")}</span>}
          </div>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-sm bg-navy-foreground/10 transition-colors hover:bg-accent"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-foreground/50">
              {col.title}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {col.links.map((link) => (
                <li key={`${col.title}-${link.label}`}>
                  <Link
                    to={link.to}
                    className="text-sm text-navy-foreground/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {get(
              "footer.copyright",
              `© ${new Date().getFullYear()} Garg Dental Pvt. Ltd. All rights reserved.`,
            )}
          </p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
