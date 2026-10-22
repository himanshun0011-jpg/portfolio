import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SERVICES } from "../data/content";
import { Reveal } from "./Reveal";

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" data-testid="services-section" className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-32">
      <div className="flex items-end justify-between mb-10 sm:mb-16">
        <Reveal>
          <h2 className="font-display font-extrabold uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl">Capabilities</h2>
        </Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke hidden sm:block" data-testid="services-count-label">
          ( 01 — 05 )
        </span>
      </div>

      <div className="border-t border-ink/15">
        {SERVICES.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={s.number} className="border-b border-ink/15" data-testid={`service-row-${s.number}`}>
              <button
                data-testid={`service-toggle-${s.number}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-10 py-6 sm:py-8 text-left"
              >
                <span className="font-mono text-xs sm:text-sm text-smoke group-hover:text-vermilion transition-colors duration-300">
                  ({s.number})
                </span>
                <span
                  className={`font-display font-bold uppercase tracking-tight text-2xl sm:text-4xl lg:text-5xl transition-transform duration-500 ${
                    isOpen ? "translate-x-2 sm:translate-x-4" : "group-hover:translate-x-2 sm:group-hover:translate-x-4"
                  }`}
                >
                  {s.title}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
    </section>
  );
}
