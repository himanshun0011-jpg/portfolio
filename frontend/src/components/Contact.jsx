import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowUp, MessageCircle } from "lucide-react";
import { BRAND } from "../data/content";
import { Reveal } from "./Reveal";
import LogoMark from "./LogoMark";

export default function Contact() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer id="contact" data-testid="contact-section" className="bg-ink text-paper">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 pt-20 sm:pt-32">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50">[ your move ]</span>
        <h2 className="mt-8 font-display font-black uppercase tracking-[-0.02em] leading-[0.92] text-[13vw] sm:text-[10vw] lg:text-[7.2vw]">
          <Reveal>Let&apos;s make</Reveal>
          <Reveal delay={0.08}>something</Reveal>
          <Reveal delay={0.16}>
            <span className="inline-block bg-acid text-ink px-[0.15em] -rotate-1">
              worth sharing<span className="text-vermilion">.</span>
            </span>
          </Reveal>
        </h2>

        <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${BRAND.email}?subject=Book%20a%20call`}
            data-testid="cta-book-call-button"
            className="group inline-flex items-center gap-3 bg-paper text-ink font-mono text-xs sm:text-sm uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-acid transition-colors duration-300"
          >
            Book a call
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            data-testid="cta-whatsapp-button"
            className="group inline-flex items-center gap-3 border border-paper/30 text-paper font-mono text-xs sm:text-sm uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-[#25D366] hover:border-[#25D366] hover:text-ink transition-colors duration-300"
          >
            WhatsApp
            <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-paper/50">
          or write to{" "}
          <a href={`mailto:${BRAND.email}`} data-testid="cta-email-button" className="u-link text-paper">
            {BRAND.email}
          </a>
        </p>

        <div className="mt-20 sm:mt-28 border-t border-paper/15 pt-10 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="w-8 h-8" inverted />
              <span className="font-display font-extrabold text-lg tracking-tight">{BRAND.fullName}®</span>
            </div>
            <p className="mt-4 text-paper/50 text-sm max-w-xs">
              Founder, SocialFloe. {BRAND.role}. {BRAND.location}
            </p>
          </div>
          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.2em]">
            <span className="text-paper/40 mb-1">Socials</span>
            {["Instagram", "LinkedIn", "Behance"].map((s) => (
              <a
                key={s}
                href="#"
                onClick={(e) => e.preventDefault()}
                data-testid={`social-link-${s.toLowerCase()}`}
                className="text-paper/70 hover:text-acid transition-colors inline-flex items-center gap-2 w-fit"
              >
                {s} <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.2em]">
            <span className="text-paper/40 mb-1">Studio</span>
            <a href={`mailto:${BRAND.email}`} data-testid="footer-email-link" className="text-paper/70 hover:text-acid transition-colors w-fit">
              {BRAND.email}
            </a>
            <span className="text-paper/70" data-testid="footer-clock">
              New Delhi — {time}
            </span>
            <span className="text-paper/70">©{BRAND.year} All rights looped</span>
          </div>
        </div>

        <div className="flex justify-end py-8">
          <button
            data-testid="back-to-top-button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-11 h-11 rounded-full border border-paper/25 flex items-center justify-center hover:bg-acid hover:text-ink hover:border-acid transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
