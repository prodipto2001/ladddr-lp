"use client";

let calReady = false;

async function preloadCal() {
  if (calReady) return;
  const { getCalApi } = await import("@calcom/embed-react");
  const cal = await getCalApi({ namespace: "15min" });
  cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
  calReady = true;
}

async function openCal() {
  await preloadCal();
  // data-cal-link handler is registered by getCalApi — click triggers it
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-4"
      onMouseEnter={preloadCal}
    >
      <h2 className="text-[15px] font-medium text-[#1c1c1c]">contact</h2>

      <div className="flex flex-col gap-2 max-w-prose">
        <p className="text-[14px] leading-[1.7] text-[#444]">
          the metaverse is eating the world. choose your builder wisely.
        </p>
        <p className="text-[14px] leading-[1.7] text-[#444]">
          we take on a small number of projects at a time to keep quality high.
          if you&apos;re building something that matters, let&apos;s talk.
        </p>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between gap-4 border-b border-[#dbd9d1] py-2">
          <span className="text-[14px] text-[#888] shrink-0">email</span>
          <a
            href="mailto:hello@ladddr.com"
            className="text-[14px] hover:text-[#39B54A] transition-colors text-right"
          >
            hello@ladddr.com ↗
          </a>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-[#dbd9d1] py-2">
          <span className="text-[14px] text-[#888] shrink-0">book a call</span>
          <button
            data-cal-namespace="15min"
            data-cal-link="shutttr.agency/15min"
            data-cal-config='{"layout":"month_view"}'
            onClick={openCal}
            className="text-[14px] hover:text-[#39B54A] transition-colors text-right bg-transparent border-none p-0 font-[inherit]"
          >
            cal.com/shutttr.agency ↗
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 py-2">
          <span className="text-[14px] text-[#888] shrink-0">response time</span>
          <span className="text-[14px] text-right">within 24h</span>
        </div>
      </div>
    </section>
  );
}
