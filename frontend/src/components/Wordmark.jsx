import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Wordmark() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-16%"]);

  return (
    <section ref={ref} data-testid="wordmark-section" className="py-16 sm:py-24 overflow-hidden border-b border-ink/10">
      <motion.h2
        style={{ x }}
        className="whitespace-nowrap font-display font-black uppercase tracking-[-0.04em] leading-none text-[24vw] sm:text-[20vw] select-none"
        data-testid="wordmark-giant-text"
      >
        DUARTE<span className="text-vermilion">®</span> <span className="text-outline">DUARTE</span>
        <span className="text-vermilion">®</span>
      </motion.h2>
      <p
        className="px-4 sm:px-8 lg:px-16 max-w-[1700px] mx-auto mt-6 font-mono text-xs uppercase tracking-[0.3em] text-smoke"
        data-testid="wordmark-tagline"
      >
        design · motion · internet
      </p>
    </section>
  );
}
