import { z } from "zod";
import { validateLandingContent } from "@/features/landing/helpers/validate";
import { getEnv } from "@/lib/env";
import { parseJsonBody, requireBearerSecret, withApiHandler } from "@/services/bff/handler";
import { ok } from "@/services/bff/response";

/** Dry-run validation of a draft config (`Authorization: Bearer $REVALIDATE_SECRET`). */
export const POST = withApiHandler(async (request) => {
  requireBearerSecret(request, getEnv().REVALIDATE_SECRET);
  const draft = await parseJsonBody(request, z.unknown());
  return ok(validateLandingContent(draft), { headers: { "Cache-Control": "no-store" } });
});
