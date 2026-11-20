"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Counts up to `to` the first time it scrolls into view. The server renders
// the final value, so the number is correct without JS and for crawlers.
// Stateless by design: while not in view it shows 0, once in view it animates.
// (A "started" flag breaks under React StrictMode's effect re-run: the first
// run's cleanup stops the animation and the guard blocks the restart.)
export default function StatCounter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Bottom-only margin: a shorthand "-60px" also shrinks the left/right edges,
  // which hid the left-most counter (at x≈20px on phones) from the observer.
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!inView) {
      el.textContent = "0";
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {to}
    </span>
  );
}
