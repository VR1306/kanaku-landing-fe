/** `#pricing` -> `pricing`; other hrefs -> null. */
export function anchorId(href: string): string | null {
  return href.startsWith("#") && href.length > 1 ? href.slice(1) : null;
}
