const team = [
  {
    name: "Prodipto Singha",
    handle: "@prodipto2001",
    role: "Founder · Full-stack Dev",
    location: "India",
    image: "https://ik.imagekit.io/shutttr/Team/prodipto.jpg",
  },
  {
    name: "Team Member",
    handle: "@handle",
    role: "UI/UX Designer",
    location: "India",
    image: "https://ik.imagekit.io/shutttr/Team/member2.jpg",
  },
  {
    name: "Team Member",
    handle: "@handle",
    role: "UI/UX Designer",
    location: "India",
    image: "https://ik.imagekit.io/shutttr/Team/member2.jpg",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="bg-[#f5f4ef] p-4 md:p-6 flex flex-col gap-6">
      <h2 className="text-[15px] font-medium text-[#1c1c1c]">team</h2>

      <div className="flex gap-3 md:gap-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="w-36 md:w-44 shrink-0 border border-[#dbd9d1] rounded-sm overflow-hidden"
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
                className="w-full h-full object-cover object-top"
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
