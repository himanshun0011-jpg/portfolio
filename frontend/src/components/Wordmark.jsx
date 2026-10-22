import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useOnceInView } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1];

const Letters = ({ text, shown, base = 0, className = "" }) => (
  <span className={className}>
    {text.split("").map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <motion.span
          className={`inline-block ${ch === "®" ? "text-vermilion" : ""}`}
          initial={false}
          animate={{ y: shown ? 0 : "108%" }}
          transition={{ duration: 0.9, delay: base + i * 0.045, ease: EASE }}
        >
          {ch}
        </motion.span>
      </span>
    ))}
  </span>
);

export default function Wordmark() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-16%"]);
  const [viewRef, shown] = useOnceInView(0.2);

  return (
    <section ref={ref} data-testid="wordmark-section" className="py-16 sm:py-24 overflow-hidden border-b border-ink/10">
      <div ref={viewRef}>
        <motion.h2
          style={{ x }}
          className="whitespace-nowrap font-display font-black uppercase tracking-[-0.04em] leading-none text-[24vw] sm:text-[20vw] select-none"
          data-testid="wordmark-giant-text"
        >
          <Letters text="DUARTE®" shown={shown} /> <Letters text="DUARTE®" shown={shown} base={0.35} className="text-outline" />
        </motion.h2>
      </div>
      <p
        className="px-4 sm:px-8 lg:px-16 max-w-[1700px] mx-auto mt-6 font-mono text-xs uppercase tracking-[0.3em] text-smoke"
        data-testid="wordmark-tagline"
      >
        design · motion · internet
      </p>
    </section>
  );
}
