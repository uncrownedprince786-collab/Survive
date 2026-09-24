import type { Priority, Side } from "@/lib/calculations/types";

export interface Category {
  id: string;
  label: string;
}

export const PERSONAL_CATEGORIES: Category[] = [
  { id: "housing", label: "Housing / Rent" },
  { id: "utilities", label: "Utilities" },
  { id: "food", label: "Food & Groceries" },
  { id: "transport", label: "Transport" },
  { id: "insurance", label: "Insurance" },
  { id: "debt", label: "Loan / Debt" },
  { id: "health", label: "Healthcare" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "family", label: "Family & Dependents" },
  { id: "other", label: "Other" },
];

export const BUSINESS_CATEGORIES: Category[] = [
  { id: "payroll", label: "Payroll / Salaries" },
  { id: "contractors", label: "Contractors" },
  { id: "software", label: "Software & Tools" },
  { id: "rent", label: "Office / Rent" },
  { id: "marketing", label: "Marketing" },
  { id: "inventory", label: "Inventory / COGS" },
  { id: "taxes", label: "Taxes" },
  { id: "utilities", label: "Utilities" },
  { id: "loans", label: "Loans / Debt" },
  { id: "other", label: "Other" },
];

export function categoriesFor(side: Side): Category[] {
  return side === "business" ? BUSINESS_CATEGORIES : PERSONAL_CATEGORIES;
}

export function categoryLabel(side: Side, id: string): string {
  return categoriesFor(side).find((c) => c.id === id)?.label ?? "Other";
}

interface Starter {
  name: string;
  category: string;
  priority: Priority;
}

export const PERSONAL_STARTERS: Starter[] = [
  { name: "Housing / Rent", category: "housing", priority: "protect" },
  { name: "Food & Groceries", category: "food", priority: "protect" },
  { name: "Utilities", category: "utilities", priority: "reduce" },
  { name: "Transport", category: "transport", priority: "reduce" },
  { name: "Subscriptions", category: "subscriptions", priority: "pause" },
];

export const BUSINESS_STARTERS: Starter[] = [
  { name: "Payroll / Salaries", category: "payroll", priority: "protect" },
  { name: "Office / Rent", category: "rent", priority: "protect" },
  { name: "Software & Tools", category: "software", priority: "reduce" },
  { name: "Marketing", category: "marketing", priority: "pause" },
];

export interface PriorityMeta {
  id: Priority;
  label: string;
  help: string;
}

export const PRIORITIES: PriorityMeta[] = [
  { id: "protect", label: "Protect", help: "Essential — keep paying in full" },
  { id: "reduce", label: "Reduce", help: "Trim to a lower amount" },
  { id: "pause", label: "Pause", help: "Temporarily stop to save cash" },
];
