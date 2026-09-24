"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";
import type { PlanInput, Side, SideInput } from "@/lib/calculations/types";
import { computePlan } from "@/lib/calculations/engine";
import { loadPlan } from "@/lib/storage";
import { buttonClasses } from "@/components/ui/button";
import { SideResult } from "./side-result";
import { ShareExport } from "./share-export";

function sideHasData(s: SideInput): boolean {
  return s.liquidFunds > 0 || s.monthlyIncome > 0 || s.expenses.some((e) => e.amount > 0);
}

export function ResultsApp() {
  const [plan, setPlan] = useState<PlanInput | null>(null);

  // Plan lives only in this browser, so it can only be read after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- persisted plan can only be read client-side
    setPlan(loadPlan());
  }, []);

  if (!plan) {
    return <div className="h-64 animate-pulse rounded-2xl bg-canvas" aria-hidden="true" />;
  }

  const result = computePlan(plan);
  const activeSides: Side[] = plan.mode === "both" ? ["personal", "business"] : [plan.mode];
  const anyData = activeSides.some((s) => sideHasData(plan[s]));

  if (!anyData) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-canvas">
          <Wallet className="h-6 w-6 text-muted" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-ink">No plan yet</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Enter your cash, income and expenses to see how long your money could last.
        </p>
        <Link href="/calculator" className={buttonClasses("primary", "md", "mt-6")}>
          Open the calculator
        </Link>
      </div>
    );
  }

  const bothCols = !!(result.personal && result.business);

  return (
    <div className="space-y-8">
      <div className={bothCols ? "grid gap-8 lg:grid-cols-2" : ""}>
        {result.personal && (
          <SideResult
            side="personal"
            input={plan.personal}
            currency={plan.currency}
            showLabel={bothCols}
          />
        )}
        {result.business && (
          <SideResult
            side="business"
            input={plan.business}
            currency={plan.currency}
            showLabel={bothCols}
          />
        )}
      </div>

      <ShareExport result={result} />

      <div className="no-print">
        <Link href="/calculator" className={buttonClasses("secondary", "md")}>
          Edit your plan
        </Link>
      </div>
    </div>
  );
}
