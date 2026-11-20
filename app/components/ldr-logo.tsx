"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function LDRLogo({
  className = "w-full max-w-lg mx-auto select-none",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/LDR.svg")
      .then((r) => r.text())
      .then((svgText) => {
        const div = ref.current;
        if (!div) return;

        div.innerHTML = svgText;
        const svg = div.querySelector("svg") as SVGSVGElement | null;
        if (!svg) return;

        // Crop whitespace to tight letter bounding box
        try {
          const bbox = svg.getBBox();
          const pad = 24;
          svg.setAttribute(
            "viewBox",
            `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`
          );
        } catch (_) {}

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "auto");
        svg.style.display = "block";

        const groups = Array.from(
          svg.querySelectorAll(":scope > g")
        ) as SVGGElement[];

        groups.forEach((g, i) => {
          g.style.cursor = "pointer";

          // Staggered entrance
          animate(
            g,
            { opacity: [0, 1], y: [24, 0] },
            { delay: i * 0.14, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          );

          // Key press: the letter is a stack of extruded layers (bottom -> top).
          // Layer offset scales with its height in the stack, so the base stays
          // put, the top face travels furthest, and the sides compress.
          const layers = Array.from(g.children) as SVGElement[];
          const DEPTH = 13; // svg units the top face travels
          let pressed = false;
          let progress = 0;
          let current: ReturnType<typeof animate> | null = null;

          const render = (p: number) => {
            progress = p;
            const n = layers.length - 1;
            layers.forEach((el, k) => {
              el.style.transform = `translateY(${(DEPTH * p * k) / n}px)`;
            });
          };

          const run = (to: number, duration: number, ease: [number, number, number, number]) => {
            current?.stop();
            current = animate(progress, to, { duration, ease, onUpdate: render });
          };

          const onPress = () => {
            if (pressed) return;
            pressed = true;
            run(1, 0.12, [0.33, 1, 0.68, 1]);
          };

          const onRelease = () => {
            if (!pressed) return;
            pressed = false;
            // Starts from wherever the press got to, so quick clicks stay smooth
            run(0, 0.3, [0.22, 1, 0.36, 1]);
          };

          g.addEventListener("pointerdown", onPress);
          g.addEventListener("pointerup", onRelease);
          g.addEventListener("pointercancel", onRelease);
          g.addEventListener("pointerleave", onRelease);
        });
      });
  }, []);

  return (
    <div ref={ref} className={className} />
  );
}
