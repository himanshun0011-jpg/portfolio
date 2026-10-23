import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import LogoMark from "./LogoMark";
import { BRAND } from "../data/content";

const EASE = [0.76, 0, 0.24, 1];

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 300),
    });
    return () => {
      controls.stop();
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <motion.div
      data-testid="preloader"
      className="fixed inset-0 z-[300] bg-ink text-paper flex flex-col justify-between overflow-hidden"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
        <div className="flex items-center gap-3" data-testid="preloader-logo">
          <LogoMark className="w-7 h-7" />
          <span className="font-display font-medium tracking-tight">{BRAND.name}®</span>
        </div>
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-paper/50">
          portfolio ©{BRAND.year}
        </span>
      </div>

      <div className="px-6 sm:px-10">
        <span className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block font-serif italic text-acid text-xl sm:text-2xl"
          >
            {BRAND.tagline}
          </motion.span>
        </span>
        <span className="block overflow-hidden mt-2">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block font-display font-medium uppercase tracking-[-0.03em] leading-[0.9] text-[12vw] sm:text-[9vw]"
          >
            {BRAND.name}
            <span className="text-vermilion">®</span>
          </motion.span>
        </span>
      </div>

      <div className="flex items-end justify-between px-6 sm:px-10 pb-6 sm:pb-8">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-paper/50" data-testid="preloader-status">
          [ loading the loop ]
        </span>
        <span
          className="font-display font-medium leading-none tracking-[-0.04em] text-[22vw] sm:text-[14vw] text-paper/90 select-none"
          data-testid="preloader-counter"
        >
          {count}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-paper/10">
        <div
          className="h-full bg-acid transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
          data-testid="preloader-progress"
        />
      </div>
    </motion.div>
  );
}
