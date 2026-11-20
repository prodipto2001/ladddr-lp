"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// The builder is only fetched once this section is within ~600px of the
// viewport, so it costs nothing on first load.
const BlockBuilder = dynamic(() => import("./block-builder"), {
  ssr: false,
  loading: () => <Placeholder />,
});

const header = (
  <div className="flex flex-col gap-4">
    <h2 className="text-[clamp(36px,4.2vw,68px)] font-semibold leading-[0.95] tracking-[-0.04em]">
      Build
      <br />
      something.
    </h2>
    <p className="max-w-md text-[16px] leading-[1.45] text-[#444] md:text-[18px]">
      Our logo is a stack of blocks, so naturally we keep a toy box. Click a tile, pick a colour, make a mess, then
      take it home.
    </p>
  </div>
);

function Placeholder() {
  return (
    <div className="grid w-full items-center gap-8 md:grid-cols-12 md:gap-10" aria-hidden>
      <div className="md:col-span-5">{header}</div>
      <div className="aspect-[1.2] w-full rounded-[4px] bg-[#ebe9e1] md:col-span-7" />
    </div>
  );
}

export default function Play() {
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="play"
      ref={ref}
      className="flex scroll-mt-0 items-center border-t border-[#dbd9d1] md:min-h-[100svh]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-28 pt-16 md:px-10 md:py-12">
        {near ? <BlockBuilder header={header} /> : <Placeholder />}
      </div>
    </section>
  );
}
