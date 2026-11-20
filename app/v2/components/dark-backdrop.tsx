"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Scroll-driven dark panel. It rises into the page with rounded corners and a
// slight side inset, flattens to full bleed while you're inside, then rounds
// off again as it leaves, so the cream/black edges never feel like a hard cut.
export default function DarkBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const enter = useScroll({ target: ref, offset: ["start end", "start 0.3"] }).scrollYProgress;
  const exit = useScroll({ target: ref, offset: ["end 0.7", "end start"] }).scrollYProgress;

  // 1 = fully "tucked" (rounded, inset), 0 = flat full bleed
  const tuckIn = useTransform(enter, [0, 1], [1, 0]);
  const tuckOut = exit;
  const tuck = useTransform([tuckIn, tuckOut], ([a, b]) => Math.max(a as number, b as number));
  const smooth = useSpring(tuck, { stiffness: 140, damping: 30, mass: 0.3 });

  const inset = useTransform(smooth, (t) => `${t * 14}px`);
  const radius = useTransform(smooth, (t) => `${t * 64}px`);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute inset-y-0 bg-[#1c1c1c]"
        style={{ left: inset, right: inset, borderRadius: radius }}
      />
    </div>
  );
}
