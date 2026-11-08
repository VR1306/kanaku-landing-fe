import { z } from "zod";
import { ctaSchema, sectionBaseShape } from "./common";

export const ctaSectionSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("cta"),
  title: z.string().min(1),
  description: z.string().optional(),
  cta: ctaSchema,
});
