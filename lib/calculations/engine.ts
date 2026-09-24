import type { Expense, Mode, PlanInput, SideInput } from "./types";

/** Average days per month for depletion-date estimates. */
export const AVG_DAYS_PER_MONTH = 30.4375;
const MS_PER_DAY = 86_400_000;
/** A "Reduce" expense with no explicit reduced amount keeps this fraction. */
export const DEFAULT_REDUCTION_FACTOR = 0.5;

const nonNeg = (n: number): number => (Number.isFinite(n) && n > 0 ? n : 0);

/** Effective monthly cost of an expense under Survival Mode (Protect/Reduce/Pause). */
export function effectiveExpenseAmount(e: Expense): number {
  const amount = nonNeg(e.amount);
  if (e.priority === "pause") return 0;
  if (e.priority === "reduce") {
    const reduced =
      e.reducedAmount === undefined
        ? amount * DEFAULT_REDUCTION_FACTOR
        : nonNeg(e.reducedAmount);
    return Math.min(reduced, amount);
  }
  return amount;
}

export function sumExpenses(expenses: Expense[]): number {
  return expenses.reduce((t, e) => t + nonNeg(e.amount), 0);
}

export function sumSurvivalExpenses(expenses: Expense[]): number {
  return expenses.reduce((t, e) => t + effectiveExpenseAmount(e), 0);
}

/** Runway in months. Infinity when sustainable (net burn <= 0). */
function runwayFrom(funds: number, netBurn: number): number {
  if (netBurn <= 0) return Infinity;
  if (funds <= 0) return 0;
  return funds / netBurn;
}

function depletionDate(now: Date, months: number): Date | null {
  if (!Number.isFinite(months)) return null;
  return new Date(now.getTime() + months * AVG_DAYS_PER_MONTH * MS_PER_DAY);
}

export interface Scenario {
  monthlyExpenses: number;
  netBurn: number;
  isSustainable: boolean;
  /** Infinity when sustainable. */
  runwayMonths: number;
  depletionDate: Date | null;
}

export interface SurvivalScenario extends Scenario {
  /** Monthly expense reduction vs. the base plan. */
  monthlySavings: number;
  /** Extra months bought vs. base (Infinity if it becomes sustainable). */
  extensionMonths: number;
}

export interface TargetResult {
  targetMonths: number;
  fundsNeeded: number;
  fundingGap: number;
  meetsTarget: boolean;
  survivalFundsNeeded: number;
  survivalFundingGap: number;
  survivalMeetsTarget: boolean;
}

export interface SideResult {
  liquidFunds: number;
  monthlyIncome: number;
  base: Scenario;
  survival: SurvivalScenario;
  target: TargetResult | null;
}

export function computeSide(side: SideInput, now: Date = new Date()): SideResult {
  const funds = nonNeg(side.liquidFunds);
  const income = nonNeg(side.monthlyIncome);

  const baseExpenses = sumExpenses(side.expenses);
  const baseNet = baseExpenses - income;
  const baseRunway = runwayFrom(funds, baseNet);
  const base: Scenario = {
    monthlyExpenses: baseExpenses,
    netBurn: baseNet,
    isSustainable: baseNet <= 0,
    runwayMonths: baseRunway,
    depletionDate: depletionDate(now, baseRunway),
  };

  const survExpenses = sumSurvivalExpenses(side.expenses);
  const survNet = survExpenses - income;
  const survRunway = runwayFrom(funds, survNet);

  let extensionMonths: number;
  if (base.isSustainable) extensionMonths = 0;
  else if (!Number.isFinite(survRunway)) extensionMonths = Infinity;
  else extensionMonths = Math.max(0, survRunway - baseRunway);

  const survival: SurvivalScenario = {
    monthlyExpenses: survExpenses,
    netBurn: survNet,
    isSustainable: survNet <= 0,
    runwayMonths: survRunway,
    depletionDate: depletionDate(now, survRunway),
    monthlySavings: Math.max(0, baseExpenses - survExpenses),
    extensionMonths,
  };

  let target: TargetResult | null = null;
  const tm = side.targetRunwayMonths;
  if (tm && tm > 0) {
    const fundsNeeded = Math.max(0, baseNet) * tm;
    const survivalFundsNeeded = Math.max(0, survNet) * tm;
    target = {
      targetMonths: tm,
      fundsNeeded,
      fundingGap: Math.max(0, fundsNeeded - funds),
      meetsTarget: base.isSustainable || baseRunway >= tm,
      survivalFundsNeeded,
      survivalFundingGap: Math.max(0, survivalFundsNeeded - funds),
      survivalMeetsTarget: survival.isSustainable || survRunway >= tm,
    };
  }

  return { liquidFunds: funds, monthlyIncome: income, base, survival, target };
}

export interface UnexpectedImpact {
  amount: number;
  newFunds: number;
  base: Scenario;
  survival: Scenario;
  monthsLostBase: number;
  monthsLostSurvival: number;
}

/** Simulate a one-time unexpected cost drawn from liquid funds. */
export function simulateUnexpected(
  side: SideInput,
  amount: number,
  now: Date = new Date(),
): UnexpectedImpact {
  const spend = nonNeg(amount);
  const original = computeSide(side, now);
  const newFunds = Math.max(0, original.liquidFunds - spend);
  const impacted = computeSide({ ...side, liquidFunds: newFunds }, now);
  const lost = (before: number, after: number): number => {
    if (Number.isFinite(before) && Number.isFinite(after)) return Math.max(0, before - after);
    if (Number.isFinite(after)) return Infinity; // was sustainable, now finite
    return 0;
  };
  return {
    amount: spend,
    newFunds,
    base: impacted.base,
    survival: impacted.survival,
    monthsLostBase: lost(original.base.runwayMonths, impacted.base.runwayMonths),
    monthsLostSurvival: lost(original.survival.runwayMonths, impacted.survival.runwayMonths),
  };
}

export interface BurnPoint {
  month: number;
  base: number;
  survival: number;
}

/** Sampled "money remaining over time" series for both scenarios. */
export function burndownSeries(side: SideResult, steps = 48): BurnPoint[] {
  const { liquidFunds: funds } = side;
  const baseNet = side.base.netBurn;
  const survNet = side.survival.netBurn;

  const finite = (n: number) => (Number.isFinite(n) ? n : 0);
  const horizonBasis = Math.max(
    finite(side.base.runwayMonths),
    finite(side.survival.runwayMonths),
    side.target?.targetMonths ?? 0,
    6,
  );
  const horizon = Math.min(Math.ceil(horizonBasis * 1.15), 120);

  const points: BurnPoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const month = (horizon * i) / steps;
    points.push({
      month,
      base: Math.max(0, funds - baseNet * month),
      survival: Math.max(0, funds - survNet * month),
    });
  }
  return points;
}

export interface PlanResult {
  currency: string;
  mode: Mode;
  personal: SideResult | null;
  business: SideResult | null;
}

/** Compute a full plan. Personal and business are always kept separate. */
export function computePlan(input: PlanInput, now: Date = new Date()): PlanResult {
  const wantPersonal = input.mode === "personal" || input.mode === "both";
  const wantBusiness = input.mode === "business" || input.mode === "both";
  return {
    currency: input.currency,
    mode: input.mode,
    personal: wantPersonal ? computeSide(input.personal, now) : null,
    business: wantBusiness ? computeSide(input.business, now) : null,
  };
}
