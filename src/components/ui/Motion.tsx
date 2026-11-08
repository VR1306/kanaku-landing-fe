"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

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
}

/** Fades and slides content in once it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 24, x = 0, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Horizontal meter that fills from the left to `percent` when scrolled into view. */
export function FillBar({ percent, className }: { percent: number; className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ width: `${percent}%`, originX: 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
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
    <motion.div
      className={className}
      style={{ height, originY: 1 }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    />
  );
}
