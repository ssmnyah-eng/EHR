/**
 * Cloudflare Worker environment bindings. The non-secret values come from
 * wrangler.toml's [vars]; the two secrets are set with
 * `wrangler secret put <NAME>` and never appear in any committed file.
 */
export interface Env {
  SQUARE_ACCESS_TOKEN: string;
  SQUARE_ENVIRONMENT: "sandbox" | "production";
  SQUARE_LOCATION_ID: string;
  SQUARE_SERVICE_VARIATION_ID: string;
  SQUARE_WEBHOOK_SIGNATURE_KEY: string;
  ALLOWED_ORIGIN: string;
}
