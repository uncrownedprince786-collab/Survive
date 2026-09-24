"use client";

import { useState } from "react";
import { getCurrency } from "@/lib/constants/currencies";
import { parseAmount } from "@/lib/validation/plan";

const group = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function MoneyInput({
  id,
  label,
  value,
  currencyCode,
  onChange,
  help,
  placeholder = "0",
  srOnlyLabel = false,
  compact = false,
}: {
  id: string;
  label: string;
  value: number;
  currencyCode: string;
  onChange: (value: number) => void;
  help?: string;
  placeholder?: string;
  srOnlyLabel?: boolean;
  compact?: boolean;
}) {
  const symbol = getCurrency(currencyCode).symbol;
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);

  const display = focused ? raw : value > 0 ? group.format(value) : "";
  const symbolPad = symbol.length > 1 ? "pl-12" : "pl-9";

  return (
    <div>
      <label
        htmlFor={id}
        className={
          srOnlyLabel ? "sr-only" : "block text-sm font-medium text-ink"
        }
      >
        {label}
      </label>
      <div className={srOnlyLabel ? "relative" : "relative mt-1.5"}>
        <span
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted"
          aria-hidden="true"
        >
          {symbol}
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder={placeholder}
          value={display}
          onFocus={() => {
            setFocused(true);
            setRaw(value > 0 ? String(value) : "");
          }}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            const r = e.target.value;
            setRaw(r);
            const res = parseAmount(r);
            setError(res.error);
            onChange(res.value);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? `${id}-err` : help ? `${id}-help` : undefined
          }
          className={`w-full rounded-xl border bg-surface ${symbolPad} pr-3.5 text-ink tabular transition-colors placeholder:text-muted focus:border-positive focus:outline-none ${
            compact ? "h-10 text-sm" : "h-12"
          } ${error ? "border-danger" : "border-border"}`}
        />
      </div>
      {help && !error && (
        <p id={`${id}-help`} className="mt-1.5 text-xs text-muted">
          {help}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
