"use client";

import { Icon } from "@/components/ui";
import { switchThemeMode } from "../helpers/theme-mode";

/**
 * Flips between light and dark and remembers the choice. The icon is chosen by
 * CSS (see globals.css) so server and client markup always match.
 */
export function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) => switchThemeMode(event.currentTarget)}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-inverse text-on-inverse transition hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-accent"
    >
      <Icon name="moon" className="theme-moon size-5" />
      <Icon name="sun" className="theme-sun size-5" />
    </button>
  );
}
