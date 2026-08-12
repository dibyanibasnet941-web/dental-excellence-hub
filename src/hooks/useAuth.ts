import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    let active = true;

    const loadRole = async (user: User | null) => {
      if (!user) {
        if (active) setIsStaff(false);
        return;
      }
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (active) setIsStaff((data ?? []).length > 0);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      void loadRole(next?.user ?? null);
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      void loadRole(data.session?.user ?? null).finally(() => active && setLoading(false));
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, user: session?.user ?? null, isStaff, loading };
}
