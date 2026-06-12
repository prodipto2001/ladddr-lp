const testimonials = [
  {
    quote:
      "ladddr took our half-baked figma file and turned it into a site that genuinely made our investors ask who built it. fast, sharp, zero hand-holding needed.",
    name: "Arjun Mehta",
    role: "Co-founder, FolioX",
    color: "#39B54A",
  },
  {
    quote:
      "we needed a dashboard that felt as serious as our data. they delivered in 6 weeks — clean code, beautiful ui, and a lighthouse score we now brag about.",
    name: "Priya Nair",
    role: "CTO, Taxocity",
    color: "#d97706",
  },
  {
    quote:
      "honestly thought it would take months. they shipped the whole mvp — auth, billing, everything — in five weeks. the code quality is insane for that timeline.",
    name: "Daniel Osei",
    role: "Founder, Shutttr",
    color: "#059669",
  },
  {
    quote:
      "every revision was fast and on-point. they understand web3 aesthetics without being asked. our community said the new site finally felt like us.",
    name: "0xNadira",
    role: "Lead, 0xCommit",
    color: "#7c3aed",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-6">
      <h2 className="text-[15px] font-medium text-[#1c1c1c]">testimonials</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col justify-between gap-4 border border-[#dbd9d1] rounded-sm p-4"
          >
            <p className="text-[14px] leading-[1.8] text-[#444]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-sm shrink-0"
                style={{ background: t.color }}
              />
              <div>
                <p className="text-[13px] font-semibold text-[#1c1c1c]">{t.name}</p>
                <p className="text-[12px] text-[#888]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
