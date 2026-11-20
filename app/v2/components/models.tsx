"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MODELS } from "../content";
import BookCall from "./cta";
import Reveal from "./reveal";
import Section from "./section";

export default function Models() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const m = MODELS[active];

  return (
    <Section id="models" noBorder title={<>Ways to<br />work.</>}>
      <Reveal>
        <p className="max-w-xl text-[20px] leading-[1.4] md:text-[24px]">
          Three ways to team up.
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-5 md:gap-0">
          {/* Selector */}
          <div role="tablist" aria-label="Ways to work" className="md:col-span-2 md:border-r md:border-[#dbd9d1] md:pr-10">
            {MODELS.map((model, i) => {
              const on = i === active;
              return (
                <button
                  key={model.n}
                  role="tab"
                  type="button"
                  id={`model-tab-${i}`}
                  aria-selected={on}
                  aria-controls="model-panel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group flex w-full items-baseline justify-between gap-4 border-b border-[#dbd9d1] py-5 text-left transition-colors ${
                    on ? "text-[#1c1c1c]" : "text-[#9a9892] hover:text-[#1c1c1c]"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-[13px] tabular-nums">{model.n}</span>
                    <span className="text-[24px] font-semibold leading-none tracking-[-0.025em] md:text-[28px]">
                      {model.name}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`text-[18px] transition-transform ${on ? "translate-x-0 text-[#39B54A]" : "-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            id="model-panel"
            role="tabpanel"
            aria-labelledby={`model-tab-${active}`}
            className="md:col-span-3 md:pl-12"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={m.n}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-8"
              >
                <div>
                  <p className="text-[clamp(32px,3.6vw,52px)] font-semibold leading-none tracking-[-0.03em]">{m.time}</p>
                  <p className="mt-4 text-[14px] text-[#39B54A]">{m.terms}</p>
                  <p className="mt-1 max-w-md text-[15px] leading-[1.5] text-[#6b6b66]">{m.fit}</p>
                </div>

                <ul className="flex flex-col gap-2 border-t border-[#dbd9d1] pt-6">
                  {m.points.map((p) => (
                    <li key={p} className="text-[16px] leading-[1.5] text-[#444]">{p}</li>
                  ))}
                </ul>

                <div>
                  <BookCall label={`Talk about ${m.name.toLowerCase()}`} variant="dark" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
