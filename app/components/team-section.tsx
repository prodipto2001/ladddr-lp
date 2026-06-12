const team = [
  {
    name: "Pradipto",
    handle: "@prodipto2001",
    role: "Desginer",
    location: "India",
    image: "https://ik.imagekit.io/shutttr/Team/pradipto.JPG",
  },
  {
    name: "Joydeep",
    handle: "@joydeepsignha",
    role: "Full Stack Developer · Blockchain",
    location: "India",
    image: "https://ik.imagekit.io/shutttr/Team/joydeep.gif",
  },
  {
    name: "Soumya",
    handle: "@soumyamukherjee",
    role: "Frontend Developer",
    location: "India",
    image: "https://ik.imagekit.io/shutttr/Team/soumya.jpg",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-6">
      <h2 className="text-[15px] font-medium text-[#1c1c1c]">team</h2>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="border border-[#dbd9d1] rounded-sm overflow-hidden"
          >
            {/* Portrait */}
            <div
              className="relative overflow-hidden bg-[#e8e6de]"
              style={{ aspectRatio: "3 / 3.5" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center scale-120"
                style={{ filter: "grayscale(1) contrast(1.2) brightness(1.05)" }}
              />
            </div>

            {/* Info */}
            <div className="p-2.5 flex flex-col gap-1 border-t border-[#dbd9d1]">
              <p className="text-[13px] font-bold text-[#1c1c1c] leading-tight truncate">
                {member.name}
              </p>
              <p className="text-[12px] text-[#888] leading-tight truncate">
                {member.role}
              </p>
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-[9px] text-[#bbb]">{member.handle}</span>
                <span className="text-[9px] text-[#bbb]">{member.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
