import Link from "next/link";
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className="group relative flex flex-col gap-3 scroll-mt-12"
          >
            <Link
              href={`/works/${project.id}`}
              aria-label={`View ${project.name} case study`}
              className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c1c1c]"
            />
            <div className="pointer-events-none border border-[#dbd9d1] rounded-sm overflow-hidden bg-[#f0eeea] aspect-video relative">
              {project.video ? (
                <LazyVideo src={project.video} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              ) : project.id === "auditmann" ? (
                <AuditmannThumbnail />
              ) : (
                <div className="w-full h-full flex flex-col justify-between p-5 md:p-7 transition-transform duration-500 group-hover:scale-[1.02]" style={{ background: `linear-gradient(135deg, ${project.color}22, #efeee8 68%)` }}>
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
                  className="pointer-events-auto absolute bottom-3 right-3 z-20 translate-y-1 border border-[#dbd9d1] bg-[#f5f4ef] px-3 py-2 text-[12px] text-[#1c1c1c] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 hover:bg-white"
                >
                  open live site ↗
                </a>
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: project.color }} />
                <span className="text-[15px] font-semibold">{project.name}</span>
                <span className="text-[13px] text-[#888]">↗</span>
              </div>
              <span className="text-[13px] text-[#888] shrink-0">{project.date}</span>
            </div>

            <p className="text-[13px] text-[#888]">{project.type} · {project.client}</p>

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
          </article>
        ))}
      </div>
    </section>
  );
}
