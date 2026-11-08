import { z } from "zod";
import { linkSchema, sectionBaseShape } from "./common";

export const footerSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("footer"),
  tagline: z.string().optional(),
  columns: z.array(z.object({ title: z.string().min(1), links: z.array(linkSchema) })),
  copyright: z.string().optional(),
});
