import { describe, expect, it } from "vitest";
import { formatDate, formatMoney, formatRunway, runwayHeadline } from "@/lib/format";

describe("formatRunway", () => {
  it("handles the sustainable case", () => {
    expect(formatRunway(Infinity)).toBe("Indefinite");
  });
  it("handles zero", () => {
    expect(formatRunway(0)).toBe("0 months");
  });
  it("formats single and multiple months", () => {
    expect(formatRunway(1)).toBe("1 month");
    expect(formatRunway(8)).toBe("8 months");
  });
  it("formats years and months", () => {
    expect(formatRunway(12)).toBe("1 yr");
    expect(formatRunway(15)).toBe("1 yr 3 mo");
  });
  it("formats sub-month runway in weeks", () => {
    expect(formatRunway(0.5)).toContain("week");
  });
});

describe("runwayHeadline", () => {
  it("shows infinity symbol when sustainable", () => {
    expect(runwayHeadline(Infinity)).toBe("∞");
  });
  it("keeps one decimal under 10 months", () => {
    expect(runwayHeadline(3.456)).toBe("3.5");
  });
  it("rounds to whole months at 10+", () => {
    expect(runwayHeadline(15.6)).toBe("16");
  });
});

describe("formatMoney / formatDate", () => {
  it("formats currency without decimals", () => {
    expect(formatMoney(1000, "USD")).toContain("1,000");
  });
  it("renders an em dash for a null date", () => {
    expect(formatDate(null)).toBe("—");
  });
});
