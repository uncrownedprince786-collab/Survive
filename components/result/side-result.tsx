import { Shield, Target } from "lucide-react";
import type { Side, SideInput } from "@/lib/calculations/types";
import {
  burndownSeries,
  computeSide,
  type SideResult as SideResultData,
} from "@/lib/calculations/engine";
import { formatDate, formatMoney, formatRunway, runwayHeadline } from "@/lib/format";
import { StatCard } from "./stat-card";
import { RunwayGraph } from "./runway-graph";
import { UnexpectedSimulator } from "./unexpected-simulator";

type Tone = "positive" | "warning" | "danger";

function statusFor(r: SideResultData): { label: string; tone: Tone; msg: string } {
  if (r.base.isSustainable) {
    return {
      label: "Sustainable",
      tone: "positive",
      msg: "Your income covers your expenses — no depletion expected at this rate.",
    };
  }
  const m = r.base.runwayMonths;
  if (m >= 6)
    return {
      label: "Healthy",
      tone: "positive",
      msg: "You have a comfortable buffer. Keep it topped up.",
    };
  if (m >= 3)
    return {
      label: "Caution",
      tone: "warning",
      msg: "A moderate buffer. Survival Mode can extend it meaningfully.",
    };
  return {
    label: "Critical",
    tone: "danger",
    msg: "A thin buffer. Consider what you can reduce or pause now.",
  };
}

const pillTone: Record<Tone, string> = {
  positive: "bg-positive-soft text-positive",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

const SIDE_LABEL: Record<Side, string> = { personal: "Personal", business: "Business" };

export function SideResult({
  side,
  input,
  currency,
  showLabel = false,
}: {
  side: Side;
  input: SideInput;
  currency: string;
  showLabel?: boolean;
}) {
  const r = computeSide(input);
  const status = statusFor(r);
  const sustainable = r.base.isSustainable;
  const target = r.target;
  const noSurvivalPlan = !sustainable && r.survival.extensionMonths === 0;

  return (
    <section className="space-y-5" aria-label={`${SIDE_LABEL[side]} results`}>
      <h2
        className={
          showLabel
            ? "text-lg font-semibold tracking-wide text-ink"
            : "sr-only"
        }
      >
        {SIDE_LABEL[side]} results
      </h2>

      {/* Hero */}
      <div className="rounded-2xl border border-border bg-canvas p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted">Estimated runway</p>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${pillTone[status.tone]}`}
          >
            {status.label}
          </span>
        </div>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-5xl font-extrabold tabular leading-none text-ink sm:text-6xl">
            {runwayHeadline(r.base.runwayMonths)}
          </span>
          {!sustainable && <span className="mb-1 text-lg text-muted">months</span>}
        </div>
        <p className="mt-3 text-sm text-muted">
          {sustainable
            ? "Income covers expenses — no depletion expected."
            : `Estimated to run out around ${formatDate(r.base.depletionDate)}.`}
        </p>
        <p className="mt-3 text-sm text-ink">{status.msg}</p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Cash available" value={formatMoney(r.liquidFunds, currency)} />
        <StatCard
          label="Monthly expenses"
          value={formatMoney(r.base.monthlyExpenses, currency)}
        />
        <StatCard
          label={r.base.netBurn >= 0 ? "Net monthly burn" : "Monthly surplus"}
          value={formatMoney(Math.abs(r.base.netBurn), currency)}
          tone={r.base.netBurn > 0 ? "default" : "positive"}
          sub={
            r.monthlyIncome > 0
              ? `after ${formatMoney(r.monthlyIncome, currency)} income`
              : "income stopped"
          }
        />
      </div>

      {/* Survival Mode */}
      <div className="rounded-2xl border border-positive/30 bg-positive-soft/40 p-5">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-positive" aria-hidden="true" />
          <h3 className="font-semibold text-ink">Survival Mode</h3>
        </div>
        <p className="mt-1 text-sm text-muted">
          If you protect, reduce and pause expenses as tagged:
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard
            label="Potential runway"
            value={formatRunway(r.survival.runwayMonths)}
            tone="positive"
            className="border-positive/20 bg-surface"
          />
          <StatCard
            label="Extra time bought"
            value={
              r.survival.extensionMonths === Infinity
                ? "Sustainable"
                : `+${formatRunway(r.survival.extensionMonths)}`
            }
            tone="positive"
            className="border-positive/20 bg-surface"
          />
          <StatCard
            label="Monthly savings"
            value={formatMoney(r.survival.monthlySavings, currency)}
            tone="positive"
            className="col-span-2 border-positive/20 bg-surface sm:col-span-1"
          />
        </div>
        {noSurvivalPlan && (
          <p className="mt-3 text-sm text-muted">
            Tag some expenses as <strong className="font-medium text-ink">Reduce</strong> or{" "}
            <strong className="font-medium text-ink">Pause</strong> in the calculator to see how
            much time you could buy.
          </p>
        )}
      </div>

      {/* Target / funding gap */}
      {target && (
        <div className="rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-ink" aria-hidden="true" />
            <h3 className="font-semibold text-ink">Your {target.targetMonths}-month goal</h3>
          </div>
          <div className="mt-4 space-y-2.5 text-sm">
            <p className={target.meetsTarget ? "text-positive" : "text-ink"}>
              {target.meetsTarget ? (
                <>On track — your current plan already covers {target.targetMonths} months.</>
              ) : (
                <>
                  Funding gap:{" "}
                  <span className="font-semibold text-danger tabular">
                    {formatMoney(target.fundingGap, currency)}
                  </span>{" "}
                  more cash needed to reach {target.targetMonths} months.
                </>
              )}
            </p>
            {!target.meetsTarget && (
              <p className="text-muted">
                {target.survivalMeetsTarget ? (
                  <>Survival Mode alone reaches your {target.targetMonths}-month goal.</>
                ) : (
                  <>
                    Even in Survival Mode, the gap is{" "}
                    <span className="font-semibold text-ink tabular">
                      {formatMoney(target.survivalFundingGap, currency)}
                    </span>
                    .
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Graph */}
      <div className="rounded-2xl border border-border p-5">
        <h3 className="font-semibold text-ink">Money remaining over time</h3>
        <p className="mt-1 text-sm text-muted">
          How your cash draws down — current plan vs. Survival Mode.
        </p>
        <RunwayGraph
          className="mt-4"
          points={burndownSeries(r)}
          currency={currency}
          targetMonths={target?.targetMonths}
        />
      </div>

      {/* Unexpected expense simulator */}
      <UnexpectedSimulator side={side} input={input} currency={currency} />
    </section>
  );
}
