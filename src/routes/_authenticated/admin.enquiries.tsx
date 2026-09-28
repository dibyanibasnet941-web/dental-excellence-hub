import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Package,
  CalendarDays,
  Eye,
  Inbox,
  SlidersHorizontal,
  ArrowUpRight,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { enquiriesQuery } from "@/lib/queries";
import { ENQUIRY_STATUSES, formatDate } from "@/lib/site";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  component: EnquiriesAdmin,
});

/* -------------------------------------------------------------------------- */
/* STATUS STYLING                                                             */
/* -------------------------------------------------------------------------- */

function getStatusClasses(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("new")) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (normalized.includes("contact")) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (normalized.includes("quote")) {
    return "border-purple-200 bg-purple-50 text-purple-700";
  }

  if (normalized.includes("convert")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (normalized.includes("close")) {
    return "border-slate-200 bg-slate-100 text-slate-600";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function getStatusDot(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("new")) {
    return "bg-blue-500";
  }

  if (normalized.includes("contact")) {
    return "bg-amber-500";
  }

  if (normalized.includes("quote")) {
    return "bg-purple-500";
  }

  if (normalized.includes("convert")) {
    return "bg-emerald-500";
  }

  if (normalized.includes("close")) {
    return "bg-slate-400";
  }

  return "bg-slate-400";
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

function EnquiriesAdmin() {
  const client = useQueryClient();
  const { data, isLoading } = useQuery(enquiriesQuery);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedEnquiry, setSelectedEnquiry] = useState<
    (typeof data extends (infer T)[] | undefined ? T : never) | null
  >(null);

  /* ------------------------------------------------------------------------ */
  /* UPDATE STATUS                                                            */
  /* ------------------------------------------------------------------------ */

  const update = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) => {
      const { error } = await supabase
        .from("enquiries")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      toast.success("Enquiry status updated");

      void client.invalidateQueries({
        queryKey: enquiriesQuery.queryKey,
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  /* ------------------------------------------------------------------------ */
  /* FILTERING                                                               */
  /* ------------------------------------------------------------------------ */

  const enquiries = useMemo(() => {
    const list = data ?? [];

    return list.filter((enquiry) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        enquiry.name?.toLowerCase().includes(searchText) ||
        enquiry.organization?.toLowerCase().includes(searchText) ||
        enquiry.email?.toLowerCase().includes(searchText) ||
        enquiry.phone?.toLowerCase().includes(searchText) ||
        enquiry.location?.toLowerCase().includes(searchText) ||
        enquiry.product_name?.toLowerCase().includes(searchText) ||
        enquiry.message?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" || enquiry.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  const totalCount = data?.length ?? 0;

  const hasFilters = Boolean(search) || statusFilter !== "all";

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <span>Customer communication</span>
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Enquiries
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage customer enquiries and follow up with potential clients.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="border-l border-border pl-4">
            <p className="text-xs text-muted-foreground">
              Total enquiries
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {totalCount}
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SEARCH / FILTER BAR                                                */}
      {/* ------------------------------------------------------------------ */}

      <section className="border border-border bg-card">
        <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
          {/* SEARCH */}

          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, phone, product or organization..."
              className="h-10 w-full border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-foreground focus:ring-1 focus:ring-foreground/10"
            />
          </div>

          {/* STATUS */}

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="hidden h-4 w-4 text-muted-foreground sm:block" />

            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="h-10 w-full lg:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All statuses
                </SelectItem>

                {ENQUIRY_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasFilters && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {enquiries.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {totalCount}
              </span>{" "}
              enquiries
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="text-xs font-medium text-foreground transition hover:text-muted-foreground"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ENQUIRIES                                                          */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Customer enquiries
          </h2>

          <span className="text-xs text-muted-foreground">
            {enquiries.length}{" "}
            {enquiries.length === 1 ? "result" : "results"}
          </span>
        </div>

        <div className="space-y-3">
          {/* LOADING */}

          {isLoading ? (
            <>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border border-border bg-card p-5"
                >
                  <div className="animate-pulse space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="h-5 w-40 rounded bg-muted" />
                        <div className="h-3 w-64 rounded bg-muted" />
                      </div>

                      <div className="h-9 w-28 rounded bg-muted" />
                    </div>

                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-1/2 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </>
          ) : enquiries.length > 0 ? (
            enquiries.map((enquiry) => (
              <article
                key={enquiry.id}
                className="group border border-border bg-card transition-colors duration-200 hover:border-foreground/20"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    {/* ---------------------------------------------------- */}
                    {/* MAIN CONTENT                                         */}
                    {/* ---------------------------------------------------- */}

                    <div className="min-w-0 flex-1">
                      {/* NAME */}

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h2 className="text-base font-semibold text-foreground">
                          {enquiry.name}
                        </h2>

                        {enquiry.organization && (
                          <span className="text-sm text-muted-foreground">
                            {enquiry.organization}
                          </span>
                        )}
                      </div>

                      {/* CONTACT INFORMATION */}

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={13} />
                          {formatDate(enquiry.created_at)}
                        </span>

                        {enquiry.email && (
                          <span className="inline-flex min-w-0 items-center gap-1.5">
                            <Mail size={13} />
                            <span className="max-w-[260px] truncate">
                              {enquiry.email}
                            </span>
                          </span>
                        )}

                        {enquiry.phone && (
                          <span className="inline-flex items-center gap-1.5">
                            <Phone size={13} />
                            {enquiry.phone}
                          </span>
                        )}

                        {enquiry.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={13} />
                            {enquiry.location}
                          </span>
                        )}
                      </div>

                      {/* PRODUCT */}

                      {enquiry.product_name && (
                        <div className="mt-4 inline-flex max-w-full items-center gap-2 border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium">
                          <Package
                            size={14}
                            className="shrink-0 text-muted-foreground"
                          />

                          <span className="truncate">
                            {enquiry.product_name}
                          </span>
                        </div>
                      )}

                      {/* MESSAGE */}

                      {enquiry.message && (
                        <p className="mt-3 max-w-4xl line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {enquiry.message}
                        </p>
                      )}
                    </div>

                    {/* ---------------------------------------------------- */}
                    {/* ACTIONS                                               */}
                    {/* ---------------------------------------------------- */}

                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row xl:w-44 xl:flex-col">
                      <Select
                        value={enquiry.status}
                        onValueChange={(status) =>
                          update.mutate({
                            id: enquiry.id,
                            status,
                          })
                        }
                        disabled={update.isPending}
                      >
                        <SelectTrigger
                          className={`h-9 w-full border text-xs font-medium ${getStatusClasses(
                            enquiry.status,
                          )}`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${getStatusDot(
                                enquiry.status,
                              )}`}
                            />

                            <SelectValue />
                          </div>
                        </SelectTrigger>

                        <SelectContent>
                          {ENQUIRY_STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <button
                        type="button"
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="inline-flex h-9 items-center justify-center gap-2 border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <Eye size={14} />
                        View details
                        <ArrowUpRight
                          size={13}
                          className="ml-auto opacity-50"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            /* ------------------------------------------------------------ */
            /* EMPTY STATE                                                 */
            /* ------------------------------------------------------------ */

            <div className="border border-dashed border-border bg-card px-6 py-16 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center border border-border bg-muted/30">
                <Inbox
                  size={20}
                  className="text-muted-foreground"
                />
              </div>

              <h2 className="mt-4 text-sm font-semibold">
                {hasFilters
                  ? "No enquiries found"
                  : "No enquiries yet"}
              </h2>

              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or status filter."
                  : "Customer enquiries submitted through the website will appear here."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DETAILS DIALOG                                                    */}
      {/* ------------------------------------------------------------------ */}

      <Dialog
        open={!!selectedEnquiry}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedEnquiry(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {selectedEnquiry && (
            <>
              <DialogHeader className="border-b border-border pb-5">
                <div className="flex flex-wrap items-start gap-3 pr-8">
                  <div className="min-w-0 flex-1">
                    <DialogTitle className="text-xl">
                      {selectedEnquiry.name}
                    </DialogTitle>

                    <DialogDescription className="mt-1">
                      Enquiry received on{" "}
                      {formatDate(selectedEnquiry.created_at)}
                    </DialogDescription>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      selectedEnquiry.status,
                    )}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${getStatusDot(
                        selectedEnquiry.status,
                      )}`}
                    />

                    {selectedEnquiry.status}
                  </span>
                </div>
              </DialogHeader>

              <div className="space-y-7 pt-1">
                {/* -------------------------------------------------------- */}
                {/* CONTACT                                                  */}
                {/* -------------------------------------------------------- */}

                <section>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">
                      Contact information
                    </h3>
                  </div>

                  <div className="mt-3 grid gap-px border border-border bg-border sm:grid-cols-2">
                    {selectedEnquiry.email && (
                      <div className="bg-card p-4">
                        <p className="text-xs text-muted-foreground">
                          Email
                        </p>

                        <p className="mt-1.5 break-all text-sm font-medium">
                          {selectedEnquiry.email}
                        </p>
                      </div>
                    )}

                    {selectedEnquiry.phone && (
                      <div className="bg-card p-4">
                        <p className="text-xs text-muted-foreground">
                          Phone
                        </p>

                        <p className="mt-1.5 text-sm font-medium">
                          {selectedEnquiry.phone}
                        </p>
                      </div>
                    )}

                    {selectedEnquiry.organization && (
                      <div className="bg-card p-4">
                        <p className="text-xs text-muted-foreground">
                          Organization
                        </p>

                        <p className="mt-1.5 text-sm font-medium">
                          {selectedEnquiry.organization}
                        </p>
                      </div>
                    )}

                    {selectedEnquiry.location && (
                      <div className="bg-card p-4">
                        <p className="text-xs text-muted-foreground">
                          Location
                        </p>

                        <p className="mt-1.5 text-sm font-medium">
                          {selectedEnquiry.location}
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* -------------------------------------------------------- */}
                {/* PRODUCT                                                  */}
                {/* -------------------------------------------------------- */}

                {selectedEnquiry.product_name && (
                  <section>
                    <h3 className="text-sm font-semibold">
                      Product
                    </h3>

                    <div className="mt-3 flex items-center gap-3 border border-border bg-muted/20 p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background">
                        <Package
                          size={16}
                          className="text-muted-foreground"
                        />
                      </div>

                      <span className="text-sm font-medium">
                        {selectedEnquiry.product_name}
                      </span>
                    </div>
                  </section>
                )}

                {/* -------------------------------------------------------- */}
                {/* MESSAGE                                                  */}
                {/* -------------------------------------------------------- */}

                <section>
                  <h3 className="text-sm font-semibold">
                    Enquiry message
                  </h3>

                  <div className="mt-3 border border-border bg-muted/20 p-4">
                    <p className="whitespace-pre-line text-sm leading-7 text-foreground">
                      {selectedEnquiry.message ||
                        "No message provided."}
                    </p>
                  </div>
                </section>

                {/* -------------------------------------------------------- */}
                {/* STATUS                                                   */}
                {/* -------------------------------------------------------- */}

                <section className="border-t border-border pt-5">
                  <h3 className="text-sm font-semibold">
                    Update status
                  </h3>

                  <div className="mt-3">
                    <Select
                      value={selectedEnquiry.status}
                      onValueChange={(status) => {
                        update.mutate(
                          {
                            id: selectedEnquiry.id,
                            status,
                          },
                          {
                            onSuccess: () => {
                              setSelectedEnquiry({
                                ...selectedEnquiry,
                                status,
                              });
                            },
                          },
                        );
                      }}
                      disabled={update.isPending}
                    >
                      <SelectTrigger className="w-full sm:w-60">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {ENQUIRY_STATUSES.map((status) => (
                          <SelectItem
                            key={status}
                            value={status}
                          >
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </section>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}