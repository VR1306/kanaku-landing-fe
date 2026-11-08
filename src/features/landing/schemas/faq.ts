import { z } from "zod";
import { sectionBaseShape } from "./common";

export const faqSchema = z.object({
  ...sectionBaseShape,
  type: z.literal("faq"),
  title: z.string().min(1),
  items: z.array(z.object({ question: z.string().min(1), answer: z.string().optional() })).min(1),
});
