import type { MetadataRoute } from "next";
import { getEnv } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: getEnv().NEXT_PUBLIC_SITE_URL, changeFrequency: "weekly", priority: 1 }];
}
