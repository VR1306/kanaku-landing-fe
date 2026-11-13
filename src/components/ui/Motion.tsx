import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";

/*
 * Entrance animations are pure CSS (see `.reveal*` / `.grow-*` in globals.css), so nothing waits for JavaScript to
 * hydrate before it can paint. That matters most for the hero: its text used to start at opacity 0 and only become
 * visible after the animation library had loaded, which delayed the Largest Contentful Paint by ~2 s.
 */

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
  /** Starting horizontal offset in px. */
  x?: number;
  as?: "div" | "li";
  /** Above the fold: animate on load (time-based). Otherwise it animates as it scrolls into view (where supported). */
  eager?: boolean;
}

/** Fades and slides content in. Content is always visible if animations are unsupported or reduced motion is on. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  as: Tag = "div",
  eager = false,
}: RevealProps) {
  const style = { "--rd": `${delay}s`, "--rx": `${x}px`, "--ry": `${y}px` } as CSSProperties;
  return (
    <Tag className={cn(eager ? "reveal-eager" : "reveal", className)} style={style}>
      {children}
    </Tag>
  );
}

/** Horizontal meter that fills from the left to `percent`. */
export function FillBar({ percent, className }: { percent: number; className?: string }) {
  return (
    <div
      className={cn("grow-x", className)}
      style={{ width: `${percent}%`, "--rd": "0.3s" } as CSSProperties}
    />
  );
}

/** Chart bar that grows up from its baseline. */
export function GrowBar({
  className,
  height,
  delay = 0,
}: {
  className?: string;
  height: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("grow-y", className)}
      style={{ height, "--rd": `${delay}s` } as CSSProperties}
    />
  );
}
