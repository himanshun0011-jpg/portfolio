export default function LogoMark({ className = "w-7 h-7", inverted = false }) {
  return (
    <svg viewBox="0 0 32 32" className={className} data-testid="logo-mark" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill={inverted ? "#F7F6F0" : "#2C180F"} />
      <path
        d="M10 8.5v15 M21 8.5v15 M10 16h11"
        fill="none"
        stroke={inverted ? "#2C180F" : "#FF4000"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="24.5" cy="7.5" r="2" fill="#FF4000" />
    </svg>
  );
}
