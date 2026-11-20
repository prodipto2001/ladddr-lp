import Image from "next/image";
import Link from "next/link";
import LazyVideo from "../../components/lazy-video";
import { WORK, WORK_RESULTS } from "../content";
import Reveal from "./reveal";

type Project = (typeof WORK)[number];

const zoom = "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]";

// Every project renders inside the same window frame, so the grid reads as
// one system whether the preview is a screenshot, a video or the fallback.
function Media({ p }: { p: Project }) {
  const meta = WORK_RESULTS[p.id];
  const video = meta?.video === null ? null : p.video;

  let inner;
  if (meta?.image) {
    inner = (
      <Image
        src={meta.image}
        alt={`${p.name} website preview`}
        fill
        sizes="(max-width: 768px) 100vw, 700px"
        className="object-cover object-top"
      />
    );
  } else if (video) {
    inner = <LazyVideo src={video} className="h-full w-full object-cover" />;
  } else {
    inner = (
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-3"
        style={{ background: `linear-gradient(140deg, ${p.color}1a, #fff 70%)` }}
      >
        <span className="text-[clamp(36px,5vw,72px)] font-semibold leading-none tracking-[-0.045em]">
          {p.name}
          <span style={{ color: p.color }}>.</span>
        </span>
        <span className="text-[13px] text-[#6b6b66]">{p.type}</span>
      </div>
    );
  }

  return (
    <div
      className={`aspect-video h-[86%] overflow-hidden rounded-[8px] bg-white shadow-[0_30px_60px_-24px_rgba(28,28,28,0.4),0_0_0_1px_rgba(28,28,28,0.08)] ${zoom}`}
    >
      <div className="relative h-full w-full">{inner}</div>
    </div>
  );
}

function Card({ p, featured }: { p: Project; featured: boolean }) {
  const meta = WORK_RESULTS[p.id];
  return (
    <article className="group relative">
      <Link
        href={`/works/${p.id}`}
        aria-label={`View ${p.name} case study`}
        className="absolute inset-0 z-10 rounded-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1c1c]"
      />
      <div
        className={`flex items-center justify-center overflow-hidden rounded-[10px] ${
          featured ? "aspect-[4/3] md:aspect-[21/10]" : "aspect-[16/10]"
        }`}
        style={{ background: `linear-gradient(160deg, ${p.color}26, ${p.color}0d 55%, #ebe9e1)` }}
      >
        <Media p={p} />
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3
            className={`font-semibold leading-none tracking-[-0.035em] ${
              featured ? "text-[32px] md:text-[44px]" : "text-[26px] md:text-[32px]"
            }`}
          >
            {p.name}
          </h3>
          <p className={`mt-3 leading-[1.4] text-[#444] ${featured ? "max-w-xl text-[17px] md:text-[19px]" : "text-[16px]"}`}>
            {meta.result}
          </p>
          <p className="mt-3 text-[13px] text-[#6b6b66]">
            {p.type} · {p.client} · {meta.weeks}
          </p>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#cfcdc4] text-[16px] text-[#1c1c1c] transition-colors duration-300 group-hover:border-[#39B54A] group-hover:bg-[#39B54A] group-hover:text-white"
          aria-hidden
        >
          <span className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px">↗</span>
        </span>
      </div>
    </article>
  );
}

export default function Work() {
  const [first, ...rest] = WORK;
  return (
    <section id="work" className="scroll-mt-20 border-t border-[#dbd9d1]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-28">
        <Reveal className="text-center">
          <h2 className="text-[clamp(48px,7vw,112px)] font-semibold leading-[0.95] tracking-[-0.045em]">
            Selected work.
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16">
          <Reveal>
            <Card p={first} featured />
          </Reveal>
          <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-y-20">
            {rest.map((p, j) => (
              <Reveal key={p.id} delay={(j % 2) * 0.08}>
                <Card p={p} featured={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
