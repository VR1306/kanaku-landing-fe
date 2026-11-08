import { getLandingConfig } from "@/features/landing";
import { ok } from "@/services/bff/response";
import { withApiHandler } from "@/services/bff/handler";

/** Public, read-only: the validated landing configuration. */
export const GET = withApiHandler(async () => {
  const config = await getLandingConfig();
  return ok(config, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
});
