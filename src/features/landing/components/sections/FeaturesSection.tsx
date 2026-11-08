import { Container, Icon, Reveal, SectionHeading } from "@/components/ui";
import type { SectionProps } from "./types";

export function FeaturesSection({ section }: SectionProps<"features">) {
  const titleId = `${section.id}-title`;

  return (
    <section id={section.id} aria-labelledby={titleId} className="anchor-section pb-16 lg:pb-24">
      <Container>
        <SectionHeading
          id={titleId}
          eyebrow={section.eyebrow}
          title={section.title}
          className="max-w-2xl"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(index % 3) * 0.08}
              className="rounded-3xl border border-line bg-surface p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex size-[52px] items-center justify-center rounded-2xl bg-primary text-accent">
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-6 font-heading text-2xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
