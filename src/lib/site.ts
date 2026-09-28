export const SITE_NAME = "Garg Dental Pvt. Ltd.";

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Brands", to: "/brands" },
  { label: "Solutions", to: "/solutions" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
] as const;

export const ENQUIRY_STATUSES = [
  "New",
  "Contacted",
  "Quotation Sent",
  "Follow-up",
  "Converted",
  "Closed",
] as const;

export const AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "on_order", label: "On Order" },
  { value: "out_of_stock", label: "Out of Stock" },
];

export function availabilityLabel(value: string | null | undefined) {
  return AVAILABILITY_OPTIONS.find((o) => o.value === value)?.label ?? "Available";
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
