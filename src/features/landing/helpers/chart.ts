/** Converts relative bar values to height percentages (tallest bar = 100%). */
export function barHeights(values: number[]): string[] {
  const max = Math.max(...values, 1);
  return values.map((value) => `${(value / max) * 100}%`);
}
