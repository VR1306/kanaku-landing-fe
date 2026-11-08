/** Stroke icon paths on a 24x24 grid. Add an entry to make it available to config. */
export const iconPaths = {
  plus: "M12 5v14M5 12h14",
  wallet: "M4 7h16v12H4zM4 11h16M15 15h2",
  chart: "M4 20V10M10 20V4M16 20v-7M21 20H3",
  repeat: "M20 12a8 8 0 1 1-3-6.2M20 4v5h-5",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  bell: "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4",
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  check: "M5 13l4 4L19 7",
  chevron: "M6 9l6 6 6-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  close: "M6 6l12 12M18 6L6 18",
} as const;

export type IconName = keyof typeof iconPaths;

export const iconNames = Object.keys(iconPaths) as [IconName, ...IconName[]];
