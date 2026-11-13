"use client";

import { useId, useState, type CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { anchorId } from "../../helpers/anchor";
import { useActiveSection } from "../../hooks/useActiveSection";
import type { Cta, Link } from "../../types";
import { BurgerIcon } from "./BurgerIcon";
import { CtaButton } from "./CtaButton";

interface MobileMenuProps {
  links: Link[];
  ctas: Cta[];
  openLabel: string;
  closeLabel: string;
}

/** Client island: burger button plus a full-width dropdown panel (below `md`). */
export function MobileMenu({ links, ctas, openLabel, closeLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const active = useActiveSection(links.flatMap((l) => anchorId(l.href) ?? []));

  useEscapeKey(open, () => setOpen(false));

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-line-inverse text-on-inverse transition duration-200 hover:scale-105 hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-accent active:scale-90"
      >
        <BurgerIcon open={open} />
      </button>

      {/* Always mounted; visibility/opacity/transform are CSS transitions (see .menu-* in globals.css). */}
      <div
        aria-hidden="true"
        data-open={open}
        onClick={() => setOpen(false)}
        className="menu-backdrop absolute inset-x-0 top-full z-10 h-dvh bg-black/50"
      />
      <div
        id={panelId}
        data-open={open}
        inert={!open}
        className="menu-panel absolute inset-x-0 top-full z-20 max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-b-3xl border-t border-current/10 bg-(--nav-bg) px-4 pt-3 pb-6 shadow-2xl sm:px-6"
      >
        <ul className="flex flex-col gap-1">
          {links.map((link, index) => {
            const isActive = anchorId(link.href) === active;
            return (
              <li
                key={link.href + link.label}
                className="menu-item"
                style={{ "--i": index } as CSSProperties}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors",
                    isActive
                      ? "bg-current/10 text-(--nav-active,var(--theme-accent))"
                      : "text-on-inverse hover:bg-current/5",
                  )}
                >
                  {link.label}
                  {isActive && <span className="size-2 rounded-full bg-accent" />}
                </a>
              </li>
            );
          })}
        </ul>
        {ctas.length > 0 && (
          <div
            className="menu-item mt-4 flex flex-col gap-3 border-t border-current/10 pt-5"
            style={{ "--i": links.length } as CSSProperties}
          >
            {ctas.map((cta) => (
              <CtaButton key={cta.href + cta.label} cta={cta} className="w-full" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
