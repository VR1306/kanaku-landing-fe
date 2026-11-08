import { z } from "zod";
import { themeSchema } from "../theme";
import { ctaSchema } from "./common";
import { ctaSectionSchema } from "./cta";
import { faqSchema } from "./faq";
import { featuresSchema } from "./features";
import { footerSchema } from "./footer";
import { heroSchema } from "./hero";
import { navbarSchema } from "./navbar";
import { pricingSchema } from "./pricing";
import { stepsSchema } from "./steps";

/** Add new section schemas here (and register a component in ../registry.ts). */
export const sectionSchema = z.discriminatedUnion("type", [
  navbarSchema,
  heroSchema,
  featuresSchema,
  stepsSchema,
  pricingSchema,
  faqSchema,
  ctaSectionSchema,
  footerSchema,
]);

/** Every piece of UI text that is not section content, so nothing user-facing lives in code. */
export const labelsSchema = z.object({
  skipToContent: z.string(),
  openMenu: z.string(),
  closeMenu: z.string(),
  primaryNav: z.string(),
  footerNav: z.string(),
  /** `{brand}` is replaced with the brand name. */
  homeLink: z.string(),
  toggleTheme: z.string(),
  emptyPage: z.string(),
  faqNoAnswer: z.string(),
  errorTitle: z.string(),
  errorMessage: z.string(),
  retry: z.string(),
});

export const siteSchema = z.object({
  brand: z.object({ name: z.string().min(1) }),
  labels: labelsSchema,
  locale: z.string().default("en"),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const notFoundSchema = z.object({
  code: z.string().optional(),
  /** Optional "work in progress" meter; `value` is 0-100. */
  progress: z.object({ label: z.string(), value: z.number().min(0).max(100) }).optional(),
  heading: z.string().min(1),
  description: z.string().optional(),
  primaryCta: ctaSchema.optional(),
  secondaryCta: ctaSchema.optional(),
});

const configShape = {
  site: siteSchema,
  theme: themeSchema.optional(),
  /** Named switches referenced by a section's `showIf` / `hideIf`. */
  flags: z.record(z.string(), z.boolean()).optional(),
  notFound: notFoundSchema,
};

/** Strict schema: every section must be valid. */
export const landingConfigSchema = z.object({
  ...configShape,
  sections: z.array(sectionSchema),
});

/** Tolerant shell used for remote content: sections are validated one by one. */
export const landingShellSchema = z.object({
  ...configShape,
  sections: z.array(z.unknown()),
});

export type LandingConfig = z.infer<typeof landingConfigSchema>;
export type LandingConfigInput = z.input<typeof landingConfigSchema>;
export type SectionConfig = z.infer<typeof sectionSchema>;
export type SectionType = SectionConfig["type"];
export type SectionOf<T extends SectionType> = Extract<SectionConfig, { type: T }>;
export type SiteConfig = z.infer<typeof siteSchema>;
export type Labels = z.infer<typeof labelsSchema>;
export type NotFoundConfig = z.infer<typeof notFoundSchema>;
