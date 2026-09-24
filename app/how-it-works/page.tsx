import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  Layers,
  Shield,
  Clock,
  LifeBuoy,
  Target,
  Zap,
  Lock,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { buttonClasses } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { faqLd, breadcrumbLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Learn how SURVIVE calculates your financial runway — net burn, estimated depletion date, Survival Mode, target runway and funding gap, private in your browser.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How it works · SURVIVE",
    description:
      "Learn how SURVIVE calculates your financial runway — net burn, estimated depletion date, Survival Mode, target runway and funding gap, private in your browser.",
    url: "/how-it-works",
    type: "article",
  },
};

const faqs = [
  {
    q: "How does SURVIVE calculate my runway?",
    a: "SURVIVE divides your available liquid funds by your monthly net burn — your expenses minus any income that continues. The result is your runway in months, plus an estimated date your cash could reach zero. Every figure is an estimate based only on the numbers you enter.",
  },
  {
    q: "Is SURVIVE free?",
    a: "Yes. SURVIVE is completely free to use, with no account, no sign-up, and no paywall. You can open it and build a plan in seconds.",
  },
  {
    q: "Is my financial data private?",
    a: "Yes. Every calculation runs in your browser. Your figures are saved only in your device's local storage and are never uploaded to a server, shared, or tracked.",
  },
  {
    q: "What is Survival Mode?",
    a: "Survival Mode recalculates your burn using the Protect, Reduce, and Pause choices you make for each expense. It shows your potential burn, your potential runway, and the extra months those changes could buy you.",
  },
  {
    q: "Can I use it for my business?",
    a: "Yes. SURVIVE has a Business mode for company cash and expenses, and a Both mode that shows your personal and business plans side by side without ever mixing the two sets of funds.",
  },
  {
    q: "Is this financial advice?",
    a: "No. SURVIVE is an informational planning tool. It produces estimates from the figures you enter and is not financial, investment, tax, or legal advice. Confirm any decision with a qualified professional.",
  },
];

const tags = [
  {
    label: "Protect",
    dot: "bg-ink",
    text: "text-ink",
    body: "Essential costs you intend to keep paying in full — housing, food, core payroll. They stay in your burn, untouched.",
  },
  {
    label: "Reduce",
    dot: "bg-warning",
    text: "text-warning",
    body: "Costs you could trim to a lower amount without stopping entirely, such as scaling back a subscription tier or a discretionary budget.",
  },
  {
    label: "Pause",
    dot: "bg-danger",
    text: "text-danger",
    body: "Non-essential costs you could stop temporarily to conserve cash, then resume once your income returns.",
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

      <Container size="prose" className="py-16 sm:py-20">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-positive">
          How it works
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          How SURVIVE calculates your financial runway
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          You enter what you hold and what you spend; SURVIVE does the
          arithmetic instantly and shows how long you could last if the money
          stopped — and what to change to buy more time.
        </p>
      </Container>

      <Container size="prose" className="pb-20 sm:pb-28">
        <div className="space-y-12">
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink">
                <HelpCircle className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
                The core question
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                SURVIVE answers one question with as little friction as possible:
                if your income or revenue stopped today, how many months could
                you keep going — and what could you change to extend that? You
                give it your liquid funds and your monthly expenses, and it turns
                them into a clear number you can act on.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink">
                <Layers className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
                Personal, Business, or Both
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Choose the mode that matches your situation. Personal tracks your
                household savings and living costs. Business tracks company cash
                and operating expenses. Both shows the two plans side by side and
                deliberately keeps the money separate — it never merges personal
                and business funds into a single figure.
              </p>
              <p className="mt-3 text-muted leading-relaxed">
                Combining them would flatter your numbers and hide the truth: a
                healthy personal cushion cannot practically cover a company
                shortfall, and company cash is not yours to live on. Seeing each
                runway on its own keeps every decision honest.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink">
                <Shield className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
                Protect, Reduce, or Pause
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                For every expense you list, you decide how it should behave under
                pressure by tagging it one of three ways.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {tags.map((tag) => (
                  <div
                    key={tag.label}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${tag.dot}`}
                        aria-hidden="true"
                      />
                      <p
                        className={`text-sm font-semibold uppercase tracking-[0.08em] ${tag.text}`}
                      >
                        {tag.label}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {tag.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink">
                <Clock className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
                Runway and estimated depletion date
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Your runway is simple division: liquid funds divided by monthly
                net burn, where net burn is your expenses minus any income that
                keeps coming in. Hold 12,000 and burn 3,000 a month, and that is
                roughly four months. From today’s date, SURVIVE also projects an
                estimated depletion date — the point your cash could reach zero.
                Treat both as estimates, not guarantees; real life rarely spends
                in a straight line.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink">
                <LifeBuoy className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
                Survival Mode
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Survival Mode recalculates everything using your Protect, Reduce,
                and Pause choices. It shows your potential burn once those changes
                take effect, your potential runway at that lower burn, and the
                extra months you would buy compared with doing nothing. It turns a
                vague “we should cut back” into a concrete number.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink">
                <Target className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
                Target runway and funding gap
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Set a goal — say, twelve months of runway — and SURVIVE shows your
                funding gap: the extra cash you would need today to reach it at
                your current burn. It reframes the question from “are we short?”
                to “exactly how short, and by how much?”
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink">
                <Zap className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
                Unexpected expense simulator
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Stress-test your plan against a shock. Enter a one-time cost — a
                medical bill, a broken-down vehicle, a lost client — and the
                simulator subtracts it from your funds and shows how many months
                of runway it would cost you.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink">
                <Lock className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
                Built to stay private
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Everything above happens entirely in your browser. Your figures
                are saved only in your device’s local storage, so they are ready
                when you return, and nothing is ever uploaded to a server. There
                is no account to create, no sign-up, and no tracking. Clearing
                your browser data or resetting the calculator removes it all.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Frequently asked questions
              </h2>
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
                    <p className="pb-4 text-muted leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <Link href="/calculator" className={buttonClasses("primary", "lg")}>
                Build your plan
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                About SURVIVE
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
