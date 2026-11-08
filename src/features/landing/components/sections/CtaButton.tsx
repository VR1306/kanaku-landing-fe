import { Button, type ButtonVariant } from "@/components/ui";
import type { Cta } from "../../types";

interface CtaButtonProps {
  cta: Cta;
  fallbackVariant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
}

/** Renders a config-defined CTA through the shared Button. */
export function CtaButton({ cta, fallbackVariant = "accent", size, className }: CtaButtonProps) {
  return (
    <Button
      href={cta.href}
      variant={cta.variant ?? fallbackVariant}
      icon={cta.icon}
      size={size}
      className={className}
    >
      {cta.label}
    </Button>
  );
}
