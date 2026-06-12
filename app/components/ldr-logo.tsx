"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function LDRLogo() {
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
          g.style.transformBox = "fill-box";
          // Base stays pinned — only the top travels down
          g.style.transformOrigin = "center bottom";

          // Staggered entrance
          animate(
            g,
            { opacity: [0, 1], y: [24, 0] },
            { delay: i * 0.14, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          );

          const onPress = () => {
            // Instant snap — base fixed, top drops. No easing so it reads as
            // mechanical travel, not squeeze.
            animate(
              g,
              { scaleY: 0.82 },
              { duration: 0.06, ease: "linear" }
            );
          };

          const onRelease = () => {
            // Strong spring with slight overshoot — letter pops back to full height
            animate(g, { scaleY: 1 }, {
              type: "spring",
              stiffness: 600,
              damping: 18,
              mass: 0.5,
            });
          };

          g.addEventListener("mousedown", onPress);
          g.addEventListener("mouseup", onRelease);
          g.addEventListener("mouseleave", onRelease);
          g.addEventListener("touchstart", onPress, { passive: true });
          g.addEventListener("touchend", onRelease);
        });
      });
  }, []);

  return (
    <div ref={ref} className="w-full max-w-lg mx-auto select-none" />
  );
}
