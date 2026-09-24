import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  ChevronDown,
  SlidersHorizontal,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { buttonClasses } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { faqLd, breadcrumbLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "See exactly how SURVIVE works with a real worked example: PKR 600,000 in savings, PKR 120,000/month expenses → a 5-month runway, extended to 6.7 months with Survival Mode. Every term explained simply.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How it works · SURVIVE",
    description:
      "A real, worked example of a financial runway calculation — plus every key term explained in plain language.",
    url: "/how-it-works",
    type: "article",
  },
};

// --- Worked example (matches the real calculation engine exactly) ---
const MONEY = 600_000;
const INCOME = 0;
const EXPENSES = [
  { name: "Rent", monthly: 55_000, tag: "Protect", survival: 55_000 },
  { name: "Food & groceries", monthly: 25_000, tag: "Protect", survival: 25_000 },
  { name: "Transport", monthly: 20_000, tag: "Reduce", survival: 10_000 },
  { name: "Subscriptions & extras", monthly: 20_000, tag: "Pause", survival: 0 },
] as const;

const pkr = (n: number) => `PKR ${n.toLocaleString("en-US")}`;
const baseBurn = EXPENSES.reduce((t, e) => t + e.monthly, 0); // 120,000
const survBurn = EXPENSES.reduce((t, e) => t + e.survival, 0); // 90,000
const normalRunway = (MONEY / baseBurn).toFixed(1); // 5.0
const survRunway = (MONEY / survBurn).toFixed(1); // 6.7
const extension = (MONEY / survBurn - MONEY / baseBurn).toFixed(1); // 1.7

const tagChip: Record<string, string> = {
  Protect: "bg-ink text-white",
  Reduce: "bg-warning text-white",
  Pause: "bg-danger text-white",
};

const FLOW = [
  { n: 1, icon: Wallet, label: "Money you have", value: pkr(MONEY), hint: "Cash & savings" },
  { n: 2, icon: TrendingDown, label: "Monthly expenses", value: pkr(baseBurn), hint: "What you spend" },
  { n: 3, icon: SlidersHorizontal, label: "Flexibility", value: "Protect · Reduce · Pause", hint: "What you can cut" },
  { n: 4, icon: CalendarClock, label: "Your runway", value: `${normalRunway} → ${survRunway} mo`, hint: "How long it lasts" },
];

const TAGS = [
  { label: "Protect", chip: tagChip.Protect, body: "Essential costs you keep paying in full — rent, food, core payroll." },
  { label: "Reduce", chip: tagChip.Reduce, body: "Costs you trim to a lower amount instead of stopping — e.g. transport, a plan tier." },
  { label: "Pause", chip: tagChip.Pause, body: "Non-essentials you stop for now and resume once income returns." },
];

const GLOSSARY = [
  { term: "Accessible money", def: "The cash and savings you could realistically spend right now." },
  { term: "Essential monthly burn", def: "Your total monthly expenses, minus any income that keeps coming in." },
  { term: "Runway", def: "How many months your money lasts — simply money ÷ monthly burn." },
  { term: "Depletion date", def: "The estimated calendar date your cash reaches zero." },
  { term: "Protect / Reduce / Pause", def: "How you tag each expense: keep it, trim it, or stop it for now." },
  { term: "Survival Mode", def: "Recalculates your runway using those tags, to show the longer runway you could reach." },
  { term: "Potential extension", def: "The extra months Survival Mode buys you versus doing nothing." },
  { term: "Target & funding gap", def: "Set a runway goal (say 12 months); the gap is the extra cash you'd need to hit it." },
];

const faqs = [
  {
    q: "How does SURVIVE calculate my runway?",
    a: "It divides your accessible money by your monthly net burn (expenses minus any continuing income). PKR 600,000 ÷ PKR 120,000 a month = a 5-month runway, plus an estimated date your cash reaches zero.",
  },
  {
    q: "Is SURVIVE free?",
    a: "Yes. SURVIVE is completely free, with no account, no sign-up, and no paywall. You can build a plan in seconds.",
  },
  {
    q: "Is my financial data private?",
    a: "Yes. Every calculation runs in your browser. Your figures are saved only in your device's local storage and are never uploaded, shared, or tracked.",
  },
  {
    q: "What is Survival Mode?",
    a: "Survival Mode recalculates your burn using your Protect, Reduce, and Pause choices. In the worked example, cutting burn from PKR 120,000 to PKR 90,000 extends the runway from 5.0 to 6.7 months — 1.7 extra months.",
  },
  {
    q: "Can I use it for my business?",
    a: "Yes. There's a Business mode for company cash and expenses, and a Both mode that shows personal and business plans side by side without ever mixing the two sets of funds.",
  },
  {
    q: "Is this financial advice?",
    a: "No. SURVIVE is an informational planning tool. It produces estimates from the figures you enter and is not financial, investment, tax, or legal advice.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "How it works", path: "/how-it-works" },
          ]),
          faqLd(faqs),
        ]}
      />

      {/* Hero — the idea in two lines */}
      <Container size="prose" className="py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-positive">
          How it works
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          One question, worked out in real numbers
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          If your income stopped today, how long would your money last — and what
          could you cut to stretch it? Here&rsquo;s the whole idea in a single example.
        </p>
      </Container>

      {/* Visual flow: Money → Expenses → Flexibility → Result */}
      <Container size="wide" className="pb-6">
        <Reveal>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((s, i) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.n}
                  className="relative rounded-2xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-positive text-xs font-bold text-white">
                      {s.n}
                    </span>
                    <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted">
                    {s.label}
                  </p>
                  <p className="mt-1 text-lg font-bold tabular text-ink">{s.value}</p>
                  <p className="mt-0.5 text-xs text-muted">{s.hint}</p>
                  {i < FLOW.length - 1 && (
                    <ArrowRight
                      className="absolute top-1/2 -right-3 hidden h-5 w-5 -translate-y-1/2 text-muted lg:block"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>

      {/* The worked example */}
      <Container size="wide" className="py-10">
        <Reveal>
          <div className="rounded-3xl border border-border bg-canvas p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Follow one real example
            </h2>
            <p className="mt-2 text-muted">
              Personal mode, currency PKR. You&rsquo;d enter two things and a short expense list.
            </p>

            {/* Inputs */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Accessible money
                </p>
                <p className="mt-1 text-2xl font-bold tabular text-ink">{pkr(MONEY)}</p>
                <p className="mt-0.5 text-xs text-muted">cash &amp; savings you could spend</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Continuing income
                </p>
                <p className="mt-1 text-2xl font-bold tabular text-ink">{pkr(INCOME)}</p>
                <p className="mt-0.5 text-xs text-muted">income has stopped in this example</p>
              </div>
            </div>

            {/* Expense table */}
            <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                    <th className="px-4 py-3 font-medium">Expense</th>
                    <th className="px-4 py-3 text-right font-medium">Monthly</th>
                    <th className="px-4 py-3 font-medium">Your choice</th>
                    <th className="px-4 py-3 text-right font-medium">In Survival Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {EXPENSES.map((e) => (
                    <tr key={e.name} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 text-ink">{e.name}</td>
                      <td className="px-4 py-3 text-right tabular text-ink">{pkr(e.monthly)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagChip[e.tag]}`}
                        >
                          {e.tag}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right tabular text-ink">{pkr(e.survival)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-canvas font-semibold">
                    <td className="px-4 py-3 text-ink">Total burn</td>
                    <td className="px-4 py-3 text-right tabular text-ink">{pkr(baseBurn)}</td>
                    <td className="px-4 py-3" />
                    <td className="px-4 py-3 text-right tabular text-positive">{pkr(survBurn)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Results */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-sm font-semibold text-ink">Normal runway</p>
                <p className="mt-2 font-mono text-sm text-muted">
                  {pkr(MONEY)} ÷ {pkr(baseBurn)}/mo
                </p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tabular text-ink">{normalRunway}</span>
                  <span className="text-muted">months</span>
                </p>
                <p className="mt-2 text-sm text-muted">
                  Runs dry ~5 months out — e.g. start in January, empty by early June.
                </p>
              </div>
              <div className="rounded-2xl border border-positive/30 bg-positive-soft/50 p-5">
                <p className="text-sm font-semibold text-ink">With Survival Mode</p>
                <p className="mt-2 font-mono text-sm text-muted">
                  {pkr(MONEY)} ÷ {pkr(survBurn)}/mo
                </p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tabular text-positive">{survRunway}</span>
                  <span className="text-muted">months</span>
                  <span className="rounded-full bg-positive px-2 py-0.5 text-xs font-semibold text-white">
                    +{extension} months
                  </span>
                </p>
                <p className="mt-2 text-sm text-muted">
                  Trimming burn to {pkr(survBurn)} buys you {extension} extra months — for free.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Protect / Reduce / Pause */}
      <Container size="wide" className="py-10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            The three levers: Protect, Reduce, Pause
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            You tag every expense with one of three choices. That&rsquo;s what powers Survival Mode.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {TAGS.map((t) => (
              <div key={t.label} className="rounded-2xl border border-border bg-surface p-6">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${t.chip}`}
                >
                  {t.label}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* Glossary */}
      <Container size="wide" className="py-10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Every term, in plain language
          </h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="rounded-xl border border-border bg-surface p-4">
                <dt className="font-semibold text-ink">{g.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{g.def}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* FAQ */}
      <Container size="prose" className="py-10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-ink">Frequently asked questions</h2>
          <div className="mt-4 border-t border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-4 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* CTA */}
      <Container size="wide" className="pb-20 pt-6">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/calculator" className={buttonClasses("accent", "lg")}>
              Try it with your numbers
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              About SURVIVE
            </Link>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
