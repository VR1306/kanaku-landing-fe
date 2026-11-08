import type { ThemeColors, ThemeMode } from "../theme";

/**
 * Content seed for the theme: complete light and dark palettes. The admin
 * overrides any token via `theme.light` / `theme.dark`; this only fills gaps so
 * a partial payload can never leave a CSS variable undefined.
 */
export const seedPalettes: Record<ThemeMode, ThemeColors> = {
  light: {
    canvas: "#F6F8FB",
    canvasAlt: "#EEF2F7",
    surface: "#FFFFFF",
    inverse: "#0B1220",
    inverseLine: "#1E293B",
    primary: "#1D4ED8",
    onPrimary: "#FFFFFF",
    accent: "#22D3EE",
    onAccent: "#0B1220",
    accentLight: "#A5F3FC",
    accentDark: "#0E7490",
    ink: "#0F172A",
    inkBody: "#334155",
    inkMuted: "#64748B",
    inkSubtle: "#94A3B8",
    neutral: "#CBD5E1",
    line: "#E2E8F0",
    lineInverse: "#334155",
    onInverse: "#F6F8FB",
    onInverseMuted: "#BFDBFE",
  },
  dark: {
    canvas: "#0F172A",
    canvasAlt: "#0B1220",
    surface: "#1E293B",
    inverse: "#060B16",
    inverseLine: "#1E293B",
    primary: "#2563EB",
    onPrimary: "#FFFFFF",
    accent: "#22D3EE",
    onAccent: "#0B1220",
    accentLight: "#A5F3FC",
    accentDark: "#67E8F9",
    ink: "#F1F5F9",
    inkBody: "#CBD5E1",
    inkMuted: "#94A3B8",
    inkSubtle: "#94A3B8",
    neutral: "#CBD5E1",
    line: "#334155",
    lineInverse: "#334155",
    onInverse: "#F6F8FB",
    onInverseMuted: "#BFDBFE",
  },
};
