// One seamless 1440px pattern = 3 full gentle waves (480px wavelength each),
// every period starts/ends at y=80 with horizontal tangents so the loop is invisible.
// Slight per-period amplitude variation gives the hand-drawn marker feel.
const WAVE =
  "M0 80 " +
  "C 40 80, 80 44, 120 44 C 160 44, 200 80, 240 80 C 280 80, 320 116, 360 116 C 400 116, 440 80, 480 80 " +
  "C 520 80, 560 46, 600 46 C 640 46, 680 80, 720 80 C 760 80, 800 114, 840 114 C 880 114, 920 80, 960 80 " +
  "C 1000 80, 1040 42, 1080 42 C 1120 42, 1160 80, 1200 80 C 1240 80, 1280 118, 1320 118 C 1360 118, 1400 80, 1440 80";

const WaveStrip = () => (
  <svg viewBox="0 0 1440 160" className="h-full w-auto shrink-0" preserveAspectRatio="none" aria-hidden="true">
    <path d={WAVE} fill="none" stroke="#FF4000" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WaveDivider({ className = "" }) {
  return (
    <div
      data-testid="wave-divider"
      aria-hidden="true"
      className={`relative h-32 sm:h-40 overflow-hidden pointer-events-none ${className}`}
    >
      <div className="flex w-max h-full animate-wave">
        <WaveStrip />
        <WaveStrip />
      </div>
    </div>
  );
}
