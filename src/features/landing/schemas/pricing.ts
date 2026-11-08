import { z } from "zod";
import { ctaSchema, sectionBaseShape } from "./common";

const planSchema = z.object({
  name: z.string().min(1),
  price: z.object({ text: z.string().min(1), suffix: z.string().optional() }),
  badge: z.string().optional(),
  highlighted: z.boolean().optional(),
  features: z.array(z.string().min(1)),
  cta: ctaSchema,
});

export const pricingSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("pricing"),
  title: z.string().min(1),
  plans: z.array(planSchema).min(1),
});

export type PricingPlan = z.infer<typeof planSchema>;
