import { THEME_STORAGE_KEY } from "../constants";

/** Inline script that applies a saved color mode before first paint (no flash). */
export function buildThemeInitScript(): string {
  const key = JSON.stringify(THEME_STORAGE_KEY);
  return `try{var m=localStorage.getItem(${key});if(m==="light"||m==="dark")document.documentElement.dataset.theme=m}catch(e){}`;
}
