"use client";

import { useEffect, useRef } from "react";

// Triangle arrow — Figma "Polygon 1", points up, rotated 42.52deg → upper-right tip
const ARROW_PATH =
  "M5.57007 0.77049C6.08069 -0.256829 7.54622 -0.256831 8.05684 0.770488L13.4775 11.6762C14.03 12.788 12.9573 14.0107 11.7831 13.6075L7.26439 12.0559C6.97215 11.9556 6.65479 11.9556 6.36255 12.0559L1.84376 13.6075C0.669579 14.0107 -0.403112 12.788 0.149456 11.6762L5.57007 0.77049Z";

export default function CustomCursor() {
  const posRef   = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const handRef  = useRef<HTMLDivElement>(null);
  const chipRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !posRef.current || !scaleRef.current ||
      !arrowRef.current || !handRef.current || !chipRef.current
    ) return;

    const pos   = posRef.current;
    const scale = scaleRef.current;
    const arrow = arrowRef.current;
    const hand  = handRef.current;
    const chip  = chipRef.current;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let visible = false;
    let isLink  = false;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function tick() {
      cx = lerp(cx, tx, 0.14);
      cy = lerp(cy, ty, 0.14);
      // Arrow tip (42.52deg rotation) lands at ~(59, 5) in the 64×40 container
      // Arrow tip (-42.52deg, left side) lands at ~(5, 5) in the container
      pos.style.transform = `translate(${cx - 5}px, ${cy - 5}px)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function onMove(e: MouseEvent) {
      if (!visible) {
        cx = e.clientX; cy = e.clientY;
        pos.style.opacity = "1";
        visible = true;
      }
      tx = e.clientX;
      ty = e.clientY;

      const hovering = !!(e.target as Element).closest(
        'a, button, [role="button"], [role="link"], label, input, select, textarea'
      );
      if (hovering !== isLink) {
        isLink = hovering;
        arrow.style.opacity        = hovering ? "0"       : "1";
        hand.style.opacity         = hovering ? "1"       : "0";
        chip.style.background      = hovering ? "#39B54A" : "#1A5C27";
      }
    }

    function onLeave() { pos.style.opacity = "0"; visible = false; }
    function onDown()  { scale.style.transform = "scale(0.85)"; }
    function onUp()    { scale.style.transform = "scale(1)"; }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  return (
    <div
      ref={posRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0"
      style={{ willChange: "transform" }}
    >
      <div
        ref={scaleRef}
        style={{ transition: "transform 0.12s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* 64×40 container — exact Figma dimensions */}
        <div style={{ position: "relative", width: "64px", height: "40px" }}>

          {/* Arrow — upper-left, rotated -42.52deg so tip points upper-left */}
          <div
            ref={arrowRef}
            style={{
              position: "absolute",
              left: 0, top: 0,
              width: "23.153px", height: "23.159px",
              transition: "opacity 0.15s",
            }}
          >
            <div style={{
              transform: "rotate(-42.52deg)",
              transformOrigin: "center center",
              width: "100%", height: "100%",
              position: "relative",
            }}>
              <div style={{ position: "absolute", inset: "10.53% 8.3% 6.21% 8.3%" }}>
                <svg
                  width="100%" height="100%"
                  viewBox="0 0 13.6269 13.6862"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d={ARROW_PATH} fill="#1A5C27" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hand pointer — shown on interactive element hover */}
          <div
            ref={handRef}
            style={{
              position: "absolute",
              left: 0, top: 0,
              width: "23.153px", height: "23.159px",
              opacity: 0,
              transition: "opacity 0.15s",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path
                d="M5.5 0C4.95 0 4.5.45 4.5 1v7.27A2 2 0 003 8C1.9 8 1 8.9 1 10v1.5C1 14 2.6 16 4 17l1.5 1H10l1.5-2C12.6 14 13 12.5 13 11V8.5C13 7.67 12.33 7 11.5 7c-.28 0-.54.08-.76.22A1.5 1.5 0 009.5 6c-.28 0-.54.08-.76.22A1.5 1.5 0 007 5.27V1C7 .45 6.55 0 6 0c-.55 0-1 .45-1 1"
                fill="#1A5C27"
              />
            </svg>
          </div>

          {/* Chip — mirrored to right side: left 19px (= 64-45), top 19.06px */}
          <div
            ref={chipRef}
            style={{
              position: "absolute",
              left: "19px", top: "19.06px",
              width: "45px", height: "20px",
              background: "#1A5C27",
              borderRadius: "4px",
              transition: "background 0.2s ease",
            }}
          >
            <span style={{
              position: "absolute",
              left: "14px", top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              fontSize: "8.988px",
              lineHeight: "normal",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-geist-mono), monospace",
            }}>
              you.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
