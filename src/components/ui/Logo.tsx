import { cn } from "@/utils/cn";

interface LogoMarkProps {
  className?: string;
  variant?: "filled" | "outline";
}

const BARS = "M8 15h4v8H8zM14 9h4v14h-4zM20 12h4v11h-4z";

export function LogoMark({ className, variant = "filled" }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8 shrink-0", className)}>
      {variant === "filled" ? (
        <>
          <rect width="32" height="32" rx="9" className="fill-accent" />
          <path d={BARS} className="fill-on-accent" />
        </>
      ) : (
        <path
          d={BARS}
          fill="none"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="stroke-accent"
        />
      )}
    </svg>
  );
}

interface BrandProps {
  name: string;
  className?: string;
  textClassName?: string;
}

/** Logo mark + wordmark. */
export function Brand({ name, className, textClassName }: BrandProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark />
      <span className={cn("font-heading text-2xl font-bold", textClassName)}>{name}</span>
    </span>
  );
}
