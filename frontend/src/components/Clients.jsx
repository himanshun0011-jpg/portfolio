import { Asterisk } from "lucide-react";
import { CLIENTS } from "../data/content";
import VelocityMarquee from "./VelocityMarquee";

export default function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section data-testid="clients-section" className="border-y border-ink/10 py-10 sm:py-14 overflow-hidden bg-paper2">
      <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-smoke mb-8" data-testid="clients-label">
        Trusted by teams at
      </p>
      <div data-testid="clients-marquee">
        <VelocityMarquee baseVelocity={1.1} rowClassName="items-center">
          {row.map((c, i) => (
            <span key={i} className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 shrink-0">
              <span className="font-display font-extrabold uppercase tracking-tight text-2xl sm:text-4xl text-ink/80">{c}</span>
              <Asterisk className="w-5 h-5 sm:w-7 sm:h-7 text-vermilion" />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
