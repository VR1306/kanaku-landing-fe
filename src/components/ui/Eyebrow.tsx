import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[13px] font-bold tracking-[0.14em] uppercase", className)}>{children}</p>
  );
}
