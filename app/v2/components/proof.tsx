import { TESTIMONIALS } from "../content";
import Section from "./section";
import Reveal from "./reveal";

type Testimonial = (typeof TESTIMONIALS)[number];

function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111] text-[14px] font-medium text-[#f5f4ef]"
    >
      {name.charAt(0)}
    </span>
  );
}

function Attribution({ t }: { t: Testimonial }) {
  return (
    <figcaption className="flex items-center gap-3 text-[14px]">
      <Avatar name={t.name} />
      <span>
        <span className="block font-medium">{t.name}</span>
        <span className="block text-[#6b6b66]">
          {t.role}, {t.company}
        </span>
      </span>
    </figcaption>
  );
}

export default function Proof() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <Section id="proof" title={<>What the<br />client says.</>}>
      <div className="space-y-10 md:space-y-14">
        <Reveal>
          <figure>
            <span aria-hidden className="block text-[72px] font-semibold leading-[0.6] text-[#c9c7bd] md:text-[96px]">
              &ldquo;
            </span>
            <blockquote className="mt-4 max-w-3xl text-[26px] font-medium leading-[1.2] tracking-[-0.025em] md:text-[40px]">
              {featured.quote}
            </blockquote>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <Attribution t={featured} />
              <span className="rounded-full border border-[#dbd9d1] px-3 py-1 text-[13px] text-[#6b6b66]">
                {featured.outcome}
              </span>
            </div>
          </figure>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal key={t.company} delay={i * 0.1}>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-[#dbd9d1] p-6 md:p-8">
                <blockquote className="text-[18px] font-medium leading-[1.35] tracking-[-0.015em] md:text-[20px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="space-y-4">
                  <Attribution t={t} />
                  <span className="inline-block rounded-full bg-[#ebe9e1] px-3 py-1 text-[13px] text-[#4a4a46]">
                    {t.outcome}
                  </span>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
