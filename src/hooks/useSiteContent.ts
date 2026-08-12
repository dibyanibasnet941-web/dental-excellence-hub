import { useQuery } from "@tanstack/react-query";
import { siteContentQuery } from "@/lib/queries";

/** Reads CMS-managed website content. `get("hero.headline", fallback)` */
export function useSiteContent() {
  const { data, isLoading } = useQuery(siteContentQuery);
  const map = data?.map ?? {};
  const get = (key: string, fallback = "") => {
    const value = map[key];
    return value && value.trim().length > 0 ? value : fallback;
  };
  return { get, map, isLoading };
}
