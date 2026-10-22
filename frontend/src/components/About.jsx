import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { ABOUT_IMAGES } from "../data/content";
import { Reveal } from "./Reveal";

const STATEMENT =
  "I'm Himanshu — founder of SocialFloe. I help small businesses, startups and D2C brands win attention with social media content, design and AI video that actually converts.";

const Word = ({ progress, range, children }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>{" "}
    </>
  );
};

const ScrollWords = ({ text, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} data-testid="about-paragraph">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
};

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [110, -110]);

  return (
    <section id="studio" ref={ref} data-testid="about-section" className="relative bg-ink text-paper overflow-hidden">
      <motion.div
        className="absolute top-24 right-[12%] text-vermilion/50"
        animate={{ rotate: 360, y: [0, -18, 0] }}
        transition={{ rotate: { duration: 24, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        aria-hidden="true"
      >
        <Asterisk className="w-10 h-10" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[6%] text-acid/40"
        animate={{ rotate: -360, y: [0, 16, 0] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
        aria-hidden="true"
      >
        <Asterisk className="w-7 h-7" />
      </motion.div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-32 lg:py-40">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50" data-testid="about-label">
          [ who i am ]
        </span>
        <h2 className="mt-8 font-display font-extrabold uppercase tracking-tight leading-[0.95] text-4xl sm:text-6xl lg:text-7xl max-w-5xl">
          <Reveal>One designer.</Reveal>
          <Reveal delay={0.08}>Founder of</Reveal>
          <Reveal delay={0.16}>
            <span className="font-serif italic normal-case font-normal text-acid">SocialFloe.</span>
          </Reveal>
        </h2>

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <ScrollWords
              text={STATEMENT}
              className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-tight max-w-xl"
            />
            <p className="mt-8 text-paper/50 text-sm sm:text-base leading-relaxed max-w-md">
              You brief me — I design, animate and ship. No hand-offs, no telephone game. Just work that makes people
              stop scrolling.
            </p>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                window.__lenis?.scrollTo("#work", { offset: -70, duration: 1.4 });
              }}
              data-testid="about-cta-link"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] border border-paper/25 rounded-full px-6 py-3 hover:bg-acid hover:text-ink hover:border-acid transition-colors duration-300 group"
            >
              See the work
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <motion.div style={{ y: y1 }} className="aspect-[3/4] overflow-hidden">
              <img src={ABOUT_IMAGES[0].url} alt={ABOUT_IMAGES[0].description} loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="aspect-[3/4] overflow-hidden mt-10">
              <img src={ABOUT_IMAGES[1].url} alt={ABOUT_IMAGES[1].description} loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
