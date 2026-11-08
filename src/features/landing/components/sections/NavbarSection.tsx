import Link from "next/link";
import { Brand, Container } from "@/components/ui";
import { CtaButton } from "./CtaButton";
import { withBrand } from "../../helpers/format";
import { buildNavbarCtas } from "../../helpers/navbar";
import { isSwitchable } from "../../helpers/theme";
import { ThemeToggle } from "../ThemeToggle";
import { NavbarShell } from "./NavbarShell";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import type { SectionProps } from "./types";

export function NavbarSection({ section, site, theme }: SectionProps<"navbar">) {
  const ctas = buildNavbarCtas(section);

  return (
    <NavbarShell id={section.id}>
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[92px] md:gap-6">
        <Link href="/" aria-label={withBrand(site.labels.homeLink, site.brand.name)}>
          <Brand name={site.brand.name} />
        </Link>
        <nav aria-label={site.labels.primaryNav} className="hidden md:block">
          <NavLinks links={section.links} />
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden items-center gap-3 md:flex">
            {section.secondaryCta && (
              <CtaButton cta={section.secondaryCta} fallbackVariant="outline-inverse" />
            )}
            {section.primaryCta && <CtaButton cta={section.primaryCta} />}
          </div>
          {section.themeToggle && isSwitchable(theme) && (
            <ThemeToggle label={site.labels.toggleTheme} />
          )}
          <MobileMenu
            links={section.links}
            ctas={ctas}
            openLabel={site.labels.openMenu}
            closeLabel={site.labels.closeMenu}
          />
        </div>
      </Container>
    </NavbarShell>
  );
}
