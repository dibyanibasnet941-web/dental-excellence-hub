import { useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  brandsQuery,
  blogPostsQuery,
  categoriesQuery,
  productsQuery,
  resourcesQuery,
} from "@/lib/queries";

export function SearchDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const products = useQuery({ ...productsQuery, enabled: open });
  const categories = useQuery({ ...categoriesQuery, enabled: open });
  const brands = useQuery({ ...brandsQuery, enabled: open });
  const posts = useQuery({ ...blogPostsQuery, enabled: open });
  const resources = useQuery({ ...resourcesQuery, enabled: open });

  const q = term.trim().toLowerCase();
  const match = (value?: string | null) => !!value && value.toLowerCase().includes(q);

  const results = useMemo(() => {
    if (!q) return null;
    return {
      products: (products.data ?? [])
        .filter(
          (p) =>
            match(p.name) ||
            match(p.sku) ||
            match(p.short_description) ||
            match((p as { brands?: { name?: string } }).brands?.name) ||
            match((p as { categories?: { name?: string } }).categories?.name),
        )
        .slice(0, 6),
      categories: (categories.data ?? []).filter((c) => match(c.name) || match(c.description)).slice(0, 4),
      brands: (brands.data ?? []).filter((b) => match(b.name) || match(b.description)).slice(0, 4),
      posts: (posts.data ?? []).filter((p) => match(p.title) || match(p.excerpt)).slice(0, 4),
      resources: (resources.data ?? []).filter((r) => match(r.title) || match(r.description)).slice(0, 4),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, products.data, categories.data, brands.data, posts.data, resources.data]);

  const go = (to: string) => {
    setOpen(false);
    setTerm("");
    void navigate({ to });
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products, brands, categories, resources…"
          value={term}
          onValueChange={setTerm}
        />
        <CommandList>
          {q && <CommandEmpty>No results found.</CommandEmpty>}
          {results && results.products.length > 0 && (
            <CommandGroup heading="Products">
              {results.products.map((p) => (
                <CommandItem key={p.id} value={`product-${p.slug}`} onSelect={() => go(`/products/${p.slug}`)}>
                  {p.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {results && results.categories.length > 0 && (
            <CommandGroup heading="Categories">
              {results.categories.map((c) => (
                <CommandItem key={c.id} value={`cat-${c.slug}`} onSelect={() => go(`/categories/${c.slug}`)}>
                  {c.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {results && results.brands.length > 0 && (
            <CommandGroup heading="Brands">
              {results.brands.map((b) => (
                <CommandItem key={b.id} value={`brand-${b.slug}`} onSelect={() => go(`/brands/${b.slug}`)}>
                  {b.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {results && results.posts.length > 0 && (
            <CommandGroup heading="Blog">
              {results.posts.map((p) => (
                <CommandItem key={p.id} value={`post-${p.slug}`} onSelect={() => go(`/blog/${p.slug}`)}>
                  {p.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {results && results.resources.length > 0 && (
            <CommandGroup heading="Resources">
              {results.resources.map((r) => (
                <CommandItem key={r.id} value={`res-${r.slug}`} onSelect={() => go("/resources")}>
                  {r.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
