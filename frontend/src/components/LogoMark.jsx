export default function LogoMark({ className = "w-7 h-7", inverted = false }) {
  return (
    <svg viewBox="0 0 32 32" className={className} data-testid="logo-mark" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill={inverted ? "#F6F5F2" : "#121212"} />
      <path
        d="M11 8.5h6a7.5 7.5 0 0 1 0 15h-6z"
        fill="none"
        stroke={inverted ? "#121212" : "#CCFF00"}
        strokeWidth="3"
      />
      <circle cx="23.5" cy="9.5" r="2" fill="#E63946" />
    </svg>
  );
}
