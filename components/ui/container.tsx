import type { ReactNode } from "react";

const widths = {
  default: "max-w-5xl",
  wide: "max-w-6xl",
  prose: "max-w-3xl",
} as const;

export function Container({
  children,
  size = "default",
  className = "",
}: {
  children: ReactNode;
  size?: keyof typeof widths;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full ${widths[size]} px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
