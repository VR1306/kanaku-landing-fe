import { z } from "zod";
import { iconNames } from "@/components/ui";

/** Internal path, in-page anchor, http(s) or mailto. Blocks `javascript:` and friends. */
export const hrefSchema = z
  .string()
  .regex(/^(\/(?!\/)|#|https?:\/\/|mailto:)/i, { message: "Unsupported link target" });

export const linkSchema = z.object({
  label: z.string().min(1),
  href: hrefSchema,
});

export const iconSchema = z.enum(iconNames);

export const buttonVariantSchema = z.enum([
  "accent",
  "primary",
  "dark",
  "outline-inverse",
  "outline-primary",
]);

export const ctaSchema = linkSchema.extend({
  variant: buttonVariantSchema.optional(),
  icon: iconSchema.optional(),
});

export type Link = z.infer<typeof linkSchema>;
export type Cta = z.infer<typeof ctaSchema>;

/** Fields shared by every section. */
export const sectionBaseShape = {
  /** DOM id; also the target of in-page anchors such as `#pricing`. */
  id: z.string().min(1),
  /** `false` hides the section. Defaults to visible. */
  enabled: z.boolean().optional(),
  /** Render only when `flags[showIf]` is truthy. */
  showIf: z.string().optional(),
  /** Hide when `flags[hideIf]` is truthy. */
  hideIf: z.string().optional(),
};
