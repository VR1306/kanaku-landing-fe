import type { Cta, SectionOf } from "../types";

/** CTAs for the mobile panel: primary first, with sensible default variants. */
export function buildNavbarCtas(section: SectionOf<"navbar">): Cta[] {
  const { primaryCta, secondaryCta } = section;
  return [
    primaryCta && { ...primaryCta, variant: primaryCta.variant ?? "accent" },
    secondaryCta && { ...secondaryCta, variant: secondaryCta.variant ?? "outline-inverse" },
  ].flatMap((cta) => (cta ? [cta] : []));
}
