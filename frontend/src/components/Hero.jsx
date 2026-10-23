import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { BRAND } from "../data/content";

const LINES = ["good", "design", "sells"];
const EASE = [0.16, 1, 0.3, 1];

const BLOBS = [
  { pos: "left-[2%] top-[8%]", size: "w-72 h-72 sm:w-[26rem] sm:h-[26rem]", color: "#FF4000", op: 0.5, depth: 1.4, drift: 9, delay: 0.9 },
  { pos: "right-[4%] top-[14%]", size: "w-80 h-80 sm:w-[30rem] sm:h-[30rem]", color: "#FF8A5C", op: 0.42, depth: 0.9, drift: 11, delay: 1.05 },
  { pos: "left-[30%] bottom-[2%]", size: "w-64 h-64 sm:w-[24rem] sm:h-[24rem]", color: "#F7F6F0", op: 0.16, depth: 1.8, drift: 8, delay: 1.2 },
  { pos: "right-[20%] bottom-[8%]", size: "w-56 h-56 sm:w-[20rem] sm:h-[20rem]", color: "#FFB199", op: 0.34, depth: 1.1, drift: 10, delay: 1.35 },
  { pos: "left-[10%] bottom-[18%]", size: "w-52 h-52 sm:w-80 sm:h-80", color: "#E06300", op: 0.42, depth: 2.1, drift: 7.5, delay: 1.5 },
  { pos: "right-[42%] top-[2%]", size: "w-44 h-44 sm:w-64 sm:h-64", color: "#FF4000", op: 0.34, depth: 1.6, drift: 12, delay: 1.65 },
];

const RINGS = [
  { pos: "right-[8%] top-[32%]", size: "w-40 h-40 sm:w-64 sm:h-64", dur: 26, depth: 1.2, delay: 1.4 },
  { pos: "left-[14%] top-[46%]", size: "w-32 h-32 sm:w-52 sm:h-52", dur: 34, depth: 0.8, delay: 1.6, reverse: true },
];

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

const AmbientRing = ({ cfg, mx, my, go, i }) => {
  const x = useTransform(mx, (v) => v * cfg.depth);
  const y = useTransform(my, (v) => v * cfg.depth);
  return (
    <motion.div style={{ x, y }} className={`absolute ${cfg.pos} z-0`} aria-hidden="true" data-testid={`hero-ring-${i}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={go ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ delay: cfg.delay, duration: 1.2, ease: EASE }}
        className={`relative ${cfg.size}`}
      >
        <motion.div
          animate={{ rotate: cfg.reverse ? -360 : 360 }}
          transition={{ duration: cfg.dur, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-ink/20"
        >
          <span className="absolute -top-[3px] left-1/2 -ml-[3px] w-1.5 h-1.5 rounded-full bg-acid/70" />
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
        {BLOBS.map((b, i) => (
          <AmbientBlob key={i} cfg={b} i={i} mx={mx} my={my} go={go} />
        ))}
        {RINGS.map((r, i) => (
          <AmbientRing key={i} cfg={r} i={i} mx={mx} my={my} go={go} />
        ))}
      </motion.div>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[72%] bg-paper/60 blur-[80px] z-[1] pointer-events-none" aria-hidden="true" />

      <motion.div style={{ y: yTitle, opacity }} className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 w-full">
        <div className="flex items-center justify-end font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-smoke">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: go ? 1 : 0 }} transition={{ delay: 1.45, duration: 0.8 }} data-testid="hero-year-label" className="bg-paper/50 backdrop-blur-md rounded-full px-4 py-2">
            ©{BRAND.year}
          </motion.span>
        </div>

        <motion.div style={{ x: titleX, y: titleY }}>
          <h1
            className="mt-8 sm:mt-12 font-blob text-center leading-[1.05] text-[14vw] sm:text-[12.5vw] lg:text-[10vw]"
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
                        <motion.span
                          className="inline-block"
                          animate={{ rotate: [0, 2.4, -1.8, 0], y: [0, -4, 0] }}
                          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 + i * 0.2 }}
                        >
                          {ch}
                        </motion.span>
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
