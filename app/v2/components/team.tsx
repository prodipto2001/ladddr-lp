import { TEAM } from "../content";
import Section from "./section";
import Reveal from "./reveal";
import MemberLinks from "./member-links";

// Editorial roster: one row per person, portrait + oversized name,
// with a quiet hover state that lifts the row and tints the portrait.
export default function Team() {
  return (
    <Section id="team" title={<>The<br />team.</>}>
      <p className="max-w-md text-[16px] leading-[1.5] text-[#444] md:text-[18px]">
        Three people, no account managers. The ones you meet on the first call are the ones who build it.
      </p>

      <ul className="mt-10 border-t border-[#dbd9d1] md:mt-14">
        {TEAM.map((m, i) => (
          <li key={m.name} className="border-b border-[#dbd9d1]">
            <Reveal delay={i * 0.08}>
              <div className="group grid grid-cols-[88px_1fr] items-center gap-x-5 gap-y-3 py-6 transition-colors duration-300 hover:bg-[#ebe9e1]/60 md:grid-cols-[48px_160px_1fr_auto] md:gap-x-8 md:px-4 md:py-8">
                <span className="hidden text-[13px] tabular-nums text-[#6b6b66] md:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative aspect-square overflow-hidden rounded-xl border border-[#dbd9d1] bg-[#e8e6de] md:aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full scale-[1.2] object-cover object-center grayscale transition duration-500 group-hover:scale-[1.28] group-hover:grayscale-0"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[clamp(28px,3.6vw,56px)] font-semibold leading-[1] tracking-[-0.035em]">
                    {m.name}
                  </h3>
                  <p className="mt-2 text-[15px] text-[#444] md:text-[17px]">{m.role}</p>
                </div>

                <div className="col-span-2 flex items-center justify-between gap-4 text-[13px] text-[#6b6b66] md:col-span-1 md:flex-col md:items-end md:gap-2">
                  <span className="rounded-full border border-[#dbd9d1] px-3 py-1">{m.location}</span>
                  <MemberLinks name={m.name} twitter={m.twitter} linkedin={m.linkedin} email={m.email} />
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
