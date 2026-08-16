// App-wide Supabase client, pointed at the project-owned Supabase instance.
// (The auto-generated ./client.ts is left untouched.)
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = 'https://bcnolnjsrkonvgsnepfv.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbm9sbmpzcmtvbnZnc25lcGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MjczMjgsImV4cCI6MjEwMjEwMzMyOH0.u4MIxT0GgEQ1ZSv3hQnwYShjThRHMs3nIbuOY_d8dR8';

function create() {
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _client: ReturnType<typeof create> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof create>, {
  get(_, prop, receiver) {
    if (!_client) _client = create();
    return Reflect.get(_client, prop, receiver);
  },
});
