"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { WORK, WORK_RESULTS } from "../content";

const SLIDE_MS = 5000;

type Slide = { id: string; name: string; result: string; kind: "image" | "video"; src: string };

// Same media rules as the work grid: image override > working video > skip.
const SLIDES: Slide[] = WORK.flatMap((p): Slide[] => {
  const m = WORK_RESULTS[p.id];
  if (!m) return [];
  if (m.image) return [{ id: p.id, name: p.name, result: m.result, kind: "image", src: m.image }];
  const video = m.video === null ? null : p.video;
  return video ? [{ id: p.id, name: p.name, result: m.result, kind: "video", src: video }] : [];
});

export default function Showreel() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const n = SLIDES.length;
  // Rotation stops for hover/focus, the pause button, off-screen, hidden tab.
  const rotationPaused = hovered || userPaused || !visible || tabHidden;
  // The active video keeps playing on hover; only a real pause or being
  // off-screen stops it.
  const videoPlaying = !userPaused && visible && !tabHidden;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Play only the active video; give the next slide's video its src early so
  // it has a frame ready by the time it fades in.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      const src = SLIDES[i].src;
      const isActive = i === active;
      const isNext = i === (active + 1) % n;
      if ((isActive || isNext) && !v.getAttribute("src")) {
        v.src = src;
        v.preload = "auto";
      }
      if (isActive && videoPlaying) v.play().catch(() => {});
      else v.pause();
    });
  }, [active, videoPlaying, n]);

  if (n === 0) return null;
  const go = (i: number) => setActive(((i % n) + n) % n);
  const current = SLIDES[active];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Showreel of recent work"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(false);
      }}
      className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#1c1c1c] md:aspect-[2/1]"
    >
      {SLIDES.map((s, i) => {
        const on = i === active;
        return (
          <div
            key={s.id}
            aria-hidden={!on}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${on ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className={`absolute inset-0 transition-transform ease-out ${
                reduce ? "" : on ? "scale-100 duration-[6000ms]" : "scale-[1.06] duration-[900ms]"
              }`}
            >
              {s.kind === "image" ? (
                <Image
                  src={s.src}
                  alt={`${s.name} website`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 1360px"
                  className="object-cover object-top"
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        );
      })}

      {/* Scrim so the label reads on any frame. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/50 to-transparent md:h-1/2" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 text-[#f5f4ef] md:flex-row md:items-end md:justify-between md:p-8">
        <Link href={`/works/${current.id}`} className="group block max-w-xl" aria-live="polite">
          <span className="block text-[clamp(28px,3.4vw,48px)] font-semibold leading-none tracking-[-0.035em]">
            {current.name}
            <span className="ml-2 inline-block text-[#f5f4ef]/60 transition-[transform,color] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#39B54A]">
              ↗
            </span>
          </span>
          <span className="mt-2 block text-[14px] leading-snug text-[#f5f4ef]/75 md:text-[16px]">{current.result}</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${s.name}`}
                aria-current={i === active}
                className="group/seg relative h-6 w-9 md:w-12"
              >
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-[#f5f4ef]/30 transition-colors group-hover/seg:bg-[#f5f4ef]/50">
                  {i < active && <span className="absolute inset-0 bg-[#f5f4ef]" />}
                  {i === active &&
                    (reduce ? (
                      <span className="absolute inset-0 bg-[#f5f4ef]" />
                    ) : (
                      <span
                        // Remounts per slide so the fill restarts; advancing is
                        // driven by this animation, so pausing it pauses the reel.
                        key={active}
                        onAnimationEnd={() => go(active + 1)}
                        className="absolute inset-y-0 left-0 bg-[#f5f4ef]"
                        style={{
                          animation: `reel-progress ${SLIDE_MS}ms linear forwards`,
                          animationPlayState: rotationPaused ? "paused" : "running",
                        }}
                      />
                    ))}
                </span>
              </button>
            ))}
          </div>
          {!reduce && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? "Play showreel" : "Pause showreel"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f5f4ef]/40 transition-colors hover:bg-[#f5f4ef] hover:text-[#1c1c1c]"
            >
              {userPaused ? (
                <svg aria-hidden width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <path d="M0 0l10 6-10 6z" />
                </svg>
              ) : (
                <svg aria-hidden width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <path d="M0 0h3.5v12H0zM6.5 0H10v12H6.5z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
