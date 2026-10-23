import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 160 && !open);
    const y = latest + 90;
    const light = ["studio", "contact"].some((id) => {
      const el = document.getElementById(id);
      return el && y > el.offsetTop && y < el.offsetTop + el.offsetHeight;
    });
    setOnLight(light);
  });

  const go = (e, href, after) => {
    e.preventDefault();
    after && after();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: href } });
      return;
    }
    if (window.__lenis) {
      window.__lenis.scrollTo(href, { offset: -70, duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      data-testid="site-nav"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
        <a href="#top" onClick={(e) => go(e, "#top")} data-testid="nav-logo-link" className="flex items-center group">
          <span
            className={`font-blob inline-block text-2xl leading-none transition-[color,transform] duration-500 group-hover:-rotate-3 group-hover:scale-110 ${
              onLight ? "text-[#2C180F]" : "text-[#F7F6F0]"
            }`}
          >
            Himanshu
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={`u-link font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                onLight ? "text-[#63544B] hover:text-[#2C180F]" : "text-smoke hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            data-testid="nav-cta-button"
            className={`group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-colors duration-300 ${
              onLight ? "bg-[#2C180F] text-[#F7F6F0] hover:bg-acid" : "bg-ink text-paper hover:bg-acid hover:text-ink"
            }`}
          >
            Start a project
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <button
          data-testid="nav-menu-toggle"
          className={`md:hidden p-2 transition-colors duration-300 ${onLight ? "text-[#2C180F]" : "text-[#F7F6F0]"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-paper border-b border-ink/10 overflow-hidden"
            data-testid="nav-mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href, () => setOpen(false))}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-medium uppercase tracking-tight text-3xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={(e) => go(e, "#contact", () => setOpen(false))}
                data-testid="nav-mobile-cta-button"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-ink text-paper font-mono text-xs uppercase tracking-[0.15em] px-5 py-3.5 rounded-full"
              >
                Start a project <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
