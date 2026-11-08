import { z } from "zod";
import { iconSchema, sectionBaseShape } from "./common";

export const featuresSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("features"),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  items: z
    .array(z.object({ icon: iconSchema, title: z.string().min(1), description: z.string() }))
    .min(1),
});
