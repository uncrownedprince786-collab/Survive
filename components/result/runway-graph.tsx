import type { BurnPoint } from "@/lib/calculations/engine";
import { formatMoneyCompact, formatRunway } from "@/lib/format";

const W = 640;
const H = 260;
const PAD = { l: 52, r: 16, t: 16, b: 30 };

export function RunwayGraph({
  points,
  currency,
  targetMonths,
  className = "",
}: {
  points: BurnPoint[];
  currency: string;
  targetMonths?: number;
  className?: string;
}) {
  if (points.length < 2) return null;

  const maxMonth = Math.max(1, points[points.length - 1].month);
  const maxVal = Math.max(
    1,
    ...points.map((p) => Math.max(p.base, p.survival)),
  );

  const x = (m: number) => PAD.l + (m / maxMonth) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - v / maxVal) * (H - PAD.t - PAD.b);

  const line = (key: "base" | "survival") =>
    points
      .map((p, i) => `${i ? "L" : "M"}${x(p.month).toFixed(1)} ${y(p[key]).toFixed(1)}`)
      .join(" ");

  const areaSurvival = `${line("survival")} L ${x(maxMonth).toFixed(1)} ${y(0).toFixed(
    1,
  )} L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;

  const zeroMonth = (key: "base" | "survival"): number | null => {
    const hit = points.find((p) => p[key] <= 0);
    return hit ? hit.month : null;
  };
  const baseZero = zeroMonth("base");
  const survZero = zeroMonth("survival");

  const yTicks = [0, 0.5, 1].map((f) => f * maxVal);
  const xTicks = [0, 0.5, 1].map((f) => f * maxMonth);

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Money remaining over time. Current plan lasts about ${formatRunway(
          baseZero ?? Infinity,
        )}; with Survival Mode about ${formatRunway(survZero ?? Infinity)}.`}
      >
        {/* horizontal grid + y labels */}
        {yTicks.map((v, i) => (
          <g key={`y-${i}`}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--color-border)"
              strokeWidth={1}
            />
            <text
              x={PAD.l - 8}
              y={y(v) + 4}
              textAnchor="end"
              className="tabular"
              fontSize={11}
              fill="var(--color-muted)"
            >
              {formatMoneyCompact(v, currency)}
            </text>
          </g>
        ))}

        {/* x labels */}
        {xTicks.map((m, i) => (
          <text
            key={`x-${i}`}
            x={x(m)}
            y={H - 8}
            textAnchor={i === 0 ? "start" : i === xTicks.length - 1 ? "end" : "middle"}
            fontSize={11}
            fill="var(--color-muted)"
          >
            {Math.round(m)} mo
          </text>
        ))}

        {/* target marker */}
        {targetMonths && targetMonths > 0 && targetMonths <= maxMonth && (
          <g>
            <line
              x1={x(targetMonths)}
              x2={x(targetMonths)}
              y1={PAD.t}
              y2={H - PAD.b}
              stroke="var(--color-muted)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <text
              x={x(targetMonths)}
              y={PAD.t + 2}
              textAnchor="middle"
              fontSize={10}
              fill="var(--color-muted)"
            >
              Target
            </text>
          </g>
        )}

        {/* survival area + lines */}
        <path d={areaSurvival} fill="var(--color-positive-soft)" opacity={0.6} />
        <path
          d={line("survival")}
          fill="none"
          stroke="var(--color-positive)"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={line("base")}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth={2}
          strokeDasharray="5 4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* depletion markers */}
        {baseZero !== null && (
          <circle cx={x(baseZero)} cy={y(0)} r={4} fill="var(--color-ink)" />
        )}
        {survZero !== null && (
          <circle cx={x(survZero)} cy={y(0)} r={4} fill="var(--color-positive)" />
        )}
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-4 border-t-2 border-dashed border-ink" aria-hidden="true" />
          Current plan
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-4 bg-positive" aria-hidden="true" />
          Survival Mode
        </span>
      </div>
    </div>
  );
}
