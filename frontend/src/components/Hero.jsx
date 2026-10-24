import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { BRAND } from "../data/content";

const LINES = ["good", "design", "sells"];
const EASE = [0.16, 1, 0.3, 1];

const GLOWS = [
  { pos: "left-[6%] top-[22%]", size: "w-72 h-72 sm:w-96 sm:h-96", color: "#FF4000", op: 0.25, depth: 0.7, drift: 12, delay: 0.8 },
  { pos: "right-[8%] bottom-[10%]", size: "w-80 h-80 sm:w-[28rem] sm:h-[28rem]", color: "#FF8A5C", op: 0.2, depth: 0.6, drift: 14, delay: 0.95 },
];

const TOOL_ASSETS = [
  { type: "character", pos: "right-[4%] top-[9%] sm:right-[5%] sm:top-[10%]", depth: 0.9, drift: 10, delay: 1.35, rot: 4 },
  { type: "ease", pos: "left-[3%] bottom-[9%] sm:bottom-[8%]", depth: 1.5, drift: 9, delay: 1.0, rot: -4 },
  { type: "timeline", pos: "right-[2%] bottom-[5%] sm:right-[3%] sm:bottom-[6%]", depth: 1.1, drift: 11, delay: 1.2, rot: 3 },
  { type: "path", pos: "left-[38%] top-[5%] sm:left-[24%] sm:top-[3%]", depth: 2.0, drift: 12, delay: 1.75, rot: -2 },
  { type: "text", pos: "left-[8%] top-[13%]", depth: 1.8, drift: 8, delay: 1.5, rot: -6 },
  { type: "fx", pos: "right-[23%] top-[18%]", depth: 1.3, drift: 7.5, delay: 1.6, rot: 5 },
];

const panelCls = "rounded-xl border border-white/10 bg-[#1d100a]/90 backdrop-blur-md shadow-2xl p-3";

const EasePanel = () => (
  <div className={`${panelCls} w-44 sm:w-52`}>
    <div className="flex items-center justify-between">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" />
      </div>
      <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/40">ease · 1500 px/s</span>
    </div>
    <svg viewBox="0 0 120 56" className="mt-2 w-full">
      {[24, 48, 72, 96].map((x) => (
        <line key={x} x1={x} y1="4" x2={x} y2="52" stroke="rgba(247,246,240,0.07)" strokeWidth="1" />
      ))}
      <path
        d="M4 50 C 26 50 26 8 48 8 C 70 8 70 50 92 50 L 116 50"
        fill="none"
        stroke="rgba(247,246,240,0.85)"
        strokeWidth="1.5"
      />
      <rect x="2" y="48" width="5" height="5" fill="#F5C518" />
      <rect x="45.5" y="5.5" width="5" height="5" fill="#F5C518" />
      <rect x="89.5" y="48" width="5" height="5" fill="#F5C518" />
      <motion.g animate={{ x: [0, 108, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <line x1="6" y1="2" x2="6" y2="54" stroke="#3ECF8E" strokeWidth="1.5" />
        <circle cx="6" cy="20" r="2.5" fill="#3ECF8E" />
      </motion.g>
    </svg>
  </div>
);

const TimelinePanel = () => (
  <div className={`${panelCls} relative w-48 sm:w-56`}>
    <div className="flex justify-between font-mono text-[7px] text-white/40">
      <span>0s</span>
      <span>01s</span>
      <span>02s</span>
      <span>03s</span>
    </div>
    <div className="mt-2 flex flex-col gap-1.5">
      <div className="h-2.5 rounded-sm bg-[#C586F0]/80 w-[78%]" />
      <div className="h-2.5 rounded-sm bg-[#5B8DEF]/80 w-[55%] ml-[20%]" />
      <div className="h-2.5 rounded-sm bg-[#FF4000]/70 w-[38%] ml-[8%]" />
    </div>
    <div className="mt-2 flex gap-3">
      <span className="w-2 h-2 rotate-45 bg-[#F5C518]" />
      <span className="w-2 h-2 rotate-45 bg-white/40 ml-[30%]" />
      <span className="w-2 h-2 rotate-45 bg-white/40 ml-[18%]" />
    </div>
    <motion.div
      className="absolute top-5 bottom-2 w-px bg-[#3ECF8E]"
      animate={{ left: ["12%", "88%", "12%"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const CharacterPanel = () => (
  <div className={`${panelCls} w-40 sm:w-44`}>
    <div className="flex items-center justify-between">
      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">Character</span>
      <span className="text-white/30 font-mono text-[8px]">≡</span>
    </div>
    <div className="mt-2 flex items-center justify-between rounded-md bg-white/5 px-2 py-1.5">
      <span className="font-blob text-[11px] text-[#F7F6F0]">Felt Tip Roman</span>
      <span className="w-2.5 h-2.5 rounded-sm bg-[#FF4000]" />
    </div>
    <div className="mt-2 flex items-center justify-between font-mono text-[8px] text-white/40">
      <span>T&nbsp;&nbsp;220 pt</span>
      <span>V/A&nbsp;&nbsp;Auto</span>
    </div>
    <div className="mt-2 flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-6 h-6 rounded flex items-center justify-center font-display text-[10px] ${
            i === 0 ? "bg-[#FF4000]/25 border border-[#FF4000] text-[#F7F6F0]" : "border border-white/10 text-white/40"
          }`}
        >
          T
        </span>
      ))}
    </div>
  </div>
);

const TextChip = () => (
  <div className={`${panelCls} w-11 h-11 flex items-center justify-center !p-0`}>
    <span className="font-display font-medium text-[#F7F6F0] text-xl leading-none">
      T<span className="text-[#FF4000] text-[10px] align-sub">,</span>
    </span>
  </div>
);

const FxChip = () => (
  <div className="w-11 h-11 rounded-xl bg-[#FF4000] shadow-2xl flex items-center justify-center">
    <span className="font-serif italic text-[#2C180F] text-lg leading-none">fx</span>
  </div>
);

const MotionPath = () => (
  <svg viewBox="0 0 160 60" className="w-36 sm:w-44 overflow-visible">
    <motion.path
      d="M6 52 L 70 12 L 154 30"
      fill="none"
      stroke="rgba(247,246,240,0.5)"
      strokeWidth="1.5"
      strokeDasharray="6 6"
      animate={{ strokeDashoffset: [0, -48] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
    <rect x="3" y="49" width="6" height="6" fill="#F7F6F0" />
    <rect x="67" y="9" width="6" height="6" fill="none" stroke="#F7F6F0" strokeWidth="1.5" />
    <rect x="151" y="27" width="6" height="6" fill="#FF4000" />
  </svg>
);

const AmbientBlob = ({ cfg, mx, my, go, i }) => {
  const x = useTransform(mx, (v) => v * cfg.depth);
  const y = useTransform(my, (v) => v * cfg.depth);
  return (
    <motion.div style={{ x, y }} className={`absolute ${cfg.pos} z-0`} aria-hidden="true" data-testid={`hero-blob-${i}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={go ? { opacity: cfg.op, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ delay: cfg.delay, duration: 1.4, ease: EASE }}
      >
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: cfg.drift, repeat: Infinity, ease: "easeInOut" }}
          className={`${cfg.size} rounded-full blur-3xl`}
          style={{ background: `radial-gradient(circle at 38% 32%, ${cfg.color}, transparent 70%)` }}
        />
      </motion.div>
    </motion.div>
  );
};

const ToolAsset = ({ cfg, mx, my, go }) => {
  const x = useTransform(mx, (v) => v * cfg.depth);
  const y = useTransform(my, (v) => v * cfg.depth);
  return (
    <motion.div
      style={{ x, y }}
      className={`absolute ${cfg.pos} z-0`}
      aria-hidden="true"
      data-testid={`hero-tool-${cfg.type}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 40, rotate: cfg.rot - 6 }}
        animate={go ? { opacity: 1, scale: 1, y: 0, rotate: cfg.rot } : { opacity: 0, scale: 0.6, y: 40 }}
        transition={{ delay: cfg.delay, duration: 1, ease: EASE }}
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, cfg.rot > 0 ? 1.5 : -1.5, 0] }}
          transition={{ duration: cfg.drift, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="scale-[0.62] sm:scale-90 lg:scale-100">
            {cfg.type === "ease" && <EasePanel />}
            {cfg.type === "timeline" && <TimelinePanel />}
            {cfg.type === "character" && <CharacterPanel />}
            {cfg.type === "text" && <TextChip />}
            {cfg.type === "fx" && <FxChip />}
            {cfg.type === "path" && <MotionPath />}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yCollage = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const [go, setGo] = useState(() => sessionStorage.getItem("duarte_intro") === "1");

  useEffect(() => {
    if (go) return;
    const start = () => setGo(true);
    window.addEventListener("duarte:intro-done", start);
    return () => window.removeEventListener("duarte:intro-done", start);
  }, [go]);

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 55, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 55, damping: 18 });
  const titleX = useTransform(mx, (v) => v * -0.4);
  const titleY = useTransform(my, (v) => v * -0.4);

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mxRaw.set(((e.clientX - r.left) / r.width - 0.5) * 24);
    myRaw.set(((e.clientY - r.top) / r.height - 0.5) * 16);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      data-testid="hero-section"
      className="relative min-h-[100svh] overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 pb-12"
    >
      <motion.div style={{ y: yCollage }} className="absolute inset-0" data-testid="hero-ambient">
        {GLOWS.map((b, i) => (
          <AmbientBlob key={i} cfg={b} i={i} mx={mx} my={my} go={go} />
        ))}
        {TOOL_ASSETS.map((t) => (
          <ToolAsset key={t.type} cfg={t} mx={mx} my={my} go={go} />
        ))}
      </motion.div>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[72%] bg-paper/60 blur-[80px] z-[1] pointer-events-none" aria-hidden="true" />

      <motion.div style={{ y: yTitle, opacity }} className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* liquid displacement filter for the headline (animated turbulence = continuous ripple) */}
        <svg aria-hidden="true" className="absolute w-0 h-0">
          <defs>
            <filter id="liquid-text">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.035" numOctaves="2" seed="4" result="noise">
                <animate
                  attributeName="baseFrequency"
                  values="0.012 0.035; 0.02 0.05; 0.012 0.035"
                  dur="9s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        <div className="flex items-center justify-end font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-smoke">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: go ? 1 : 0 }} transition={{ delay: 1.45, duration: 0.8 }} data-testid="hero-year-label" className="bg-paper/50 backdrop-blur-md rounded-full px-4 py-2">
            ©{BRAND.year}
          </motion.span>
        </div>

        <motion.div style={{ x: titleX, y: titleY }}>
          <h1
            className="mt-8 sm:mt-12 font-blob text-center leading-[1.05] text-[14vw] sm:text-[12.5vw] lg:text-[10vw]"
            style={{ filter: "url(#liquid-text)" }}
            aria-label="good design sells"
          >
            {(() => {
              let idx = 0;
              return LINES.map((line, li) => (
                <span key={line} className="block" data-testid={`hero-line-${li}`}>
                  {line.split("").map((ch) => {
                    const i = idx++;
                    return (
                      <motion.span
                        key={i}
                        className={`inline-block ${li === 2 ? "text-acid" : ""}`}
                        style={{ transformOrigin: "50% 100%" }}
                        initial={{ scale: 0, opacity: 0, y: 26, rotate: -12 }}
                        animate={go ? { scale: 1, opacity: 1, y: 0, rotate: 0 } : {}}
                        transition={{ type: "spring", stiffness: 320, damping: 12, mass: 0.7, delay: 0.15 + i * 0.06 }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                </span>
              ));
            })()}
          </h1>
        </motion.div>

        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: go ? 1 : 0, y: go ? 0 : 20 }}
            transition={{ delay: 1.25, duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink bg-paper/50 backdrop-blur-md rounded-full px-4 py-2"
            data-testid="hero-availability-pill"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-acid border border-ink/25"></span>
            </span>
            Available now
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
