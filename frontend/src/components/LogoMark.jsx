export default function LogoMark({ className = "w-7 h-7", inverted = false }) {
  return (
    <svg viewBox="0 0 32 32" className={className} data-testid="logo-mark" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill={inverted ? "#F6F5F2" : "#121212"} />
      <path
        d="M10 8.5v15 M21 8.5v15 M10 16h11"
        fill="none"
        stroke={inverted ? "#121212" : "#CCFF00"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="24.5" cy="7.5" r="2" fill="#E63946" />
    </svg>
  );
}
