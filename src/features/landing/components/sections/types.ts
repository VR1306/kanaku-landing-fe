import type { SectionOf, SectionType, SiteConfig, ThemeConfig } from "../../types";

export interface SectionProps<T extends SectionType> {
  section: SectionOf<T>;
  site: SiteConfig;
  theme?: ThemeConfig;
}
