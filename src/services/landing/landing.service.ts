import "server-only";
import { getEnv } from "@/lib/env";
import { createHttpClient } from "../http/client";

const LANDING_PATH = "/landing";

/**
 * Fetches the raw landing configuration from the external content API
 * (`GET {LANDING_API_URL}/landing`). Returns `null` when no API is configured,
 * so callers can fall back to the bundled default configuration.
 * The payload is intentionally `unknown`: the landing feature validates it.
 */
export async function fetchRemoteLandingConfig(): Promise<unknown | null> {
  const env = getEnv();
  if (!env.LANDING_API_URL) return null;

  const client = createHttpClient({
    baseUrl: env.LANDING_API_URL,
    token: env.LANDING_API_TOKEN,
    timeoutMs: env.API_TIMEOUT_MS,
  });
  return client.request({ path: LANDING_PATH });
}
