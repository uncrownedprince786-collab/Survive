import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The Terms of Use for SURVIVE, a free financial runway tool. Its outputs are estimates only and are not financial, investment, tax, or legal advice.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use · SURVIVE",
    description:
      "The Terms of Use for SURVIVE, a free financial runway tool. Its outputs are estimates only and are not financial, investment, tax, or legal advice.",
    url: "/terms",
    type: "article",
  },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ])}
      />

      <Container size="prose" className="py-16 sm:py-20">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-positive">
          Terms
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          These terms govern your use of SURVIVE. By using the tool you agree to
          them. Please read them alongside our{" "}
          <Link
            href="/privacy"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="mt-4 text-sm italic text-muted">
          Last updated: 24 September 2026
        </p>
      </Container>

      <Container size="prose" className="pb-20 sm:pb-28">
        <div className="space-y-10">
          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Acceptance of terms
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                By accessing or using SURVIVE, you agree to be bound by these
                Terms of Use. If you do not agree with any part of them, please
                do not use the tool.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                The service
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                SURVIVE is a free, informational planning tool that estimates
                financial runway from figures you enter. It runs in your browser
                and is provided as a convenience to help you think through your
                own finances.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section className="rounded-2xl border border-warning/40 bg-warning-soft p-6">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Not financial, investment, tax, or legal advice
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                SURVIVE does not provide financial, investment, tax, or legal
                advice. Its outputs are estimates generated only from the numbers
                you enter, using fixed arithmetic. They do not account for your
                full circumstances and must not be relied upon as advice. Nothing
                in the tool is a recommendation to take, or to refrain from, any
                financial action.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                No warranty
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                SURVIVE is provided “as is” and “as available”, without
                warranties of any kind, whether express or implied, including
                fitness for a particular purpose and accuracy. We do not warrant
                that the tool will be uninterrupted or error-free, or that its
                estimates will match real outcomes.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Limitation of liability
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                To the fullest extent permitted by law, SURVIVE and its authors
                will not be liable for any loss or damage — including financial
                loss — arising from your use of, or reliance on, the tool or its
                estimates.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Your responsibility
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                You are responsible for the figures you enter and the decisions
                you make. Before acting on anything you see here, verify your
                numbers and consult a qualified financial, tax, or legal
                professional who can consider your specific situation.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Intellectual property
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                The SURVIVE name, design, and content are the property of their
                respective owners and are protected by applicable law. You may
                use the tool for your own personal or business planning; you may
                not misrepresent it as your own or use it in any way that is
                unlawful or harmful.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Changes to terms
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                We may update these terms from time to time. When we do, we will
                revise the date shown at the top of this page. Continued use of
                SURVIVE after a change means you accept the revised terms.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Governing terms
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                These terms are provided for a free, informational tool and are
                intended to be interpreted reasonably and in good faith under the
                laws applicable in your jurisdiction. If any provision is found
                unenforceable, the remaining provisions continue in effect.
              </p>
            </section>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
