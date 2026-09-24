"use client";

import { CURRENCIES } from "@/lib/constants/currencies";

export function CurrencySelect({
  id = "currency",
  value,
  onChange,
}: {
  id?: string;
  value: string;
  onChange: (code: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        Currency
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-12 w-full rounded-xl border border-border bg-surface px-3.5 text-ink transition-colors focus:border-positive focus:outline-none"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} — {c.name} ({c.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}
