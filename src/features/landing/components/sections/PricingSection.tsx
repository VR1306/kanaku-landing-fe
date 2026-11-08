import { Container, Icon, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { PricingPlan } from "../../schemas/pricing";
import { CtaButton } from "./CtaButton";
import type { SectionProps } from "./types";

function PlanCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const dark = plan.highlighted === true;

  return (
    <Reveal
      as="li"
      delay={index * 0.12}
      className={cn(
        "flex flex-col rounded-[28px] border p-9 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl",
        dark ? "border-accent bg-primary text-on-inverse" : "border-line bg-surface text-ink",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold">{plan.name}</h3>
        {plan.badge && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-on-accent">
            {plan.badge}
          </span>
        )}
      </div>
      <p className="mt-6 font-heading text-5xl font-bold">
        {plan.price.text}
        {plan.price.suffix && (
          <span className="ml-2 text-lg text-on-inverse-muted">{plan.price.suffix}</span>
        )}
      </p>
      <ul className="mt-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className={cn("flex gap-3", dark ? "text-neutral" : "text-ink-body")}>
            <Icon
              name="check"
              className={cn("mt-0.5 size-5", dark ? "text-accent" : "text-accent-dark")}
            />
            {feature}
          </li>
        ))}
      </ul>
      <CtaButton
        cta={plan.cta}
        fallbackVariant={dark ? "accent" : "outline-primary"}
        className="mt-8 w-full"
      />
    </Reveal>
  );
}

export function PricingSection({ section }: SectionProps<"pricing">) {
  const titleId = `${section.id}-title`;

  return (
    <section id={section.id} aria-labelledby={titleId} className="anchor-section pb-16 lg:pb-24">
      <Container>
        <SectionHeading id={titleId} title={section.title} align="center" />
        <ul className="mx-auto mt-12 grid max-w-[880px] gap-5 md:grid-cols-2">
          {section.plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
