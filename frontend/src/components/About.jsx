import { motion } from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { ABOUT } from "../data/content";
import { Reveal } from "./Reveal";

const SectionTitle = ({ children, testid }) => (
  <Reveal>
    <h3 data-testid={testid} className="font-serif italic text-acid text-3xl sm:text-4xl tracking-tight">
      {children}
    </h3>
  </Reveal>
);

// Adobe product icon colors: [tile background, letter color]
const TOOL_STYLES = {
  Ps: ["#001E36", "#31A8FF"],
  Ai: ["#330000", "#FF9A00"],
  Ae: ["#00005B", "#9999FF"],
  Pr: ["#2B0A30", "#EA77FF"],
  Lr: ["#0A2A41", "#31A8FF"],
  Fr: ["#2B1500", "#FFB13D"],
};

const TOOL_NAMES = {
  Ps: "Photoshop",
  Ai: "Illustrator",
  Ae: "After Effects",
  Pr: "Premiere Pro",
  Lr: "Lightroom",
  Fr: "Fresco",
};

export default function About() {
  return (
    <section id="studio" data-testid="about-section" className="relative bg-ink text-paper overflow-hidden">
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

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-32">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50" data-testid="about-label">
          [ who i am ]
        </span>

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Left — name, bio, contact */}
          <div className="lg:col-span-5">
            <h2
              className="font-display font-medium uppercase tracking-tight leading-[0.9] text-5xl sm:text-7xl lg:text-[5.2vw]"
              data-testid="about-name"
            >
              <Reveal>Himanshu</Reveal>
              <Reveal delay={0.08}>
                <span className="text-outline-paper">Nautiyal</span>
              </Reveal>
            </h2>
            <p className="mt-8 text-paper/75 leading-relaxed max-w-md" data-testid="about-bio">
              {ABOUT.bio}
            </p>
            <p className="mt-5 text-paper/50 text-sm leading-relaxed max-w-md">{ABOUT.note}</p>
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

          {/* Right — experience, education, tools, skills */}
          <div className="lg:col-span-7 lg:row-span-2 flex flex-col gap-14">
            <div>
              <SectionTitle testid="about-experience-title">Experience</SectionTitle>
              <div className="mt-6 border-t border-dashed border-paper/20">
                {ABOUT.experience.map((e, i) => (
                  <div
                    key={e.org}
                    className="py-6 border-b border-dashed border-paper/20 grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6"
                    data-testid={`experience-item-${i}`}
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-paper/50 pt-1.5">{e.years}</span>
                    <div>
                      <p className="font-display font-medium text-xl sm:text-2xl tracking-tight">
                        {e.org} <span className="text-paper/50 font-normal text-base sm:text-lg">— {e.role}</span>
                      </p>
                      <p className="mt-2 text-sm text-paper/60 leading-relaxed max-w-xl">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-14">
              <div>
                <SectionTitle testid="about-education-title">Education</SectionTitle>
                <div className="mt-6" data-testid="education-item">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-paper/50">{ABOUT.education.years}</span>
                  <p className="mt-2 font-display font-medium text-xl tracking-tight">{ABOUT.education.school}</p>
                  <p className="mt-1 text-sm text-paper/60">{ABOUT.education.degree}</p>
                </div>
              </div>
              <div>
                <SectionTitle testid="about-tools-title">Tools</SectionTitle>
                <div className="mt-6 flex flex-wrap gap-3" data-testid="tools-list">
                  {ABOUT.tools.map((t) => (
                    <span
                      key={t}
                      data-testid={`tool-chip-${t.toLowerCase()}`}
                      title={TOOL_NAMES[t]}
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-semibold text-lg transition-transform duration-300 hover:-translate-y-1 hover:rotate-3"
                      style={{ background: TOOL_STYLES[t][0], color: TOOL_STYLES[t][1], boxShadow: "0 8px 20px rgba(0,0,0,0.22)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <SectionTitle testid="about-skills-title">Skills</SectionTitle>
              <div className="mt-6 flex flex-wrap gap-2.5" data-testid="abilities-list">
                {ABOUT.abilities.map((a) => (
                  <span
                    key={a}
                    className="font-mono text-[11px] uppercase tracking-[0.12em] border border-paper/25 rounded-full px-4 py-2 text-paper/70"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact — bottom on mobile, left column on desktop */}
          <div className="lg:col-span-5 mt-14 lg:mt-0">
            <SectionTitle testid="about-contact-title">Contact</SectionTitle>
            <div className="mt-6 flex flex-col">
              {ABOUT.contact.map((c) => (
                <div
                  key={c.label}
                  className="flex items-baseline gap-6 border-b border-dashed border-paper/20 py-4"
                  data-testid={`about-contact-${c.label.toLowerCase()}`}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50 w-20 shrink-0">{c.label}</span>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="u-link font-medium text-sm sm:text-base break-all"
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
