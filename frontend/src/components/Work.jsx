import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { PROJECTS } from "../data/content";
import { Reveal } from "./Reveal";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "uiux", label: "UI/UX" },
  { id: "motion", label: "Motion & 3D" },
  { id: "branding", label: "Branding" },
];

const ProjectCard = ({ p, i, onOpen }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
      className="group cursor-pointer"
      data-testid={`project-card-${p.id}`}
      data-cursor
      onClick={() => onOpen(p)}
    >
      <div ref={ref} className="relative overflow-hidden aspect-[4/5] bg-paper2">
        <motion.img
          src={p.image}
          alt={p.title}
          loading="lazy"
          style={{ y }}
          className="w-full h-[116%] object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/35 transition-colors duration-500 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 bg-acid text-ink font-mono text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full inline-flex items-center gap-2">
            View case <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] bg-paper/90 backdrop-blur px-3 py-1.5 rounded-full">
          {p.category}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight leading-tight">{p.title}</h3>
        <span className="font-mono text-xs text-smoke mt-1.5 shrink-0">{p.year}</span>
      </div>
    </motion.article>
  );
};

export default function Work() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const visible = PROJECTS.filter((p) => filter === "all" || p.filter === filter);

  return (
    <section id="work" data-testid="work-section" className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <Reveal>
          <h2 className="font-display font-extrabold uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl">Selected Work</h2>
        </Reveal>
        <div className="flex flex-wrap gap-2" data-testid="work-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              data-testid={`work-filter-${f.id}`}
              onClick={() => setFilter(f.id)}
              className={`font-mono text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-colors duration-300 ${
                filter === f.id ? "bg-ink text-paper border-ink" : "border-ink/20 text-smoke hover:border-ink hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} onOpen={setActive} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActive(null)}
            data-testid="project-modal"
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-paper max-w-4xl w-full max-h-[90vh] overflow-y-auto grid md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[4/5] md:aspect-auto md:min-h-[560px]">
                <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 sm:p-10 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-smoke">
                    {active.category} — {active.year}
                  </span>
                  <button
                    data-testid="project-modal-close"
                    onClick={() => setActive(null)}
                    className="w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors shrink-0"
                    aria-label="Close project"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h3
                  className="mt-6 font-display font-extrabold uppercase tracking-tight text-3xl sm:text-4xl leading-[0.95]"
                  data-testid="project-modal-title"
                >
                  {active.title}
                </h3>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-vermilion">{active.client}</p>
                <p className="mt-6 text-smoke leading-relaxed text-sm sm:text-base">{active.description}</p>
                <div className="mt-auto pt-8 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase tracking-[0.15em] border border-ink/20 rounded-full px-3 py-1.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
