import type {
  Expense,
  Mode,
  PlanInput,
  Priority,
  SideInput,
} from "@/lib/calculations/types";
import { DEFAULT_CURRENCY, isCurrencyCode } from "@/lib/constants/currencies";

export const LIMITS = {
  maxAmount: 1_000_000_000_000, // 1 trillion
  maxExpenses: 100,
  maxNameLen: 60,
  maxTargetMonths: 600,
} as const;

export interface FieldResult {
  value: number;
  error: string | null;
}

/** Parse a user-entered money/number field. Empty is valid (0). */
export function parseAmount(raw: string | number, max = LIMITS.maxAmount): FieldResult {
  if (raw === "" || raw === null || raw === undefined) return { value: 0, error: null };
  const n = typeof raw === "number" ? raw : Number(String(raw).replace(/[,\s]/g, ""));
  if (!Number.isFinite(n)) return { value: 0, error: "Enter a valid number" };
  if (n < 0) return { value: 0, error: "Cannot be negative" };
  if (n > max) return { value: max, error: "That value is too large" };
  return { value: n, error: null };
}

// --- Sanitizers: coerce untrusted data (localStorage / any input) into a safe PlanInput ---

const toNum = (v: unknown, max: number = LIMITS.maxAmount): number => {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(n, max);
};

const toStr = (v: unknown, max: number = LIMITS.maxNameLen): string =>
  typeof v === "string" ? v.slice(0, max) : "";

const toPriority = (v: unknown): Priority =>
  v === "reduce" || v === "pause" ? v : "protect";

const toMode = (v: unknown): Mode =>
  v === "business" || v === "both" ? v : "personal";

let idSeq = 0;
export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `e${Date.now().toString(36)}${(idSeq++).toString(36)}`;
}

export function sanitizeExpense(v: unknown): Expense {
  const o = (v ?? {}) as Record<string, unknown>;
  const amount = toNum(o.amount);
  const raw = o.reducedAmount;
  const reducedAmount =
    raw === undefined || raw === null ? undefined : Math.min(toNum(raw), amount);
  return {
    id: typeof o.id === "string" && o.id ? o.id : newId(),
    name: toStr(o.name),
    amount,
    category: toStr(o.category, 40) || "other",
    priority: toPriority(o.priority),
    ...(reducedAmount === undefined ? {} : { reducedAmount }),
  };
}

export function sanitizeSide(v: unknown): SideInput {
  const o = (v ?? {}) as Record<string, unknown>;
  const expensesRaw = Array.isArray(o.expenses) ? o.expenses : [];
  const target = toNum(o.targetRunwayMonths, LIMITS.maxTargetMonths);
  return {
    liquidFunds: toNum(o.liquidFunds),
    monthlyIncome: toNum(o.monthlyIncome),
    expenses: expensesRaw.slice(0, LIMITS.maxExpenses).map(sanitizeExpense),
    ...(target > 0 ? { targetRunwayMonths: target } : {}),
  };
}

export function sanitizePlan(v: unknown): PlanInput {
  const o = (v ?? {}) as Record<string, unknown>;
  return {
    currency: isCurrencyCode(o.currency) ? o.currency : DEFAULT_CURRENCY,
    mode: toMode(o.mode),
    personal: sanitizeSide(o.personal),
    business: sanitizeSide(o.business),
  };
}
