"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EMAIL, NAV } from "../content";
import { projects } from "../../data/projects";
import BookCall from "./cta";

// Dynamic-Island style nav: logo and CTA are always visible; the links
// expand between them on hover / focus (desktop) or tap (touch).
//
// Smoothness notes: we animate real width/height on clipped wrappers
// (measured once from always-mounted content) rather than framer `layout`,
// so text is never scaled, nothing re-rasterises, and there is no mount hitch.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [linksW, setLinksW] = useState(0);
  const [stackH, setStackH] = useState(0);
  const [workOpen, setWorkOpen] = useState(false);
  const [fixed, setFixed] = useState(false); // panel mounted + width pinned
  const [baseW, setBaseW] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const fixedTimer = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);

  // Natural sizes of the collapsible content (re-measured on resize).
  useLayoutEffect(() => {
    const measure = () => {
      setLinksW(linksRef.current?.offsetWidth ?? 0);
      setStackH(stackRef.current?.offsetHeight ?? 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const openWork = useCallback(() => {
    if (fixedTimer.current) window.clearTimeout(fixedTimer.current);
    // Width of the fully expanded bar (links may still be mid-animation).
    const linksNow = linksWrapRef.current?.offsetWidth ?? 0;
    const full = linksRef.current?.offsetWidth ?? 0;
    setBaseW((rootRef.current?.offsetWidth ?? 0) - linksNow + full);
    setFixed(true);
    setOpen(true);
    setWorkOpen(true);
  }, []);
  const closeWork = useCallback(() => {
    setWorkOpen(false);
    if (fixedTimer.current) window.clearTimeout(fixedTimer.current);
    fixedTimer.current = window.setTimeout(() => setFixed(false), 450);
  }, []);

  const expand = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);
  const collapse = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      closeWork();
    }, 160);
  }, [closeWork]);

  // Which section sits around the 40% line of the viewport.
  useEffect(() => {
    const els = NAV.map((n) => document.querySelector<HTMLElement>(n.href)).filter(
      (el): el is HTMLElement => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const href = `#${e.target.id}`;
          if (e.isIntersecting) setActive(href);
          else setActive((a) => (a === href ? null : a));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Touch: close when tapping outside; keyboard: Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        closeWork();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        closeWork();
      }
    };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeWork]);

  // Near-critically damped: settles fast with no visible bounce.
  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 38, mass: 1 };
  const ease = reduce ? { duration: 0 } : { duration: 0.26, ease: [0.22, 1, 0.36, 1] as const };

  // A tap both focuses the button and clicks it; without this the focus
  // handler would open the island and the click would toggle it shut again.
  const pointerType = useRef<string | null>(null);
  const onLogoClick = () => {
    if (pointerType.current === "touch") setOpen((o) => !o);
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-4">
      <motion.div
        ref={rootRef}
        initial={false}
        animate={
          desktop
            ? {
                width:
                  fixed && baseW ? baseW : "auto",
              }
            : {}
        }
        transition={spring}
        onPointerDownCapture={(e) => {
          pointerType.current = e.pointerType;
        }}
        onKeyDownCapture={() => {
          pointerType.current = null;
        }}
        // Pointer events so a touch tap's compatibility mouse events don't
        // open-then-toggle-close the island; only a real mouse hovers.
        onPointerEnter={(e) => e.pointerType === "mouse" && expand()}
        onPointerLeave={(e) => e.pointerType === "mouse" && collapse()}
        onFocusCapture={() => {
          if (pointerType.current !== "touch") expand();
        }}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) collapse();
        }}
        className="pointer-events-auto w-[calc(100vw-2rem)] overflow-hidden rounded-[28px] border border-[#dbd9d1] bg-[#f5f4ef] text-[#1c1c1c] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] md:w-auto"
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onLogoClick}
            aria-expanded={open}
            aria-controls="island-menu"
            className="flex items-center gap-2.5 py-2 pl-4 pr-3"
          >
            <Image src="/LDR_Logo.svg" alt="" width={20} height={20} priority />
            <span className="text-[15px] font-semibold tracking-tight">ladddr.</span>
            <span className="sr-only">Menu</span>
          </button>

          {/* Desktop links: clipped wrapper animates width; content is fixed-width. */}
          <motion.div
            ref={linksWrapRef}
            initial={false}
            animate={{ width: open ? linksW : 0 }}
            transition={spring}
            className="hidden overflow-hidden md:block"
          >
            <motion.nav
              ref={linksRef}
              aria-label="Primary"
              initial={false}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -8 }}
              transition={ease}
              onMouseLeave={() => setHover(null)}
              className="flex w-max items-center gap-0.5 px-1"
            >
              {NAV.map((n) => {
                const on = workOpen ? n.href === "#work" : (hover ?? active) === n.href;
                return (
                  <a
                    key={n.href}
                    href={n.href}
                    tabIndex={open ? 0 : -1}
                    aria-expanded={n.href === "#work" ? workOpen : undefined}
                    onMouseEnter={() => {
                      setHover(n.href);
                      if (n.href === "#work") {
                        if (!workOpen) openWork();
                      } else if (workOpen) closeWork();
                    }}
                    className={`isolate relative rounded-full px-3.5 py-1.5 text-[14px] transition-colors ${
                      on ? "text-[#1c1c1c]" : "text-[#6b6b66] hover:text-[#1c1c1c]"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="island-indicator"
                        transition={spring}
                        className="absolute inset-0 -z-10 rounded-full bg-[#e8e6de]"
                      />
                    )}
                    {n.label}
                  </a>
                );
              })}
            </motion.nav>
          </motion.div>

          <div className="shrink-0 whitespace-nowrap py-1.5 pl-2 pr-1.5">
            <BookCall label="Let's talk" className="!whitespace-nowrap !px-4 !py-2 !text-[14px]" />
          </div>
        </div>

        {/* Work mega-panel: the whole island stretches to list every project. */}
        {fixed && (
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              workOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className={`border-t border-[#dbd9d1] p-3 transition-opacity duration-200 ${
                  workOpen ? "opacity-100 delay-100" : "opacity-0"
                }`}
              >
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {projects.map((p) => (
                    <li key={p.id}>
                      <a
                        href={`/works/${p.id}`}
                        tabIndex={workOpen ? 0 : -1}
                        className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-[#e8e6de]"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-semibold tracking-tight">{p.name}</span>
                          <span className="block truncate text-[12.5px] text-[#6b6b66]">{p.type}</span>
                        </span>
                        <span className="text-[#6b6b66] transition-transform group-hover:translate-x-0.5">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="#work"
                  tabIndex={workOpen ? 0 : -1}
                  onClick={closeWork}
                  className="mt-1.5 block rounded-2xl px-3 py-2 text-[13px] text-[#6b6b66] hover:text-[#1c1c1c]"
                >
                  View all work ↓
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Mobile: clipped wrapper animates height; the island grows downward. */}
        <motion.div
          id="island-menu"
          initial={false}
          animate={{ height: open ? stackH : 0 }}
          transition={spring}
          className="overflow-hidden md:hidden"
        >
          <motion.div
            ref={stackRef}
            initial={false}
            animate={{ opacity: open ? 1 : 0, y: open ? 0 : -6 }}
            transition={ease}
            className="px-2 pb-2"
          >
            <ul className="border-t border-[#dbd9d1]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    tabIndex={open ? 0 : -1}
                    onClick={(e) => {
                      if (n.href === "#work") {
                        e.preventDefault();
                        workOpen ? closeWork() : openWork();
                      } else setOpen(false);
                    }}
                    className="block border-b border-[#dbd9d1] px-2 py-3.5 text-[22px] font-semibold tracking-[-0.02em]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${EMAIL}`} tabIndex={open ? 0 : -1} className="block px-2 pb-1 pt-3 text-[13px] text-[#6b6b66]">
              {EMAIL}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  );
}
