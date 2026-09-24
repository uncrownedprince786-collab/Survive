import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock,
  Columns2,
  Lock,
  ShieldCheck,
  Target,
  TrendingDown,
  User,
  Wallet,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { buttonClasses } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { webAppLd } from "@/lib/seo/structured-data";

const STEPS = [
  {
    icon: Wallet,
    title: "Enter what you have",
    body: "Your available cash, any income that keeps coming in, and your monthly expenses.",
  },
  {
    icon: ShieldCheck,
    title: "Tag each expense",
    body: "Mark costs to Protect, Reduce, or Pause — the levers you'd actually pull under pressure.",
  },
  {
    icon: TrendingDown,
    title: "See your runway",
    body: "Get the months you can last, an estimated depletion date, and how much time you can buy back.",
  },
];

const FEATURES = [
  {
    icon: Clock,
    title: "Runway & depletion date",
    body: "Know how many months your money lasts and roughly when it runs out.",
  },
  {
    icon: ShieldCheck,
    title: "Survival Mode",
    body: "Protect, Reduce, and Pause to see the potential burn, runway, and extra time you'd gain.",
  },
  {
    icon: Target,
    title: "Target & funding gap",
    body: "Set a goal in months and see exactly how much more cash you'd need to reach it.",
  },
  {
    icon: Zap,
    title: "Unexpected expense simulator",
    body: "Drop in a sudden cost and watch how much runway it would take away.",
  },
  {
    icon: Columns2,
    title: "Personal, business, or both",
    body: "Plan each separately, side by side. We never merge personal and business money.",
  },
  {
    icon: Lock,
    title: "Completely private",
    body: "Every calculation runs in your browser. No account, no uploads, no tracking.",
  },
];

const MODES = [
  { icon: User, title: "Personal", body: "For individuals, families and freelancers." },
  { icon: Building2, title: "Business", body: "Payroll, software, marketing, inventory and more." },
  { icon: Columns2, title: "Both", body: "Two clear plans, side by side — never mixed." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={webAppLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-canvas px-3 py-1 text-xs font-medium text-muted">
                <Lock className="h-3.5 w-3.5 text-positive" aria-hidden="true" />
                Private by design · Free · No account
              </p>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Know exactly how long your money can last.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                SURVIVE is a privacy-first financial runway calculator. If your income or
                revenue stopped today, see how many months you could last — and what to
                protect, reduce, or pause to buy more time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/calculator" className={buttonClasses("accent", "lg")}>
                  Build your plan
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/how-it-works" className={buttonClasses("secondary", "lg")}>
                  How it works
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted">
                Works offline · Your numbers never leave your device.
              </p>
            </div>

            {/* Illustrative preview card */}
            <Reveal className="lg:justify-self-end">
              <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">
                    Example runway
                  </span>
                  <span className="rounded-full bg-warning-soft px-2.5 py-0.5 text-xs font-semibold text-warning">
                    Caution
                  </span>
                </div>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-5xl font-extrabold tabular leading-none text-ink">7</span>
                  <span className="mb-1 text-base text-muted">months</span>
                </div>
                <svg viewBox="0 0 320 120" className="mt-5 h-auto w-full" aria-hidden="true">
                  <path
                    d="M8 30 L120 78 L200 100 L312 100"
                    fill="none"
                    stroke="var(--color-positive)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 30 L110 92 L170 112 L200 112"
                    fill="none"
                    stroke="var(--color-ink)"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="200" cy="112" r="3.5" fill="var(--color-ink)" />
                  <circle cx="312" cy="100" r="3.5" fill="var(--color-positive)" />
                </svg>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-canvas p-3">
                    <p className="text-xs text-muted">Survival Mode</p>
                    <p className="mt-0.5 font-bold text-positive">+5 months</p>
                  </div>
                  <div className="rounded-lg bg-canvas p-3">
                    <p className="text-xs text-muted">Depletion</p>
                    <p className="mt-0.5 font-bold text-ink">~Apr 2027</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-canvas">
        <Container size="wide" className="py-16 sm:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Three steps to clarity
              </h2>
              <p className="mt-3 text-muted">
                No spreadsheets, no sign-up. Just an honest answer in a couple of minutes.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-border bg-surface p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section>
        <Container size="wide" className="py-16 sm:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Everything you need to plan a soft landing
              </h2>
              <p className="mt-3 text-muted">
                Deterministic math you can trust — no AI guessing, no vague advice.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 3) * 80}>
                  <div className="h-full rounded-2xl border border-border bg-surface p-6">
                    <Icon className="h-6 w-6 text-positive" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Modes */}
      <section className="border-t border-border bg-canvas">
        <Container size="wide" className="py-16 sm:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Built for people and businesses
              </h2>
              <p className="mt-3 text-muted">
                Personal and business finances follow different rules. SURVIVE keeps them
                separate so the numbers stay honest.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {MODES.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-border bg-surface p-6">
                    <Icon className="h-6 w-6 text-ink" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold text-ink">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Privacy band */}
      <section>
        <Container size="wide" className="py-16 sm:py-20">
          <Reveal>
            <div className="rounded-3xl border border-border bg-ink px-6 py-12 text-center sm:px-12">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Lock className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Your money is nobody else&rsquo;s business
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-white/70">
                SURVIVE stores your plan only in your own browser. There&rsquo;s no account, no
                server, and no analytics tracking your figures. Clear it anytime.
              </p>
              <Link
                href="/calculator"
                className={buttonClasses("accent", "lg", "mt-8")}
              >
                Start your plan
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
