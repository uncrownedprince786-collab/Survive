import { describe, expect, it } from "vitest";
import {
  burndownSeries,
  computePlan,
  computeSide,
  simulateUnexpected,
  type SideResult,
} from "@/lib/calculations/engine";
import type { Mode, Priority, SideInput } from "@/lib/calculations/types";
import {
  formatDate,
  formatMoney,
  formatMoneyCompact,
  formatRunway,
  runwayHeadline,
} from "@/lib/format";
import { sanitizePlan } from "@/lib/validation/plan";

const NOW = new Date("2026-01-01T00:00:00.000Z");
const CURRENCIES = ["PKR", "USD", "AED", "GBP", "EUR", "SAR"];
const BAD = /NaN|undefined|Infinity|Invalid/;

let seq = 0;
const e = (amount: number, priority: Priority = "protect", reducedAmount?: number) => ({
  id: `e${seq++}`,
  name: "x",
  amount,
  category: "other",
  priority,
  reducedAmount,
});
const side = (o: Partial<SideInput>): SideInput => ({
  liquidFunds: 0,
  monthlyIncome: 0,
  expenses: [],
  ...o,
});

function assertClean(r: SideResult) {
  const nums = [
    r.liquidFunds,
    r.base.runwayMonths,
    r.base.netBurn,
    r.base.monthlyExpenses,
    r.survival.runwayMonths,
    r.survival.extensionMonths,
    r.survival.monthlySavings,
  ];
  for (const n of nums) expect(Number.isNaN(n)).toBe(false);

  for (const cur of CURRENCIES) {
    for (const n of [r.liquidFunds, r.base.monthlyExpenses, r.base.netBurn, r.survival.monthlySavings]) {
      expect(formatMoney(n, cur)).not.toMatch(BAD);
    }
  }
  for (const m of [r.base.runwayMonths, r.survival.runwayMonths, r.survival.extensionMonths]) {
    expect(formatRunway(m)).not.toMatch(/NaN|undefined/);
    expect(runwayHeadline(m)).not.toMatch(/NaN|undefined/);
  }
  expect(formatDate(r.base.depletionDate)).not.toMatch(BAD);
}

describe("regression: edge input combinations never break", () => {
  const scenarios: [string, SideInput][] = [
    ["all empty/zero", side({})],
    ["funds only (sustainable)", side({ liquidFunds: 100000 })],
    ["expenses only, no funds", side({ expenses: [e(1000)] })],
    ["income == expenses", side({ liquidFunds: 5000, monthlyIncome: 3000, expenses: [e(3000)] })],
    ["income exceeds expenses", side({ liquidFunds: 5000, monthlyIncome: 9000, expenses: [e(3000)] })],
    ["all expenses paused", side({ liquidFunds: 10000, expenses: [e(2000, "pause"), e(1000, "pause")] })],
    ["reduce to 0", side({ liquidFunds: 10000, expenses: [e(2000, "reduce", 0)] })],
    ["reduce over original", side({ liquidFunds: 10000, expenses: [e(2000, "reduce", 9999)] })],
    ["huge numbers", side({ liquidFunds: 1e12, expenses: [e(1e9)] })],
    ["tiny burn, big funds", side({ liquidFunds: 1e9, expenses: [e(1)] })],
    ["target 0", side({ liquidFunds: 1000, expenses: [e(500)], targetRunwayMonths: 0 })],
    ["target huge", side({ liquidFunds: 1000, expenses: [e(500)], targetRunwayMonths: 600 })],
    ["50 mixed expenses", side({ liquidFunds: 50000, expenses: Array.from({ length: 50 }, (_, i) => e(100, (["protect", "reduce", "pause"] as Priority[])[i % 3])) })],
  ];

  for (const [name, input] of scenarios) {
    it(name, () => {
      const r = computeSide(input, NOW);
      assertClean(r);

      for (const p of burndownSeries(r)) {
        expect(Number.isNaN(p.base)).toBe(false);
        expect(Number.isNaN(p.survival)).toBe(false);
        expect(p.base).toBeGreaterThanOrEqual(0);
        expect(p.survival).toBeGreaterThanOrEqual(0);
      }

      for (const amt of [0, 100, input.liquidFunds, input.liquidFunds * 2 + 1, 1e15]) {
        const imp = simulateUnexpected(input, amt, NOW);
        expect(Number.isNaN(imp.newFunds)).toBe(false);
        expect(imp.newFunds).toBeGreaterThanOrEqual(0);
        expect(Number.isNaN(imp.base.runwayMonths)).toBe(false);
      }
    });
  }
});

describe("regression: computePlan across modes and mixed emptiness", () => {
  const mk = (mode: Mode, p: Partial<SideInput>, b: Partial<SideInput>) => ({
    currency: "USD",
    mode,
    personal: side(p),
    business: side(b),
  });

  it("both mode with one side empty still resolves both", () => {
    const r = computePlan(mk("both", {}, { liquidFunds: 10000, expenses: [e(2000)] }), NOW);
    expect(r.personal).not.toBeNull();
    expect(r.business).not.toBeNull();
    expect(Number.isNaN(r.personal!.base.runwayMonths)).toBe(false);
  });

  it("single modes null out the other side", () => {
    expect(computePlan(mk("personal", { liquidFunds: 1000 }, {}), NOW).business).toBeNull();
    expect(computePlan(mk("business", {}, { liquidFunds: 1000 }), NOW).personal).toBeNull();
  });
});

describe("regression: sanitizePlan hardens garbage input", () => {
  const garbage: unknown[] = [
    null,
    undefined,
    {},
    "not an object",
    42,
    { mode: "hack", currency: "ZZZ", personal: "nope", business: 123 },
    { personal: { liquidFunds: "abc", monthlyIncome: -5, expenses: "no" } },
    { personal: { expenses: [{ amount: "NaN", priority: "weird" }, null, 42, { amount: -3 }] } },
    { business: { targetRunwayMonths: -10, liquidFunds: Infinity } },
  ];

  garbage.forEach((g, i) => {
    it(`case ${i} does not throw and computes cleanly`, () => {
      const p = sanitizePlan(g);
      expect(["personal", "business", "both"]).toContain(p.mode);
      expect(CURRENCIES).toContain(p.currency);
      expect(p.personal.liquidFunds).toBeGreaterThanOrEqual(0);
      const r = computePlan(p, NOW);
      if (r.personal) expect(Number.isNaN(r.personal.base.runwayMonths)).toBe(false);
      if (r.business) expect(Number.isNaN(r.business.base.runwayMonths)).toBe(false);
    });
  });
});

describe("regression: formatters handle extreme values", () => {
  const vals = [0, -0, 0.4, 1, 8, 12, 15, 100.5, NaN, Infinity, -Infinity, 1e15];

  it("runway formatters never emit NaN/undefined", () => {
    for (const v of vals) {
      expect(formatRunway(v)).not.toMatch(/NaN|undefined/);
      expect(runwayHeadline(v)).not.toMatch(/NaN|undefined/);
    }
  });

  it("money formatters never leak NaN/Infinity across currencies", () => {
    for (const cur of CURRENCIES) {
      for (const v of vals) {
        expect(formatMoney(v, cur)).not.toMatch(BAD);
        expect(formatMoneyCompact(v, cur)).not.toMatch(BAD);
      }
    }
  });

  it("formatDate handles null and invalid dates", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate(new Date("nonsense"))).toBe("—");
  });
});
