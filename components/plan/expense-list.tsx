"use client";

import { Plus } from "lucide-react";
import type { Expense, Side } from "@/lib/calculations/types";
import { buttonClasses } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import { ExpenseRow } from "./expense-row";

export function ExpenseList({
  side,
  expenses,
  currencyCode,
  onAdd,
  onChange,
  onRemove,
}: {
  side: Side;
  expenses: Expense[];
  currencyCode: string;
  onAdd: () => void;
  onChange: (id: string, patch: Partial<Expense>) => void;
  onRemove: (id: string) => void;
}) {
  const total = expenses.reduce((t, e) => t + (e.amount > 0 ? e.amount : 0), 0);

  return (
    <div className="space-y-3">
      {expenses.length === 0 && (
        <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
          No expenses yet. Add your recurring monthly costs to see your runway.
        </p>
      )}

      {expenses.map((e) => (
        <ExpenseRow
          key={e.id}
          side={side}
          expense={e}
          currencyCode={currencyCode}
          onChange={(patch) => onChange(e.id, patch)}
          onRemove={() => onRemove(e.id)}
        />
      ))}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button type="button" onClick={onAdd} className={buttonClasses("secondary", "sm")}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add expense
        </button>
        <p className="text-sm text-muted">
          Monthly total{" "}
          <span className="font-semibold text-ink tabular">
            {formatMoney(total, currencyCode)}
          </span>
        </p>
      </div>
    </div>
  );
}
