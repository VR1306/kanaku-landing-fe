import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";
import { getEnv } from "@/lib/env";
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

/**
 * The published Privacy Policy / Terms & Conditions from the Admin Portal
 * (`GET {LANDING_API_URL}/legal/{slug}`). Null when the Admin Portal is not configured, the document has
 * not been published, or it is unreachable (the page then shows "not found" rather than guessed text).
 */
export async function getLegalDocument(slug: LegalSlug): Promise<LegalDocument | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(LEGAL_CACHE_TAG);

  const env = getEnv();
  if (!env.LANDING_API_URL) return null;
  try {
    const client = createHttpClient({
      baseUrl: env.LANDING_API_URL,
      token: env.LANDING_API_TOKEN,
      timeoutMs: env.API_TIMEOUT_MS,
    });
    return (await client.request({ path: `/legal/${slug}`, schema: envelope })).data;
  } catch (error) {
    console.error(`[legal] couldn't load ${slug}`, error);
    return null;
  }
}
