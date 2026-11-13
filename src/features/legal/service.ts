import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";
import { getEnv } from "@/lib/env";
import { ApiError } from "@/services/http/errors";
import { createHttpClient } from "@/services/http/client";

/** Refreshed on demand by the Admin Portal after a publish (tag below); otherwise every few minutes. */
export const LEGAL_CACHE_TAG = "landing-legal";

const blockSchema = z.union([z.string(), z.array(z.string())]);
const documentSchema = z.object({
  title: z.string().min(1),
  summary: z.string().default(""),
  /** ISO publish date. */
  updated: z.string(),
  version: z.number().int(),
  sections: z
    .array(z.object({ id: z.string(), title: z.string(), blocks: z.array(blockSchema) }))
    .min(1),
});
const envelope = z.object({ data: documentSchema });

export type LegalSlug = "privacy" | "terms";
export type LegalDocument = z.infer<typeof documentSchema>;

/** Cached fetch. Returns null only when the document doesn't exist; THROWS when the Admin Portal can't be reached (never cached). */
async function fetchLegal(slug: LegalSlug): Promise<LegalDocument | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(LEGAL_CACHE_TAG);

  const env = getEnv();
  if (!env.LANDING_API_URL) return null;
  const client = createHttpClient({
    baseUrl: env.LANDING_API_URL,
    token: env.LANDING_API_TOKEN,
    timeoutMs: env.API_TIMEOUT_MS,
  });
  try {
    return (await client.request({ path: `/legal/${slug}`, schema: envelope })).data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null; // not published yet
    throw error;
  }
}

export type LegalResult =
  { status: "ok"; doc: LegalDocument } | { status: "missing" } | { status: "unavailable" };

/**
 * The published Privacy Policy / Terms & Conditions from the Admin Portal (`GET {LANDING_API_URL}/legal/{slug}`).
 * "missing" = not configured or not published (404 page); "unavailable" = the Admin Portal can't be reached right now
 * (a friendly retry message, and it is not cached).
 */
export async function getLegalDocument(slug: LegalSlug): Promise<LegalResult> {
  try {
    const doc = await fetchLegal(slug);
    return doc ? { status: "ok", doc } : { status: "missing" };
  } catch (error) {
    console.error(`[legal] couldn't load ${slug}`, error instanceof Error ? error.message : error);
    return { status: "unavailable" };
  }
}
