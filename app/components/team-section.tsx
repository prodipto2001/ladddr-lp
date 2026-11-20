const team = [
  {
    name: "Pradipto",
    handle: "@prodipto2001",
    role: "Desginer",
    location: "India",
    image: "/Team/pradipto.svg",
  },
  {
    name: "Joydeep",
    handle: "@joydeepsignha",
    role: "Full Stack Developer · Blockchain",
    location: "India",
    image: "/Team/joydeepdithered.svg",
  },
  {
    name: "Soumya",
    handle: "@soumyamukherjee",
    role: "Frontend Developer",
    location: "India",
    image: "/Team/soumya.svg",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-6">
      <h2 className="text-[15px] font-medium text-[#1c1c1c]">team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="border border-[#dbd9d1] rounded-sm overflow-hidden flex sm:block"
          >
            {/* Portrait */}
            <div
              className="relative overflow-hidden bg-[#e8e6de] w-28 shrink-0 sm:w-auto"
              style={{ aspectRatio: "3 / 3.5" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center scale-120"
                // style={{ filter: "grayscale(0) contrast(1.2) brightness(1.05)" }}
              />
            </div>

            {/* Info */}
            <div className="p-3 sm:p-2.5 flex flex-col justify-center gap-1 border-l sm:border-l-0 sm:border-t border-[#dbd9d1] min-w-0 flex-1">
              <p className="text-[13px] font-bold text-[#1c1c1c] leading-tight truncate">
                {member.name}
              </p>
              <p className="text-[12px] text-[#888] leading-tight sm:truncate">
                {member.role}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-x-2 pt-0.5">
                <span className="text-[11px] sm:text-[9px] text-[#bbb]">{member.handle}</span>
                <span className="text-[11px] sm:text-[9px] text-[#bbb]">{member.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
