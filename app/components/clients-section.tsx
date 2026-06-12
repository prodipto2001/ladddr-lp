import Image from "next/image";

const logos = [
  { src: "/Client-logos/FolioX.png",    alt: "FolioX",     width: 80, height: 26 },
  { src: "/Client-logos/Stakeease.png", alt: "StakeEase",  width: 88, height: 26 },
  { src: "/Client-logos/Nitro.png",     alt: "Nitro",      width: 48, height: 24 },
];

const TRACK = [...logos, ...logos, ...logos, ...logos];

export default function ClientsSection() {
  return (
    <section id="clients" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-4">
      <h2 className="text-[15px] font-medium text-[#1c1c1c]">clients</h2>
      <p className="text-[13px] text-[#888]">
        trusted by early-stage startups and the founders building the next thing.
      </p>

      <div className="overflow-hidden mt-1">
        <div className="flex gap-10 animate-marquee w-max items-center">
          {TRACK.map((logo, i) => (
            <div key={i} className="shrink-0 flex items-center h-8 opacity-60 hover:opacity-100 transition-opacity">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
