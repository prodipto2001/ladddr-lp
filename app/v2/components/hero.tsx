import { HERO, STATS } from "../content";
import BookCall from "./cta";
import Showreel from "./showreel";
import Reveal from "./reveal";
import StatCounter from "./stat-counter";

export default function Hero() {
  return (
    <>
    <section id="top" className="mx-auto max-w-[1440px] px-5 pb-12 pt-28 md:px-10 md:pb-20 md:pt-40">
      <Reveal>
        <h1 className="text-[clamp(44px,7.6vw,124px)] font-semibold leading-[0.95] tracking-[-0.045em]">
          {HERO.lines[0]}
          <br className="hidden md:block" /> {HERO.lines[1]}
          <br className="hidden md:block" /> <span className="text-[#39B54A]">{HERO.accent}</span>
        </h1>
      </Reveal>

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
        <Reveal delay={0.08} className="md:col-span-7">
          <p className="max-w-xl text-[18px] leading-[1.45] text-[#444] md:text-[22px]">{HERO.sub}</p>
          <p className="mt-3 text-[13px] text-[#6b6b66]">{HERO.note}</p>
        </Reveal>
        <Reveal delay={0.14} className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <BookCall label="Book a 15-min call" />
          <a
            href="#work"
            className="inline-flex items-center rounded-full border border-[#1c1c1c] px-6 py-3.5 text-[15px] font-medium transition-colors hover:bg-[#1c1c1c] hover:text-[#f5f4ef]"
          >
            See the work
          </a>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-14 md:mt-20">
        <Showreel />
      </Reveal>
    </section>

    {/* Stats band: full-bleed top rule (the Work section supplies the bottom
        one), dividers run the band's full height, no dead space below. */}
    <div className="border-t border-[#dbd9d1]">
      <dl className="mx-auto grid max-w-[1440px] grid-cols-3 px-5 md:px-10">
        {STATS.map((s) => {
          const [, num, suffix] = s.value.match(/^(\d+)(.*)$/) ?? [, s.value, ""];
          return (
            <div
              key={s.label}
              className="flex min-w-0 flex-col-reverse items-center justify-end text-center border-l border-[#dbd9d1] px-2 py-8 first:border-l-0 sm:items-start sm:px-0 sm:pl-6 sm:text-left sm:first:pl-0 md:py-14 md:pl-10"
            >
              <dt className="mt-3 text-balance break-words text-[12px] leading-snug text-[#6b6b66] sm:text-[13px] md:mt-4 md:text-[16px]">{s.label}</dt>
              <dd className="text-[clamp(38px,10vw,160px)] font-semibold leading-[0.85] tracking-[-0.055em]">
                {/^\d+$/.test(num) ? <StatCounter to={Number(num)} /> : num}
                <span className="text-[#39B54A]">{suffix}</span>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
    </>
  );
}
