import { z } from "zod";
import { ctaSchema, linkSchema, sectionBaseShape } from "./common";

export const navbarSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("navbar"),
  links: z.array(linkSchema),
  secondaryCta: ctaSchema.optional(),
  primaryCta: ctaSchema.optional(),
  /** Show the light/dark toggle. */
  themeToggle: z.boolean().optional(),
});
