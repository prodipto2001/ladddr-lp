"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV = [
  { label: "about",    href: "#about" },
  {
    label: "works",
    href: "#works",
    children: [
      { label: "FolioX",   href: "#foliox",   color: "#39B54A" },
      { label: "Taxocity", href: "#taxocity", color: "#d97706" },
      { label: "0xCommit", href: "#0xcommit", color: "#7c3aed" },
      { label: "Shutttr",  href: "#shutttr",  color: "#059669" },
    ],
  },
  { label: "services", href: "#services" },
  { label: "process",  href: "#process" },
  { label: "clients",      href: "#clients" },
  { label: "testimonials", href: "#testimonials" },
  { label: "team",         href: "#team" },
  { label: "contact",      href: "#contact" },
];

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; color: string }[];
};

function NavContent({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-6">
        <div>
          <Image src="/LDR_Logo.svg" alt="ladddr" width={64} height={64} />
          <p className="text-[13px] text-[#888] leading-snug mt-1.5">
            design first.<br />development studio.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-[13px] text-[#888]">available for projects</span>
        </div>

        <nav className="flex flex-col gap-0.5">
          {(NAV as NavItem[]).map((item) => (
            <div key={item.label}>
              <a
                href={item.href}
                onClick={onLinkClick}
                className="text-[14px] text-[#888] hover:text-[#1c1c1c] transition-colors py-1 block"
              >
                {item.label}
              </a>
              {item.children && (
                <div className="flex flex-col gap-0.5 ml-3 mb-1 border-l border-[#dbd9d1] pl-2.5">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      onClick={onLinkClick}
                      className="text-[13px] text-[#aaa] hover:text-[#1c1c1c] transition-colors py-0.5 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ background: child.color }} />
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <a href="#" className="text-[13px] text-[#888] hover:text-[#1c1c1c] transition-colors">twitter ↗</a>
          <a href="#" className="text-[13px] text-[#888] hover:text-[#1c1c1c] transition-colors">instagram ↗</a>
          <a href="#" className="text-[13px] text-[#888] hover:text-[#1c1c1c] transition-colors">linkedin ↗</a>
        </div>
        <p className="text-[13px] text-[#888] break-all">hello@ladddr.com</p>
      </div>
    </div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col gap-[5px] w-5">
      <span
        className={`block h-px w-full bg-[#1c1c1c] transition-all duration-250 origin-center ${
          open ? "rotate-45 translate-y-[6px]" : ""
        }`}
      />
      <span
        className={`block h-px w-full bg-[#1c1c1c] transition-all duration-250 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-px bg-[#1c1c1c] transition-all duration-250 origin-center ${
          open ? "-rotate-45 -translate-y-[6px] w-full" : "w-3.5"
        }`}
      />
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col max-w-[20vw] w-full shrink-0 border-r border-[#dbd9d1] sticky top-0 h-screen p-5 overflow-hidden bg-[#f5f4ef]">
        <NavContent />
      </aside>

      {/* ── Mobile: fixed top bar with animated menu button ──────────────── */}
      <div className="fixed top-0 left-0 right-0 h-10 z-50 md:hidden flex items-center justify-between px-4 bg-[#f5f4ef] border-b border-[#dbd9d1]">
        <Image src="/LDR_Logo.svg" alt="ladddr" width={28} height={28} />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex items-center justify-center w-8 h-8 -mr-1.5"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* ── Mobile: full-width drawer slides down from under top bar ─────── */}
      <aside
        className={`fixed top-0 left-0 right-0 bottom-0 bg-[#f5f4ef] z-40 md:hidden flex flex-col pt-10 transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto p-6 pt-8">
          <NavContent onLinkClick={() => setOpen(false)} />
        </div>
      </aside>
    </>
  );
}
