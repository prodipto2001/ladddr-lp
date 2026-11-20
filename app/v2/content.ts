// All v2 copy lives here. Figures are deliberately hedged ("30+", "95+");
// tighten them once you have exact numbers.

import { projects } from "../data/projects";

export const CAL = {
  namespace: "15min",
  link: "shutttr.agency/15min",
  display: "cal.com/shutttr.agency",
};

export const EMAIL = "hello@ladddr.com";

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Sprint", href: "#sprint" },
  { label: "Services", href: "#models" },
  { label: "Team", href: "#team" },
];

export const HERO = {
  // headline is split so the accent word can be styled
  lines: ["We design and build", "websites in"],
  accent: "four-week sprints.",
  sub: "ladddr. is a small design and development studio. We plan, design and ship your website in a fixed four-week sprint, with the price and the dates agreed up front.",
  note: "Now booking for next month. Two sprint slots left.",
};

// Type-only client roller. Swap for SVG logos once they exist.
// Result line, timeframe and preview media per project.
// `image` overrides everything; `video: null` skips a dead video URL from
// data/projects.ts. Without either, the card renders a designed fallback.
// (taxocity + shutttr .mp4s on imagekit return 404; public/taxocity-thumbnail.png
// is actually a screenshot of the Shutttr site, so it's used for Shutttr.)
export type WorkMeta = { result: string; weeks: string; image?: string; video?: null };

export const WORK_RESULTS: Record<string, WorkMeta> = {
  auditmann: { result: "A live welcome experience for a new product.", weeks: "~4 weeks", image: "/auditmann-hero.png" },
  foliox: { result: "99 Lighthouse. Creators publish on their own subdomain.", weeks: "Ongoing" },
  taxocity: { result: "Filing, billing and email, shipped as one dashboard.", weeks: "~12 weeks", video: null },
  "0xcommit": { result: "Lighthouse from 54 to 99, with a new identity.", weeks: "~12 weeks" },
  shutttr: { result: "Figma prototype to shipped MVP, no critical bugs.", weeks: "5 weeks", image: "/shutttr-thumbnail.png" },
};

export const WORK = projects;

export const SPRINT = {
  title: "The sprint.",
  intro:
    "One fixed scope, one fixed timeline, one fixed price. You see the design before we write a line of code, and you know what launch day looks like from the first call.",
  weeks: [
    {
      label: "Week 1",
      name: "Strategy & copy",
      body: "Goals, audience, structure and the words. Scope is signed off before design starts.",
      items: ["Kickoff call and goals brief", "Sitemap and page structure", "Copy direction for every section"],
      output: "Signed-off scope",
    },
    {
      label: "Week 2",
      name: "Design",
      body: "Figma, desktop and mobile. One round of structured feedback, then approval.",
      items: ["Custom design, desktop and mobile", "Small component library", "One structured feedback round"],
      output: "Approved Figma file",
    },
    {
      label: "Weeks 3–4",
      name: "Build",
      body: "Next.js, TypeScript, CMS if needed. Weekly async updates, no surprises.",
      items: ["Production build in Next.js", "CMS wired in if needed", "Weekly async progress updates"],
      output: "Staging site to review",
    },
    {
      label: "Launch",
      name: "QA & ship",
      body: "Cross-browser, mobile and accessibility pass. Deployed, with 30 days of support.",
      items: ["Cross-browser and mobile QA", "Performance, SEO and accessibility pass", "Deployment and 30 days of support"],
      output: "Live site",
    },
  ],
  includes: [
    "Strategy, copy direction and sitemap",
    "Custom design in Figma, with a small component library",
    "Production build in Next.js and TypeScript",
    "Performance, SEO basics and accessibility pass",
    "Deployment to your infrastructure",
    "30 days of post-launch support",
  ],
  excludes: [
    "Ongoing marketing or paid media",
    "Native mobile apps",
    "Smart contract development",
    "Unlimited revisions",
  ],
  price: "Fixed price, quoted before we start.",
};

export const MODELS = [
  {
    n: "01",
    name: "Website sprint",
    time: "4 weeks",
    body: "A marketing site or landing page, designed and built end to end. Fixed scope and price.",
    terms: "Fixed scope · fixed price",
    fit: "Marketing sites, landing pages and rebrands with a clear deadline.",
    points: [
      "Designed in Figma, built in Next.js, shipped end to end.",
      "One kickoff, two review rounds, one launch date.",
      "30 days of post-launch support.",
    ],
  },
  {
    n: "02",
    name: "MVP build",
    time: "6–8 weeks",
    body: "Auth, billing, email and an admin panel. We take a prototype to a product you can charge for.",
    terms: "Milestone-based",
    fit: "Founders taking a prototype to a product people can pay for.",
    points: [
      "Auth, billing, transactional email and an admin panel.",
      "A weekly demo, so you always see what is live.",
      "A codebase your next hire can pick up on day one.",
    ],
  },
  {
    n: "03",
    name: "Design retainer",
    time: "Monthly",
    body: "A designer and a developer on call for launches, experiments and the long tail of small fixes.",
    terms: "Flat monthly fee",
    fit: "Teams with a steady stream of design and front-end work.",
    points: [
      "A designer and a developer on call.",
      "Launches, experiments and the long tail of small fixes.",
      "Pause or cancel any month. No lock-in.",
    ],
  },
];

export const STATS = [
  { value: "30+", label: "projects shipped" },
  { value: "3+", label: "years in business" },
  { value: "95+", label: "average Lighthouse score" },
];

export const TESTIMONIALS = [
  {
    quote: "They took a rough Figma file and gave us a site we are proud to send to investors. Clear scope, clear dates.",
    name: "Arjun M.",
    role: "Co-founder",
    company: "FolioX",
    outcome: "99 Lighthouse",
  },
  {
    quote: "Dashboard, billing and email in one sprint. The handover was clean enough that our own team picked it up the same week.",
    name: "Priya N.",
    role: "CTO",
    company: "Taxocity",
    outcome: "Shipped as one dashboard",
  },
  {
    quote: "We saw the design before any code was written, which meant no surprises at launch.",
    name: "Daniel O.",
    role: "Founder",
    company: "Shutttr",
    outcome: "Prototype to MVP in 5 weeks",
  },
];

export const TEAM = [
  // TODO: confirm the social URLs and emails below. Twitter/LinkedIn URLs are guessed from the handles.
  { name: "Pradipto", handle: "@prodipto2001", role: "Designer", location: "India", image: "/Team/pradipto.svg", twitter: "https://x.com/prodipto2001", linkedin: "https://www.linkedin.com/in/prodipto2001", email: "prodiptoofficial2001@gmail.com" },
  { name: "Joydeep", handle: "@joydeepsignha", role: "Full-stack developer · Blockchain", location: "India", image: "/Team/joydeepdithered.svg", twitter: "https://x.com/joydeepsignha", linkedin: "https://www.linkedin.com/in/joydeepsignha", email: "" },
  { name: "Soumya", handle: "@soumyamukherjee", role: "Frontend developer", location: "India", image: "/Team/Soumya.svg", twitter: "https://x.com/soumyamukherjee", linkedin: "https://www.linkedin.com/in/soumyamukherjee", email: "" },
];

export const CLOSING = {
  title: "Ready to talk.",
  body: "We take on a small number of sprints at a time. Book a 15-minute call and we will tell you honestly whether we are the right fit.",
  response: "Replies within a day",
};
