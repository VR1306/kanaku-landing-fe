import { GrowBar, Reveal } from "@/components/ui";
import { cn } from "@/utils/cn";
import { barHeights } from "../../helpers/chart";
import type { HeroVisual as HeroVisualConfig } from "../../schemas/hero";

export function HeroVisual({ visual }: { visual: HeroVisualConfig }) {
  const heights = barHeights(visual.bars.map((bar) => bar.value));

  return (
    <div className="relative pb-12 lg:pb-0">
      <div className="rounded-[28px] border border-accent bg-canvas p-8 text-ink transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgb(34_211_238/0.35)]">
        <p className="text-[13px] tracking-[0.12em] text-accent-dark uppercase">{visual.label}</p>
        <p className="mt-5 font-heading text-5xl font-bold">{visual.value}</p>
        {visual.caption && <p className="mt-3 text-[15px] text-ink-muted">{visual.caption}</p>}
        <div className="mt-8 flex h-[140px] items-end gap-3" aria-hidden="true">
          {visual.bars.map((bar, index) => (
            <GrowBar
              key={index}
              delay={0.4 + index * 0.08}
              className={cn("flex-1 rounded-[10px]", bar.highlight ? "bg-primary" : "bg-neutral")}
              height={heights[index]}
            />
          ))}
        </div>
      </div>
      {visual.floating && (
        <Reveal
          eager
          delay={0.9}
          y={20}
          className={cn(
            "absolute right-0 bottom-0 w-[min(274px,85%)] rounded-[22px] bg-accent p-[22px] text-on-accent",
            "shadow-[0_24px_24px_-12px_rgb(0_0_0/0.35)] lg:-right-10 lg:-bottom-12 transition-shadow duration-300 hover:shadow-[0_28px_28px_-12px_rgb(0_0_0/0.5)]",
          )}
        >
          <p className="text-[13px] font-bold">{visual.floating.label}</p>
          <p className="mt-2 font-heading text-[34px] leading-tight font-bold">
            {visual.floating.value}
          </p>
          <div className="mt-3 h-2 rounded-full bg-on-accent/20">
            <div
              className="h-full rounded-full bg-on-accent"
              style={{ width: `${visual.floating.progress}%` }}
            />
          </div>
        </Reveal>
      )}
    </div>
  );
}
