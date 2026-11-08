"use client";

import { motion } from "motion/react";

const SPRING = { type: "spring", stiffness: 420, damping: 30 } as const;
const lineStyle = { transformBox: "fill-box", transformOrigin: "center" } as const;

/** Three bars that morph into a cross: outer bars slide to center and rotate, middle one collapses. */
export function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <motion.line
        x1="4"
        x2="20"
        y1="7"
        y2="7"
        style={lineStyle}
        initial={false}
        animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={SPRING}
      />
      <motion.line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
        style={lineStyle}
        initial={false}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.line
        x1="4"
        x2="20"
        y1="17"
        y2="17"
        style={lineStyle}
        initial={false}
        animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={SPRING}
      />
    </svg>
  );
}
