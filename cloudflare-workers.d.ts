/// <reference types="@cloudflare/workers-types" />
// The `cloudflare:workers` module only exists in the Cloudflare Workers runtime.
// This project deploys to Vercel, where that module is absent. `db/` (Cloudflare
// D1 + Drizzle) is not imported by any route, so it never runs here — this shim
// just lets `next build` type-check the unused file instead of failing.
// NOTE: the D1 database layer will NOT work on Vercel. If n3uronik.xyz later needs
// a database/auth, port `db/` to a Vercel-compatible store (Supabase / Vercel
// Postgres) or remove it.
declare module "cloudflare:workers" {
  export const env: Record<string, unknown>;
}
