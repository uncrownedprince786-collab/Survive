import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ResultsApp } from "@/components/result/results-app";

export const metadata: Metadata = {
  title: "Your survival plan",
  description: "Your personalised financial runway results, calculated privately in your browser.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-positive">
          Results
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Your survival plan
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          How long your money could last, and what buys you more time. These are
          estimates based on the figures you entered — not financial advice.
        </p>
      </div>
      <ResultsApp />
    </Container>
  );
}
