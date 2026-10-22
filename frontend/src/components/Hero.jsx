import { useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { BRAND, HERO_IMAGES } from "../data/content";
import VelocityMarquee from "./VelocityMarquee";

const LINES = ["CREATIVITY", "AS A", "SERVICE"];
const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yStrip = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 55, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 55, damping: 18 });
  const stripX = useTransform(mx, (v) => v * 0.6);
  const stripY = useTransform(my, (v) => v * 0.6);

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mxRaw.set(((e.clientX - r.left) / r.width - 0.5) * -28);
    myRaw.set(((e.clientY - r.top) / r.height - 0.5) * -18);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      data-testid="hero-section"
      className="relative pt-28 sm:pt-40 overflow-hidden"
    >
      <motion.div style={{ y: yTitle, opacity }} className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-smoke">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} data-testid="hero-location-label">
            {BRAND.location}
          </motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.8 }} data-testid="hero-year-label">
            ©{BRAND.year}
          </motion.span>
        </div>

        <motion.div style={{ x: mx, y: my }}>
          <h1 className="mt-8 sm:mt-12 font-display font-black uppercase leading-[0.88] tracking-[-0.03em] text-[8.8vw] sm:text-[9.5vw] lg:text-[8.8vw] xl:text-[8.2vw]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: EASE }}
                  data-testid={`hero-line-${i}`}
                >
                  {line}
                  {i === 2 && <span className="text-vermilion">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
            className="max-w-md text-sm sm:text-base text-smoke leading-relaxed"
            data-testid="hero-subtitle"
          >
            Independent designer crafting interfaces, identities and kinetic systems for brands that refuse to be ignored.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink"
            data-testid="hero-availability-pill"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-acid border border-ink/25"></span>
            </span>
            Available for Q3 {BRAND.year}
          </motion.div>
        </div>
      </motion.div>

      <motion.div style={{ y: yStrip }} className="mt-14 sm:mt-20 pb-16 sm:pb-24">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 1, ease: EASE }}>
          <motion.div style={{ x: stripX, y: stripY }} data-testid="hero-image-marquee">
            <VelocityMarquee baseVelocity={2.2} className="border-y border-ink/10 py-4 sm:py-6" rowClassName="gap-4 sm:gap-6 pr-4 sm:pr-6">
              {HERO_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="animate-bob relative h-[30vh] sm:h-[42vh] aspect-[4/5] overflow-hidden shrink-0 group"
                  style={{ animationDuration: `${4.2 + (i % 3) * 0.9}s`, animationDelay: `${i * 0.55}s` }}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading={i < HERO_IMAGES.length ? "eager" : "lazy"}
                    className="h-full w-full object-cover grayscale-[40%] transition-[filter,transform] duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
              ))}
            </VelocityMarquee>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
