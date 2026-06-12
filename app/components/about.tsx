export default function About() {
  return (
    <section id="about" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-4">
      {/* Name + role */}
      <div>
        <h1 className="text-[18px] font-bold tracking-tight">ladddr.</h1>
        <p className="text-[14px] text-[#888] mt-0.5">web3 design + development agency</p>
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2 max-w-full">
        <p className="text-[14px] leading-[1.7] text-[#444]">
          hey, we&apos;re a design-first agency with fullstack capability — building polished
          interfaces with react, next.js and typescript. 3 years shipping products that
          actually work.
        </p>
        <p className="text-[14px] leading-[1.7] text-[#444]">
          we focus on performance and user experience with pixel-perfect execution and
          strong attention to small details. we prioritize resilient code and thoughtful
          interactions that make interfaces feel effortless and alive.
        </p>
      </div>

      {/* Stats row */}
      <div className="flex gap-6 pt-1">
        {[
          { value: "30+", label: "projects shipped" },
          { value: "3yr",  label: "in business" },
          { value: "99",   label: "lighthouse avg" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-[14px] font-bold">{s.value}</p>
            <p className="text-[13px] text-[#888]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* CTA links */}
      <div className="flex gap-3 pt-1">
        <a
          href="#contact"
          className="text-[14px] px-3 py-1 rounded-sm text-white transition-colors"
          style={{ background: "#1a5c27" }}
        >
          book a call ↗
        </a>
        <a
          href="#works"
          className="text-[14px] text-[#888] hover:text-[#1c1c1c] transition-colors py-1"
        >
          see works →
        </a>
      </div>
    </section>
  );
}
