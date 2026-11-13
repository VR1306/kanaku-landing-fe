import type { MetadataRoute } from "next";
import { getEnv } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getEnv().NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  return [
    { url: site, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/privacy`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${site}/terms`, changeFrequency: "monthly", priority: 0.3 },
  ];
}
