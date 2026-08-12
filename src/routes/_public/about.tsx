import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/site/PageHeader";
import { CTASection } from "@/components/site/CTASection";
import { useSiteContent } from "@/hooks/useSiteContent";
import { brandsQuery } from "@/lib/queries";
import instrumentsImage from "@/assets/instruments.jpg";

export const Route = createFileRoute("/_public/about")({
  head: () => ({
    meta: [
      { title: "About Garg Dental Pvt. Ltd. — Dental Solutions Company" },
      {
        name: "description",
        content:
          "Learn about Garg Dental Pvt. Ltd., a dental products, equipment and solutions company serving dental professionals in Nepal.",
      },
      { property: "og:title", content: "About Garg Dental Pvt. Ltd." },
      {
        property: "og:description",
        content: "Our story, mission, values and capability in serving the dental industry in Nepal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PLACEHOLDER = "This section will be published once verified by the Garg Dental team.";

function AboutPage() {
  const { get } = useSiteContent();
  const brands = useQuery(brandsQuery);

  const blocks = [
    { title: "Our story", key: "about.story" },
    { title: "Mission", key: "about.mission" },
    { title: "Vision", key: "about.vision" },
    { title: "Values", key: "about.values" },
    { title: "Why choose Garg Dental", key: "about.why_choose" },
    { title: "Distribution & service capability", key: "about.capability" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Garg Dental Pvt. Ltd."
        description={get(
          "about.intro",
          "A dental products, equipment, instruments and solutions company serving dental professionals across Nepal.",
        )}
        crumbs={[{ label: "About Us" }]}
      />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          {blocks.map((block) => (
            <div key={block.key}>
              <h2 className="text-xl font-semibold">{block.title}</h2>
              <p className="mt-3 max-w-3xl whitespace-pre-line text-muted-foreground">
                {get(block.key, PLACEHOLDER)}
              </p>
            </div>
          ))}
        </div>

        <aside className="space-y-8">
          <img
            src={instrumentsImage}
            alt="Dental instruments supplied by Garg Dental"
            loading="lazy"
            width={1200}
            height={900}
            className="rounded-md object-cover"
          />
          <div className="surface-panel rounded-md border border-border p-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Partner brands
            </h3>
            {(brands.data ?? []).length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Partner brands will be listed once added by the team.
              </p>
            ) : (
              <ul className="mt-3 space-y-1.5 text-sm">
                {(brands.data ?? []).map((b) => (
                  <li key={b.id}>{b.name}</li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </section>

      <CTASection title="Work with Garg Dental" />
    </>
  );
}
