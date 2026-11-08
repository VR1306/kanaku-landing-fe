import type { ComponentType } from "react";
import { sectionRegistry } from "../registry";
import type { LandingConfig, SectionConfig } from "../types";
import type { SectionProps } from "./sections/types";

interface SectionViewProps {
  section: SectionConfig;
  site: LandingConfig["site"];
  theme: LandingConfig["theme"];
}

/** Looks up the registered component for a section's `type` and renders it. */
export function SectionView({ section, site, theme }: SectionViewProps) {
  // The registry is keyed by `type`, so the pairing is correct by construction;
  // TypeScript cannot correlate the union with the lookup.
  const Component = sectionRegistry[section.type].Component as ComponentType<
    SectionProps<SectionConfig["type"]>
  >;
  return <Component section={section} site={site} theme={theme} />;
}
