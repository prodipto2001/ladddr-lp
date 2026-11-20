import DarkBackdrop from "./dark-backdrop";
import Reveal from "./reveal";

// Editorial two-column section: sticky title on the left, content on the right.
export default function Section({
  id,
  title,
  dark = false,
  noBorder = false,
  center = false,
  children,
}: {
  id: string;
  title: React.ReactNode;
  dark?: boolean;
  noBorder?: boolean;
  center?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${dark ? "relative text-[#f5f4ef]" : noBorder ? "" : "border-t border-[#dbd9d1]"}`}>
      {dark && <DarkBackdrop />}
      <div
        className={`relative mx-auto grid gap-10 px-5 py-16 md:px-10 md:py-28 ${
          center ? "max-w-[960px] text-center" : "max-w-[1440px] md:grid-cols-12 md:gap-8"
        }`}
      >
        <div className={center ? "" : "md:col-span-4"}>
          <Reveal className={center ? "" : "md:sticky md:top-28"}>
            <h2 className="text-[clamp(40px,5.2vw,92px)] font-semibold leading-[0.95] tracking-[-0.04em]">{title}</h2>
          </Reveal>
        </div>
        <div className={center ? "" : "md:col-span-8"}>{children}</div>
      </div>
    </section>
  );
}
