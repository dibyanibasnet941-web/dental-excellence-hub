import { useMemo, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Image as ImageIcon,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { slugify } from "@/lib/site";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "array"
  | "specifications"
  | "slug"
  | "image"
  | "datetime";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  sourceField?: string;
  help?: string;
  full?: boolean;
};

export type Row = Record<string, unknown> & {
  id: string;
};

export function CrudManager({
  table,
  title,
  description,
  fields,
  columns,
  queryKey,
  orderBy = "created_at",
  ascending = false,
  select = "*",
}: {
  table: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  columns: { name: string; label: string }[];
  queryKey: string[];
  orderBy?: string;
  ascending?: boolean;
  select?: string;
}) {
  const client = useQueryClient();

  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});

  // ---------------------------------------------------------------------------
  // TABLE FILTERS
  // ---------------------------------------------------------------------------

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const entityName = title.toLowerCase();

  const searchPlaceholder =
    table === "products"
      ? "Search by product name, SKU or type..."
      : `Search ${entityName}...`;

  // ---------------------------------------------------------------------------
  // DATA
  // ---------------------------------------------------------------------------

  const list = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table as never)
        .select(select)
        .order(orderBy, { ascending });

      if (error) throw error;

      return (data ?? []) as unknown as Row[];
    },
  });

  const rows = list.data ?? [];

  // ---------------------------------------------------------------------------
  // FILTER OPTIONS
  // ---------------------------------------------------------------------------

  const brandOptions = useMemo(() => {
    const values = rows
      .map((row) => {
        const brand = row.brands as { name?: string } | null;
        return brand?.name ?? "";
      })
      .filter(Boolean);

    return Array.from(new Set(values)).sort();
  }, [rows]);

  const categoryOptions = useMemo(() => {
    const values = rows
      .map((row) => {
        const category = row.categories as { name?: string } | null;
        return category?.name ?? "";
      })
      .filter(Boolean);

    return Array.from(new Set(values)).sort();
  }, [rows]);

  // ---------------------------------------------------------------------------
  // FILTERED DATA
  // ---------------------------------------------------------------------------

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((row) => {
      const brand = row.brands as { name?: string } | null;
      const category = row.categories as { name?: string } | null;

      const brandName = brand?.name ?? "";
      const categoryName = category?.name ?? "";

      const searchableValues = [
        row.name,
        row.sku,
        row.product_type,
        row.slug,
        row.country,
        row.description,
      ]
        .filter((value) => value != null)
        .map((value) => String(value).toLowerCase());

      const matchesSearch =
        !query ||
        searchableValues.some((value) => value.includes(query)) ||
        brandName.toLowerCase().includes(query) ||
        categoryName.toLowerCase().includes(query);

      const matchesBrand =
        brandFilter === "all" || brandName === brandFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        categoryName === categoryFilter;

      const matchesAvailability =
        availabilityFilter === "all" ||
        String(row.availability ?? "") === availabilityFilter;

      const publishedValue =
        row.is_published ?? row.is_active ?? false;

      const matchesPublished =
        publishedFilter === "all" ||
        String(Boolean(publishedValue)) === publishedFilter;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesCategory &&
        matchesAvailability &&
        matchesPublished
      );
    });
  }, [
    rows,
    search,
    brandFilter,
    categoryFilter,
    availabilityFilter,
    publishedFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRows.length / pageSize),
  );

  const safePage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;

    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, safePage]);

  const hasFilters =
    Boolean(search) ||
    brandFilter !== "all" ||
    categoryFilter !== "all" ||
    availabilityFilter !== "all" ||
    publishedFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setBrandFilter("all");
    setCategoryFilter("all");
    setAvailabilityFilter("all");
    setPublishedFilter("all");
    setPage(1);
  };

  // ---------------------------------------------------------------------------
  // SAVE
  // ---------------------------------------------------------------------------

  const save = useMutation({
    mutationFn: async (values: Record<string, unknown>) => {
      const specifications = (values.__specifications ?? []) as {
        spec_key: string;
        spec_value: string;
      }[];

      const { __specifications: _, ...record } = values;

      let recordId = editing?.id;

      if (editing) {
        const { error } = await supabase
          .from(table as never)
          .update(record as never)
          .eq("id", editing.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from(table as never)
          .insert(record as never)
          .select("id")
          .single();

        if (error) throw error;

        recordId = (data as { id: string }).id;
      }

      if (table === "products" && recordId) {
        const { error: deleteError } = await supabase
          .from("product_specifications")
          .delete()
          .eq("product_id", recordId);

        if (deleteError) throw deleteError;

        if (specifications.length > 0) {
          const { error: insertError } = await supabase
            .from("product_specifications")
            .insert(
              specifications.map(
                (specification, sort_order) => ({
                  ...specification,
                  product_id: recordId,
                  sort_order,
                }),
              ),
            );

          if (insertError) throw insertError;
        }
      }
    },

    onSuccess: () => {
      toast.success(
        editing
          ? `${title.slice(0, -1)} saved`
          : `${title.slice(0, -1)} created`,
      );

      setOpen(false);
      setEditing(null);
      setForm({});

      void client.invalidateQueries({ queryKey });
      void client.invalidateQueries();
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // ---------------------------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------------------------

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from(table as never)
        .delete()
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      toast.success(`${title.slice(0, -1)} deleted`);

      void client.invalidateQueries({ queryKey });
      void client.invalidateQueries();
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // ---------------------------------------------------------------------------
  // NEW
  // ---------------------------------------------------------------------------

  const openNew = () => {
    setEditing(null);

    setForm(
      Object.fromEntries(
        fields.map((field) => [
          field.name,
          field.type === "boolean" ? false : "",
        ]),
      ),
    );

    setOpen(true);
  };

  // ---------------------------------------------------------------------------
  // EDIT
  // ---------------------------------------------------------------------------

  const openEdit = (row: Row) => {
    setEditing(row);

    setForm(
      Object.fromEntries(
        fields.map((field) => {
          const value = row[field.name];

          if (field.type === "array") {
            return [
              field.name,
              ((value as string[]) ?? []).join("\n"),
            ];
          }

          if (field.type === "specifications") {
            const specifications =
              (row.product_specifications ?? []) as {
                spec_key: string;
                spec_value: string;
              }[];

            return [
              field.name,
              specifications
                .map(
                  ({ spec_key, spec_value }) =>
                    `${spec_key}: ${spec_value}`,
                )
                .join("\n"),
            ];
          }

          return [
            field.name,
            value ??
              (field.type === "boolean" ? false : ""),
          ];
        }),
      ),
    );

    setOpen(true);
  };

  // ---------------------------------------------------------------------------
  // SUBMIT
  // ---------------------------------------------------------------------------

  const submit = () => {
    const payload: Record<string, unknown> = {};

    for (const field of fields) {
      const raw = form[field.name];

      if (field.type === "number") {
        payload[field.name] =
          raw === "" || raw == null ? null : Number(raw);
      } else if (field.type === "boolean") {
        payload[field.name] = !!raw;
      } else if (field.type === "array") {
        payload[field.name] = String(raw ?? "")
          .split("\n")
          .map((value) => value.trim())
          .filter(Boolean);
      } else if (field.type === "specifications") {
        payload.__specifications = String(raw ?? "")
          .split("\n")
          .map((line, index) => {
            const trimmedLine = line.trim();
            const separator = trimmedLine.search(/[:=]/);

            if (separator === -1) {
              return {
                spec_key: `Specification ${index + 1}`,
                spec_value: trimmedLine,
              };
            }

            const key = trimmedLine.slice(0, separator);
            const value = trimmedLine.slice(
              separator + 1,
            );

            return {
              spec_key: key.trim(),
              spec_value: value.trim(),
            };
          })
          .filter(
            ({ spec_key, spec_value }) =>
              spec_key && spec_value,
          );
      } else if (field.type === "slug") {
        const source = field.sourceField
          ? String(form[field.sourceField] ?? "")
          : "";

        payload[field.name] = String(raw ?? "").trim()
          ? slugify(String(raw))
          : slugify(source);
      } else if (field.type === "datetime") {
        const value = String(raw ?? "").trim();

        if (!value) {
          payload[field.name] = null;
        } else {
          const date = new Date(value);

          if (Number.isNaN(date.getTime())) {
            toast.error(
              `${field.label} must be a valid date and time.`,
            );
            return;
          }

          payload[field.name] = date.toISOString();
        }
      } else {
        payload[field.name] =
          raw === "" ? null : raw;
      }

      if (!editing) {
        const value = payload[field.name];

        if (
          value == null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          delete payload[field.name];
        }
      }
    }

    save.mutate(payload);
  };

  // ---------------------------------------------------------------------------
  // SEARCH
  // ---------------------------------------------------------------------------

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <div className="min-w-0">
      {/* PAGE HEADER */}
      <div className="border-b border-border pb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span>Admin</span>
              <span className="text-border">/</span>
              <span>{title}</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>

            {description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <Button
            onClick={openNew}
            className="h-10 shrink-0 rounded-md px-4 shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add {title.slice(0, -1)}
          </Button>
        </div>
      </div>

      {/* FILTER / SEARCH */}
      <div className="mt-6 rounded-lg border border-border bg-background shadow-sm">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-3">
            {/* SEARCH */}
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(event.target.value)
                }
                placeholder={searchPlaceholder}
                className="h-11 rounded-md border-border bg-muted/20 pl-10 pr-10 text-sm shadow-none transition-colors focus:bg-background"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* FILTERS */}
            {table === "products" && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <Select
                  value={brandFilter}
                  onValueChange={(value) => {
                    setBrandFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-10 w-full rounded-md bg-background">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      All brands
                    </SelectItem>

                    {brandOptions.map((brand) => (
                      <SelectItem
                        key={brand}
                        value={brand}
                      >
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={categoryFilter}
                  onValueChange={(value) => {
                    setCategoryFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-10 w-full rounded-md bg-background">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      All categories
                    </SelectItem>

                    {categoryOptions.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={availabilityFilter}
                  onValueChange={(value) => {
                    setAvailabilityFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-10 w-full rounded-md bg-background">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      All availability
                    </SelectItem>

                    <SelectItem value="available">
                      Available
                    </SelectItem>

                    <SelectItem value="preorder">
                      Pre-order
                    </SelectItem>

                    <SelectItem value="out_of_stock">
                      Out of stock
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={publishedFilter}
                  onValueChange={(value) => {
                    setPublishedFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-10 w-full rounded-md bg-background">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      All status
                    </SelectItem>

                    <SelectItem value="true">
                      Published
                    </SelectItem>

                    <SelectItem value="false">
                      Draft
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* FILTER SUMMARY */}
          {hasFilters && (
            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />

                <span>
                  Showing{" "}
                  <strong className="font-medium text-foreground">
                    {filteredRows.length}
                  </strong>{" "}
                  of{" "}
                  <strong className="font-medium text-foreground">
                    {rows.length}
                  </strong>{" "}
                  {entityName}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 w-fit px-2.5 text-xs"
              >
                <X className="mr-1.5 h-3.5 w-3.5" />
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* TABLE HEADER / COUNT */}
      <div className="mt-7 mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {filteredRows.length}{" "}
            {filteredRows.length === 1
              ? entityName.slice(0, -1)
              : entityName}
          </p>
        </div>

        {hasFilters && (
          <span className="hidden text-xs text-muted-foreground sm:block">
            Filtered results
          </span>
        )}
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/30 hover:bg-muted/30">
                {columns.map((column) => (
                  <TableHead
                    key={column.name}
                    className="h-11 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {column.label}
                  </TableHead>
                ))}

                <TableHead className="h-11 w-[100px] text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* LOADING */}
              {list.isLoading &&
                Array.from({ length: 5 }).map(
                  (_, index) => (
                    <TableRow
                      key={`loading-${index}`}
                      className="border-border"
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.name}
                          className="py-4"
                        >
                          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                        </TableCell>
                      ))}

                      <TableCell className="py-4">
                        <div className="ml-auto h-8 w-16 animate-pulse rounded bg-muted" />
                      </TableCell>
                    </TableRow>
                  ),
                )}

              {/* EMPTY */}
              {!list.isLoading &&
                paginatedRows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className="py-20 text-center"
                    >
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted/30">
                          <Search className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <p className="mt-4 text-sm font-semibold">
                          No {entityName} found
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          Try changing your search or filters.
                        </p>

                        {hasFilters && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-5"
                            onClick={clearFilters}
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}

              {/* ROWS */}
              {!list.isLoading &&
                paginatedRows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group border-border transition-colors hover:bg-muted/20"
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.name}
                        className={
                          column.name === "image_url"
                            ? "py-3"
                            : "max-w-[300px] py-4"
                        }
                      >
                        {renderCell(
                          row[column.name],
                          column.name,
                          row,
                        )}
                      </TableCell>
                    ))}

                    {/* ACTIONS */}
                    <TableCell className="py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-md text-muted-foreground opacity-70 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
                          onClick={() =>
                            openEdit(row)
                          }
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-md text-muted-foreground opacity-70 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                          aria-label="Delete"
                          onClick={() => {
                            if (
                              confirm(
                                "Delete this record? This action cannot be undone.",
                              )
                            ) {
                              remove.mutate(row.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION */}
        {!list.isLoading &&
          filteredRows.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {(safePage - 1) * pageSize + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-foreground">
                  {Math.min(
                    safePage * pageSize,
                    filteredRows.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {filteredRows.length}
                </span>{" "}
                {entityName}
              </p>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage <= 1}
                  onClick={() =>
                    setPage((current) =>
                      Math.max(1, current - 1),
                    )
                  }
                  className="h-8"
                >
                  <ChevronLeft className="mr-1 h-3.5 w-3.5" />
                  Previous
                </Button>

                <div className="min-w-[90px] px-2 text-center text-xs text-muted-foreground">
                  Page{" "}
                  <span className="font-medium text-foreground">
                    {safePage}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {totalPages}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage >= totalPages}
                  onClick={() =>
                    setPage((current) =>
                      Math.min(
                        totalPages,
                        current + 1,
                      ),
                    )
                  }
                  className="h-8"
                >
                  Next
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
      </div>

      {/* ADD / EDIT DIALOG */}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setEditing(null);
            setForm({});
          }
        }}
      >
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-lg border-border p-0 shadow-xl sm:max-w-3xl">
          <DialogHeader className="border-b border-border px-6 py-5">
            <div className="pr-6">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                {editing
                  ? `Edit ${entityName.slice(0, -1)}`
                  : `New ${entityName.slice(0, -1)}`}
              </DialogTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {editing
                  ? "Update the information below and save your changes."
                  : `Add a new ${entityName.slice(0, -1)} to your catalogue.`}
              </p>
            </div>
          </DialogHeader>

          <div className="px-6 py-6">
            {table === "products" ? (
              <div className="space-y-7">
                <FormSection
                  title="Basic information"
                  description="Core information used to identify the product."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {fields
                      .filter((field) =>
                        [
                          "name",
                          "slug",
                          "sku",
                          "product_type",
                        ].includes(field.name),
                      )
                      .map((field) =>
                        renderFormField(
                          field,
                          form,
                          setForm,
                        ),
                      )}
                  </div>
                </FormSection>

                <FormSection
                  title="Classification"
                  description="Organize the product by category and brand."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {fields
                      .filter((field) =>
                        [
                          "category_id",
                          "brand_id",
                        ].includes(field.name),
                      )
                      .map((field) =>
                        renderFormField(
                          field,
                          form,
                          setForm,
                        ),
                      )}
                  </div>
                </FormSection>

                <FormSection
                  title="Product information"
                  description="Describe the product and highlight its key features."
                >
                  <div className="space-y-5">
                    {fields
                      .filter((field) =>
                        [
                          "short_description",
                          "features",
                          "specifications",
                        ].includes(field.name),
                      )
                      .map((field) =>
                        renderFormField(
                          field,
                          form,
                          setForm,
                        ),
                      )}
                  </div>
                </FormSection>

                <FormSection
                  title="Product Catalogue"
                  description="Optional"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {fields
                      .filter((field) => field.name === "brochure_url")
                      .map((field) =>
                        renderFormField(
                          field,
                          form,
                          setForm,
                        ),
                      )}
                  </div>
                </FormSection>

                <FormSection
                  title="Product image"
                  description="Upload a clear product image. PNG, JPG and WEBP are supported."
                >
                  {fields
                    .filter(
                      (field) =>
                        field.name === "image_url",
                    )
                    .map((field) =>
                      renderFormField(
                        field,
                        form,
                        setForm,
                      ),
                    )}
                </FormSection>

                <FormSection
                  title="Pricing & availability"
                  description="Control pricing and product availability."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {fields
                      .filter((field) =>
                        [
                          "price",
                          "availability",
                        ].includes(field.name),
                      )
                      .map((field) =>
                        renderFormField(
                          field,
                          form,
                          setForm,
                        ),
                      )}
                  </div>
                </FormSection>

                <FormSection
                  title="Publishing"
                  description="Choose how the product appears on the public website."
                >
                  <div className="divide-y divide-border rounded-md border border-border">
                    {fields
                      .filter((field) =>
                        [
                          "show_price",
                          "is_featured",
                          "is_new",
                          "is_published",
                        ].includes(field.name),
                      )
                      .map((field) => (
                        <BooleanFormRow
                          key={field.name}
                          field={field}
                          checked={!!form[field.name]}
                          onChange={(value) =>
                            setForm((current) => ({
                              ...current,
                              [field.name]: value,
                            }))
                          }
                        />
                      ))}
                  </div>
                </FormSection>

                {/* Any product fields not included above */}
                {fields.some(
                  (field) =>
                    ![
                      "name",
                      "slug",
                      "sku",
                      "product_type",
                      "category_id",
                      "brand_id",
                      "short_description",
                      "features",
                      "specifications",
                      "brochure_url",
                      "image_url",
                      "price",
                      "availability",
                      "show_price",
                      "is_featured",
                      "is_new",
                      "is_published",
                    ].includes(field.name),
                ) && (
                  <FormSection title="Additional information">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {fields
                        .filter(
                          (field) =>
                            ![
                              "name",
                              "slug",
                              "sku",
                              "product_type",
                              "category_id",
                              "brand_id",
                              "short_description",
                              "features",
                              "specifications",
                              "brochure_url",
                              "image_url",
                              "price",
                              "availability",
                              "show_price",
                              "is_featured",
                              "is_new",
                              "is_published",
                            ].includes(field.name),
                        )
                        .map((field) =>
                          renderFormField(
                            field,
                            form,
                            setForm,
                          ),
                        )}
                    </div>
                  </FormSection>
                )}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) =>
                  renderFormField(
                    field,
                    form,
                    setForm,
                  ),
                )}
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-border bg-muted/20 px-6 py-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={save.isPending}
            >
              Cancel
            </Button>

            <Button
              onClick={submit}
              disabled={save.isPending}
              className="min-w-[120px]"
            >
              {save.isPending
                ? "Saving..."
                : editing
                  ? "Save changes"
                  : "Create product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FORM SECTION                                                               */
/* -------------------------------------------------------------------------- */

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FORM FIELD                                                                 */
/* -------------------------------------------------------------------------- */

function renderFormField(
  field: FieldDef,
  form: Record<string, unknown>,
  setForm: React.Dispatch<
    React.SetStateAction<Record<string, unknown>>
  >,
) {
  const full =
    field.full ||
    field.type === "textarea" ||
    field.type === "array" ||
    field.type === "specifications" ||
    field.type === "image";

  return (
    <div
      key={field.name}
      className={full ? "sm:col-span-2" : ""}
    >
      <Label
        htmlFor={`f-${field.name}`}
        className="text-sm font-medium"
      >
        {field.label}
      </Label>

      <div className="mt-2">
        {field.type === "textarea" ||
        field.type === "array" ||
        field.type === "specifications" ? (
          <Textarea
            id={`f-${field.name}`}
            rows={
              field.type === "textarea"
                ? 6
                : 5
            }
            value={String(
              form[field.name] ?? "",
            )}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                [field.name]:
                  event.target.value,
              }))
            }
            className="resize-y rounded-md bg-background"
          />
        ) : field.type === "image" ? (
          <ImageUpload
            value={String(
              form[field.name] ?? "",
            )}
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                [field.name]: value,
              }))
            }
            inputId={`f-${field.name}`}
          />
        ) : field.type === "boolean" ? (
          <Switch
            id={`f-${field.name}`}
            checked={!!form[field.name]}
            onCheckedChange={(value) =>
              setForm((current) => ({
                ...current,
                [field.name]: value,
              }))
            }
          />
        ) : field.type === "select" ? (
          <Select
            value={String(
              form[field.name] ?? "",
            )}
            onValueChange={(value) =>
              setForm((current) => ({
                ...current,
                [field.name]:
                  value === "__none"
                    ? ""
                    : value,
              }))
            }
          >
            <SelectTrigger
              id={`f-${field.name}`}
              className="h-10 rounded-md bg-background"
            >
              <SelectValue placeholder="Select..." />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="__none">
                None
              </SelectItem>

              {(field.options ?? []).map(
                (option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={`f-${field.name}`}
            type={
              field.type === "number"
                ? "number"
                : field.type === "datetime"
                  ? "datetime-local"
                  : "text"
            }
            value={
              field.type === "datetime" &&
              form[field.name]
                ? new Date(
                    String(
                      form[field.name],
                    ),
                  )
                    .toISOString()
                    .slice(0, 16)
                : String(
                    form[field.name] ?? "",
                  )
            }
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                [field.name]:
                  event.target.value,
              }))
            }
            className="h-10 rounded-md bg-background"
          />
        )}
      </div>

      {field.help && (
        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
          {field.help}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* BOOLEAN FORM ROW                                                           */
/* -------------------------------------------------------------------------- */

function BooleanFormRow({
  field,
  checked,
  onChange,
}: {
  field: FieldDef;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
      <div className="min-w-0">
        <Label
          htmlFor={`f-${field.name}`}
          className="cursor-pointer text-sm font-medium"
        >
          {field.label}
        </Label>

        {field.help && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {field.help}
          </p>
        )}
      </div>

      <Switch
        id={`f-${field.name}`}
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TABLE CELL                                                                 */
/* -------------------------------------------------------------------------- */

function renderCell(
  value: unknown,
  columnName: string,
  row: Row,
) {
  if (columnName === "image_url") {
    const image = String(value ?? "");

    return image ? (
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-border bg-muted/20">
        <img
          src={image}
          alt={String(
            row.name ?? "Product image",
          )}
          className="h-full w-full object-contain p-1.5"
        />
      </div>
    ) : (
      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-dashed border-border bg-muted/20">
        <ImageIcon className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  if (columnName === "brands") {
    const brand =
      value as { name?: string } | null;

    return brand?.name ? (
      <span className="text-sm font-medium text-foreground">
        {brand.name}
      </span>
    ) : (
      <span className="text-muted-foreground">
        —
      </span>
    );
  }

  if (columnName === "categories") {
    const category =
      value as { name?: string } | null;

    return category?.name ? (
      <span className="text-sm text-muted-foreground">
        {category.name}
      </span>
    ) : (
      <span className="text-muted-foreground">
        —
      </span>
    );
  }

  if (columnName === "availability") {
    return (
      <AvailabilityBadge
        value={String(value ?? "")}
      />
    );
  }

  if (columnName === "is_published") {
    return (
      <PublishedBadge value={Boolean(value)} />
    );
  }

  if (columnName === "is_active") {
    return (
      <PublishedBadge value={Boolean(value)} />
    );
  }

  if (typeof value === "boolean") {
    return value ? (
      <span className="text-sm font-medium text-foreground">
        Yes
      </span>
    ) : (
      <span className="text-sm text-muted-foreground">
        No
      </span>
    );
  }

  if (value == null || value === "") {
    return (
      <span className="text-muted-foreground">
        —
      </span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <span className="text-sm text-muted-foreground">
        {value.join(", ")}
      </span>
    );
  }

  if (typeof value === "object") {
    return (
      <span className="text-sm text-muted-foreground">
        {JSON.stringify(value)}
      </span>
    );
  }

  return (
    <span className="block truncate text-sm text-foreground">
      {String(value)}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* AVAILABILITY BADGE                                                         */
/* -------------------------------------------------------------------------- */

function AvailabilityBadge({
  value,
}: {
  value: string;
}) {
  if (value === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Available
      </span>
    );
  }

  if (value === "preorder") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
        <Clock3 className="h-3.5 w-3.5" />
        Pre-order
      </span>
    );
  }

  if (value === "out_of_stock") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
        <XCircle className="h-3.5 w-3.5" />
        Out of stock
      </span>
    );
  }

  return (
    <span className="text-sm text-muted-foreground">
      —
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* PUBLISHED BADGE                                                            */
/* -------------------------------------------------------------------------- */

function PublishedBadge({
  value,
}: {
  value: boolean;
}) {
  return value ? (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Published
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      Draft
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* IMAGE UPLOAD                                                               */
/* -------------------------------------------------------------------------- */

function ImageUpload({
  value,
  onChange,
  inputId,
}: {
  value: string;
  onChange: (value: string) => void;
  inputId: string;
}) {
  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select an image file.",
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Image must be smaller than 5MB.",
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };

    reader.onerror = () => {
      toast.error(
        "Unable to read the selected image.",
      );
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <input
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => {
          handleFile(
            event.target.files?.[0],
          );
          event.currentTarget.value = "";
        }}
      />

      {value ? (
        <>
          <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden rounded-md border border-border bg-muted/20">
            <img
              src={value}
              alt="Product preview"
              className="max-h-[230px] max-w-full object-contain p-5"
            />

            <div className="absolute right-3 top-3 rounded-md border border-border bg-background/90 px-2 py-1 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur">
              Preview
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                document
                  .getElementById(inputId)
                  ?.click()
              }
            >
              <Upload className="mr-2 h-4 w-4" />
              Change image
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => onChange("")}
            >
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() =>
            document
              .getElementById(inputId)
              ?.click()
          }
          className="group flex min-h-[230px] w-full flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/10 px-6 transition-colors hover:border-foreground/30 hover:bg-muted/20"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-background transition-colors group-hover:bg-muted">
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-4 text-sm font-medium text-foreground">
            Upload product image
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            PNG, JPG or WEBP · Maximum 5MB
          </p>

          <span className="mt-4 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
            Choose file
          </span>
        </button>
      )}
    </div>
  );
}