/** Step marker: the admin-provided label, otherwise the padded 1-based position ("01"). */
export function stepLabel(label: string | undefined, index: number): string {
  return label ?? String(index + 1).padStart(2, "0");
}

/** Replaces `{brand}` in a label template. */
export function withBrand(template: string, brand: string): string {
  return template.replace("{brand}", brand);
}
