import { useState, type ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/app-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  organization: z.string().trim().max(150).optional(),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional(),
  location: z.string().trim().max(150).optional(),
  product_name: z.string().trim().max(200).optional(),
  quantity: z.string().trim().max(50).optional(),
  message: z.string().trim().max(2000).optional(),
});

export function EnquiryDialog({
  trigger,
  productId,
  productName,
}: {
  trigger: ReactNode;
  productId?: string;
  productName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const { error } = await supabase.from("enquiries").insert({
        name: values.name,
        email: values.email,
        organization: values.organization ?? null,
        phone: values.phone ?? null,
        location: values.location ?? null,
        quantity: values.quantity ?? null,
        message: values.message ?? null,
        product_id: productId ?? null,
        product_name: values.product_name || productName || null,
        status: "New",
      });
      if (error) throw error;
    },
    onSuccess: () => setDone(true),
    onError: () => toast.error("We couldn't send your enquiry. Please try again."),
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const raw = Object.fromEntries(form.entries()) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    mutation.mutate(parsed.data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setTimeout(() => setDone(false), 200);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
            <DialogTitle className="mt-4 text-xl">Thank you for your enquiry.</DialogTitle>
            <DialogDescription className="mt-2">
              Our team will contact you shortly.
            </DialogDescription>
            <Button className="mt-6" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request a Quote</DialogTitle>
              <DialogDescription>
                Share a few details and our team will respond with pricing and availability.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" required error={errors["name"]} />
                <Field label="Organization / Clinic" name="organization" error={errors["organization"]} />
                <Field label="Email" name="email" type="email" required error={errors["email"]} />
                <Field label="Phone" name="phone" error={errors["phone"]} />
                <Field label="Location" name="location" error={errors["location"]} />
                <Field label="Quantity" name="quantity" error={errors["quantity"]} />
              </div>
              <Field
                label="Product"
                name="product_name"
                defaultValue={productName ?? ""}
                error={errors["product_name"]}
              />
              <div className="space-y-1.5">
                <Label htmlFor="enquiry-message">Message</Label>
                <Textarea id="enquiry-message" name="message" rows={4} maxLength={2000} />
              </div>
              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? "Sending…" : "Send Enquiry"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string | undefined;
  required?: boolean | undefined;
  defaultValue?: string | undefined;
  error?: string | undefined;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={`enquiry-${name}`}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        id={`enquiry-${name}`}
        name={name}
        type={type}
        defaultValue={defaultValue}
        maxLength={255}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
