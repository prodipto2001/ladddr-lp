"use client";

import { useEffect, useState } from "react";

// Floating shortcut to the block-builder section. Hides itself while that
// section is on screen, since the visitor is already there.
export default function PlayFab() {
  const [inPlay, setInPlay] = useState(false);

  useEffect(() => {
    const el = document.getElementById("play");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInPlay(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="#play"
      aria-hidden={inPlay}
      tabIndex={inPlay ? -1 : 0}
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#1c1c1c] px-5 py-3 text-[14px] font-medium text-[#f5f4ef] transition-all duration-300 hover:bg-[#39B54A] hover:text-[#1c1c1c] md:bottom-8 md:right-8 ${
        inPlay ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      Play a game
      <span aria-hidden>↓</span>
    </a>
  );
}
