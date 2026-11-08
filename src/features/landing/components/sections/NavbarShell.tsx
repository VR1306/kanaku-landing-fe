"use client";

import type { CSSProperties, ReactNode } from "react";
import { useHeaderTone } from "../../hooks/useHeaderTone";

/** Pinned header that adopts the background color of the section beneath it. */
export function NavbarShell({ id, children }: { id: string; children: ReactNode }) {
  const { ref, tone, background } = useHeaderTone();

  return (
    <header
      ref={ref}
      id={id}
      data-nav-tone={tone}
      style={
        {
          backgroundColor: background ?? undefined,
          // Opaque color for the mobile panel, which must never be see-through.
          "--nav-bg": background ?? "var(--theme-inverse)",
        } as CSSProperties
      }
      className="sticky top-0 z-40 border-b border-current/10 bg-inverse text-on-inverse transition-colors duration-300"
    >
      {children}
    </header>
  );
}
