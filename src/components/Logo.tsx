export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="11" fill="#0B3D2E" />
      <rect x="7.5" y="10.5" width="17" height="3.4" rx="1.4" fill="#F4EEDC" />
      <rect x="7.5" y="18.3" width="14" height="3.4" rx="1.4" fill="#F4EEDC" opacity="0.82" />
      <rect x="7.5" y="26.1" width="10.5" height="3.4" rx="1.4" fill="#F4EEDC" opacity="0.64" />
      <path
        d="M20.2 21.6 24.4 26.2 33.2 13.8"
        stroke="#F4C15D"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  inverted = false,
  showByline = true,
}: {
  inverted?: boolean;
  showByline?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="leading-tight">
        <span
          className={`block font-display text-[1.15rem] font-semibold tracking-tight ${
            inverted ? "text-white" : "text-[var(--forest)]"
          }`}
        >
          ShelfCheck
        </span>
        {showByline && (
          <span
            className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${
              inverted ? "text-white/55" : "text-[var(--ink)]/40"
            }`}
          >
            by Skuform
          </span>
        )}
      </span>
    </span>
  );
}
