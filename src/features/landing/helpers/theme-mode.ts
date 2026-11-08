import { THEME_STORAGE_KEY } from "../constants";

export type Mode = "light" | "dark";

export function currentMode(): Mode {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyMode(next: Mode) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this visit only.
  }
}

/** Fallback: briefly enables color transitions on every element (see globals.css). */
function fadeTo(next: Mode) {
  const root = document.documentElement;
  root.classList.add("theme-fading");
  applyMode(next);
  window.setTimeout(() => root.classList.remove("theme-fading"), 450);
}

/** Circular reveal growing from the origin element, via the View Transitions API. */
function revealFrom(origin: HTMLElement, next: Mode) {
  const { left, top, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = document.startViewTransition(() => applyMode(next));
  void transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      {
        duration: 550,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}

/** Switches to the opposite mode, animating from `origin` when the browser allows. */
export function switchThemeMode(origin: HTMLElement): void {
  const next = currentMode() === "dark" ? "light" : "dark";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) applyMode(next);
  else if (typeof document.startViewTransition === "function") revealFrom(origin, next);
  else fadeTo(next);
}
