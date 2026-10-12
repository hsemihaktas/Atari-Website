/** Küçük kaset ikonu — logo ve liste işaretleri için. */
export function CassetteGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="5" y="8" width="14" height="6" rx="1" fill="currentColor" />
      <circle cx="9" cy="11" r="1.4" fill="var(--color-paper)" />
      <circle cx="15" cy="11" r="1.4" fill="var(--color-paper)" />
      <path d="M7 18.5h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}