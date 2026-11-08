import { cn } from "@/utils/cn";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps {
  id: string;
  title: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  title,
  eyebrow,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && <Eyebrow className="mb-4 text-accent-dark">{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="font-heading text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
    </div>
  );
}
