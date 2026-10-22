import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ABOUT_IMAGES } from "../data/content";
import { Reveal } from "./Reveal";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [110, -110]);

  return (
    <section id="studio" ref={ref} data-testid="about-section" className="bg-ink text-paper overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-32 lg:py-40">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50" data-testid="about-label">
          [ who we are ]
        </span>
        <h2 className="mt-8 font-display font-extrabold uppercase tracking-tight leading-[0.95] text-4xl sm:text-6xl lg:text-7xl max-w-5xl">
          <Reveal>One designer.</Reveal>
          <Reveal delay={0.08}>Every craft</Reveal>
          <Reveal delay={0.16}>
            <span className="text-acid">in the loop.</span>
          </Reveal>
        </h2>

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-paper/70 text-base sm:text-lg leading-relaxed max-w-xl" data-testid="about-paragraph">
              DUARTE is an independent design practice merging UI/UX, art direction and motion into a single responsive
              service. No hand-offs, no telephone game — the person you brief is the person who designs, animates and
              ships. One goal: being responsive to everyday creative needs, from Brasil to everywhere.
            </p>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
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
