import type { Expense, Mode, PlanInput, Side, SideInput } from "@/lib/calculations/types";
import { newId } from "@/lib/validation/plan";

export type PlanAction =
  | { type: "setCurrency"; currency: string }
  | { type: "setMode"; mode: Mode }
  | { type: "setSideField"; side: Side; field: "liquidFunds" | "monthlyIncome"; value: number }
  | { type: "setTarget"; side: Side; value: number | undefined }
  | { type: "addExpense"; side: Side }
  | { type: "updateExpense"; side: Side; id: string; patch: Partial<Expense> }
  | { type: "removeExpense"; side: Side; id: string }
  | { type: "setPlan"; plan: PlanInput };

function mapSide(plan: PlanInput, side: Side, fn: (s: SideInput) => SideInput): PlanInput {
  return { ...plan, [side]: fn(plan[side]) };
}

export function planReducer(state: PlanInput, action: PlanAction): PlanInput {
  switch (action.type) {
    case "setCurrency":
      return { ...state, currency: action.currency };
    case "setMode":
      return { ...state, mode: action.mode };
    case "setSideField":
      return mapSide(state, action.side, (s) => ({ ...s, [action.field]: action.value }));
    case "setTarget":
      return mapSide(state, action.side, (s) => ({ ...s, targetRunwayMonths: action.value }));
    case "addExpense":
      return mapSide(state, action.side, (s) => ({
        ...s,
        expenses: [
          ...s.expenses,
          { id: newId(), name: "", amount: 0, category: "other", priority: "protect" },
        ],
      }));
    case "updateExpense":
      return mapSide(state, action.side, (s) => ({
        ...s,
        expenses: s.expenses.map((e) => (e.id === action.id ? { ...e, ...action.patch } : e)),
      }));
    case "removeExpense":
      return mapSide(state, action.side, (s) => ({
        ...s,
        expenses: s.expenses.filter((e) => e.id !== action.id),
      }));
    case "setPlan":
      return action.plan;
    default:
      return state;
  }
}
