import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CalculatorApp } from "@/components/plan/calculator-app";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd, webAppLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Financial Runway Calculator",
  description:
    "Free financial runway calculator. Enter your cash, income and expenses to see how many months your money lasts — and what to protect, reduce or pause. 100% private, runs in your browser.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Financial Runway Calculator · SURVIVE",
    description:
      "See how many months your money lasts if income stops, and what to cut to buy more time. Free and fully private.",
    url: "/calculator",
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <Container className="py-12 sm:py-16">
      <JsonLd
        data={[
          webAppLd(),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Calculator", path: "/calculator" },
          ]),
        ]}
      />
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-positive">
          Calculator
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Build your survival plan
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Four quick steps. Everything is calculated in your browser — nothing you
          enter is uploaded or stored on a server.
        </p>
      </div>
      <CalculatorApp />
    </Container>
  );
}
