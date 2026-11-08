import { sectionRegistry, type Landmark } from "../registry";
import type { LandingConfig, SectionConfig } from "../types";
import { isSectionVisible } from "./visibility";

export function getVisibleSections(config: LandingConfig): SectionConfig[] {
  return config.sections.filter((section) => isSectionVisible(section, config.flags));
}

export function sectionsByLandmark(sections: SectionConfig[], landmark: Landmark): SectionConfig[] {
  return sections.filter((section) => sectionRegistry[section.type].landmark === landmark);
}
