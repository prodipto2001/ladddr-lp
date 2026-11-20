import { SPRINT } from "../content";
import BookCall from "./cta";
import Reveal from "./reveal";
import Section from "./section";
import SprintTimeline from "./sprint-timeline";

export default function Sprint() {
  return (
    <Section id="sprint" dark title={<>The<br />sprint.</>}>
      <Reveal>
        <p className="max-w-2xl text-[20px] leading-[1.4] md:text-[26px]">{SPRINT.intro}</p>
      </Reveal>

      <div className="mt-12 border-t border-[#3a3a3a] md:mt-16">
        <SprintTimeline />
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <h3 className="mb-4 text-[14px] text-[#8a8a85]">Included</h3>
          <ul className="flex flex-col gap-2.5">
            {SPRINT.includes.map((t) => (
              <li key={t} className="text-[16px] md:text-[17px]">{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.06}>
          <h3 className="mb-4 text-[14px] text-[#8a8a85]">Not included</h3>
          <ul className="flex flex-col gap-2.5">
            {SPRINT.excludes.map((t) => (
              <li key={t} className="text-[16px] text-[#b5b3ab] md:text-[17px]">{t}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-[#3a3a3a] pt-8 md:mt-16">
        <p className="text-[clamp(28px,3.6vw,52px)] font-semibold leading-none tracking-[-0.03em]">{SPRINT.price}</p>
        <BookCall label="Plan your sprint" variant="cream" />
      </div>
    </Section>
  );
}
