export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: Currency[] = [
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", locale: "en-PK" },
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", locale: "en-AE" },
  { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
  { code: "EUR", symbol: "€", name: "Euro", locale: "en-IE" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", locale: "en-SA" },
];

export const DEFAULT_CURRENCY = "PKR";
export const CURRENCY_CODES = CURRENCIES.map((c) => c.code);

export function getCurrency(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function isCurrencyCode(code: unknown): code is string {
  return typeof code === "string" && CURRENCY_CODES.includes(code);
}
