import { describe, expect, it } from "vitest";
import { LIMITS, parseAmount, sanitizeExpense, sanitizePlan } from "@/lib/validation/plan";

describe("parseAmount", () => {
  it("parses grouped numbers", () => {
    expect(parseAmount("1,000")).toEqual({ value: 1000, error: null });
  });
  it("treats empty as zero", () => {
    expect(parseAmount("")).toEqual({ value: 0, error: null });
  });
  it("rejects negatives", () => {
    expect(parseAmount("-5").error).toBe("Cannot be negative");
  });
  it("rejects non-numbers", () => {
    expect(parseAmount("abc").error).toBe("Enter a valid number");
  });
  it("clamps very large values", () => {
    const r = parseAmount(String(LIMITS.maxAmount * 10));
    expect(r.value).toBe(LIMITS.maxAmount);
    expect(r.error).not.toBeNull();
  });
});

describe("sanitizePlan", () => {
  it("fills sensible defaults for empty input", () => {
    const p = sanitizePlan({});
    expect(p.currency).toBe("PKR");
    expect(p.mode).toBe("personal");
    expect(p.personal.liquidFunds).toBe(0);
    expect(Array.isArray(p.personal.expenses)).toBe(true);
  });
  it("coerces invalid mode and currency", () => {
    const p = sanitizePlan({ mode: "hack", currency: "ZZZ" });
    expect(p.mode).toBe("personal");
    expect(p.currency).toBe("PKR");
  });
  it("clamps negative and non-finite numbers to zero", () => {
    const p = sanitizePlan({ personal: { liquidFunds: -100, monthlyIncome: NaN, expenses: [] } });
    expect(p.personal.liquidFunds).toBe(0);
    expect(p.personal.monthlyIncome).toBe(0);
  });
  it("caps the number of expenses", () => {
    const many = Array.from({ length: 500 }, () => ({ amount: 1 }));
    const p = sanitizePlan({ business: { expenses: many } });
    expect(p.business.expenses.length).toBe(LIMITS.maxExpenses);
  });
});

describe("sanitizeExpense", () => {
  it("defaults an unknown priority to protect", () => {
    expect(sanitizeExpense({ priority: "weird", amount: 10 }).priority).toBe("protect");
  });
  it("clamps reducedAmount to the amount", () => {
    expect(sanitizeExpense({ amount: 100, reducedAmount: 999 }).reducedAmount).toBe(100);
  });
  it("leaves reducedAmount undefined when absent", () => {
    expect(sanitizeExpense({ amount: 100 }).reducedAmount).toBeUndefined();
  });
});
