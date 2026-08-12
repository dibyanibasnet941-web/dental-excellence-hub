import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const columns = [
  {
    title: "Garg Dental",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Services", to: "/services" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Categories", to: "/products" },
      { label: "Featured Products", to: "/products" },
      { label: "Brands", to: "/brands" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Catalogues", to: "/resources" },
      { label: "Downloads", to: "/resources" },
      { label: "Videos", to: "/resources" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Request a Quote", to: "/contact" },
      { label: "Technical Support", to: "/services" },
      { label: "Contact", to: "/contact" },
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
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy-foreground/10 text-sm font-bold">
              GD
            </span>
            <span className="text-base font-bold tracking-tight">Garg Dental Pvt. Ltd.</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-navy-foreground/70">
            {get(
              "footer.tagline",
              "Dental products, equipment, instruments and solutions for dental professionals in Nepal.",
            )}
          </p>
          <div className="mt-6 space-y-1 text-sm text-navy-foreground/70">
            {get("contact.phone") && <p>{get("contact.phone")}</p>}
            {get("contact.email") && <p>{get("contact.email")}</p>}
            {get("contact.address") && <p>{get("contact.address")}</p>}
          </div>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy-foreground/10 transition-colors hover:bg-accent"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground/50">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
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
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {get(
              "footer.copyright",
              `© ${new Date().getFullYear()} Garg Dental Pvt. Ltd. All rights reserved.`,
            )}
          </p>
          <div className="flex gap-6">
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
