import type { LandingConfig, SectionConfig } from "../schemas/config";

/** Conditional rendering: `enabled`, `showIf` and `hideIf` against config flags. */
export function isSectionVisible(section: SectionConfig, flags: LandingConfig["flags"]): boolean {
  if (section.enabled === false) return false;
  if (section.showIf && !flags?.[section.showIf]) return false;
  if (section.hideIf && flags?.[section.hideIf]) return false;
  return true;
}
