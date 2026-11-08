import { z } from "zod";
import { ctaSchema, sectionBaseShape } from "./common";

const overviewVisualSchema = z.object({
  kind: z.literal("overview-card"),
  label: z.string(),
  value: z.string(),
  caption: z.string().optional(),
  /** Relative bar values; the tallest bar fills the chart. */
  bars: z.array(z.object({ value: z.number().positive(), highlight: z.boolean().optional() })),
  floating: z
    .object({
      label: z.string(),
      value: z.string(),
      /** 0-100 */
      progress: z.number().min(0).max(100),
    })
    .optional(),
});

export const heroSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("hero"),
  badge: z.string().optional(),
  /** Each line is rendered on its own row; `accent` lines use the accent color. */
  headline: z.array(z.object({ text: z.string().min(1), accent: z.boolean().optional() })).min(1),
  description: z.string().optional(),
  primaryCta: ctaSchema.optional(),
  secondaryCta: ctaSchema.optional(),
  note: z.string().optional(),
  visual: overviewVisualSchema.optional(),
});

export type HeroVisual = z.infer<typeof overviewVisualSchema>;
