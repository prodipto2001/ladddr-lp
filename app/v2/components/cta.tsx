"use client";

import { CAL } from "../content";

let calReady = false;

async function preloadCal() {
  if (calReady) return;
  const { getCalApi } = await import("@calcom/embed-react");
  const cal = await getCalApi({ namespace: CAL.namespace });
  cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
  calReady = true;
}

const VARIANTS = {
  dark: "rounded-full px-6 py-3.5 font-medium transition-colors bg-[#1c1c1c] text-[#f5f4ef] hover:bg-[#39B54A] hover:text-[#1c1c1c]",
  light: "rounded-full px-6 py-3.5 font-medium transition-colors border border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-[#f5f4ef]",
  cream: "rounded-full px-6 py-3.5 font-medium transition-colors bg-[#f5f4ef] text-[#1c1c1c] hover:bg-[#39B54A]",
} as const;

export default function BookCall({
  label = "Book a call",
  variant = "dark",
  className = "",
}: {
  label?: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-cal-namespace={CAL.namespace}
      data-cal-link={CAL.link}
      data-cal-config='{"layout":"month_view"}'
      onClick={preloadCal}
      onMouseEnter={preloadCal}
      onFocus={preloadCal}
      className={`inline-flex items-center justify-center gap-2 text-[15px] ${VARIANTS[variant]} ${className}`}
    >
      {label}
      <span aria-hidden>↗</span>
    </button>
  );
}
