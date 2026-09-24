"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import type { Side, SideInput } from "@/lib/calculations/types";
import { simulateUnexpected } from "@/lib/calculations/engine";
import { formatDate, formatRunway } from "@/lib/format";
import { MoneyInput } from "@/components/plan/money-input";

export function UnexpectedSimulator({
  side,
  input,
  currency,
}: {
  side: Side;
  input: SideInput;
  currency: string;
}) {
  const [amount, setAmount] = useState(0);
  const impact = amount > 0 ? simulateUnexpected(input, amount) : null;

  return (
    <div className="rounded-2xl border border-border p-5">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-warning" aria-hidden="true" />
        <h3 className="font-semibold text-ink">Unexpected expense simulator</h3>
      </div>
      <p className="mt-1 text-sm text-muted">
        See what a sudden one-time cost would do to your runway.
      </p>

      <div className="mt-4 max-w-xs">
        <MoneyInput
          id={`sim-${side}`}
          label="One-time unexpected cost"
          value={amount}
          currencyCode={currency}
          onChange={setAmount}
        />
      </div>

      {impact && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-canvas p-3.5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Runway afterwards
            </p>
            <p className="mt-1 text-xl font-bold tabular text-ink">
              {formatRunway(impact.base.runwayMonths)}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {impact.base.depletionDate
                ? `Runs out ${formatDate(impact.base.depletionDate)}`
                : "No depletion expected"}
            </p>
          </div>
          <div className="rounded-lg bg-danger-soft p-3.5">
            <p className="text-xs font-medium uppercase tracking-wide text-danger/80">
              Time lost
            </p>
            <p className="mt-1 text-xl font-bold tabular text-danger">
              {impact.monthsLostBase === Infinity
                ? "—"
                : impact.monthsLostBase <= 0
                  ? "None"
                  : formatRunway(impact.monthsLostBase)}
            </p>
            <p className="mt-0.5 text-xs text-danger/80">from your current runway</p>
          </div>
        </div>
      )}
    </div>
  );
}
