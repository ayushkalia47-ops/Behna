/**
 * A printed border strip, after the woven borders (pallu, kinari) of saris and
 * dupattas: a row of small buds between two rules. Decorative only.
 */
export function BorderMotif({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  const id = `kinari-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg aria-hidden className={`block h-6 w-full ${className}`} preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="36" height="24" patternUnits="userSpaceOnUse">
          <path d="M18 5 C22 9 22 14 18 19 C14 14 14 9 18 5Z" fill={color} />
          <circle cx="0" cy="12" r="1.6" fill={color} />
          <circle cx="36" cy="12" r="1.6" fill={color} />
        </pattern>
      </defs>
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke={color} strokeWidth="1" />
      <rect y="0" width="100%" height="24" fill={`url(#${id})`} />
      <line x1="0" y1="23.5" x2="100%" y2="23.5" stroke={color} strokeWidth="1" />
    </svg>
  );
}

/** Cusped arch, the jharokha silhouette used as a quiet brand mark */
export function ArchMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 56" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 56 V24 C4 12 13 7 20 2 C27 7 36 12 36 24 V56" />
      <circle cx="20" cy="30" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
