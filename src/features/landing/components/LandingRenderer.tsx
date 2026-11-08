import { getVisibleSections, sectionsByLandmark } from "../helpers/landmarks";
import type { Landmark } from "../registry";
import { SectionView } from "./SectionView";
import type { LandingConfig } from "../types";

/** Renders the configured sections in order, grouped into page landmarks. */
export function LandingRenderer({ config }: { config: LandingConfig }) {
  const visible = getVisibleSections(config);

  if (visible.length === 0) {
    return (
      <main id="main-content" className="flex flex-1 items-center justify-center p-10">
        <p className="text-ink-muted">{config.site.labels.emptyPage}</p>
      </main>
    );
  }

  const byLandmark = (landmark: Landmark) =>
    sectionsByLandmark(visible, landmark).map((section) => (
      <SectionView key={section.id} section={section} site={config.site} theme={config.theme} />
    ));

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {config.site.labels.skipToContent}
      </a>
      {byLandmark("header")}
      <main id="main-content" className="flex-1">
        {byLandmark("main")}
      </main>
      {byLandmark("footer")}
    </>
  );
}
