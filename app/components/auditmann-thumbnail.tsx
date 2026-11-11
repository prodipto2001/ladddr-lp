import Image from "next/image";

export default function AuditmannThumbnail() {
  return (
    <Image
      src="/auditmann-hero.png"
      alt="Auditmann welcome page hero"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
    />
  );
}
