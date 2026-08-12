import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { enquiriesQuery } from "@/lib/queries";
import { ENQUIRY_STATUSES } from "@/lib/site";
import { formatDate } from "@/lib/site";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  component: EnquiriesAdmin,
});

function EnquiriesAdmin() {
  const client = useQueryClient();
  const { data } = useQuery(enquiriesQuery);

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Status updated");
      void client.invalidateQueries({ queryKey: enquiriesQuery.queryKey });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Enquiries</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Leads submitted through the website. Update the status as you work each enquiry.
      </p>

      <div className="mt-8 space-y-4">
        {(data ?? []).map((enquiry) => (
          <article key={enquiry.id} className="rounded-md border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">
                  {enquiry.name}
                  {enquiry.organization ? ` — ${enquiry.organization}` : ""}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDate(enquiry.created_at)} · {enquiry.email}
                  {enquiry.phone ? ` · ${enquiry.phone}` : ""}
                  {enquiry.location ? ` · ${enquiry.location}` : ""}
                </p>
              </div>
              <Select
                value={enquiry.status}
                onValueChange={(status) => update.mutate({ id: enquiry.id, status })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ENQUIRY_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {enquiry.product_name && (
              <p className="mt-3 text-sm">
                <span className="text-muted-foreground">Product:</span> {enquiry.product_name}
              </p>
            )}
            <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{enquiry.message}</p>
          </article>
        ))}
        {(data ?? []).length === 0 && (
          <p className="rounded-md border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            No enquiries yet.
          </p>
        )}
      </div>
    </div>
  );
}
