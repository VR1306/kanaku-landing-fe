import { toKebabCase } from "@/utils/string";
import { seedPalettes } from "../config/default-theme";
import { themeKeys, type ThemeColors, type ThemeConfig, type ThemeMode } from "../theme";

export function resolveThemeColors(theme: ThemeConfig | undefined, mode: ThemeMode): ThemeColors {
  return { ...seedPalettes[mode], ...theme?.[mode] };
}

function declarations(colors: ThemeColors, mode: ThemeMode): string {
  const vars = themeKeys.map((key) => `--theme-${toKebabCase(key)}:${colors[key]}`);
  return `color-scheme:${mode};${vars.join(";")}`;
}

/** Modes the visitor can use, de-duplicated; both unless the admin restricts them. */
export function availableModes(theme?: ThemeConfig): ThemeMode[] {
  return theme?.modes ? [...new Set(theme.modes)] : ["light", "dark"];
}

/** True when the visitor may switch between light and dark. */
export function isSwitchable(theme?: ThemeConfig): boolean {
  return availableModes(theme).length > 1;
}

/** Mode to lock the document to server-side, or undefined to follow system/storage. */
export function fixedMode(theme?: ThemeConfig): ThemeMode | undefined {
  const modes = availableModes(theme);
  if (modes.length === 1) return modes[0];
  return theme?.defaultMode === "light" || theme?.defaultMode === "dark"
    ? theme.defaultMode
    : undefined;
}

/**
 * CSS for the offered palettes. Values are validated by `cssColor`, so they
 * cannot contain braces, semicolons or tags. With two modes an explicit
 * `data-theme` wins over the OS preference; with none the OS preference applies.
 */
export function themeToCss(theme?: ThemeConfig): string {
  const modes = availableModes(theme);
  const css = (mode: ThemeMode) => declarations(resolveThemeColors(theme, mode), mode);

  if (modes.length === 1) return `:root{${css(modes[0])}}`;
  return [
    `:root{${css("light")}}`,
    `:root[data-theme="dark"]{${css("dark")}}`,
    `@media (prefers-color-scheme:dark){:root:not([data-theme]){${css("dark")}}}`,
  ].join("");
}
