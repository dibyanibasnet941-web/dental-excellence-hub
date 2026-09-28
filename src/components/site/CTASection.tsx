import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "./EnquiryDialog";

export function CTASection({
  title = "Talk to our team",
  description = "Tell us what your practice needs and our team will help you find the right equipment and supplies.",
  primaryLabel = "Request a Quote",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="container-page flex flex-col gap-7 py-12 md:flex-row md:items-center md:justify-between md:py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-navy-foreground/70 md:text-base">
            {description}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <EnquiryDialog
            trigger={
              <Button size="lg">
                {primaryLabel}
              </Button>
            }
          />

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}