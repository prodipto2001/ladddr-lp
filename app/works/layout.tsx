import { Geist } from "next/font/google";

// Case studies share the v2 look: same Geist face and cream canvas. The opaque
// wrapper also hides the v1 grid-paper background from globals.css.
const geist = Geist({
  variable: "--font-v2-sans",
  subsets: ["latin"],
});

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${geist.variable} min-h-screen bg-[#f5f4ef] text-[#1c1c1c]`}
      style={{ fontFamily: "var(--font-v2-sans), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
