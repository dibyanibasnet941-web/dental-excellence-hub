import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { EnquiryDialog } from "./EnquiryDialog";

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
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Request a Quote", action: "quote" },
      { label: "Technical Support", to: "/services" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Footer() {
  const { get } = useSiteContent();

  const socials = [
    {
      icon: Facebook,
      href: get("social.facebook"),
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: get("social.instagram"),
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: get("social.linkedin"),
      label: "LinkedIn",
    },
  ].filter((social) => social.href);

  const contactItems = [
    { icon: Phone, value: get("contact.phone") },
    { icon: Mail, value: get("contact.email") },
    { icon: MapPin, value: get("contact.address") },
  ].filter((item) => item.value);

  return (
    <footer className="bg-[#0B2239] text-white">

      {/* =========================================================
          MAIN FOOTER
      ========================================================== */}
      <div className="container-page py-14 md:py-16 lg:py-20">

        <div className="grid gap-14 lg:grid-cols-[1.3fr_2.7fr] lg:gap-16">

          {/* =====================================================
              COMPANY INFORMATION
          ====================================================== */}
          <div className="max-w-md">

            <Link
              to="/"
              className="inline-block text-xl font-semibold tracking-[-0.02em] text-white transition-colors duration-200 hover:text-[#A8DADC]"
            >
              Garg Dental Pvt. Ltd.
            </Link>

            {/* Small brand accent */}
            <div className="mt-4 h-px w-9 bg-[#6FAEB2]" />

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              {get(
                "footer.tagline",
                "Dental products, equipment, instruments and solutions for dental professionals in Nepal.",
              )}
            </p>

            {/* Contact information */}
            {contactItems.length > 0 && (
              <div className="mt-7 space-y-3.5 text-sm leading-6 text-white/65">

                {contactItems.map(({ icon: Icon, value }, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/10 text-[#A8DADC]">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <span className="pt-1 max-w-sm">{value}</span>
                  </div>
                ))}

              </div>
            )}

            {/* Social links */}
            {socials.length > 0 && (
              <div className="mt-8 flex items-center gap-5">

                {socials.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors duration-200 hover:text-[#A8DADC]"
                    >
                      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />

                      <span className="hidden sm:inline">
                        {social.label}
                      </span>
                    </a>
                  );
                })}

              </div>
            )}

          </div>

          {/* =====================================================
              NAVIGATION
          ====================================================== */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:justify-items-start">

            {columns.map((column) => (
              <div key={column.title}>

                <h3 className="text-sm font-semibold text-white">
                  {column.title}
                </h3>

                {/* Simple divider */}
                <div className="mt-3 h-px w-6 bg-white/20" />

                <ul className="mt-5 space-y-3">

                  {column.links.map((link) => {
                    const linkContent = (
                      <>
                        <span>{link.label}</span>

                        <ArrowUpRight
                          className="
                            ml-1.5
                            h-3 w-3
                            opacity-0
                            transition-all
                            duration-200
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                            group-hover:opacity-100
                          "
                        />
                      </>
                    );

                    const linkClassName =
                      "group inline-flex items-center text-sm leading-6 text-white/55 transition-colors duration-200 hover:text-white";

                    return (
                      <li key={`${column.title}-${link.label}`}>

                        {link.action === "quote" ? (
                          <EnquiryDialog
                            trigger={
                              <button
                                type="button"
                                className={linkClassName}
                              >
                                {linkContent}
                              </button>
                            }
                          />
                        ) : (
                          <Link to={link.to} className={linkClassName}>
                            {linkContent}
                          </Link>
                        )}

                      </li>
                    );
                  })}

                </ul>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* =========================================================
          BOTTOM BAR
      ========================================================== */}
      <div className="border-t border-white/10">

        <div className="container-page flex flex-col gap-4 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">

          <p>
            {get(
              "footer.copyright",
              `© ${new Date().getFullYear()} Garg Dental Pvt. Ltd. All rights reserved.`,
            )}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">

            <Link
              to="/privacy-policy"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition-colors duration-200 hover:text-white"
            >
              Terms &amp; Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}
