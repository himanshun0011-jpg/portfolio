// One full wave period (180px) that starts and ends at y=40 with matching
// tangents, so tiles join seamlessly. Slight irregularity baked in via the
// ghost stroke offset for a hand-drawn feel.
const TILE = "M0 40 C 28 12, 58 12, 88 40 C 116 66, 148 68, 180 40";

const TileRow = () => (
  <div className="flex shrink-0">
    {Array.from({ length: 12 }).map((_, i) => (
      <svg key={i} viewBox="0 0 180 80" className="w-[180px] h-full shrink-0" aria-hidden="true">
        {/* sketchy ghost stroke for the hand-drawn feel */}
        <path d={TILE} fill="none" stroke="#FF4000" strokeWidth="2" strokeLinecap="round" opacity="0.3" transform="translate(1.5, 2.5)" />
        <path d={TILE} fill="none" stroke="#FF4000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ))}
  </div>
);

export default function WaveDivider({ className = "" }) {
  return (
    <div
      data-testid="wave-divider"
      aria-hidden="true"
      className={`relative h-14 sm:h-16 overflow-hidden pointer-events-none ${className}`}
    >
      <div className="flex w-max h-full animate-wave">
        <TileRow />
        <TileRow />
      </div>
    </div>
  );
}
