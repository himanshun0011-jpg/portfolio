import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS } from "../data/content";
import TransitionPage from "../components/TransitionPage";

const EASE = [0.16, 1, 0.3, 1];

export default function CasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idx = PROJECTS.findIndex((p) => p.id === id);
  const p = idx >= 0 ? PROJECTS[idx] : null;
  const next = PROJECTS[(Math.max(idx, 0) + 1) % PROJECTS.length];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [id]);

  if (!p) {
    return (
      <TransitionPage>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="font-display font-extrabold uppercase tracking-tight text-4xl">Case not found</h1>
          <Link to="/" data-testid="case-not-found-home-link" className="u-link font-mono text-xs uppercase tracking-[0.2em] text-smoke">
            Back to all work
          </Link>
        </div>
      </TransitionPage>
    );
  }

  const words = p.title.split(" ");
  const gallery = p.gallery || [p.image];

  return (
    <TransitionPage>
      <main className="pt-28 sm:pt-36">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16">
          <button
            onClick={() => navigate("/")}
            data-testid="case-back-button"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-smoke hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" /> All work
          </button>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-smoke" data-testid="case-meta">
            <span>{p.category}</span>
            <span>{p.client}</span>
            <span>©{p.year}</span>
          </div>

          <h1
            className="mt-6 font-display font-black uppercase tracking-[-0.03em] leading-[0.9] text-[11vw] sm:text-[9vw] lg:text-[7.5vw]"
            data-testid="case-title"
          >
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] mr-[0.22em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.45 + i * 0.07, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div ref={heroRef} className="mt-12 sm:mt-16 max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
            className="relative overflow-hidden aspect-[16/10] sm:aspect-[21/9]"
            data-testid="case-hero-image"
          >
            <motion.img src={p.image} alt={p.title} style={{ y: yImg }} className="w-full h-[120%] object-cover" />
          </motion.div>
        </div>

        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke">[ the brief ]</span>
            <p className="mt-6 font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-tight max-w-3xl" data-testid="case-description">
              {p.description}
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:pt-10">
            {[
              ["Client", p.client],
              ["Year", p.year],
              ["Scope", p.category],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-dashed border-ink/25 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">{k}</span>
                <p className="mt-1 font-display font-bold text-lg">{v}</p>
              </div>
            ))}
            <div className="border-t border-dashed border-ink/25 pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">Deliverables</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] uppercase tracking-[0.15em] border border-ink/20 rounded-full px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {gallery.length > 1 && (
          <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 pb-20 sm:pb-32" data-testid="case-gallery-section">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke">[ project artifacts ]</span>
            <div className="mt-8 grid md:grid-cols-2 gap-6 sm:gap-8">
              {gallery.map((imgUrl, i) => (
                <div key={i} className="aspect-[4/5] overflow-hidden bg-paper2" data-testid={`case-gallery-item-${i}`}>
                  <img src={imgUrl} alt={`${p.title} view ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          to={`/work/${next.id}`}
          data-testid="case-next-project-link"
          className="group block border-t border-ink/10 bg-ink text-paper hover:bg-acid hover:text-ink transition-colors duration-500"
        >
          <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
            <span className="font-mono text-xs uppercase tracking-[0.25em] opacity-60">Next case</span>
            <div className="mt-4 flex items-center justify-between gap-6">
              <span className="font-display font-black uppercase tracking-[-0.02em] leading-[0.95] text-[9vw] sm:text-[7vw] lg:text-[5.5vw]">
                {next.title}
              </span>
              <ArrowRight className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 transition-transform duration-500 group-hover:translate-x-3" />
            </div>
          </div>
        </Link>
      </main>
    </TransitionPage>
  );
}
