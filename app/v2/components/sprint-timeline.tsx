"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { SPRINT } from "../content";

// Pinned timeline: the section sticks to the viewport and mouse-wheel scroll
// advances the sprint week by week. Clicking a week jumps to it.
export default function SprintTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const weeks = SPRINT.weeks;
  const n = weeks.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // 0 at the first node, 1 at the last. Node i is reached at (i + 0.5) / n of the scroll.
  const stepped = useTransform(scrollYProgress, [0.5 / n, (n - 0.5) / n], [0, 1], { clamp: true });
  const fill = useSpring(stepped, { stiffness: 120, damping: 28, mass: 0.4 });

  useMotionValueEvent(stepped, "change", (v) => {
    const next = Math.round(v * (n - 1));
    setActive((cur) => (cur === next ? cur : next));
  });

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * range, behavior: "smooth" });
  };

  const w = weeks[active];

  return (
    <div ref={ref} style={{ height: `${n * 90 + 100}svh` }} className="relative -mb-16 md:-mb-28">
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 pb-12 pt-24 md:gap-14 md:pb-16 md:pt-28">
        {/* Progress track: nodes are evenly spaced, labels hang off each node */}
        <div className="relative h-[52px]">
          <div className="absolute left-[7.5px] right-[7.5px] top-[7px] h-px bg-[#3a3a3a]" />
          <motion.div
            className="absolute left-[7.5px] right-[7.5px] top-[7px] h-px origin-left bg-[#39B54A]"
            style={{ scaleX: fill }}
          />
          {weeks.map((wk, i) => {
            const f = i / (n - 1);
            return (
              <button
                key={wk.label}
                type="button"
                onClick={() => jumpTo(i)}
                aria-current={i === active ? "step" : undefined}
                className="group absolute top-0 flex flex-col gap-3"
                style={{
                  left: `calc(7.5px + (100% - 15px) * ${f})`,
                  transform: `translateX(-${f * 100}%)`,
                  alignItems: i === 0 ? "flex-start" : i === n - 1 ? "flex-end" : "center",
                }}
              >
                <span
                  className={`block h-[15px] w-[15px] rounded-full border transition-colors duration-300 ${
                    i <= active ? "border-[#39B54A] bg-[#39B54A]" : "border-[#5a5a55] bg-[#1c1c1c]"
                  } ${i === active ? "ring-4 ring-[#39B54A]/25" : ""}`}
                />
                <span
                  className={`whitespace-nowrap text-[13px] transition-colors duration-300 md:text-[14px] ${
                    i === active ? "text-[#39B54A]" : "text-[#8a8a85] group-hover:text-[#f5f4ef]"
                  }`}
                >
                  {wk.label}
                </span>
              </button>
            );
          })}
        </div>


        {/* Active week */}
        <div className="relative min-h-[360px] md:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 md:grid-cols-5 md:gap-6"
            >
              <div className="md:col-span-3">
                <h3 className="text-[clamp(32px,4vw,64px)] font-semibold leading-none tracking-[-0.035em]">{w.name}</h3>
                <p className="mt-5 max-w-lg text-[17px] leading-[1.5] text-[#b5b3ab] md:text-[19px]">{w.body}</p>

                <ul className="mt-8 max-w-lg border-t border-[#3a3a3a]">
                  {w.items.map((t) => (
                    <li key={t} className="flex items-center gap-3 border-b border-[#3a3a3a] py-3 text-[15px] md:text-[16px]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#39B54A]" />
                      {t}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-[14px] text-[#8a8a85]">
                  You get: <span className="text-[#f5f4ef]">{w.output}</span>
                </p>
              </div>

              <span
                aria-hidden
                className="select-none text-[clamp(140px,19vw,320px)] font-semibold leading-[0.8] tracking-[-0.06em] text-[#39B54A] md:col-span-2 md:text-right"
              >
                {String(active + 1).padStart(2, "0")}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between text-[13px] text-[#8a8a85]">
          <p>{active < n - 1 ? "Scroll to move through the weeks" : "Scroll on to see what's included"}</p>
          <p className="tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
