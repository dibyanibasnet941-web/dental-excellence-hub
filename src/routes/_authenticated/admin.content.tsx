import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/CrudManager";

export const Route = createFileRoute("/_authenticated/admin/content")({
  component: () => (
    <CrudManager
      table="website_content"
      title="Website content"
      description="Key/value settings used across the website: contact details, hero copy, statistics and more."
      queryKey={["admin", "website_content"]}
      orderBy="key"
      ascending
      fields={[
        { name: "key", label: "Key", type: "text", help: "e.g. contact.phone, hero.title" },
        { name: "value", label: "Value", type: "textarea" },
        { name: "description", label: "Internal note", type: "text" },
      ]}
      columns={[
        { name: "key", label: "Key" },
        { name: "value", label: "Value" },
      ]}
    />
  ),
});
