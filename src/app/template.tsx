import type { ReactNode } from "react";

/** Plain wrapper: the old page-enter animation required JavaScript before any content could appear. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}
