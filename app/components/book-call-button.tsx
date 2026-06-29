"use client";

import { useState } from "react";

let calReady = false;

async function preloadCal() {
  if (calReady) return;
  const { getCalApi } = await import("@calcom/embed-react");
  const cal = await getCalApi({ namespace: "15min" });
  cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
  calReady = true;
}

async function openCal() {
  await preloadCal();
}

function DefaultFrame() {
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      overflow="visible"
      viewBox="0 0 276.006 59.9998"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M274.662 1.60742V40.5342L261.171 58.3926H1.34617V19.4648L14.8364 1.60742H274.662Z" stroke="white" strokeWidth="1.07143" />
      <path d="M274.66 58.3923H264.942L274.66 45.5261V58.3923Z" stroke="white" strokeWidth="1.07143" />
      <path d="M1.34575 1.60742H11.0645L1.34575 14.4736V1.60742Z" stroke="white" strokeWidth="1.07143" />
      <path d="M1.61914 57.8572H6.47461V59.9998H0V51.4285H1.61914V57.8572Z" fill="white" />
      <path d="M274.388 2.14258H269.531V0H276.006V8.57129H274.388V2.14258Z" fill="white" />
    </svg>
  );
}

function HoverFrame() {
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      overflow="visible"
      viewBox="0 0 280.006 63.9998"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M276.662 3.60742V42.5342L263.171 60.3926H3.34617V21.4648L16.8364 3.60742H276.662Z" stroke="white" strokeWidth="1.07143" />
      <path d="M276.66 60.3923H266.942L276.66 47.5261V60.3923Z" fill="white" stroke="white" strokeWidth="1.07143" />
      <path d="M3.34575 3.60742H13.0645L3.34575 16.4736V3.60742Z" fill="white" stroke="white" strokeWidth="1.07143" />
      <path d="M1.61914 61.8572H6.47461V63.9998H0V55.4285H1.61914V61.8572Z" fill="white" />
      <path d="M278.388 2.14258H273.531V0H280.006V8.57129H278.388V2.14258Z" fill="white" />
    </svg>
  );
}

export default function BookCallButton({
  className = "",
  label = "book a call",
  fullWidth = false,
}: {
  className?: string;
  label?: string;
  href?: string; // unused — opens Cal modal, kept for API compat
  fullWidth?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      data-cal-namespace="15min"
      data-cal-link="shutttr.agency/15min"
      data-cal-config='{"layout":"month_view"}'
      onClick={openCal}
      onMouseEnter={() => { setHovered(true); preloadCal(); }}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: fullWidth ? "100%" : 148,
        height: 44,
        background: hovered ? "#39B54A" : "#1c1c1c",
        transition: "background 150ms ease",
      }}
    >
      <span aria-hidden className="absolute inset-0 w-full h-full">
        {hovered ? <HoverFrame /> : <DefaultFrame />}
      </span>
      <span className="relative z-10 text-white text-[11px] tracking-[0.12em] uppercase font-medium select-none">
        {label}
      </span>
    </button>
  );
}
