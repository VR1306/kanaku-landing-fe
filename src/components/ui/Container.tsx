import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/utils/cn";

type ContainerProps<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}
