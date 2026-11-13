"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/utils/cn";

interface FaqItemProps {
  question: string;
  answer?: string;
  /** Shown when the admin has not written an answer yet. */
  emptyAnswer: string;
}

/** Accessible accordion row with an animated chevron and height transition. */
export function FaqItem({ question, answer, emptyAnswer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={cn(
        "rounded-[18px] border bg-surface transition duration-200 hover:shadow-md",
        open ? "border-primary/50" : "border-line hover:border-primary/40",
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-[18px] px-6 py-5 text-left text-[17px] font-semibold text-ink focus-visible:outline-2 focus-visible:outline-primary sm:px-10"
        >
          {question}
          <Icon
            name="chevron"
            className={cn(
              "size-5 text-ink-muted transition-transform duration-300",
              open && "rotate-180 text-primary",
            )}
          />
        </button>
      </h3>
      {/* Height animates with grid rows (no JS animation library); `inert` keeps the closed answer out of tab order. */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div id={panelId} role="region" inert={!open} className="overflow-hidden">
          <RichText
            text={answer?.trim() ? answer : emptyAnswer}
            className="space-y-2 px-6 pb-5 leading-relaxed text-ink-muted sm:px-10"
          />
        </div>
      </div>
    </div>
  );
}
