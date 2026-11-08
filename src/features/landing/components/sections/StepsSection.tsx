import { Container, Reveal, SectionHeading } from "@/components/ui";
import { stepLabel } from "../../helpers/format";
import type { SectionProps } from "./types";

export function StepsSection({ section }: SectionProps<"steps">) {
  const titleId = `${section.id}-title`;

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="anchor-section bg-canvas-alt pb-16 [--anchor-gap:var(--pt)] lg:pb-24"
    >
      <Container>
        <SectionHeading id={titleId} title={section.title} align="center" />
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {section.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 0.12}
              className="rounded-3xl p-4 transition duration-300 hover:-translate-y-1 hover:bg-surface hover:shadow-lg"
            >
              <span aria-hidden="true" className="font-heading text-6xl font-bold text-accent">
                {stepLabel(item.label, index)}
              </span>
              <h3 className="mt-3 text-[22px] font-bold text-ink">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{item.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
