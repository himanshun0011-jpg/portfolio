import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import LogoMark from "./LogoMark";
import { BRAND } from "../data/content";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

const go = (e, href, after) => {
  e.preventDefault();
  after && after();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled ? "bg-paper/85 backdrop-blur-xl border-b border-ink/10" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
        <a href="#top" onClick={(e) => go(e, "#top")} data-testid="nav-logo-link" className="flex items-center gap-3 group">
          <LogoMark className="w-7 h-7 transition-transform duration-700 group-hover:rotate-[360deg]" />
          <span className="font-display font-extrabold tracking-tight text-lg">
            {BRAND.name}
            <sup className="text-[10px] align-super">®</sup>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="font-mono text-xs uppercase tracking-[0.2em] text-smoke hover:text-ink transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            data-testid="nav-cta-button"
            className="group inline-flex items-center gap-2 bg-ink text-paper font-mono text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full hover:bg-acid hover:text-ink transition-colors duration-300"
          >
            Start a project
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <button
          data-testid="nav-menu-toggle"
          className="md:hidden p-2"
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
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href, () => setOpen(false))}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                  className="font-display font-bold uppercase tracking-tight text-3xl"
                >
                  {l.label}
                </a>
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
    </header>
  );
}
