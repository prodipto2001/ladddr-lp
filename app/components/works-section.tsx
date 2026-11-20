import Link from "next/link";
import Image from "next/image";
import LazyVideo from "./lazy-video";
import AuditmannThumbnail from "./auditmann-thumbnail";
import { projects } from "../data/projects";

function Tag({ label }: { label: string }) {
  return (
    <span className="text-[12px] px-1.5 py-0.5 bg-[#e8e6de] text-[#555] rounded-sm">
      {label}
    </span>
  );
}

export default function WorksSection() {
  return (
    <section id="works" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-6">
      <h2 className="text-[15px] font-medium text-[#1c1c1c]">works</h2>

      <div className="flex flex-col gap-14 md:gap-20">
        {projects.map((project, index) => (
          <article
            key={project.id}
            id={project.id}
            className="group relative flex flex-col gap-4 md:gap-5 scroll-mt-14"
          >
            <Link
              href={`/works/${project.id}`}
              aria-label={`View ${project.name} case study`}
              className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1c1c]"
            />
            <div className="pointer-events-none border border-[#dbd9d1] rounded-sm overflow-hidden bg-[#f0eeea] aspect-[16/10] md:aspect-[16/9] relative">
              {project.id === "taxocity" ? (
                <Image
                  src="/taxocity-thumbnail.png"
                  alt="TaxoCity website preview"
                  fill
                  sizes="100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : project.video ? (
                <LazyVideo src={project.video} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              ) : project.id === "auditmann" ? (
                <AuditmannThumbnail />
              ) : (
                <div className="w-full h-full flex flex-col justify-between p-4 md:p-7 transition-transform duration-500 group-hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, ${project.color}22, #efeee8 68%)` }}>
                  <div className="flex justify-between items-start text-[11px] text-[#777] uppercase tracking-[0.12em]"><span>{project.client}</span><span>01 / 01</span></div>
                  <div><p className="text-[12px] text-[#777] mb-1">{project.type}</p><p className="text-3xl md:text-5xl tracking-[-0.07em] font-medium">{project.name}<span style={{ color: project.color }}>.</span></p></div>
                  <p className="text-[12px] text-[#777]">welcome / product experience</p>
                </div>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name} live site in a new tab`}
                  className="pointer-events-auto absolute bottom-2 right-2 md:bottom-3 md:right-3 z-20 md:translate-y-1 border border-[#dbd9d1] bg-[#f5f4ef] px-3 py-2 text-[12px] text-[#1c1c1c] md:opacity-0 transition-all duration-200 md:group-hover:translate-y-0 md:group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 hover:bg-white"
                >
                  open live site ↗
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4 md:gap-10">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] text-[#888] tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: project.color }} />
                  <h3 className="text-2xl md:text-3xl tracking-[-0.04em] font-medium">{project.name}</h3>
                  <span className="text-[15px] text-[#888] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </div>
                <p className="text-[13px] text-[#888]">{project.type} · {project.client} · {project.date}</p>
              </div>

              <div className="flex flex-col gap-3">
                <ul className="flex flex-col gap-1">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="text-[14px] leading-[1.6] text-[#444] flex gap-2">
                      <span className="shrink-0 text-[#bbb]">–</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => <Tag key={tag} label={tag} />)}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
