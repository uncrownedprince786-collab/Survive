import { describe, expect, it } from "vitest";
import {
  burndownSeries,
  computePlan,
  computeSide,
  DEFAULT_REDUCTION_FACTOR,
  effectiveExpenseAmount,
  simulateUnexpected,
  sumExpenses,
  sumSurvivalExpenses,
} from "@/lib/calculations/engine";
import type { Expense, PlanInput, SideInput } from "@/lib/calculations/types";

const NOW = new Date("2026-01-01T00:00:00.000Z");

const exp = (o: Partial<Expense>): Expense => ({
  id: o.id ?? Math.random().toString(36),
  name: o.name ?? "",
  amount: o.amount ?? 0,
  category: o.category ?? "other",
  priority: o.priority ?? "protect",
  reducedAmount: o.reducedAmount,
});

const side = (o: Partial<SideInput>): SideInput => ({
  liquidFunds: o.liquidFunds ?? 0,
  monthlyIncome: o.monthlyIncome ?? 0,
  expenses: o.expenses ?? [],
  targetRunwayMonths: o.targetRunwayMonths,
});

describe("effectiveExpenseAmount", () => {
  it("keeps protected expenses in full", () => {
    expect(effectiveExpenseAmount(exp({ amount: 1000, priority: "protect" }))).toBe(1000);
  });
  it("zeroes paused expenses", () => {
    expect(effectiveExpenseAmount(exp({ amount: 1000, priority: "pause" }))).toBe(0);
  });
  it("defaults reduce to 50%", () => {
    expect(effectiveExpenseAmount(exp({ amount: 1000, priority: "reduce" }))).toBe(
      1000 * DEFAULT_REDUCTION_FACTOR,
    );
  });
  it("uses an explicit reduced amount", () => {
    expect(
      effectiveExpenseAmount(exp({ amount: 1000, priority: "reduce", reducedAmount: 300 })),
    ).toBe(300);
  });
  it("never lets reduced exceed original", () => {
    expect(
      effectiveExpenseAmount(exp({ amount: 1000, priority: "reduce", reducedAmount: 5000 })),
    ).toBe(1000);
  });
  it("treats negative amounts as zero", () => {
    expect(effectiveExpenseAmount(exp({ amount: -50, priority: "protect" }))).toBe(0);
  });
});

describe("sum helpers", () => {
  const expenses = [
    exp({ amount: 2000, priority: "protect" }),
    exp({ amount: 1000, priority: "reduce" }),
    exp({ amount: 500, priority: "pause" }),
  ];
  it("sums raw expenses", () => {
    expect(sumExpenses(expenses)).toBe(3500);
  });
  it("sums survival expenses", () => {
    expect(sumSurvivalExpenses(expenses)).toBe(2000 + 500 + 0);
  });
});

describe("computeSide — base runway", () => {
  const result = computeSide(
    side({
      liquidFunds: 12000,
      expenses: [
        exp({ amount: 2000, priority: "protect" }),
        exp({ amount: 1000, priority: "reduce" }),
        exp({ amount: 500, priority: "pause" }),
      ],
    }),
    NOW,
  );

  it("computes monthly expenses and net burn", () => {
    expect(result.base.monthlyExpenses).toBe(3500);
    expect(result.base.netBurn).toBe(3500);
    expect(result.base.isSustainable).toBe(false);
  });
  it("computes runway months", () => {
    expect(result.base.runwayMonths).toBeCloseTo(12000 / 3500, 4);
  });
  it("computes survival runway, extension and savings", () => {
    expect(result.survival.monthlyExpenses).toBe(2500);
    expect(result.survival.runwayMonths).toBeCloseTo(4.8, 4);
    expect(result.survival.extensionMonths).toBeCloseTo(4.8 - 12000 / 3500, 4);
    expect(result.survival.monthlySavings).toBe(1000);
  });
  it("produces a depletion date after now", () => {
    expect(result.base.depletionDate).toBeInstanceOf(Date);
    expect(result.base.depletionDate!.getTime()).toBeGreaterThan(NOW.getTime());
  });
});

describe("computeSide — sustainable", () => {
  const result = computeSide(
    side({ liquidFunds: 5000, monthlyIncome: 5000, expenses: [exp({ amount: 3000 })] }),
    NOW,
  );
  it("is sustainable with infinite runway and no depletion date", () => {
    expect(result.base.isSustainable).toBe(true);
    expect(result.base.runwayMonths).toBe(Infinity);
    expect(result.base.depletionDate).toBeNull();
    expect(result.survival.extensionMonths).toBe(0);
  });
});

describe("computeSide — no funds", () => {
  const result = computeSide(side({ liquidFunds: 0, expenses: [exp({ amount: 1000 })] }), NOW);
  it("has zero runway and depletes now", () => {
    expect(result.base.runwayMonths).toBe(0);
    expect(result.base.depletionDate!.getTime()).toBe(NOW.getTime());
  });
});

describe("computeSide — target & funding gap", () => {
  const result = computeSide(
    side({
      liquidFunds: 6000,
      targetRunwayMonths: 6,
      expenses: [
        exp({ amount: 1000, priority: "protect" }),
        exp({ amount: 1000, priority: "pause" }),
      ],
    }),
    NOW,
  );
  it("computes base funding gap", () => {
    expect(result.target).not.toBeNull();
    expect(result.target!.fundsNeeded).toBe(12000);
    expect(result.target!.fundingGap).toBe(6000);
    expect(result.target!.meetsTarget).toBe(false);
  });
  it("computes survival funding gap", () => {
    expect(result.target!.survivalFundsNeeded).toBe(6000);
    expect(result.target!.survivalFundingGap).toBe(0);
    expect(result.target!.survivalMeetsTarget).toBe(true);
  });
});

describe("simulateUnexpected", () => {
  const input = side({ liquidFunds: 10000, expenses: [exp({ amount: 2000 })] });
  it("reduces runway by the months of burn removed", () => {
    const impact = simulateUnexpected(input, 4000, NOW);
    expect(impact.newFunds).toBe(6000);
    expect(impact.base.runwayMonths).toBeCloseTo(3, 4);
    expect(impact.monthsLostBase).toBeCloseTo(2, 4);
  });
  it("clamps funds at zero for a cost larger than savings", () => {
    const impact = simulateUnexpected(input, 20000, NOW);
    expect(impact.newFunds).toBe(0);
    expect(impact.base.runwayMonths).toBe(0);
    expect(impact.monthsLostBase).toBeCloseTo(5, 4);
  });
});

describe("burndownSeries", () => {
  const result = computeSide(side({ liquidFunds: 10000, expenses: [exp({ amount: 2000 })] }), NOW);
  const series = burndownSeries(result);
  it("starts at full funds and stays non-negative & non-increasing", () => {
    expect(series.length).toBe(49);
    expect(series[0].base).toBe(10000);
    expect(series[0].survival).toBe(10000);
    for (let i = 1; i < series.length; i++) {
      expect(series[i].base).toBeLessThanOrEqual(series[i - 1].base);
      expect(series[i].base).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("computePlan — mode separation", () => {
  const both: PlanInput = {
    currency: "USD",
    mode: "both",
    personal: side({ liquidFunds: 1000, expenses: [exp({ amount: 1000 })] }),
    business: side({ liquidFunds: 2000, expenses: [exp({ amount: 500 })] }),
  };
  it("keeps personal and business independent (never merged)", () => {
    const r = computePlan(both, NOW);
    expect(r.personal!.base.runwayMonths).toBeCloseTo(1, 4);
    expect(r.business!.base.runwayMonths).toBeCloseTo(4, 4);
  });
  it("only computes the active side for single modes", () => {
    const r = computePlan({ ...both, mode: "personal" }, NOW);
    expect(r.personal).not.toBeNull();
    expect(r.business).toBeNull();
  });
});
