import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { fetchRemoteLandingConfig } from "@/services/landing/landing.service";
import { defaultLandingConfig } from "./config/default-config";
import { LANDING_CACHE_TAG } from "./constants";
import { parseLandingConfig } from "./helpers/parse";
import type { LandingConfig } from "./types";

/**
 * The remote configuration, cached and tagged for on-demand revalidation. It THROWS when the Admin Portal can't
 * deliver a valid config: errors are never cached, so the page recovers the moment the Admin Portal does
 * (instead of serving the fallback for the rest of the cache window).
 */
async function loadRemoteConfig(): Promise<LandingConfig | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(LANDING_CACHE_TAG);

  const raw = await fetchRemoteLandingConfig();
  if (raw === null) return null; // no content API configured
  const result = parseLandingConfig(raw);
  if (!result.ok) throw new Error(`remote config rejected: ${result.issues.join("; ")}`);
  if (result.issues.length > 0) console.warn("[landing] skipped invalid sections", result.issues);
  return result.config;
}

/** Remote content when available, otherwise the bundled default (only while the Admin Portal is unreachable). */
export async function getLandingConfig(): Promise<LandingConfig> {
  try {
    return (await loadRemoteConfig()) ?? defaultLandingConfig;
  } catch (error) {
    console.error(
      "[landing] using the bundled default:",
      error instanceof Error ? error.message : error,
    );
    return defaultLandingConfig;
  }
}

/** Marks cached landing content stale; served stale-while-revalidate. */
export function revalidateLanding(tags: string[] = [LANDING_CACHE_TAG]): void {
  for (const tag of tags) revalidateTag(tag, "max");
}
