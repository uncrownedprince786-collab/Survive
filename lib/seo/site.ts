// Central site metadata. Update NEXT_PUBLIC_SITE_URL in env after first deploy.
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://survive.vercel.app";

export const SITE = {
  name: "SURVIVE",
  tagline: "Know how long your money lasts",
  url: rawUrl,
  description:
    "SURVIVE is a free, privacy-first financial runway calculator for people and businesses. See how many months your savings last if income stops, and what to protect, reduce, or pause to buy more time. All math runs in your browser — nothing is uploaded.",
  shortDescription:
    "Free privacy-first financial runway calculator. See how long your money lasts if income stops.",
  keywords: [
    "financial runway calculator",
    "how long will my money last",
    "savings runway calculator",
    "cash runway calculator",
    "business runway calculator",
    "emergency fund calculator",
    "financial survival planner",
    "burn rate calculator",
    "months of runway",
    "personal cash flow planner",
    "expense reduction planner",
    "financial safety net",
  ],
  locale: "en_US",
  twitter: "", // add handle if available, e.g. "@survive"
} as const;

export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
