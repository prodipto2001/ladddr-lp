"use client";

import { useEffect, useRef, useState } from "react";

const DIGITS = ["0","1","2","3","4","5","6","7","8","9"];

const STATS = [
  { value: "30+", label: "projects shipped" },
  { value: "3yr",  label: "in business" },
  { value: "99",   label: "lighthouse avg" },
];

function RollingDigit({
  target,
  triggered,
  delay,
}: {
  target: string;
  triggered: boolean;
  delay: number;
}) {
  const idx = DIGITS.indexOf(target);

  return (
    <span style={{ display: "inline-block", overflow: "hidden", height: "1em" }}>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          transform: triggered ? `translateY(-${idx * 10}%)` : "translateY(0%)",
          transition: triggered
            ? `transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
            : "none",
        }}
      >
        {DIGITS.map((d) => (
          <span key={d} style={{ display: "block", height: "1em", lineHeight: 1 }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

function RollingValue({ value, triggered }: { value: string; triggered: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {value.split("").map((char, i) =>
        DIGITS.includes(char) ? (
          <RollingDigit key={i} target={char} triggered={triggered} delay={i * 80} />
        ) : (
          <span
            key={i}
            style={{
              display: "inline-block",
              lineHeight: 1,
              opacity: triggered ? 1 : 0,
              transform: triggered ? "translateY(0)" : "translateY(0.25em)",
              transition: triggered
                ? `opacity 0.3s ease ${i * 80 + 150}ms, transform 0.3s ease ${i * 80 + 150}ms`
                : "none",
            }}
          >
            {char}
          </span>
        )
      )}
    </span>
  );
}

export default function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex gap-6">
      {STATS.map((s) => (
        <div key={s.label}>
          <p className="text-[14px] font-bold">
            <RollingValue value={s.value} triggered={triggered} />
          </p>
          <p className="text-[13px] text-[#888]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
