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

export type LegalResult =
  { status: "ok"; doc: LegalDocument } | { status: "missing" } | { status: "unavailable" };

/**
 * The published Privacy Policy / Terms & Conditions from the Admin Portal (`GET {LANDING_API_URL}/legal/{slug}`).
 * "missing" = not configured or not published (shows the 404 page); "unavailable" = the Admin Portal couldn't be
 * reached right now (shows a friendly retry message). Never throws: an error inside a `"use cache"` function would
 * fail the build, so failures are returned as a status and refresh with the cache (about a minute).
 */
export async function getLegalDocument(slug: LegalSlug): Promise<LegalResult> {
  "use cache";
  cacheLife("minutes");
  cacheTag(LEGAL_CACHE_TAG);

  const env = getEnv();
  if (!env.LANDING_API_URL) return { status: "missing" };
  try {
    const client = createHttpClient({
      baseUrl: env.LANDING_API_URL,
      token: env.LANDING_API_TOKEN,
      timeoutMs: env.API_TIMEOUT_MS,
    });
    const { data } = await client.request({ path: `/legal/${slug}`, schema: envelope });
    return { status: "ok", doc: data };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return { status: "missing" };
    console.error(`[legal] couldn't load ${slug}`, error instanceof Error ? error.message : error);
    return { status: "unavailable" };
  }
}
