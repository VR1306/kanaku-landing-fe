import { Container } from "@/components/ui";
import type { SectionProps } from "./types";

export function FooterSection({ section, site }: SectionProps<"footer">) {
  return (
    <footer id={section.id} className="bg-inverse text-on-inverse">
      <Container className="flex flex-col gap-10 pt-14 pb-10 md:flex-row md:justify-between">
        <div>
          <p className="font-heading text-2xl font-bold">{site.brand.name}</p>
          {section.tagline && (
            <p className="mt-3 text-[15px] text-on-inverse-muted">{section.tagline}</p>
          )}
        </div>
        <nav
          aria-label={site.labels.footerNav}
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-14"
        >
          {section.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[15px] font-bold text-accent-light">{column.title}</h2>
              <ul className="mt-4 space-y-3 text-[15px] text-on-inverse-muted">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a href={link.href} className="transition hover:text-on-inverse">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      {section.copyright && (
        <div className="border-t border-inverse-line py-8 text-center text-[13px] text-ink-subtle">
          {section.copyright}
        </div>
      )}
    </footer>
  );
}
