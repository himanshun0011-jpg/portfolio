import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { PROJECTS } from "../data/content";
import { Reveal } from "./Reveal";

const isVideo = (url) => url.endsWith(".mp4");

const ProjectCard = ({ p, i }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
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
      onClick={() => navigate(`/work/${p.id}`)}
    >
      <div ref={ref} className="relative overflow-hidden aspect-square bg-paper2">
        {isVideo(p.image) ? (
          <motion.video
            src={p.image}
            poster={p.poster}
            style={{ y }}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[116%] object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <motion.img
            src={p.image}
            alt={p.title}
            loading="lazy"
            style={{ y }}
            className="w-full h-[116%] object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-[#2C180F]/0 group-hover:bg-[#2C180F]/35 transition-colors duration-500 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 bg-acid text-ink font-mono text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full inline-flex items-center gap-2">
            View case <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] bg-paper/90 backdrop-blur px-3 py-1.5 rounded-full">
          {p.category}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-ink" data-testid={`post-actions-${p.id}`}>
        <div className="flex items-center gap-4">
          <Heart className="w-5 h-5 transition-all duration-300 group-hover:fill-acid group-hover:text-acid group-hover:scale-110" />
          <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <Send className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <Bookmark className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <h3 className="font-display font-medium text-xl sm:text-2xl tracking-tight leading-tight">{p.title}</h3>
        <span className="font-mono text-xs text-smoke mt-1.5 shrink-0">{p.year}</span>
      </div>
    </motion.article>
  );
};

export default function Work() {
  return (
    <section id="work" data-testid="work-section" className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-32">
      <div className="mb-10 sm:mb-14">
        <Reveal>
          <h2 className="font-display font-medium uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl">Social Media Design</h2>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" data-testid="work-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
