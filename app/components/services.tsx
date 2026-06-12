const services = [
  {
    name: "ui/ux design",
    icon: "✦",
    scope: "figma, design systems, prototyping",
    bullets: [
      "end-to-end figma design — wireframes to hi-fi with component libraries.",
      "design systems that scale across product teams and reduce inconsistency.",
      "interaction design and micro-animations that make interfaces feel alive.",
    ],
  },
  {
    name: "web development",
    icon: "⬡",
    scope: "react, next.js, typescript",
    bullets: [
      "pixel-perfect implementation from figma to production-ready code.",
      "performance-first builds — we target 95+ lighthouse on every project.",
      "clean, maintainable typescript with zero technical debt from day one.",
    ],
  },
  {
    name: "mvp development",
    icon: "◈",
    scope: "concept to launch in weeks",
    bullets: [
      "full product — auth, billing, email, admin — shipped in 4–8 weeks.",
      "tech stack chosen for speed and resilience, not trend-chasing.",
    ],
  },
  {
    name: "landing pages",
    icon: "◎",
    scope: "high-converting, fast, seo-ready",
    bullets: [
      "conversion-focused design grounded in information architecture.",
      "sub-2s load times and 99 lighthouse scores by default.",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-6">
      <h2 className="text-[15px] font-medium text-[#1c1c1c]">services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.name} className="flex flex-col gap-2 border border-[#dbd9d1] rounded-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[15px] text-[#39B54A]">{s.icon}</span>
                <span className="text-[15px] font-semibold">{s.name}</span>
              </div>
            </div>
            <p className="text-[13px] text-[#888]">{s.scope}</p>
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
