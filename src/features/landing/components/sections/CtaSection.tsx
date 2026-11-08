import { Container, Reveal } from "@/components/ui";
import { CtaButton } from "./CtaButton";
import type { SectionProps } from "./types";

export function CtaSection({ section }: SectionProps<"cta">) {
  const titleId = `${section.id}-title`;

  return (
    <section id={section.id} aria-labelledby={titleId} className="pb-16 lg:pb-24">
      <Container className="max-w-[1280px] px-4 sm:px-6">
        <Reveal className="rounded-[32px] bg-accent px-6 py-14 text-center text-on-accent sm:px-10 lg:py-20">
          <h2
            id={titleId}
            className="mx-auto max-w-3xl font-heading text-4xl leading-tight font-bold sm:text-5xl lg:text-[56px]"
          >
            {section.title}
          </h2>
          {section.description && (
            <p className="mx-auto mt-4 max-w-xl text-lg">{section.description}</p>
          )}
          <CtaButton cta={section.cta} size="lg" fallbackVariant="dark" className="mt-9" />
        </Reveal>
      </Container>
    </section>
  );
}
