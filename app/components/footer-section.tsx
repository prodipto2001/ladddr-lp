import LDRLogo from "./ldr-logo";

export default function FooterSection() {
  return (
    <footer className="bg-[#f5f4ef] overflow-hidden border-t border-[#dbd9d1]">
      <div className="py-6 px-4">
        <LDRLogo />
      </div>
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-t border-[#dbd9d1]">
        <p className="text-[12px] text-[#bbb]">© 2025 ladddr. all rights reserved.</p>
        <p className="text-[12px] text-[#bbb]">made with love.</p>
      </div>
    </footer>
  );
}
