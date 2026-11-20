import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  variable: "--font-v2-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ladddr. — launch-ready sites in 4 weeks",
  description:
    "A design-first studio. We design and ship your website in a fixed four-week sprint.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    // Opaque wrapper hides the v1 grid-paper background from globals.css.
    <div
      className={`${geist.variable} min-h-screen bg-[#f5f4ef] text-[#1c1c1c]`}
      style={{ fontFamily: "var(--font-v2-sans), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
