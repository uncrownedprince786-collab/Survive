import type { ReactNode } from "react";

type Tone = "default" | "positive" | "warning" | "danger";

const valueTone: Record<Tone, string> = {
  default: "text-ink",
  positive: "text-positive",
  warning: "text-warning",
  danger: "text-danger",
};

export function StatCard({
  label,
  value,
  sub,
  tone = "default",
  className = "",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-surface p-4 ${className}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-bold tabular ${valueTone[tone]}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
    </div>
  );
}
