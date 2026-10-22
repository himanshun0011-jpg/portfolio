import { Star, ArrowUpRight, BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    quote: "Himanshu took our Instagram from invisible to unmissable. The content quality is unreal for the price.",
    name: "Founder",
    role: "D2C Skincare Brand",
  },
  {
    quote: "The ad creatives doubled our CTR in the first month. Fast, sharp, zero hand-holding needed.",
    name: "Marketing Lead",
    role: "Early-stage Startup",
  },
  {
    quote: "Every reel feels like a mini production. Our engagement has never been this consistent.",
    name: "Owner",
    role: "Apparel Label",
  },
];

export default function Testimonials() {
  return (
    <section id="proof" data-testid="testimonials-section" className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-32">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke">[ receipts ]</span>
      <Reveal>
        <h2 className="mt-6 font-display font-extrabold uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl">
          Proof, not <span className="font-serif italic normal-case font-normal text-vermilion">promises.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <a
          href="https://www.upwork.com/"
          target="_blank"
          rel="noreferrer"
          data-testid="upwork-badge-link"
          className="group bg-ink text-paper rounded-2xl p-8 flex flex-col justify-between min-h-[280px] hover:bg-[#14a800] transition-colors duration-500"
        >
          <div className="flex items-start justify-between">
            <BadgeCheck className="w-9 h-9 text-acid group-hover:text-ink transition-colors duration-500" />
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-acid text-acid group-hover:fill-ink group-hover:text-ink transition-colors duration-500" />
              ))}
            </div>
            <p className="mt-4 font-display font-extrabold uppercase tracking-tight text-3xl leading-none">Top Rated Plus</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/60 group-hover:text-ink/70 transition-colors duration-500">
              on Upwork — view profile
            </p>
          </div>
        </a>

        {TESTIMONIALS.map((t, i) => (
          <figure
            key={i}
            data-testid={`testimonial-card-${i}`}
            className="border border-ink/15 rounded-2xl p-8 flex flex-col justify-between min-h-[280px] bg-paper2/60 hover:border-ink transition-colors duration-500"
          >
            <blockquote className="font-display font-bold text-xl sm:text-2xl leading-snug tracking-tight">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-smoke">
              {t.name} — {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
