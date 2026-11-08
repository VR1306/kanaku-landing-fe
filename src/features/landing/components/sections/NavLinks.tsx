"use client";

import { cn } from "@/utils/cn";
import { anchorId } from "../../helpers/anchor";
import { useActiveSection } from "../../hooks/useActiveSection";
import type { Link } from "../../types";

/** Desktop nav links; highlights the link of the section currently in view. */
export function NavLinks({ links }: { links: Link[] }) {
  const active = useActiveSection(links.flatMap((l) => anchorId(l.href) ?? []));

  return (
    <ul className="flex items-center gap-8 text-[15px] text-neutral">
      {links.map((link) => {
        const isActive = active !== null && anchorId(link.href) === active;
        return (
          <li key={link.href + link.label}>
            <a
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative py-1 transition hover:text-on-inverse",
                "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300",
                isActive
                  ? "text-(--nav-active,var(--theme-accent)) after:scale-x-100"
                  : "after:scale-x-0",
              )}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
