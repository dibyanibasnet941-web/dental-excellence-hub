import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "./EnquiryDialog";

export function CTASection({
  title = "Talk to our team",
  description = "Tell us what your practice needs and our specialists will get back to you with recommendations and pricing.",
  primaryLabel = "Request a Quote",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-3 text-navy-foreground/70">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <EnquiryDialog trigger={<Button size="lg">{primaryLabel}</Button>} />
          <Button asChild size="lg" variant="outline" className="border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
