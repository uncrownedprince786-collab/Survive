import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { buttonClasses } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About SURVIVE — a free, privacy-first financial runway calculator that runs entirely in your browser with deterministic math and no account, tracking, or AI.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · SURVIVE",
    description:
      "About SURVIVE — a free, privacy-first financial runway calculator that runs entirely in your browser with deterministic math and no account, tracking, or AI.",
    url: "/about",
    type: "article",
  },
};

const differentiators = [
  {
    term: "Privacy-first",
    body: "Every calculation runs in your browser. Your numbers never leave your device and never reach a server of ours.",
  },
  {
    term: "Deterministic, not guesswork",
    body: "The math is transparent arithmetic. There is no AI in the calculations or recommendations — the same inputs always produce the same result.",
  },
  {
    term: "Genuinely free",
    body: "No account, no paywall, no upsell. Open it, build a plan, and leave whenever you like.",
  },
  {
    term: "Works offline",
    body: "Once the page has loaded, the calculator keeps working without a connection.",
  },
];

const audiences = [
  "Individuals and families planning a safety net",
  "Freelancers and contractors with uneven income",
  "Small businesses and startups watching their cash runway",
  "Anyone facing a career break, redundancy, or a major life change",
];

const principles = [
  {
    term: "Private by default",
    body: "Your data stays on your device.",
  },
  {
    term: "Honest and deterministic",
    body: "Plain arithmetic you can trust, never a black box.",
  },
  {
    term: "Free",
    body: "Free to use, with no account required.",
  },
  {
    term: "Calm and clear",
    body: "No jargon, no pressure, no dark patterns.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <Container size="prose" className="py-16 sm:py-20">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-positive">
          About
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          About SURVIVE
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          SURVIVE is a free, privacy-first tool that answers a question most
          people avoid until it is urgent: how long could I last if the money
          stopped coming in?
        </p>
      </Container>

      <Container size="prose" className="pb-20 sm:pb-28">
        <div className="space-y-12">
          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Why it exists
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Income is less certain than it used to be. Jobs end, clients
                disappear, markets turn, and a single unexpected bill can undo
                months of careful saving. Yet most people and businesses cannot
                say — with any confidence — how long they could last if their
                income stopped tomorrow.
              </p>
              <p className="mt-3 text-muted leading-relaxed">
                SURVIVE exists to replace that uncertainty with a clear, honest
                answer to “how long can we last”, and a short list of things you
                could change to make that answer longer.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                What makes it different
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {differentiators.map((item) => (
                  <div
                    key={item.term}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <p className="font-semibold text-ink">{item.term}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Who it is for
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                SURVIVE is built for anyone who wants an honest read on their
                financial staying power.
              </p>
              <ul className="mt-4 space-y-3">
                {audiences.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-positive"
                      aria-hidden="true"
                    />
                    <span className="text-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Our principles
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {principles.map((item) => (
                  <div
                    key={item.term}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-6"
                  >
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-positive"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-ink">{item.term}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="rounded-2xl border border-border bg-canvas p-6">
              <h2 className="text-base font-semibold tracking-tight text-ink">
                A note on advice
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                SURVIVE provides informational estimates based only on the
                figures you enter. It is not financial, investment, tax, or legal
                advice. For decisions that matter, confirm your numbers with a
                qualified professional who can consider your full situation.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <Link href="/calculator" className={buttonClasses("primary", "lg")}>
                Build your plan
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                See how it works
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
