export type Tone = "dark" | "light";

export interface HeaderAppearance {
  /** Actual background color of the section under the header (null = not measured yet). */
  background: string | null;
  tone: Tone;
}

const CHANNELS = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)/;

function parseColor(value: string): { r: number; g: number; b: number; a: number } | null {
  const match = CHANNELS.exec(value);
  if (!match) return null;
  const alpha =
    match[4] === undefined
      ? 1
      : match[4].endsWith("%")
        ? parseFloat(match[4]) / 100
        : Number(match[4]);
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]), a: alpha };
}

/** Nearest opaque-ish background walking up from the element. */
export function findBackground(start: Element | null): string | null {
  for (let el = start; el; el = el.parentElement) {
    const color = getComputedStyle(el).backgroundColor;
    const parsed = parseColor(color);
    if (parsed && parsed.a > 0.95) return color;
  }
  return null;
}

export function toneOf(color: string): Tone {
  const c = parseColor(color);
  if (!c) return "dark";
  // Perceived luminance (Rec. 601); below the midpoint reads as dark.
  return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255 < 0.5 ? "dark" : "light";
}

/**
 * The page section whose box contains the viewport line `y`.
 * Uses geometry rather than `elementFromPoint`, which returns the root element
 * (and so a transparent background) while a view transition is running.
 */
export function sectionAtLine(y: number): Element | null {
  let found: Element | null = null;
  for (const el of document.querySelectorAll("main > *, body footer")) {
    const { top, bottom } = el.getBoundingClientRect();
    if (top <= y && bottom > y) found = el;
  }
  return found;
}
