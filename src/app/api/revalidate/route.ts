import { z } from "zod";
import { revalidateLanding } from "@/features/landing";
import { getEnv } from "@/lib/env";
import { parseJsonBody, requireBearerSecret, withApiHandler } from "@/services/bff/handler";
import { ok } from "@/services/bff/response";

const bodySchema = z.object({
  tags: z.array(z.string().min(1).max(256)).min(1).max(10).optional(),
});

/** Webhook for the content source: `Authorization: Bearer $REVALIDATE_SECRET`. */
export const POST = withApiHandler(async (request) => {
  requireBearerSecret(request, getEnv().REVALIDATE_SECRET);
  const { tags } = await parseJsonBody(request, bodySchema);
  revalidateLanding(tags);
  return ok({ revalidated: true }, { headers: { "Cache-Control": "no-store" } });
});
