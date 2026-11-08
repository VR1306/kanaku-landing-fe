import { z } from "zod";

/** Every semantic color the UI consumes. Mirrored in globals.css (@theme). */
export const themeKeys = [
  "canvas",
  "canvasAlt",
  "surface",
  "inverse",
  "inverseLine",
  "primary",
  "onPrimary",
  "accent",
  "onAccent",
  "accentLight",
  "accentDark",
  "ink",
  "inkBody",
  "inkMuted",
  "inkSubtle",
  "neutral",
  "line",
  "lineInverse",
  "onInverse",
  "onInverseMuted",
] as const;

export type ThemeKey = (typeof themeKeys)[number];
export type ThemeColors = Record<ThemeKey, string>;

// Hex or functional notation only; rejects anything that could break out of a CSS value.
const cssColor = z
  .string()
  .regex(/^(#[0-9a-f]{3,8}|(rgb|hsl|hwb|lab|lch|oklab|oklch)a?\([0-9a-z\s.,%/+-]+\))$/i, {
    message: "Expected a hex or functional CSS color",
  });

export type ThemeMode = "light" | "dark";

const colorOverrides = z.partialRecord(z.enum(themeKeys), cssColor).optional();

/**
 * Admin-controlled theme. Each palette is a partial override of the built-in
 * defaults; `defaultMode` applies until the visitor picks a mode themselves.
 */
export const themeSchema = z.object({
  /** Modes the site offers. One mode locks the site to it and hides the toggle. Default: both. */
  modes: z
    .array(z.enum(["light", "dark"]))
    .min(1)
    .optional(),
  defaultMode: z.enum(["light", "dark", "system"]).optional(),
  light: colorOverrides,
  dark: colorOverrides,
});

export type ThemeConfig = z.infer<typeof themeSchema>;
