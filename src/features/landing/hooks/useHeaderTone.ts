"use client";

import { useEffect, useRef, useState } from "react";
import {
  findBackground,
  sectionAtLine,
  toneOf,
  type HeaderAppearance,
} from "../helpers/header-tone";

/**
 * Samples the real background color of whatever sits right under the pinned
 * header (probing the page gutter so cards don't interfere) and derives
 * whether the header content should be light or dark.
 */
export function useHeaderTone() {
  const ref = useRef<HTMLElement>(null);
  const [appearance, setAppearance] = useState<HeaderAppearance>({
    background: null,
    tone: "dark",
  });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const header = ref.current;
      if (!header) return;
      const y = Math.min(header.getBoundingClientRect().bottom + 2, window.innerHeight - 1);
      const background = findBackground(sectionAtLine(y) ?? document.body);
      if (!background) return;
      const tone = toneOf(background);
      setAppearance((prev) =>
        prev.background === background && prev.tone === tone ? prev : { background, tone },
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Palette swaps change section colors without any scroll, so re-sample on theme change.
    const observer = new MutationObserver(schedule);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", schedule);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return { ref, ...appearance };
}
