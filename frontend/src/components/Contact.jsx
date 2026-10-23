import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowUp, MessageCircle } from "lucide-react";
import { BRAND } from "../data/content";
import { Reveal } from "./Reveal";
import LogoMark from "./LogoMark";

export default function Contact() {
  const [time, setTime] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

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

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { name: fd.get("name"), email: fd.get("email"), message: fd.get("message") };
    if (BRAND.formspree) {
      setSending(true);
      try {
        const res = await fetch(BRAND.formspree, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) setSent(true);
      } finally {
        setSending(false);
      }
    } else {
      const subject = encodeURIComponent(`New project brief — ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
      setSent(true);
    }
  };

  return (
    <footer id="contact" data-testid="contact-section" className="bg-ink text-paper">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 pt-20 sm:pt-32">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50">[ your move ]</span>
        <h2 className="mt-8 font-display font-medium uppercase tracking-[-0.02em] leading-[0.92] text-[13vw] sm:text-[10vw] lg:text-[7.2vw]">
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
            href="https://wa.me/918264342808?text=Hi%20Himanshu%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project."
            target="_blank"
            rel="noreferrer"
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

        <div className="mt-14 sm:mt-20 border border-paper/15 rounded-2xl p-6 sm:p-10 bg-white/[0.03]" data-testid="contact-form-card">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50">[ or drop a brief ]</span>
          {sent ? (
            <p className="mt-6 font-display font-medium text-2xl sm:text-3xl tracking-tight" data-testid="contact-form-status">
              Brief received. I reply within 24 hours.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-8 grid sm:grid-cols-2 gap-4" data-testid="contact-form">
              <input
                name="name"
                required
                placeholder="Your name"
                data-testid="contact-name-input"
                className="bg-transparent border border-paper/25 rounded-full px-6 py-4 font-mono text-sm placeholder:text-paper/35 focus:outline-none focus:border-acid transition-colors"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Your email"
                data-testid="contact-email-input"
                className="bg-transparent border border-paper/25 rounded-full px-6 py-4 font-mono text-sm placeholder:text-paper/35 focus:outline-none focus:border-acid transition-colors"
              />
              <textarea
                name="message"
                required
                placeholder="Tell me about your brand and what you need"
                data-testid="contact-message-input"
                className="sm:col-span-2 bg-transparent border border-paper/25 rounded-2xl px-6 py-4 font-mono text-sm placeholder:text-paper/35 focus:outline-none focus:border-acid transition-colors min-h-[130px] resize-y"
              />
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={sending}
                  data-testid="contact-submit-button"
                  className="bg-acid text-ink font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-paper transition-colors duration-300 disabled:opacity-50"
                >
                  {sending ? "Sending…" : "Send the brief"}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-20 sm:mt-28 border-t border-paper/15 pt-10 grid md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="w-8 h-8" inverted />
              <span className="font-display font-medium text-lg tracking-tight">{BRAND.fullName}®</span>
            </div>
            <p className="mt-4 text-paper/50 text-sm max-w-xs">
              Founder, SocialFloe. {BRAND.role}. {BRAND.location}
            </p>
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
