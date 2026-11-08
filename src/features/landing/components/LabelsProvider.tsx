"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Labels } from "../types";

const LabelsContext = createContext<Labels | null>(null);

/** Gives client-only surfaces (e.g. the error boundary) access to admin-managed labels. */
export function LabelsProvider({ labels, children }: { labels: Labels; children: ReactNode }) {
  return <LabelsContext.Provider value={labels}>{children}</LabelsContext.Provider>;
}

export function useLabels(): Labels | null {
  return useContext(LabelsContext);
}
