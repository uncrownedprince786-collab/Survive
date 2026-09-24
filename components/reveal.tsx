import type { ReactNode } from "react";

// Pure-CSS entrance. Content is always visible once the animation resolves
// (and immediately, under prefers-reduced-motion) — never gated on JS.
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
