"use client";

const T = "transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 180ms ease";
const base = { transformBox: "fill-box", transformOrigin: "center", transition: T } as const;

/** Three bars that morph into a cross: outer bars slide to center and rotate, middle one collapses (CSS transitions). */
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
      <line
        x1="4"
        x2="20"
        y1="7"
        y2="7"
        style={{ ...base, transform: open ? "translateY(5px) rotate(45deg)" : "none" }}
      />
      <line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
        style={{ ...base, opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }}
      />
      <line
        x1="4"
        x2="20"
        y1="17"
        y2="17"
        style={{ ...base, transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
      />
    </svg>
  );
}
