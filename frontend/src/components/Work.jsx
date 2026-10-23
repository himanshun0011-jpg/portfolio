import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/content";

const isVideo = (url) => url.endsWith(".mp4");

const Media = ({ p, className }) =>
  isVideo(p.image) ? (
    <video src={p.image} poster={p.poster} autoPlay muted loop playsInline className={className} />
  ) : (
    <img src={p.image} alt={p.title} loading="lazy" className={className} />
  );

export default function Work() {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const n = PROJECTS.length;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const goTo = (i) => {
    const el = targetRef.current;
    if (!el) return;
    const top = el.offsetTop + ((i + 0.55) / n) * el.offsetHeight - window.innerHeight / 2;
    if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="work" data-testid="work-section">
      {/* Desktop — scroll-driven sticky gallery */}
      <div ref={targetRef} className="relative hidden lg:block" style={{ height: `${n * 70}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          {/* left — vertical title index */}
          <div className="w-[30%] shrink-0 pl-16 flex flex-col justify-center h-full">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke" data-testid="work-label">
              [ social media design ]
            </span>
            <div className="mt-8 flex flex-col gap-3.5">
              {PROJECTS.map((proj, i) => (
                <button
                  key={proj.id}
                  data-testid={`work-title-${proj.id}`}
                  onClick={() => goTo(i)}
                  className={`flex items-baseline gap-3 text-left transition-all duration-500 ${
                    active === i ? "translate-x-3" : "opacity-35 hover:opacity-70"
                  }`}
                >
                  <span className={`font-mono text-[10px] tracking-[0.2em] ${active === i ? "text-acid" : "text-smoke"}`}>
                    0{i + 1}
                  </span>
                  <span
                    className={`font-display font-medium uppercase tracking-tight text-xl xl:text-2xl transition-colors duration-300 ${
                      active === i ? "text-acid" : "text-ink"
                    }`}
                  >
                    {proj.title}
                  </span>
                </button>
              ))}
            </div>
            <span className="mt-10 font-mono text-xs tracking-[0.25em] text-smoke" data-testid="work-counter">
              {String(active + 1).padStart(2, "0")} — {String(n).padStart(2, "0")}
            </span>
          </div>

          {/* right — media stage */}
          <div className="relative flex-1 h-[76vh] mr-16">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.id}
                data-testid={`work-media-${proj.id}`}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 0.97, y: active === i ? 0 : 24 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ pointerEvents: active === i ? "auto" : "none" }}
              >
                <div
                  className="group relative w-full h-full overflow-hidden rounded-2xl cursor-pointer"
                  data-cursor
                  onClick={() => navigate(`/work/${proj.id}`)}
                >
                  <Media p={proj} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#2C180F]/0 group-hover:bg-[#2C180F]/30 transition-colors duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 bg-acid text-ink font-mono text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full inline-flex items-center gap-2">
                      View case <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] bg-paper/85 backdrop-blur px-3 py-1.5 rounded-full">
                    {proj.category}
                  </span>
                  <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] bg-paper/85 backdrop-blur px-3 py-1.5 rounded-full">
                    ©{proj.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile — stacked large posts */}
      <div className="lg:hidden px-4 sm:px-8 py-20">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke">[ social media design ]</span>
        <div className="mt-8 flex flex-col gap-10">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              data-testid={`work-card-${proj.id}`}
              className="cursor-pointer"
              onClick={() => navigate(`/work/${proj.id}`)}
            >
              <div className="relative overflow-hidden rounded-xl aspect-square bg-paper2">
                <Media p={proj} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] bg-paper/85 backdrop-blur px-3 py-1.5 rounded-full">
                  {proj.category}
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="font-display font-medium uppercase tracking-tight text-xl">{proj.title}</h3>
                <span className="font-mono text-xs text-smoke">{proj.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
