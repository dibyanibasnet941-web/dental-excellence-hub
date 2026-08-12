import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { CTASection } from "@/components/site/CTASection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resourcesQuery } from "@/lib/queries";

const TYPES = [
  { value: "all", label: "All resources" },
  { value: "catalogue", label: "Product Catalogues" },
  { value: "brochure", label: "Brochures" },
  { value: "manual", label: "Product Manuals" },
  { value: "technical", label: "Technical Documents" },
  { value: "case_study", label: "Case Studies" },
  { value: "video", label: "Videos" },
];

export const Route = createFileRoute("/_public/resources")({
  head: () => ({
    meta: [
      { title: "Resource Centre — Catalogues, Manuals & Videos | Garg Dental" },
      {
        name: "description",
        content:
          "Download dental product catalogues, brochures, manuals and technical documents, or watch product videos from Garg Dental Pvt. Ltd.",
      },
      { property: "og:title", content: "Resource Centre — Garg Dental" },
      {
        property: "og:description",
        content: "Catalogues, brochures, manuals, technical documents and videos for dental professionals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const resources = useQuery(resourcesQuery);
  const [term, setTerm] = useState("");
  const [type, setType] = useState("all");

  const q = term.trim().toLowerCase();
  const rows = (resources.data ?? []).filter((r) => {
    const matchesType = type === "all" || r.resource_type === type;
    const matchesTerm =
      !q || r.title.toLowerCase().includes(q) || (r.description ?? "").toLowerCase().includes(q);
    return matchesType && matchesTerm;
  });

  return (
    <>
      <PageHeader
        eyebrow="Resource centre"
        title="Catalogues, documents and videos"
        description="Reference material for dental professionals — download product information or watch demonstrations."
        crumbs={[{ label: "Resources" }]}
      />

      <section className="container-page py-12">
        <div className="flex flex-wrap gap-3">
          <div className="min-w-[240px] flex-1">
            <Label htmlFor="resource-search" className="sr-only">
              Search resources
            </Label>
            <Input
              id="resource-search"
              placeholder="Search resources…"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {rows.length === 0 ? (
          <div className="mt-10 rounded-md border border-dashed border-border p-12 text-center">
            <p className="font-medium">No resources published yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Documents and videos uploaded in the admin dashboard appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((resource) => (
              <article
                key={resource.id}
                className="flex flex-col overflow-hidden rounded-md border border-border bg-card"
              >
                {resource.thumbnail_url && (
                  <img
                    src={resource.thumbnail_url}
                    alt={resource.title}
                    loading="lazy"
                    className="aspect-16/9 w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-accent">
                    {TYPES.find((t) => t.value === resource.resource_type)?.label ?? resource.resource_type}
                  </span>
                  <h2 className="mt-2 text-base font-semibold">{resource.title}</h2>
                  {resource.description && (
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  )}
                  <div className="mt-auto flex gap-2 pt-5">
                    {resource.file_url && (
                      <Button asChild size="sm" variant="outline">
                        <a href={resource.file_url} target="_blank" rel="noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    )}
                    {resource.video_url && (
                      <Button asChild size="sm" variant="outline">
                        <a href={resource.video_url} target="_blank" rel="noreferrer">
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Watch
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </>
  );
}
