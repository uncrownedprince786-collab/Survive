"use client";

import { Trash2 } from "lucide-react";
import { categoriesFor } from "@/lib/constants/categories";
import type { Expense, Priority, Side } from "@/lib/calculations/types";
import { MoneyInput } from "./money-input";
import { PrioritySegment } from "./priority-segment";

export function ExpenseRow({
  side,
  expense,
  currencyCode,
  onChange,
  onRemove,
}: {
  side: Side;
  expense: Expense;
  currencyCode: string;
  onChange: (patch: Partial<Expense>) => void;
  onRemove: () => void;
}) {
  const cats = categoriesFor(side);

  const setPriority = (priority: Priority) => {
    if (priority === "reduce") onChange({ priority });
    else onChange({ priority, reducedAmount: undefined });
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <label className="sr-only" htmlFor={`name-${expense.id}`}>
            Expense name
          </label>
          <input
            id={`name-${expense.id}`}
            value={expense.name}
            placeholder="Expense name"
            onChange={(e) => onChange({ name: e.target.value.slice(0, 60) })}
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-ink transition-colors placeholder:text-muted focus:border-positive focus:outline-none"
          />
        </div>
        <div className="sm:w-44">
          <MoneyInput
            id={`amt-${expense.id}`}
            label={`Monthly amount for ${expense.name || "expense"}`}
            srOnlyLabel
            compact
            value={expense.amount}
            currencyCode={currencyCode}
            onChange={(v) => onChange({ amount: v })}
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${expense.name || "expense"}`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-danger-soft hover:text-danger"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor={`cat-${expense.id}`}>
          Category
        </label>
        <select
          id={`cat-${expense.id}`}
          value={expense.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="h-9 rounded-lg border border-border bg-surface px-2.5 text-xs text-ink transition-colors focus:border-positive focus:outline-none"
        >
          {cats.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>

        <PrioritySegment value={expense.priority} onChange={setPriority} />

        {expense.priority === "reduce" && (
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-xs text-muted">Reduce to</span>
            <div className="w-32">
              <MoneyInput
                id={`red-${expense.id}`}
                label={`Reduced amount for ${expense.name || "expense"}`}
                srOnlyLabel
                compact
                placeholder={String(Math.round(expense.amount * 0.5))}
                value={expense.reducedAmount ?? 0}
                currencyCode={currencyCode}
                onChange={(v) => onChange({ reducedAmount: v })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
