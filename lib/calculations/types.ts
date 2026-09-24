export type Mode = "personal" | "business" | "both";
export type Side = "personal" | "business";
export type Priority = "protect" | "reduce" | "pause";

export interface Expense {
  id: string;
  name: string;
  /** Monthly amount, major units, >= 0 */
  amount: number;
  category: string;
  priority: Priority;
  /** Monthly amount kept when priority === "reduce". Defaults to 50% of amount. */
  reducedAmount?: number;
}

export interface SideInput {
  /** Cash/savings available right now. */
  liquidFunds: number;
  /** Income/revenue that keeps arriving after the shock (0 = income fully stopped). */
  monthlyIncome: number;
  expenses: Expense[];
  /** Optional goal: months of runway the user wants. */
  targetRunwayMonths?: number;
}

export interface PlanInput {
  currency: string;
  mode: Mode;
  personal: SideInput;
  business: SideInput;
}
