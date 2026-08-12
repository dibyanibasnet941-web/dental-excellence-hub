import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
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

export type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "array" | "slug";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  sourceField?: string;
  help?: string;
  full?: boolean;
};

export type Row = Record<string, unknown> & { id: string };

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

  const save = useMutation({
    mutationFn: async (values: Record<string, unknown>) => {
      if (editing) {
        const { error } = await supabase
          .from(table as never)
          .update(values as never)
          .eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table as never).insert(values as never);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Saved" : "Created");
      setOpen(false);
      setEditing(null);
      void client.invalidateQueries({ queryKey });
      void client.invalidateQueries();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as never).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      void client.invalidateQueries({ queryKey });
      void client.invalidateQueries();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const openNew = () => {
    setEditing(null);
    setForm(Object.fromEntries(fields.map((f) => [f.name, f.type === "boolean" ? false : ""])));
    setOpen(true);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    setForm(
      Object.fromEntries(
        fields.map((f) => {
          const value = row[f.name];
          if (f.type === "array") return [f.name, ((value as string[]) ?? []).join("\n")];
          return [f.name, value ?? (f.type === "boolean" ? false : "")];
        }),
      ),
    );
    setOpen(true);
  };

  const submit = () => {
    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      const raw = form[field.name];
      if (field.type === "number") payload[field.name] = raw === "" || raw == null ? null : Number(raw);
      else if (field.type === "boolean") payload[field.name] = !!raw;
      else if (field.type === "array")
        payload[field.name] = String(raw ?? "")
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean);
      else if (field.type === "slug") {
        const source = field.sourceField ? String(form[field.sourceField] ?? "") : "";
        payload[field.name] = String(raw ?? "").trim() ? slugify(String(raw)) : slugify(source);
      } else payload[field.name] = raw === "" ? null : raw;
    }
    save.mutate(payload);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.name}>{col.label}</TableHead>
              ))}
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(list.data ?? []).length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="py-10 text-center text-muted-foreground">
                  Nothing here yet. Use “Add new” to create the first record.
                </TableCell>
              </TableRow>
            )}
            {(list.data ?? []).map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.name} className="max-w-[280px] truncate">
                    {renderCell(row[col.name])}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(row)} aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => {
                        if (confirm("Delete this record?")) remove.mutate(row.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit ${title.toLowerCase()}` : `New ${title.toLowerCase()}`}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.full || field.type === "textarea" || field.type === "array" ? "sm:col-span-2" : ""}
              >
                <Label htmlFor={`f-${field.name}`}>{field.label}</Label>
                <div className="mt-1.5">
                  {field.type === "textarea" || field.type === "array" ? (
                    <Textarea
                      id={`f-${field.name}`}
                      rows={field.type === "array" ? 4 : 6}
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                    />
                  ) : field.type === "boolean" ? (
                    <Switch
                      id={`f-${field.name}`}
                      checked={!!form[field.name]}
                      onCheckedChange={(v) => setForm((f) => ({ ...f, [field.name]: v }))}
                    />
                  ) : field.type === "select" ? (
                    <Select
                      value={String(form[field.name] ?? "")}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, [field.name]: v === "__none" ? "" : v }))
                      }
                    >
                      <SelectTrigger id={`f-${field.name}`}>
                        <SelectValue placeholder="Select…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none">None</SelectItem>
                        {(field.options ?? []).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={`f-${field.name}`}
                      type={field.type === "number" ? "number" : "text"}
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                    />
                  )}
                </div>
                {field.help && <p className="mt-1 text-xs text-muted-foreground">{field.help}</p>}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submit} disabled={save.isPending}>
              {save.isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function renderCell(value: unknown) {
  if (value == null || value === "") return <span className="text-muted-foreground">—</span>;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
