import { Container, Reveal } from "@/components/ui";
import { FaqItem } from "./FaqItem";
import type { SectionProps } from "./types";

export function FaqSection({ section, site }: SectionProps<"faq">) {
  const titleId = `${section.id}-title`;

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="anchor-section pb-16 [--pt:0px] lg:pb-24"
    >
      <Container>
        <h2
          id={titleId}
          className="text-center font-heading text-3xl font-bold text-ink sm:text-4xl lg:text-[40px]"
        >
          {section.title}
        </h2>
        <ul className="mx-auto mt-10 flex max-w-[820px] flex-col gap-3.5">
          {section.items.map((item, index) => (
            <Reveal as="li" key={item.question} delay={index * 0.06} y={16}>
              <FaqItem
                question={item.question}
                answer={item.answer}
                emptyAnswer={site.labels.faqNoAnswer}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
