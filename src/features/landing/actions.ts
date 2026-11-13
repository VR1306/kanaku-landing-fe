import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { fetchRemoteLandingConfig } from "@/services/landing/landing.service";
import { defaultLandingConfig } from "./config/default-config";
import { LANDING_CACHE_TAG } from "./constants";
import { parseLandingConfig } from "./helpers/parse";
import type { LandingConfig } from "./types";

/**
 * Resolves the landing configuration: remote API when configured, otherwise (or on any failure) the bundled default.
 * Cached and tagged for on-demand revalidation (the Admin Portal refreshes it after each publish).
 *
 * Never throw from inside a `"use cache"` function: Next treats that as a render error and fails the build (and
 * pre-rendering of /_not-found) whenever the content API is unavailable. Failures fall back to the default instead;
 * with stale-while-revalidate the next refresh (about a minute) picks the real content up once the API is back.
 */
export async function getLandingConfig(): Promise<LandingConfig> {
  "use cache";
  cacheLife("minutes");
  cacheTag(LANDING_CACHE_TAG);

  try {
    const raw = await fetchRemoteLandingConfig();
    if (raw === null) return defaultLandingConfig;

    const result = parseLandingConfig(raw);
    if (!result.ok) {
      console.error("[landing] remote config rejected, using default", result.issues);
      return defaultLandingConfig;
    }
    if (result.issues.length > 0) {
      console.warn("[landing] skipped invalid sections", result.issues);
    }
    return result.config;
  } catch (error) {
    console.error("[landing] failed to load remote config, using default", error);
    return defaultLandingConfig;
  }
}

/** Marks cached landing content stale; served stale-while-revalidate. */
export function revalidateLanding(tags: string[] = [LANDING_CACHE_TAG]): void {
  for (const tag of tags) revalidateTag(tag, "max");
}
