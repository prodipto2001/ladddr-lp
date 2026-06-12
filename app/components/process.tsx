const steps = [
  {
    num: "01",
    name: "vibe check",
    duration: "week 1",
    bullets: [
      "deep discovery call to understand goals, audience, and constraints.",
      "competitive analysis and reference gathering.",
      "scope and timeline agreed before a single pixel is moved.",
    ],
  },
  {
    num: "02",
    name: "build different",
    duration: "weeks 2 – n",
    bullets: [
      "figma design first — you see and approve before we write a line of code.",
      "weekly async updates, no surprises.",
      "flawless code. zero technical debt. future-proof from day one.",
    ],
  },
  {
    num: "03",
    name: "ship it",
    duration: "final week",
    bullets: [
      "full qa pass — cross-browser, mobile, accessibility, lighthouse.",
      "deployment to your infrastructure with ci/cd pipeline.",
      "30-day post-launch support included on every project.",
    ],
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-6">
      <h2 className="text-[15px] font-medium text-[#1c1c1c]">process</h2>

      <div className="flex flex-col md:flex-row md:divide-x md:divide-[#dbd9d1] gap-6 md:gap-0">
        {steps.map((s) => (
          <div key={s.num} className="flex flex-col gap-3 flex-1 md:px-6 first:md:pl-0 last:md:pr-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[13px] text-[#bbb]">{s.num}</span>
              <span className="text-[13px] text-[#888]">{s.duration}</span>
            </div>
            <span className="text-[15px] font-semibold">{s.name}</span>
            <ul className="flex flex-col gap-1">
              {s.bullets.map((b, i) => (
                <li key={i} className="text-[14px] leading-[1.6] text-[#444] flex gap-2">
                  <span className="shrink-0 text-[#bbb]">–</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
