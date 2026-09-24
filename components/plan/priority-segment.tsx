"use client";

import { PRIORITIES } from "@/lib/constants/categories";
import type { Priority } from "@/lib/calculations/types";

const tone: Record<Priority, string> = {
  protect: "data-[on=true]:bg-ink data-[on=true]:text-white",
  reduce: "data-[on=true]:bg-warning data-[on=true]:text-white",
  pause: "data-[on=true]:bg-danger data-[on=true]:text-white",
};

export function PrioritySegment({
  value,
  onChange,
}: {
  value: Priority;
  onChange: (priority: Priority) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Expense priority"
      className="inline-flex rounded-lg border border-border bg-canvas p-0.5"
    >
      {PRIORITIES.map((p) => (
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={value === p.id}
          data-on={value === p.id}
          title={p.help}
          onClick={() => onChange(p.id)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:text-ink ${tone[p.id]}`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
