"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import type { Mode, Side } from "@/lib/calculations/types";
import { computeSide } from "@/lib/calculations/engine";
import { planReducer } from "@/lib/plan-reducer";
import { clearPlan, defaultPlan, loadPlan, savePlan } from "@/lib/storage";
import { LIMITS } from "@/lib/validation/plan";
import { formatRunway } from "@/lib/format";
import { Button, buttonClasses } from "@/components/ui/button";
import { ModeSelector } from "./mode-selector";
import { CurrencySelect } from "./currency-select";
import { MoneyInput } from "./money-input";
import { ExpenseList } from "./expense-list";

const STEPS = [
  { n: 1, label: "Setup" },
  { n: 2, label: "Money" },
  { n: 3, label: "Expenses" },
  { n: 4, label: "Goal" },
] as const;

const SIDE_LABEL: Record<Side, string> = { personal: "Personal", business: "Business" };

function activeSides(mode: Mode): Side[] {
  return mode === "both" ? ["personal", "business"] : [mode];
}

export function CalculatorApp() {
  const router = useRouter();
  const [plan, dispatch] = useReducer(planReducer, undefined, defaultPlan);
  const [step, setStep] = useState(1);
  const loaded = useRef(false);

  // Load any saved plan once, after mount (avoids hydration mismatch).
  useEffect(() => {
    dispatch({ type: "setPlan", plan: loadPlan() });
    loaded.current = true;
  }, []);

  // Autosave — only after the saved plan has been loaded.
  useEffect(() => {
    if (loaded.current) savePlan(plan);
  }, [plan]);

  const sides = activeSides(plan.mode);

  const goResults = () => {
    savePlan(plan);
    router.push("/results");
  };

  const reset = () => {
    if (window.confirm("Clear all your figures and start over? This can't be undone.")) {
      const fresh = defaultPlan();
      fresh.mode = plan.mode;
      fresh.currency = plan.currency;
      dispatch({ type: "setPlan", plan: fresh });
      clearPlan();
      setStep(1);
    }
  };

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {STEPS.map((s) => {
            const active = s.n === step;
            const done = s.n < step;
            return (
              <button
                key={s.n}
                type="button"
                onClick={() => setStep(s.n)}
                aria-current={active ? "step" : undefined}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-positive bg-positive-soft font-medium text-ink"
                    : done
                      ? "border-border bg-surface text-ink"
                      : "border-border bg-surface text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    active || done ? "bg-positive text-white" : "bg-canvas text-muted"
                  }`}
                >
                  {s.n}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-canvas">
          <div
            className="h-full rounded-full bg-positive transition-all duration-300"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1 — Setup */}
      {step === 1 && (
        <section aria-labelledby="step-setup" className="space-y-6">
          <div>
            <h2 id="step-setup" className="text-xl font-semibold text-ink">
              What are you planning for?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Choose a mode. <strong className="font-medium text-ink">Both</strong> keeps your
              personal and business money completely separate.
            </p>
          </div>
          <ModeSelector value={plan.mode} onChange={(mode) => dispatch({ type: "setMode", mode })} />
          <div className="max-w-xs">
            <CurrencySelect
              value={plan.currency}
              onChange={(currency) => dispatch({ type: "setCurrency", currency })}
            />
          </div>
        </section>
      )}

      {/* Step 2 — Money */}
      {step === 2 && (
        <section aria-labelledby="step-money" className="space-y-6">
          <div>
            <h2 id="step-money" className="text-xl font-semibold text-ink">
              How much do you have to work with?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Enter the cash you could actually draw on, and any income that would keep arriving.
            </p>
          </div>
          <div className={sides.length > 1 ? "grid gap-5 lg:grid-cols-2" : ""}>
            {sides.map((side) => (
              <div key={side} className="rounded-2xl border border-border bg-canvas/50 p-5">
                {sides.length > 1 && (
                  <h3 className="mb-4 text-sm font-semibold tracking-wide text-ink">
                    {SIDE_LABEL[side]}
                  </h3>
                )}
                <div className="space-y-4">
                  <MoneyInput
                    id={`funds-${side}`}
                    label="Cash & savings available now"
                    value={plan[side].liquidFunds}
                    currencyCode={plan.currency}
                    onChange={(value) =>
                      dispatch({ type: "setSideField", side, field: "liquidFunds", value })
                    }
                    help="Everything you could realistically spend down."
                  />
                  <MoneyInput
                    id={`income-${side}`}
                    label="Monthly income that keeps coming in"
                    value={plan[side].monthlyIncome}
                    currencyCode={plan.currency}
                    onChange={(value) =>
                      dispatch({ type: "setSideField", side, field: "monthlyIncome", value })
                    }
                    help="Enter 0 if income would stop completely."
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Step 3 — Expenses */}
      {step === 3 && (
        <section aria-labelledby="step-expenses" className="space-y-8">
          <div>
            <h2 id="step-expenses" className="text-xl font-semibold text-ink">
              What do you spend each month?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Tag each expense: <strong className="font-medium text-ink">Protect</strong> to keep,{" "}
              <strong className="font-medium text-ink">Reduce</strong> to trim, or{" "}
              <strong className="font-medium text-ink">Pause</strong> to stop temporarily.
            </p>
          </div>
          {sides.map((side) => (
            <div key={side}>
              {sides.length > 1 && (
                <h3 className="mb-3 text-sm font-semibold tracking-wide text-ink">
                  {SIDE_LABEL[side]} expenses
                </h3>
              )}
              <ExpenseList
                side={side}
                expenses={plan[side].expenses}
                currencyCode={plan.currency}
                onAdd={() => dispatch({ type: "addExpense", side })}
                onChange={(id, patch) => dispatch({ type: "updateExpense", side, id, patch })}
                onRemove={(id) => dispatch({ type: "removeExpense", side, id })}
              />
            </div>
          ))}
        </section>
      )}

      {/* Step 4 — Goal */}
      {step === 4 && (
        <section aria-labelledby="step-goal" className="space-y-6">
          <div>
            <h2 id="step-goal" className="text-xl font-semibold text-ink">
              Set a runway goal (optional)
            </h2>
            <p className="mt-1 text-sm text-muted">
              How many months of safety are you aiming for? We&rsquo;ll show the funding gap.
            </p>
          </div>
          <div className={sides.length > 1 ? "grid gap-5 lg:grid-cols-2" : ""}>
            {sides.map((side) => {
              const result = computeSide(plan[side]);
              return (
                <div key={side} className="rounded-2xl border border-border p-5">
                  {sides.length > 1 && (
                    <h3 className="mb-3 text-sm font-semibold tracking-wide text-ink">
                      {SIDE_LABEL[side]}
                    </h3>
                  )}
                  <label
                    htmlFor={`target-${side}`}
                    className="block text-sm font-medium text-ink"
                  >
                    Target runway (months)
                  </label>
                  <input
                    id={`target-${side}`}
                    type="number"
                    min={0}
                    max={LIMITS.maxTargetMonths}
                    inputMode="numeric"
                    value={plan[side].targetRunwayMonths ?? ""}
                    placeholder="e.g. 6"
                    onChange={(e) => {
                      const v = e.target.value === "" ? undefined : Math.max(0, Math.min(LIMITS.maxTargetMonths, Number(e.target.value)));
                      dispatch({ type: "setTarget", side, value: v && v > 0 ? v : undefined });
                    }}
                    className="mt-1.5 h-12 w-full rounded-xl border border-border bg-surface px-3.5 text-ink tabular transition-colors focus:border-positive focus:outline-none"
                  />
                  <div className="mt-4 rounded-lg bg-canvas px-3 py-2.5 text-sm text-muted">
                    Current estimate:{" "}
                    <span className="font-semibold text-ink">
                      {formatRunway(result.base.runwayMonths)}
                    </span>
                    {" · "}Survival Mode:{" "}
                    <span className="font-semibold text-positive">
                      {formatRunway(result.survival.runwayMonths)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Nav */}
      <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-danger"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Start over
        </button>

        <div className="flex items-center gap-3">
          {step > 1 && (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
          )}
          {step < STEPS.length ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <button type="button" onClick={goResults} className={buttonClasses("accent", "md")}>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              See your survival plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
