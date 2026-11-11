import Link from "next/link";
import { notFound } from "next/navigation";
import LazyVideo from "../../components/lazy-video";
import { projects } from "../../data/projects";

export function generateStaticParams() {
  return projects.map(({ id }) => ({ project: id }));
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.12em] text-[#888]">{children}</p>;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: projectId } = await params;
  const project = projects.find(({ id }) => id === projectId);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#f5f4ef]">
      <div className="mx-auto max-w-[1440px] min-h-screen border-x border-[#dbd9d1]">
        <header className="flex items-center justify-between border-b border-[#dbd9d1] px-4 py-4 md:px-8">
          <Link href="/#works" className="text-[13px] text-[#666] hover:text-[#1c1c1c] transition-colors">
            ← all projects
          </Link>
          <span className="text-[12px] text-[#888]">ladddr. / case study</span>
        </header>

        <div className="p-4 md:p-8 flex flex-col gap-4 md:gap-5">
          <section className="border border-[#dbd9d1] bg-[#efeee8] p-5 md:p-9 flex flex-col gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-[13px] text-[#777]">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: project.color }} />
              {project.client}
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-[12px] text-[#888] mb-2">{project.type}</p>
                <h1 className="text-4xl md:text-7xl font-medium tracking-[-0.06em]">{project.name}<span style={{ color: project.color }}>.</span></h1>
              </div>
              <div className="md:text-right">
                <Label>project duration</Label>
                <p className="text-[16px] mt-1">{project.duration}</p>
                <p className="text-[12px] text-[#888] mt-1">{project.date}</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-4" aria-label={`${project.name} project details`}>
            <div className="md:col-span-8 border border-[#dbd9d1] bg-[#efeee8] overflow-hidden aspect-video">
              {project.video ? (
                <LazyVideo src={project.video} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col justify-between p-6 md:p-10" style={{ background: `linear-gradient(135deg, ${project.color}22, #efeee8 68%)` }}>
                  <div className="flex justify-between text-[11px] text-[#777] uppercase tracking-[0.12em]"><span>{project.client}</span><span>live project</span></div>
                  <p className="text-5xl md:text-8xl tracking-[-0.07em] font-medium">{project.name}<span style={{ color: project.color }}>.</span></p>
                  <a href={project.liveUrl ?? undefined} target="_blank" rel="noreferrer" className="text-[13px] underline underline-offset-4">open welcome page ↗</a>
                </div>
              )}
            </div>

            <div className="md:col-span-4 border border-[#dbd9d1] p-5 md:p-6 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <Label>what we did</Label>
                <h2 className="text-2xl leading-tight tracking-[-0.04em]">From first idea to a product people can use.</h2>
                <ul className="flex flex-col gap-3 pt-2">
                  {project.bullets.map((bullet, index) => (
                    <li key={bullet} className="flex gap-3 text-[13px] leading-relaxed text-[#555]">
                      <span className="text-[#aaa]">0{index + 1}</span><span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 border border-[#dbd9d1] text-[11px] text-[#666]">{tag}</span>
                ))}
              </div>
            </div>

            <article className="md:col-span-5 border border-[#dbd9d1] p-5 md:p-7 flex flex-col gap-4">
              <Label>01 / the challenge</Label>
              <h2 className="text-2xl md:text-3xl tracking-[-0.05em]">A clear problem to solve.</h2>
              <p className="text-[14px] leading-[1.8] text-[#555]">{project.challenge}</p>
            </article>

            <article className="md:col-span-4 border border-[#dbd9d1] p-5 md:p-7 flex flex-col gap-4 bg-[#eae9e2]">
              <Label>02 / what we did</Label>
              <h2 className="text-2xl md:text-3xl tracking-[-0.05em]">Design, then build.</h2>
              <p className="text-[14px] leading-[1.8] text-[#555]">{project.approach}</p>
            </article>

            <article className="md:col-span-3 border border-[#dbd9d1] p-5 md:p-7 flex flex-col gap-4" style={{ borderTopColor: project.color, borderTopWidth: 3 }}>
              <Label>03 / the outcome</Label>
              <h2 className="text-2xl md:text-3xl tracking-[-0.05em]">Shipped for impact.</h2>
              <p className="text-[14px] leading-[1.8] text-[#555]">{project.outcome}</p>
            </article>

            <div className="md:col-span-12 border border-[#dbd9d1] px-5 py-4 md:px-7 flex items-center justify-between gap-4">
              <span className="text-[13px] text-[#888]">have a project in mind?</span>
              <Link href="/#contact" className="text-[13px] hover:opacity-60 transition-opacity">let’s talk ↗</Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
