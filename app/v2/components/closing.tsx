import { CLOSING, EMAIL, CAL } from "../content";
import BookCall from "./cta";
import LDRLogo from "../../components/ldr-logo";
import Reveal from "./reveal";

export default function Closing() {
  return (
    <footer id="contact" className="border-t border-[#dbd9d1]">
      <div>
        <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-28">
          <Reveal>
            <h2 className="text-center text-[clamp(48px,9vw,150px)] font-semibold leading-[0.95] tracking-[-0.045em]">
              Ready to talk.
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col items-center gap-8 text-center md:mt-14">
            <Reveal delay={0.06}>
              <p className="mx-auto max-w-xl text-[18px] leading-[1.45] text-[#444] md:text-[22px]">{CLOSING.body}</p>
            </Reveal>
            <div className="flex w-full flex-col items-center gap-8 md:flex-row md:justify-between">
            <Reveal delay={0.06} className="md:text-left">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-block text-[clamp(22px,3vw,40px)] font-semibold tracking-[-0.03em] underline decoration-[#dbd9d1] decoration-2 underline-offset-8 transition-colors hover:decoration-[#39B54A]"
              >
                {EMAIL}
              </a>
              <p className="mt-4 text-[13px] text-[#6b6b66]">
                {CLOSING.response} · {CAL.display}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <BookCall label="Book a 15-min call" />
            </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-20">
          <LDRLogo className="w-full select-none" />
        </div>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 text-[13px] text-[#6b6b66] md:px-10">
          <p>© {new Date().getFullYear()} ladddr. All rights reserved.</p>
          <a href="#top" className="transition-colors hover:text-[#1c1c1c]">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
