import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LazyVideo from "../../components/lazy-video";
import { projects, type Project } from "../../data/projects";
import { WORK_RESULTS } from "../../v2/content";
import BookCall from "../../v2/components/cta";
import Closing from "../../v2/components/closing";
import Reveal from "../../v2/components/reveal";
import Section from "../../v2/components/section";

export function generateStaticParams() {
  return projects.map(({ id }) => ({ project: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ project: string }> }) {
  const { project: projectId } = await params;
  const project = projects.find(({ id }) => id === projectId);
  if (!project) return {};
  return {
    title: `${project.name} — case study | ladddr.`,
    description: WORK_RESULTS[project.id]?.result ?? project.challenge,
  };
}

// Same window frame as the v2 work grid: screenshot, video or designed fallback.
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
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
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
        <span className="text-[clamp(36px,6vw,96px)] font-semibold leading-none tracking-[-0.045em]">
          {p.name}
          <span style={{ color: p.color }}>.</span>
        </span>
        <span className="text-[13px] text-[#6b6b66]">{p.type}</span>
      </div>
    );
  }

  return (
    <div
      className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[10px] md:aspect-[21/10]"
      style={{ background: `linear-gradient(160deg, ${p.color}26, ${p.color}0d 55%, #ebe9e1)` }}
    >
      <div className="aspect-video h-[86%] overflow-hidden rounded-[8px] bg-white shadow-[0_30px_60px_-24px_rgba(28,28,28,0.4),0_0_0_1px_rgba(28,28,28,0.08)]">
        <div className="relative h-full w-full">{inner}</div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[#dbd9d1] pt-4">
      <dt className="text-[13px] text-[#6b6b66]">{label}</dt>
      <dd className="mt-1.5 text-[17px] font-medium tracking-[-0.01em] md:text-[19px]">{value}</dd>
    </div>
  );
}

const lead = "text-[20px] leading-[1.45] text-[#444] md:text-[26px] md:leading-[1.4]";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: projectId } = await params;
  const index = projects.findIndex(({ id }) => id === projectId);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const meta = WORK_RESULTS[project.id];

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-4">
        <div className="pointer-events-auto flex w-[calc(100vw-2rem)] items-center justify-between overflow-hidden rounded-[28px] border border-[#dbd9d1] bg-[#f5f4ef] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] md:w-auto md:gap-6">
          <Link href="/v2" className="flex items-center gap-2.5 py-2 pl-4 pr-3">
            <Image src="/LDR_Logo.svg" alt="" width={20} height={20} priority />
            <span className="text-[15px] font-semibold tracking-tight">ladddr.</span>
          </Link>
          <Link
            href="/v2#work"
            className="hidden rounded-full px-3.5 py-1.5 text-[14px] text-[#6b6b66] transition-colors hover:bg-[#e8e6de] hover:text-[#1c1c1c] md:block"
          >
            ← All work
          </Link>
          <div className="shrink-0 whitespace-nowrap py-1.5 pl-2 pr-1.5">
            <BookCall label="Let's talk" className="!whitespace-nowrap !px-4 !py-2 !text-[14px]" />
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
          <Reveal>
            <Link
              href="/v2#work"
              className="inline-flex items-center gap-2 text-[14px] text-[#6b6b66] transition-colors hover:text-[#1c1c1c] md:hidden"
            >
              ← All work
            </Link>
            <p className="mt-6 flex items-center gap-2.5 text-[14px] text-[#6b6b66] md:mt-0">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: project.color }} />
              Case study · {project.client}
            </p>
            <h1 className="mt-5 text-[clamp(56px,11vw,190px)] font-semibold leading-[0.92] tracking-[-0.05em]">
              {project.name}
              <span style={{ color: project.color }}>.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 max-w-3xl text-[22px] leading-[1.35] text-[#444] md:mt-10 md:text-[32px]">
              {meta?.result ?? project.outcome}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-16 md:grid-cols-4 md:gap-x-8">
              <Fact label="Client" value={project.client} />
              <Fact label="Scope" value={project.type} />
              <Fact label="Timeline" value={meta?.weeks ?? project.duration} />
              <Fact label="Dates" value={project.date} />
            </dl>
          </Reveal>
        </section>

        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal>
            <Media p={project} />
          </Reveal>
          {project.liveUrl && (
            <Reveal className="mt-5 flex justify-end">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-medium underline decoration-[#dbd9d1] decoration-2 underline-offset-6 transition-colors hover:decoration-[#39B54A]"
              >
                Visit the live project ↗
              </a>
            </Reveal>
          )}
        </div>

        <div className="mt-16 md:mt-28">
          <Section id="challenge" title="The challenge.">
            <Reveal>
              <p className={lead}>{project.challenge}</p>
            </Reveal>
          </Section>

          <Section id="approach" title="What we did.">
            <Reveal>
              <p className={lead}>{project.approach}</p>
            </Reveal>
            <ol className="mt-10 border-b border-[#dbd9d1] md:mt-14">
              {project.bullets.map((bullet, i) => (
                <li key={bullet}>
                  <Reveal delay={i * 0.06}>
                    <div className="grid grid-cols-[3rem_1fr] gap-4 border-t border-[#dbd9d1] py-5 md:grid-cols-[4rem_1fr] md:py-6">
                      <span className="pt-1 text-[14px] text-[#6b6b66]">0{i + 1}</span>
                      <span className="text-[18px] leading-[1.45] md:text-[22px]">{bullet}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal>
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[#cfcdc4] px-3.5 py-1.5 text-[13px] text-[#444]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Section>

          <Section id="outcome" title="The outcome.">
            <Reveal>
              <p className="text-[28px] font-semibold leading-[1.2] tracking-[-0.025em] md:text-[44px]">
                {project.outcome}
              </p>
            </Reveal>
          </Section>
        </div>

        <section className="border-t border-[#dbd9d1]">
          <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
            <Reveal>
              <Link href={`/works/${next.id}`} className="group flex items-end justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-[14px] text-[#6b6b66]">Next case study</p>
                  <p className="mt-3 text-[clamp(40px,7vw,112px)] font-semibold leading-[0.95] tracking-[-0.045em]">
                    {next.name}
                    <span style={{ color: next.color }}>.</span>
                  </p>
                </div>
                <span
                  className="mb-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#cfcdc4] text-[18px] transition-colors duration-300 group-hover:border-[#39B54A] group-hover:bg-[#39B54A] group-hover:text-white md:h-14 md:w-14"
                  aria-hidden
                >
                  <span className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px">↗</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Closing />
    </>
  );
}
