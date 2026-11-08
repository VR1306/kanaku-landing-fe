import { z } from "zod";
import { sectionBaseShape } from "./common";

export const stepsSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("steps"),
  title: z.string().min(1),
  items: z
    .array(
      z.object({
        /** Step marker such as "01"; defaults to the padded position. */
        label: z.string().optional(),
        title: z.string().min(1),
        description: z.string(),
      }),
    )
    .min(1),
});
