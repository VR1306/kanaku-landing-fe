import { getLandingJsonSchema } from "@/features/landing/helpers/validate";
import { withApiHandler } from "@/services/bff/handler";
import { ok } from "@/services/bff/response";

/** Public JSON Schema describing the landing configuration contract. */
export const GET = withApiHandler(() =>
  ok(getLandingJsonSchema(), { headers: { "Cache-Control": "public, max-age=3600" } }),
);
