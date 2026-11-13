import { Container, Eyebrow, Reveal } from "@/components/ui";
import { cn } from "@/utils/cn";
import { CtaButton } from "./CtaButton";
import { HeroVisual } from "./HeroVisual";
import type { SectionProps } from "./types";

export function HeroSection({ section }: SectionProps<"hero">) {
  const titleId = `${section.id}-title`;

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center bg-inverse py-16 text-on-inverse md:min-h-[calc(100dvh-92px)] lg:py-24"
    >
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal eager>
          {section.badge && (
            <Eyebrow className="inline-block rounded-full border border-accent px-4 py-2 text-xs font-normal text-accent-light sm:text-[13px]">
              {section.badge}
            </Eyebrow>
          )}
          <h1
            id={titleId}
            className="mt-8 font-heading text-5xl leading-none font-bold tracking-[-0.02em] sm:text-7xl lg:text-[88px]"
          >
            {section.headline.map((line) => (
              <span key={line.text} className={cn("block", line.accent && "text-accent")}>
                {line.text}
              </span>
            ))}
          </h1>
          {section.description && (
            <p className="mt-6 max-w-xl text-lg leading-8 text-on-inverse-muted sm:text-xl">
              {section.description}
            </p>
          )}
          <div className="mt-9 flex flex-wrap gap-3">
            {section.primaryCta && <CtaButton cta={section.primaryCta} size="lg" />}
            {section.secondaryCta && (
              <CtaButton cta={section.secondaryCta} size="lg" fallbackVariant="outline-inverse" />
            )}
          </div>
          {section.note && <p className="mt-6 text-sm text-ink-subtle">{section.note}</p>}
        </Reveal>
        {section.visual && (
          <Reveal eager x={40} y={0} delay={0.2}>
            <HeroVisual visual={section.visual} />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
