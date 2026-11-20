"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BookCall from "./cta";

// ---- geometry -------------------------------------------------------------
const N = 8; // grid is N x N tiles
const MAX = 5; // max blocks per stack
const W = 64; // tile width (screen px, 2:1 isometric)
const H = 32; // tile height
const Z = 32; // block height
const PAD = 24;
const OFFSET = MAX * Z + PAD; // room above the back corner for tall stacks
const VB_W = N * W + PAD * 2;
const VB_H = OFFSET + N * H + PAD;

const project = (x: number, y: number) => ({
  sx: ((x - y) * W) / 2 + VB_W / 2,
  sy: OFFSET + ((x + y) * H) / 2 + H / 2,
});

const pts = (p: [number, number][]) => p.map(([a, b]) => `${a},${b}`).join(" ");

// ---- palette --------------------------------------------------------------
const COLORS = {
  green: { label: "Green", top: "#39B54A", left: "#12803f", right: "#0b6a35" },
  ink: { label: "Ink", top: "#4a4a48", left: "#2b2b2a", right: "#1c1c1b" },
  orange: { label: "Orange", top: "#f5a02e", left: "#d97706", right: "#b45f05" },
  purple: { label: "Purple", top: "#8b7ee8", left: "#6558d3", right: "#4f43b5" },
  sand: { label: "Sand", top: "#ece9de", left: "#cdc8b7", right: "#b4af9d" },
} as const;
type ColorKey = keyof typeof COLORS;
const COLOR_KEYS = Object.keys(COLORS) as ColorKey[];

type Cells = ColorKey[][]; // index = y * N + x, each a stack bottom -> top

const empty = (): Cells => Array.from({ length: N * N }, () => []);
const clone = (c: Cells): Cells => c.map((s) => s.slice());
const idx = (x: number, y: number) => y * N + x;

// A small "L" with an orange cap, so the canvas isn't blank on first visit.
function seed(): Cells {
  const c = empty();
  c[idx(3, 2)] = ["green", "green", "green", "orange"];
  c[idx(3, 3)] = ["green", "green"];
  c[idx(3, 4)] = ["green"];
  c[idx(4, 4)] = ["green"];
  c[idx(5, 4)] = ["green"];
  return c;
}

const STORAGE_KEY = "ldr-blocks-v1";

function parseStored(raw: string | null): Cells | null {
  if (!raw) return null;
  try {
    const d = JSON.parse(raw);
    if (!Array.isArray(d) || d.length !== N * N) return null;
    for (const s of d) {
      if (!Array.isArray(s) || s.length > MAX) return null;
      for (const k of s) if (!(k in COLORS)) return null;
    }
    return d as Cells;
  } catch {
    return null;
  }
}

// Safe to read storage during render: this component is loaded with
// `ssr: false` (see play.tsx), so there is no server HTML to mismatch.
function initialCells(): Cells {
  try {
    return parseStored(localStorage.getItem(STORAGE_KEY)) ?? seed();
  } catch {
    return seed();
  }
}

function detectShare(): boolean {
  try {
    return !!navigator.canShare && navigator.canShare({ files: [new File([""], "a.png", { type: "image/png" })] });
  } catch {
    return false;
  }
}

// ---- drawing --------------------------------------------------------------
function Cube({ x, y, z, color, ghost = false, pop = false }: { x: number; y: number; z: number; color: ColorKey; ghost?: boolean; pop?: boolean }) {
  const { sx, sy } = project(x, y);
  const ty = sy - (z + 1) * Z;
  const c = COLORS[color];
  const stroke = "rgba(0,0,0,0.22)";
  return (
    <g className={pop ? "block-pop" : undefined} opacity={ghost ? 0.45 : 1} pointerEvents={ghost ? "none" : undefined}>
      <polygon points={pts([[sx - W / 2, ty], [sx, ty + H / 2], [sx, ty + H / 2 + Z], [sx - W / 2, ty + Z]])} fill={c.left} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      <polygon points={pts([[sx + W / 2, ty], [sx, ty + H / 2], [sx, ty + H / 2 + Z], [sx + W / 2, ty + Z]])} fill={c.right} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      <polygon points={pts([[sx, ty - H / 2], [sx + W / 2, ty], [sx, ty + H / 2], [sx - W / 2, ty]])} fill={c.top} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
    </g>
  );
}

const floorPts = (x: number, y: number) => {
  const { sx, sy } = project(x, y);
  return pts([[sx, sy - H / 2], [sx + W / 2, sy], [sx, sy + H / 2], [sx - W / 2, sy]]);
};

// ---- component ------------------------------------------------------------
export default function BlockBuilder({ header }: { header?: React.ReactNode }) {
  const [cells, setCells] = useState<Cells>(initialCells);
  const [color, setColor] = useState<ColorKey>("green");
  const [tool, setTool] = useState<"build" | "erase">("build");
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
  const [cursor, setCursor] = useState({ x: 3, y: 3 });
  const [focused, setFocused] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [canShare] = useState(detectShare);
  const [busy, setBusy] = useState(false);
  const [burst, setBurst] = useState(0);
  const history = useRef<Cells[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [barOn, setBarOn] = useState(false);

  // Mobile game bar shows only while the Play section is on screen.
  useEffect(() => {
    const el = document.getElementById("play");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setBarOn(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Remember the build for the visitor's next visit. Skips the first run so
  // merely opening the page never overwrites a saved build with the starter.
  const firstSave = useRef(true);
  useEffect(() => {
    if (firstSave.current) {
      firstSave.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cells));
    } catch {}
  }, [cells]);

  const total = useMemo(() => cells.reduce((n, s) => n + s.length, 0), [cells]);

  const commit = useCallback(
    (next: Cells) => {
      history.current.push(clone(cells));
      if (history.current.length > 40) history.current.shift();
      setCanUndo(true);
      setCells(next);
    },
    [cells]
  );

  const place = useCallback(
    (x: number, y: number, mode: "build" | "erase") => {
      const i = idx(x, y);
      const stack = cells[i];
      if (mode === "erase") {
        if (!stack.length) return;
        const next = clone(cells);
        next[i].pop();
        commit(next);
        setLastKey(null);
        setStatus(`Removed a block at ${x + 1}, ${y + 1}. ${next[i].length} left in this stack.`);
        return;
      }
      if (stack.length >= MAX) {
        setStatus(`That stack is full (${MAX} blocks).`);
        return;
      }
      const next = clone(cells);
      next[i].push(color);
      commit(next);
      setLastKey(`${i}:${next[i].length - 1}`);
      setStatus(`Placed a ${COLORS[color].label.toLowerCase()} block at ${x + 1}, ${y + 1}. Stack height ${next[i].length}.`);
    },
    [cells, color, commit]
  );

  const undo = () => {
    const prev = history.current.pop();
    if (!prev) return;
    setCanUndo(history.current.length > 0);
    setCells(prev);
    setLastKey(null);
    setStatus("Undid the last change.");
  };

  const clear = () => {
    if (total === 0) return;
    commit(empty());
    setLastKey(null);
    setStatus("Cleared the canvas.");
  };

  const shuffle = () => {
    const next = empty();
    const count = 16 + Math.floor(Math.random() * 10);
    const weighted: ColorKey[] = ["green", "green", "green", "ink", "orange", "purple", "sand"];
    // Cluster around a random centre so it reads as a skyline, not noise.
    const cx = 2 + Math.floor(Math.random() * 4);
    const cy = 2 + Math.floor(Math.random() * 4);
    for (let n = 0; n < count; n++) {
      const x = Math.max(0, Math.min(N - 1, cx + Math.round((Math.random() - 0.5) * 5)));
      const y = Math.max(0, Math.min(N - 1, cy + Math.round((Math.random() - 0.5) * 5)));
      if (next[idx(x, y)].length < MAX) next[idx(x, y)].push(weighted[Math.floor(Math.random() * weighted.length)]);
    }
    commit(next);
    setLastKey(null);
    setStatus("Shuffled a new skyline.");
  };

  // Keyboard: arrows move a screen-relative cursor, Enter builds, Backspace erases.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const clamp = (v: number) => Math.max(0, Math.min(N - 1, v));
    const move: Record<string, [number, number]> = {
      ArrowRight: [1, -1],
      ArrowLeft: [-1, 1],
      ArrowDown: [1, 1],
      ArrowUp: [-1, -1],
    };
    if (move[e.key]) {
      e.preventDefault();
      const [dx, dy] = move[e.key];
      setCursor((c) => ({ x: clamp(c.x + dx), y: clamp(c.y + dy) }));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      place(cursor.x, cursor.y, e.shiftKey ? "erase" : tool);
    } else if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      place(cursor.x, cursor.y, "erase");
    }
  };

  // ---- export -------------------------------------------------------------
  const buildPng = useCallback(async (): Promise<Blob> => {
    const svg = svgRef.current;
    if (!svg) throw new Error("no canvas");
    // Tight crop around the blocks (falls back to the full canvas if empty).
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const h = cells[idx(x, y)].length;
        if (!h) continue;
        const { sx, sy } = project(x, y);
        minX = Math.min(minX, sx - W / 2);
        maxX = Math.max(maxX, sx + W / 2);
        minY = Math.min(minY, sy - h * Z - H / 2);
        maxY = Math.max(maxY, sy + H / 2);
      }
    if (!isFinite(minX)) [minX, maxX, minY, maxY] = [0, VB_W, 0, VB_H];
    const m = 40;
    let vx = minX - m, vy = minY - m, vw = maxX - minX + m * 2, vh = maxY - minY + m * 2 + 36;
    if (vw < 420) { vx -= (420 - vw) / 2; vw = 420; }
    if (vh < 320) { vy -= (320 - vh) / 2; vh = 320; }

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.querySelectorAll('[data-export="skip"]').forEach((n) => n.remove());
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);
    const scale = 2;
    clone.setAttribute("width", String(vw * scale));
    clone.setAttribute("height", String(vh * scale));
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", String(vx)); bg.setAttribute("y", String(vy));
    bg.setAttribute("width", String(vw)); bg.setAttribute("height", String(vh));
    bg.setAttribute("fill", "#f5f4ef");
    clone.insertBefore(bg, clone.firstChild);
    const mark = document.createElementNS("http://www.w3.org/2000/svg", "text");
    mark.setAttribute("x", String(vx + 20)); mark.setAttribute("y", String(vy + vh - 18));
    mark.setAttribute("fill", "#1c1c1c"); mark.setAttribute("font-size", "18");
    mark.setAttribute("font-weight", "700"); mark.setAttribute("font-family", "system-ui, sans-serif");
    mark.textContent = "ladddr.";
    clone.appendChild(mark);

    const xml = new XMLSerializer().serializeToString(clone);
    const img = new Image();
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("render failed"));
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
    });
    const canvas = document.createElement("canvas");
    canvas.width = vw * scale;
    canvas.height = vh * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no 2d context");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("toBlob"))), "image/png"));
  }, [cells]);

  const download = async () => {
    setBusy(true);
    try {
      const blob = await buildPng();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ladddr-blocks.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("Downloaded your build as a PNG.");
      setBurst((b) => b + 1);
    } catch {
      setStatus("Couldn't export the image. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const share = async () => {
    setBusy(true);
    try {
      const blob = await buildPng();
      await navigator.share({
        files: [new File([blob], "ladddr-blocks.png", { type: "image/png" })],
        title: "Made with ladddr.",
        text: "Stacked these at ladddr.",
      });
    } catch {
      /* user cancelled or unsupported: nothing to do */
    } finally {
      setBusy(false);
    }
  };

  // ---- render -------------------------------------------------------------
  const activeCell = hover ?? (focused ? cursor : null);
  const order = useMemo(() => {
    const list: { x: number; y: number }[] = [];
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) list.push({ x, y });
    return list.sort((a, b) => a.x + a.y - (b.x + b.y) || a.x - b.x);
  }, []);

  const btn =
    "inline-flex items-center justify-center rounded-[10px] border-2 border-[#1c1c1c] bg-[#f5f4ef] px-4 py-2 text-[14px] font-semibold shadow-[3px_3px_0_#1c1c1c] transition-all hover:-translate-y-0.5 hover:shadow-[3px_5px_0_#1c1c1c] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:pointer-events-none disabled:opacity-35";

  const swatches = (
        <div role="group" aria-label="Block colour" className="flex items-center gap-2.5">
          {COLOR_KEYS.map((k) => {
            const on = color === k && tool === "build";
            return (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setColor(k);
                  setTool("build");
                }}
                aria-label={COLORS[k].label}
                aria-pressed={on}
                className={`h-10 w-10 md:h-9 md:w-9 rounded-[10px] border-2 border-[#1c1c1c] transition-all hover:-translate-y-1 hover:rotate-[-6deg] active:scale-90 ${
                  on ? "-translate-y-1 shadow-[3px_4px_0_#1c1c1c]" : "shadow-[2px_2px_0_#1c1c1c]"
                }`}
                style={{ background: COLORS[k].top }}
              />
            );
          })}
        </div>
  );

  const toolToggle = (
        <div role="group" aria-label="Tool" className="flex overflow-hidden rounded-[10px] border-2 border-[#1c1c1c] bg-[#f5f4ef] text-[14px] font-semibold shadow-[3px_3px_0_#1c1c1c]">
          {(["build", "erase"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTool(t)}
              aria-pressed={tool === t}
              className={`px-5 py-2.5 md:px-4 md:py-2 transition-colors ${tool === t ? "bg-[#1c1c1c] text-[#f5f4ef]" : "hover:bg-[#e8e6de]"}`}
            >
              {t === "build" ? "Stack" : "Zap"}
            </button>
          ))}
        </div>
  );

  // Playful commentary that grows with the build.
  const mood =
    total === 0
      ? "Blank canvas. Brave."
      : total < 5
        ? "Cute start."
        : total < 12
          ? "Okay, now we're stacking."
          : total < 24
            ? "Is that a skyline?"
            : total < 40
              ? "Architect mode: unlocked."
              : "Someone call city planning.";

  return (
    <div className="grid w-full items-center gap-8 md:grid-cols-12 md:gap-10">
      <div className="contents md:flex md:flex-col md:gap-9 md:col-span-5">
      <div className="order-1 md:order-none">{header}</div>
      <div className="order-3 flex flex-col gap-7 md:order-none md:gap-9">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-5">
        <div className="hidden md:contents">{swatches}{toolToggle}</div>

        <div className="flex w-full flex-wrap items-center gap-3">
          <button type="button" onClick={undo} disabled={!canUndo} className={btn}>
            Oops, undo
          </button>
          <button type="button" onClick={shuffle} className={btn}>
            Surprise me
          </button>
          <button type="button" onClick={clear} disabled={total === 0} className={btn}>
            Wipe it
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4">
        <p className="text-[13px] leading-[1.5] text-[#6b6b66]">
          {total} {total === 1 ? "block" : "blocks"} · saved in this browser · <span className="hidden md:inline">shift-click or right-click to zap</span><span className="md:hidden">switch to Zap to remove</span>
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {canShare && (
            <button type="button" onClick={share} disabled={busy || total === 0} className={btn}>
              Show off
            </button>
          )}
          <button
            type="button"
            onClick={download}
            disabled={busy || total === 0}
            className="inline-flex items-center justify-center rounded-full bg-[#1c1c1c] px-5 py-2.5 text-[14px] font-medium text-[#f5f4ef] transition-colors hover:bg-[#39B54A] hover:text-[#1c1c1c] disabled:pointer-events-none disabled:opacity-35"
          >
            Take it home ↓
          </button>
        </div>
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-[14px] border-2 border-dotted border-[#1c1c1c] px-4 py-4 text-[#1c1c1c] md:px-5">
        <p className="text-[clamp(18px,1.6vw,22px)] font-semibold leading-[1.1] tracking-[-0.02em]">
          Like it? Let&rsquo;s build
          <br />
          the real thing.
        </p>
        <BookCall label="Book a call" variant="dark" className="shrink-0 !px-5 !py-3 !text-[14px]" />
      </div>
      </div>
      </div>

      <div className="relative order-2 md:order-none md:col-span-7">
        <span className="pointer-events-none absolute left-0 top-0 z-10 rounded-full border-2 border-[#1c1c1c] bg-[#39B54A] px-2.5 py-0.5 text-[11px] md:left-3 md:top-3 md:px-3 md:py-1 md:text-[12px] font-bold text-[#1c1c1c] shadow-[2px_2px_0_#1c1c1c]">
          {mood}
        </span>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="application"
          aria-label="Isometric block canvas. Arrow keys move the cursor, Enter places a block, Backspace removes the top block."
          tabIndex={0}
          onKeyDown={onKeyDown}
          // Only show the keyboard cursor for keyboard focus; a mouse/touch
          // tap also focuses the SVG and would leave a stray ghost block.
          onFocus={(e) => setFocused(e.currentTarget.matches(":focus-visible"))}
          onBlur={() => setFocused(false)}
          onContextMenu={(e) => e.preventDefault()}
          className="mx-auto block h-auto max-h-[calc(100svh-9rem)] w-full select-none touch-manipulation outline-none"
        >
          {order.map(({ x, y }) => {
            const i = idx(x, y);
            const stack = cells[i];
            const isActive = activeCell?.x === x && activeCell?.y === y;
            return (
              <g
                key={i}
                style={{ cursor: tool === "erase" ? "not-allowed" : "pointer" }}
                onClick={(e) => place(x, y, e.shiftKey ? "erase" : tool)}
                onContextMenu={() => place(x, y, "erase")}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover({ x, y })}
                onPointerLeave={(e) => e.pointerType === "mouse" && setHover((h) => (h?.x === x && h?.y === y ? null : h))}
              >
                <polygon
                  data-export="skip"
                  points={floorPts(x, y)}
                  fill={isActive ? "rgba(57,181,74,0.16)" : "rgba(0,0,0,0)"}
                  stroke={isActive && focused && !hover ? "#1c1c1c" : "#d3d0c4"}
                  strokeWidth={isActive && focused && !hover ? 2 : 1}
                />
                {stack.map((k, z) => (
                  <Cube key={z} x={x} y={y} z={z} color={k} pop={lastKey === `${i}:${z}`} />
                ))}
                {isActive && tool === "build" && stack.length < MAX && (
                  <g data-export="skip">
                    <Cube x={x} y={y} z={stack.length} color={color} ghost />
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {total === 0 && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-[18px] font-semibold text-[#6b6b66]">
            Poke a tile. Go on.
          </p>
        )}

        {burst > 0 && (
          <div key={burst} className="pointer-events-none absolute inset-0 z-20" aria-hidden>
            {Array.from({ length: 22 }, (_, i) => {
              const a = (i / 22) * Math.PI * 2 + (i % 3) * 0.2;
              const d = 120 + (i % 5) * 45;
              return (
                <span
                  key={i}
                  className="confetti-bit"
                  style={
                    {
                      background: COLORS[COLOR_KEYS[i % COLOR_KEYS.length]].top,
                      "--dx": `${Math.cos(a) * d}px`,
                      "--dy": `${Math.sin(a) * d}px`,
                      "--rot": `${(i % 2 ? 1 : -1) * (180 + i * 20)}deg`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      {barOn &&
        createPortal(
          <div
            role="toolbar"
            aria-label="Game bar"
            className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto flex max-w-md items-center justify-between gap-2 rounded-[18px] border-2 border-[#1c1c1c] bg-[#f5f4ef] px-3 py-2.5 shadow-[4px_4px_0_#1c1c1c] md:hidden"
          >
            <div className="flex items-center gap-2">
              {COLOR_KEYS.map((k) => {
                const on = color === k && tool === "build";
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => {
                      setColor(k);
                      setTool("build");
                    }}
                    aria-label={COLORS[k].label}
                    aria-pressed={on}
                    className={`h-9 w-9 rounded-[10px] border-2 border-[#1c1c1c] transition-all active:scale-90 ${
                      on ? "-translate-y-1.5 shadow-[2px_3px_0_#1c1c1c]" : "shadow-[1px_1px_0_#1c1c1c]"
                    }`}
                    style={{ background: COLORS[k].top }}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTool((t) => (t === "build" ? "erase" : "build"))}
                aria-pressed={tool === "erase"}
                className={`h-9 rounded-[10px] border-2 border-[#1c1c1c] px-3 text-[13px] font-semibold shadow-[2px_2px_0_#1c1c1c] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                  tool === "erase" ? "bg-[#1c1c1c] text-[#f5f4ef]" : "bg-[#f5f4ef]"
                }`}
              >
                {tool === "erase" ? "Zap" : "Stack"}
              </button>
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                aria-label="Undo"
                className="h-9 w-9 rounded-[10px] border-2 border-[#1c1c1c] bg-[#f5f4ef] text-[16px] font-semibold shadow-[2px_2px_0_#1c1c1c] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-35"
              >
                ↶
              </button>
            </div>
          </div>,
          document.body
        )}

      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
    </div>
  );
}
