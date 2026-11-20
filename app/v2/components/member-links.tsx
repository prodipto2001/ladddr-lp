"use client";

import { useState } from "react";

const ICON = "h-4 w-4";
const BTN =
  "relative flex h-9 w-9 items-center justify-center rounded-full border border-[#dbd9d1] text-[#444] transition-colors duration-200 hover:border-[#111] hover:bg-[#111] hover:text-[#f5f4ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export default function MemberLinks({
  name,
  twitter,
  linkedin,
  email,
}: {
  name: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for insecure contexts / older browsers.
      const el = document.createElement("textarea");
      el.value = email;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex items-center gap-2">
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label={`${name} on X`} title="X / Twitter" className={BTN}>
          <XIcon />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`} title="LinkedIn" className={BTN}>
          <LinkedInIcon />
        </a>
      )}
      {email && (
        <button type="button" onClick={copyEmail} aria-label={`Copy ${name}'s email`} title={copied ? "Copied" : "Copy email"} className={BTN}>
          {copied ? <CheckIcon /> : <MailIcon />}
          <span
            role="status"
            className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#111] px-2 py-1 text-[12px] text-[#f5f4ef] transition-opacity duration-200 ${copied ? "opacity-100" : "opacity-0"}`}
          >
            {copied ? "Email copied" : ""}
          </span>
        </button>
      )}
    </div>
  );
}
