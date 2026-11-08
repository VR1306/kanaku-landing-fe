/** True for absolute http(s)/mailto URLs. */
export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");
}

/** True for in-page anchors such as `#pricing`. */
export function isAnchorHref(href: string): boolean {
  return href.startsWith("#");
}
