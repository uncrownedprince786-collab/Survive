"use client";

import { User, Building2, Columns2 } from "lucide-react";
import type { Mode } from "@/lib/calculations/types";

const MODES: { id: Mode; label: string; desc: string; icon: typeof User }[] = [
  { id: "personal", label: "Personal", desc: "Your household finances", icon: User },
  { id: "business", label: "Business", desc: "Your company's finances", icon: Building2 },
  { id: "both", label: "Both", desc: "Personal & business, side by side", icon: Columns2 },
];

export function ModeSelector({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Choose what to plan" className="grid gap-3 sm:grid-cols-3">
      {MODES.map((m) => {
        const active = value === m.id;
        const Icon = m.icon;
        return (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(m.id)}
            className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
              active
                ? "border-positive bg-positive-soft ring-1 ring-positive"
                : "border-border bg-surface hover:border-muted"
            }`}
          >
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                active ? "bg-positive text-white" : "bg-canvas text-ink"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="mt-3 font-semibold text-ink">{m.label}</span>
            <span className="mt-0.5 text-sm text-muted">{m.desc}</span>
          </button>
        );
      })}
    </div>
  );
}
