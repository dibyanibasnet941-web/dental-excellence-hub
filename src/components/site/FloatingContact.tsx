import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { EnquiryDialog } from "./EnquiryDialog";

export function FloatingContact() {
  const { get } = useSiteContent();
  const whatsapp = get("contact.whatsapp");
  const phone = get("contact.phone");

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 print:hidden">
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-navy-foreground shadow-elevated transition-transform hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          aria-label="Call us"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-navy-foreground shadow-elevated transition-transform hover:scale-105"
        >
          <Phone className="h-5 w-5" />
        </a>
      )}
      <EnquiryDialog
        trigger={
          <Button size="sm" className="shadow-elevated">
            Request a Quote
          </Button>
        }
      />
    </div>
  );
}
