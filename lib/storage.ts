import type { PlanInput, SideInput } from "@/lib/calculations/types";
import { DEFAULT_CURRENCY } from "@/lib/constants/currencies";
import {
  BUSINESS_STARTERS,
  PERSONAL_STARTERS,
} from "@/lib/constants/categories";
import { sanitizePlan } from "@/lib/validation/plan";

export const STORAGE_KEY = "survive.plan.v1";

type Starter = { name: string; category: string; priority: SideInput["expenses"][number]["priority"] };

// Deterministic starter IDs keep server + client initial render identical (no hydration mismatch).
function starterExpenses(prefix: string, starters: Starter[]): SideInput["expenses"] {
  return starters.map((s, i) => ({
    id: `${prefix}-${i}`,
    name: s.name,
    amount: 0,
    category: s.category,
    priority: s.priority,
  }));
}

export function defaultPlan(): PlanInput {
  return {
    currency: DEFAULT_CURRENCY,
    mode: "personal",
    personal: {
      liquidFunds: 0,
      monthlyIncome: 0,
      expenses: starterExpenses("personal", PERSONAL_STARTERS),
    },
    business: {
      liquidFunds: 0,
      monthlyIncome: 0,
      expenses: starterExpenses("business", BUSINESS_STARTERS),
    },
  };
}

export function loadPlan(): PlanInput {
  if (typeof window === "undefined") return defaultPlan();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPlan();
    return sanitizePlan(JSON.parse(raw));
  } catch {
    return defaultPlan();
  }
}

export function savePlan(plan: PlanInput): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {
    /* storage unavailable (private mode / disabled) — plan stays in memory */
  }
}

export function clearPlan(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
