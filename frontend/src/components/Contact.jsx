import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { BRAND } from "../data/content";
import { Reveal } from "./Reveal";
import LogoMark from "./LogoMark";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/newsletter`, { email });
      toast.success(data.message || "You're in the loop.");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" data-testid="contact-section" className="bg-ink text-paper">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 pt-20 sm:pt-32">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50">[ your move ]</span>
        <h2 className="mt-8 font-display font-black uppercase tracking-[-0.02em] leading-[0.92] text-[13vw] sm:text-[10vw] lg:text-[8.5vw]">
          <Reveal>Let&apos;s make</Reveal>
          <Reveal delay={0.08}>something</Reveal>
          <Reveal delay={0.16}>
            <span className="inline-block bg-acid text-ink px-[0.15em] -rotate-1">worth</span>
            <span className="text-vermilion">.</span>
          </Reveal>
        </h2>

        <a
          href={`mailto:${BRAND.email}`}
          data-testid="cta-email-button"
          className="mt-10 sm:mt-14 inline-flex items-center gap-3 bg-paper text-ink font-mono text-xs sm:text-sm uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-acid transition-colors duration-300 group"
        >
          Your next project starts here
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>

        <div
          className="mt-16 sm:mt-24 border border-paper/15 rounded-2xl p-6 sm:p-10 grid lg:grid-cols-2 gap-8 items-center bg-white/[0.03]"
          data-testid="newsletter-card"
        >
          <div>
            <h3 className="font-display font-extrabold uppercase tracking-tight text-2xl sm:text-3xl leading-tight">
              Get the best of the loop, weekly
            </h3>
            <p className="mt-3 text-paper/60 text-sm sm:text-base">
              New work, process notes and internet oddities. No spam — unsubscribe anytime.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3" data-testid="newsletter-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              data-testid="newsletter-email-input"
              className="flex-1 bg-transparent border border-paper/25 rounded-full px-6 py-4 font-mono text-sm placeholder:text-paper/35 focus:outline-none focus:border-acid transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              data-testid="newsletter-submit-button"
              className="bg-acid text-ink font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-paper transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Joining…" : "Join the loop"}
            </button>
          </form>
        </div>

        <div className="mt-16 sm:mt-24 border-t border-paper/15 pt-10 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="w-8 h-8" inverted />
              <span className="font-display font-extrabold text-lg tracking-tight">{BRAND.name}®</span>
            </div>
            <p className="mt-4 text-paper/50 text-sm max-w-xs">
              {BRAND.role}. {BRAND.location}
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
              São Paulo — {time}
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
