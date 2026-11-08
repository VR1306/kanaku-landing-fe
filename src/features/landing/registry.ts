import type { ComponentType } from "react";
import { CtaSection } from "./components/sections/CtaSection";
import { FaqSection } from "./components/sections/FaqSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { FooterSection } from "./components/sections/FooterSection";
import { HeroSection } from "./components/sections/HeroSection";
import { NavbarSection } from "./components/sections/NavbarSection";
import { PricingSection } from "./components/sections/PricingSection";
import { StepsSection } from "./components/sections/StepsSection";
import type { SectionProps } from "./components/sections/types";
import type { SectionType } from "./types";

export type Landmark = "header" | "main" | "footer";

interface SectionDefinition<T extends SectionType> {
  Component: ComponentType<SectionProps<T>>;
  /** Where the section sits in the page's landmark structure. */
  landmark: Landmark;
}

type Registry = { [T in SectionType]: SectionDefinition<T> };

/**
 * Maps a config `type` to its component. To add a section: create its schema
 * (schemas/), add it to `sectionSchema`, build the component, and register it here.
 */
export const sectionRegistry: Registry = {
  navbar: { Component: NavbarSection, landmark: "header" },
  hero: { Component: HeroSection, landmark: "main" },
  features: { Component: FeaturesSection, landmark: "main" },
  steps: { Component: StepsSection, landmark: "main" },
  pricing: { Component: PricingSection, landmark: "main" },
  faq: { Component: FaqSection, landmark: "main" },
  cta: { Component: CtaSection, landmark: "main" },
  footer: { Component: FooterSection, landmark: "footer" },
};
