import LazyVideo from "./lazy-video";

const works = [
  {
    id: "foliox",
    name: "FolioX",
    client: "portfolio platform startup",
    color: "#39B54A",
    type: "product design + development",
    date: "03.2025 – present",
    video: "https://ik.imagekit.io/shutttr/Works/foliox.mp4",
    bullets: [
      "designed and built a creator portfolio platform with custom subdomain routing.",
      "implemented drag-and-drop layout editor with real-time preview in next.js 15.",
      "achieved 99 lighthouse score with optimistic UI and edge-cached static pages.",
    ],
    tags: ["next.js", "typescript", "tailwind", "framer-motion", "figma", "prisma"],
  },
  {
    id: "taxocity",
    name: "Taxocity",
    client: "fintech startup",
    color: "#d97706",
    type: "dashboard ui design + build",
    date: "01.2025 – 03.2025",
    video: "https://ik.imagekit.io/shutttr/Works/taxocity.mp4",
    bullets: [
      "designed end-to-end tax filing dashboard with multi-step form flows in figma.",
      "built the full frontend with tanstack query, zustand, and recharts data viz.",
      "integrated stripe billing and resend transactional emails from scratch.",
    ],
    tags: ["next.js", "typescript", "recharts", "zustand", "stripe", "resend"],
  },
  {
    id: "0xcommit",
    name: "0xCommit",
    client: "web3 dev tooling team",
    color: "#7c3aed",
    type: "brand + landing page",
    date: "11.2024 – 01.2025",
    video: "https://ik.imagekit.io/shutttr/Works/0xCommit.mp4",
    bullets: [
      "rebuilt marketing site for an on-chain git protocol — from 54 to 99 lighthouse.",
      "designed visual identity, icon set, and motion system from scratch in figma.",
      "implemented command palette, animated code blocks, and wallet-connect flow.",
    ],
    tags: ["next.js", "typescript", "tailwind", "framer-motion", "wagmi", "figma"],
  },
  {
    id: "shutttr",
    name: "Shutttr",
    client: "b2b saas founder",
    color: "#059669",
    type: "end-to-end mvp",
    date: "09.2024 – 11.2024",
    video: "https://ik.imagekit.io/shutttr/Works/shutttr.mp4",
    bullets: [
      "took a shuttle booking saas from figma prototype to shipped mvp in 5 weeks.",
      "built auth, real-time seat map, stripe checkout, and driver admin panel.",
      "zero critical bugs at launch — full qa pass across browser, mobile, and a11y.",
    ],
    tags: ["next.js", "prisma", "postgres", "stripe", "shadcn", "resend"],
  },
];

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
        {works.map((w) => (
          <div key={w.id} id={w.id} className="flex flex-col gap-3 scroll-mt-12">

            {/* Video preview */}
            <div className="border border-[#dbd9d1] rounded-sm overflow-hidden bg-[#f0eeea] aspect-video relative">
              <LazyVideo src={w.video} className="w-full h-full object-cover" />
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ background: w.color }}
                />
                <span className="text-[15px] font-semibold">{w.name}</span>
                <span className="text-[13px] text-[#888]">↗</span>
              </div>
              <span className="text-[13px] text-[#888] shrink-0">{w.date}</span>
            </div>

            {/* Sub-type */}
            <p className="text-[13px] text-[#888]">{w.type} · {w.client}</p>

            {/* Bullets */}
            <ul className="flex flex-col gap-1">
              {w.bullets.map((b, i) => (
                <li key={i} className="text-[14px] leading-[1.6] text-[#444] flex gap-2">
                  <span className="shrink-0 text-[#bbb]">–</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {w.tags.map((t) => <Tag key={t} label={t} />)}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
