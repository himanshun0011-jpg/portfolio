import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Plus } from "lucide-react";
import { SERVICES } from "../data/content";
import { Reveal } from "./Reveal";

const OFFSETS = ["lg:pl-0", "lg:pl-[8%]", "lg:pl-[22%]", "lg:pl-[5%]", "lg:pl-[16%]"];
const EASE = [0.16, 1, 0.3, 1];

const ORB_COLORS = [
  ["#FF4000", "#FFC7B0"],
  ["#FF6A00", "#FFD9A8"],
  ["#D63100", "#FF9E7F"],
  ["#8A2B0E", "#FF6B3D"],
  ["#E06300", "#FFCE8F"],
];

const OrbPreview = ({ index }) => {
  const [a, b] = ORB_COLORS[index % ORB_COLORS.length];
  return (
    <div className="relative w-full h-full" style={{ perspective: 900 }}>
      {/* ambient glow */}
      <div className="absolute inset-[18%] rounded-full blur-3xl opacity-60" style={{ background: a }} />
      {/* tilted orbit rings */}
      <div className="absolute inset-[6%]" style={{ transform: "rotateX(68deg)" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-ink/30"
        >
          <span className="absolute -top-[3px] left-1/2 -ml-[3px] w-1.5 h-1.5 rounded-full" style={{ background: a }} />
        </motion.div>
      </div>
      <div className="absolute inset-[16%]" style={{ transform: "rotateX(68deg) rotate(40deg)" }}>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-ink/15"
        >
          <span className="absolute -top-[2px] left-1/2 -ml-[2px] w-1 h-1 rounded-full bg-ink/50" />
        </motion.div>
      </div>
      {/* floating 3D sphere */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[26%]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from 200deg, ${a}, #2C180F 28%, ${a} 52%, ${b} 74%, ${a})` }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.9), rgba(255,255,255,0) 40%), radial-gradient(circle at 68% 80%, rgba(44,24,15,0.55), rgba(44,24,15,0) 55%)",
          }}
        />
      </motion.div>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
        ({SERVICES[index].number})
      </span>
    </div>
  );
};

export default function Services() {
  const [open, setOpen] = useState(0);
  const [hovered, setHovered] = useState(-1);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 170, damping: 22, mass: 0.6 });
  const spy = useSpring(py, { stiffness: 170, damping: 22, mass: 0.6 });

  return (
    <section
      id="services"
      data-testid="services-section"
      onMouseMove={(e) => {
        px.set(e.clientX);
        py.set(e.clientY);
      }}
      className="relative max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-32"
    >
      <div className="flex items-end justify-between mb-10 sm:mb-16">
        <Reveal>
          <h2 className="font-display font-medium uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl">Capabilities</h2>
        </Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke hidden sm:block" data-testid="services-count-label">
          ( 01 — 05 )
        </span>
      </div>

      <div className="border-t border-dashed border-ink/30">
        {SERVICES.map((s, i) => {
          const isOpen = open === i;
          const dimmed = hovered !== -1 && hovered !== i;
          return (
            <div
              key={s.number}
              data-testid={`service-row-${s.number}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(-1)}
              className={`border-b border-dashed border-ink/30 transition-opacity duration-500 ${OFFSETS[i % OFFSETS.length]} ${
                dimmed ? "opacity-25" : "opacity-100"
              }`}
            >
              <button
                data-testid={`service-toggle-${s.number}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-10 py-6 sm:py-8 text-left"
              >
                <span className="font-serif italic text-sm sm:text-lg text-smoke group-hover:text-vermilion transition-colors duration-300">
                  ({s.number})
                </span>
                <span
                  className={`font-display font-medium uppercase tracking-tight text-2xl sm:text-4xl lg:text-5xl transition-transform duration-500 ${
                    isOpen ? "translate-x-2 sm:translate-x-4" : "group-hover:translate-x-2 sm:group-hover:translate-x-4"
                  }`}
                >
                  {s.main}{" "}
                  <span className="font-serif italic normal-case font-normal tracking-normal text-vermilion underline decoration-2 underline-offset-8">
                    {s.accent}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? "bg-ink text-paper border-ink" : "border-ink/20 group-hover:bg-acid group-hover:border-acid"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-8 sm:pb-10 pl-10 sm:pl-20 max-w-2xl text-sm sm:text-base text-smoke leading-relaxed"
                      data-testid={`service-description-${s.number}`}
                    >
                      {s.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <motion.div style={{ x: spx, y: spy }} className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block" aria-hidden="true">
        <AnimatePresence>
          {hovered >= 0 && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.6, rotate: -10, x: "-50%", y: "-115%" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: "-50%", y: "-115%" }}
              exit={{ opacity: 0, scale: 0.6, rotate: 10, x: "-50%", y: "-115%" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="w-44 aspect-square"
              data-testid="service-hover-preview"
            >
              <OrbPreview index={hovered} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
