import { getCurrency } from "@/lib/constants/currencies";

interface MoneyOpts {
  compact?: boolean;
  decimals?: number;
}

export function formatMoney(amount: number, currencyCode: string, opts: MoneyOpts = {}): string {
  const c = getCurrency(currencyCode);
  const safe = Number.isFinite(amount) ? amount : 0;
  try {
    return new Intl.NumberFormat(c.locale, {
      style: "currency",
      currency: c.code,
      notation: opts.compact ? "compact" : "standard",
      maximumFractionDigits: opts.decimals ?? 0,
      minimumFractionDigits: 0,
    }).format(safe);
  } catch {
    return `${c.symbol}${Math.round(safe).toLocaleString()}`;
  }
}

/** Compact form for axis labels / tight spaces, e.g. "₨1.2M". */
export function formatMoneyCompact(amount: number, currencyCode: string): string {
  return formatMoney(amount, currencyCode, { compact: true, decimals: 1 });
}

/** Human runway string: "Indefinite", "0 months", "8 months", "1 yr 3 mo". */
export function formatRunway(months: number): string {
  if (!Number.isFinite(months)) return "Indefinite";
  if (months <= 0) return "0 months";
  const totalMonths = Math.round(months * 10) / 10;
  if (totalMonths < 1) {
    const weeks = Math.max(1, Math.round(months * 4.345));
    return `${weeks} week${weeks === 1 ? "" : "s"}`;
  }
  const years = Math.floor(totalMonths / 12);
  const rem = Math.round(totalMonths - years * 12);
  if (years >= 1) {
    if (rem === 0) return `${years} yr${years === 1 ? "" : "s"}`;
    return `${years} yr${years === 1 ? "" : "s"} ${rem} mo`;
  }
  return `${totalMonths} month${totalMonths === 1 ? "" : "s"}`;
}

/** Big number for the hero stat: integer months, or "∞". */
export function runwayHeadline(months: number): string {
  if (!Number.isFinite(months)) return "∞";
  if (months <= 0) return "0";
  if (months < 10) return (Math.round(months * 10) / 10).toString();
  return Math.round(months).toString();
}

export function formatDate(d: Date | null): string {
  if (!d || Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatNumber(n: number): string {
  const safe = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(safe);
}
