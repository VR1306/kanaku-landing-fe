import { Container, FillBar, LogoMark, Reveal } from "@/components/ui";
import { CtaButton } from "./sections/CtaButton";
import type { NotFoundConfig } from "../types";

export function NotFoundView({ content }: { content: NotFoundConfig }) {
  const { progress } = content;

  return (
    <main
      id="main-content"
      className="flex flex-1 items-center bg-inverse py-20 text-center text-on-inverse"
    >
      <Container className="flex flex-col items-center">
        <Reveal y={-12}>
          <LogoMark className="size-24 sm:size-28" />
        </Reveal>
        {content.code && (
          <Reveal delay={0.1}>
            <p className="mt-6 font-heading text-8xl font-bold text-accent sm:text-[160px] sm:leading-none">
              {content.code}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.2}>
          <h1 className="mt-8 max-w-3xl font-heading text-4xl leading-tight font-bold sm:text-6xl">
            {content.heading}
          </h1>
          {content.description && (
            <p className="mx-auto mt-4 max-w-md text-[17px] text-on-inverse-muted">
              {content.description}
            </p>
          )}
        </Reveal>
        {progress && (
          <Reveal delay={0.3} className="mt-8 w-full max-w-sm">
            <div className="flex items-center justify-between text-sm text-on-inverse-muted">
              <span>{progress.label}</span>
              <span className="font-semibold text-accent">{progress.value}%</span>
            </div>
            <div
              role="progressbar"
              aria-label={progress.label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress.value}
              className="mt-2 h-2 overflow-hidden rounded-full bg-on-inverse/15"
            >
              <FillBar percent={progress.value} className="h-full rounded-full bg-accent" />
            </div>
          </Reveal>
        )}
        <Reveal delay={0.4} className="mt-8 flex flex-wrap justify-center gap-3">
          {content.primaryCta && <CtaButton cta={content.primaryCta} />}
          {content.secondaryCta && (
            <CtaButton cta={content.secondaryCta} fallbackVariant="outline-inverse" />
          )}
        </Reveal>
      </Container>
    </main>
  );
}
