// ─── Supabase Server Client ───────────────────
// Singleton using the service-role key.
// The service-role key bypasses Row Level Security — this is intentional,
// because ALL database access goes through Next.js API routes, never the browser.
//
// RULES:
//   - Import this ONLY inside src/app/api/ routes.
//   - NEVER import in client components, pages, or src/components/.
//   - NEVER prefix SUPABASE_SERVICE_ROLE_KEY with NEXT_PUBLIC_.
//   - NEVER return this client or its key in an API response.

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

/**
 * Returns the shared server-side Supabase client.
 * Throws if env vars are missing so the error is explicit at startup.
 */
export function getSupabaseServer(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "[Supabase] Not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local"
    );
  }

  _client = createClient(url, key, {
    auth: {
      // Server-side — no user session needed
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return _client;
}
