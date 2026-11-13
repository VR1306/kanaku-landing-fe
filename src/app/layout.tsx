import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { getEnv } from "@/lib/env";
import {
  buildLandingMetadata,
  buildThemeInitScript,
  getLandingConfig,
  fixedMode,
  isSwitchable,
  themeToCss,
} from "@/features/landing";
import { LabelsProvider } from "@/features/landing/components/LabelsProvider";
import "./globals.css";

const body = Inter({ variable: "--font-body-face", subsets: ["latin"], display: "optional" });
// Variable font (no `weight` list): one file covers every weight instead of one file per weight.
const heading = Plus_Jakarta_Sans({
  variable: "--font-heading-face",
  subsets: ["latin"],
  display: "optional",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildLandingMetadata(await getLandingConfig(), getEnv().NEXT_PUBLIC_SITE_URL);
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const config = await getLandingConfig();

  const { theme, site } = config;
  const mode = fixedMode(theme);
  return (
    <html
      lang={site.locale}
      data-theme={mode}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${body.variable} ${heading.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeToCss(theme) }} />
        {isSwitchable(theme) && (
          <script dangerouslySetInnerHTML={{ __html: buildThemeInitScript() }} />
        )}
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <LabelsProvider labels={site.labels}>{children}</LabelsProvider>
      </body>
    </html>
  );
}
