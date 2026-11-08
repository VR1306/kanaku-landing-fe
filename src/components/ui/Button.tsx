import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { isAnchorHref, isExternalHref } from "@/utils/url";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

export const buttonVariants = {
  accent: "bg-accent text-on-accent hover:brightness-110",
  primary: "bg-primary text-on-primary hover:brightness-110",
  dark: "bg-inverse text-on-inverse hover:brightness-125",
  "outline-inverse": "border border-line-inverse text-on-inverse hover:bg-white/5",
  "outline-primary": "border border-primary text-primary hover:bg-primary/5",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

const sizes = {
  md: "h-12 px-6 text-base",
  lg: "h-[58px] px-8 text-[17px]",
} as const;

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  icon?: IconName;
  className?: string;
}

/** Link styled as a button. Picks next/link or a plain anchor based on the href. */
export function Button({
  href,
  children,
  variant = "accent",
  size = "md",
  icon,
  className,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    sizes[size],
    buttonVariants[variant],
    variant.startsWith("outline") && "font-medium",
    className,
  );
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className="size-5" strokeWidth={2.5} />}
    </>
  );

  if (isExternalHref(href) || isAnchorHref(href)) {
    const external = isExternalHref(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
