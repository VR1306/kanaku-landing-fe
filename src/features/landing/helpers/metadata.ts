import type { Metadata } from "next";
import type { LandingConfig } from "../types";

/** Builds Next.js metadata from the admin-managed site config. */
export function buildLandingMetadata({ site }: LandingConfig, siteUrl: string): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: site.seo.title,
    description: site.seo.description,
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      siteName: site.brand.name,
      type: "website",
      ...(site.seo.ogImage && { images: [site.seo.ogImage] }),
    },
    twitter: { card: "summary_large_image", title: site.seo.title },
  };
}
