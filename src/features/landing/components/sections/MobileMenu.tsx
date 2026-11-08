"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
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

const EASE = [0.22, 1, 0.36, 1] as const;

/** Client island: burger button plus a full-width dropdown panel (below `md`). */
export function MobileMenu({ links, ctas, openLabel, closeLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const active = useActiveSection(links.flatMap((l) => anchorId(l.href) ?? []));

  useEscapeKey(open, () => setOpen(false));

  return (
    <div className="md:hidden">
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-line-inverse text-on-inverse transition hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-accent"
      >
        <BurgerIcon open={open} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Dimmed backdrop; tapping it closes the menu. */}
            <motion.div
              aria-hidden="true"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full z-10 h-dvh bg-black/50"
            />
            <motion.div
              id={panelId}
              initial={{ opacity: 0, y: -16, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -16, scaleY: 0.96 }}
              style={{ transformOrigin: "top" }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-x-0 top-full z-20 max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-b-3xl border-t border-current/10 bg-(--nav-bg) px-4 pt-3 pb-6 shadow-2xl sm:px-6"
            >
              <ul className="flex flex-col gap-1">
                {links.map((link, index) => {
                  const isActive = anchorId(link.href) === active;
                  return (
                    <motion.li
                      key={link.href + link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.04 * index, ease: EASE }}
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
                    </motion.li>
                  );
                })}
              </ul>
              {ctas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 * links.length + 0.05, ease: EASE }}
                  className="mt-4 flex flex-col gap-3 border-t border-current/10 pt-5"
                >
                  {ctas.map((cta) => (
                    <CtaButton key={cta.href + cta.label} cta={cta} className="w-full" />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
