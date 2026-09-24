import Link from "next/link";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="var(--color-ink)" />
      <path
        d="M6 9.5 L13 17 L20 20.5 L26 20.5"
        stroke="var(--color-positive)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="20.5" r="2.3" fill="var(--color-positive)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="SURVIVE — home"
    >
      <LogoMark className="h-8 w-8" />
      <span className="text-[1.05rem] font-bold tracking-[0.16em] text-ink">
        SURVIVE
      </span>
    </Link>
  );
}
