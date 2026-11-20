import BookCallButton from "./book-call-button";

const ways = [
  {
    num: "01",
    name: "website sprint",
    time: "4 weeks",
    pricing: "fixed scope · fixed price",
    fit: "marketing sites, landing pages, rebrands",
    bullets: [
      "designed in figma, built in next.js, shipped end to end.",
      "one kickoff, two review rounds, one launch date.",
      "30-day post-launch support included.",
    ],
  },
  {
    num: "02",
    name: "mvp build",
    time: "6 – 8 weeks",
    pricing: "milestone-based",
    fit: "founders taking a prototype to a product",
    bullets: [
      "auth, billing, email and an admin panel.",
      "weekly demos so you always see what's live.",
      "a codebase your next hire can pick up on day one.",
    ],
    featured: true,
  },
  {
    num: "03",
    name: "design retainer",
    time: "monthly",
    pricing: "flat monthly fee",
    fit: "teams with a steady stream of work",
    bullets: [
      "a designer and a developer on call.",
      "launches, experiments and the long tail of small fixes.",
      "pause or cancel any month — no lock-in.",
    ],
  },
];

export default function WaysToWork() {
  return (
    <section id="ways-to-work" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-[15px] font-medium text-[#1c1c1c]">ways to work</h2>
        <p className="text-[14px] leading-[1.6] text-[#888]">
          three ways to team up. not sure which fits? we&apos;ll tell you on the first call.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ways.map((w) => (
          <div
            key={w.num}
            className={`flex flex-col gap-3 rounded-sm p-4 border ${
              w.featured ? "border-[#1c1c1c]" : "border-[#dbd9d1]"
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[13px] text-[#bbb]">{w.num}</span>
              <span className="text-[13px] text-[#888]">{w.time}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold">{w.name}</span>
              <span className="text-[13px] text-[#39B54A]">{w.pricing}</span>
            </div>

            <p className="text-[13px] text-[#888]">best for: {w.fit}</p>

            <ul className="flex flex-col gap-1">
              {w.bullets.map((b, i) => (
                <li key={i} className="text-[14px] leading-[1.6] text-[#444] flex gap-2">
                  <span className="shrink-0 text-[#bbb]">–</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <BookCallButton label="book a call" />
      </div>
    </section>
  );
}
