import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SURVIVE protects your privacy: no account, no tracking, no analytics. Your financial figures stay in your browser's local storage and never reach a server.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy · SURVIVE",
    description:
      "How SURVIVE protects your privacy: no account, no tracking, no analytics. Your financial figures stay in your browser's local storage and never reach a server.",
    url: "/privacy",
    type: "article",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />

      <Container size="prose" className="py-16 sm:py-20">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-positive">
          Privacy
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          SURVIVE is built privacy-first. Your financial figures stay on your
          device — there are no servers of ours that receive them, no account
          system, and no tracking.
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
                Our approach
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                SURVIVE is designed around a simple principle: the best way to
                protect your data is not to collect it. The entire calculator
                runs locally in your web browser, and using it requires no
                personal information at all.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                What we collect
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Essentially nothing personal. There is no account to create and
                no name, email address, or phone number required to use SURVIVE.
                The financial figures you enter — funds, income, and expenses —
                are never transmitted to us and are never stored on our servers,
                because the tool has no server that receives them.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Where your data lives
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                Any figures you enter are saved only in your browser’s local
                storage, on the device you are using. They stay there so your
                plan is ready when you return, and they are visible only to you.
                You can remove them at any time by resetting the{" "}
                <Link
                  href="/calculator"
                  className="font-medium text-ink underline-offset-4 hover:underline"
                >
                  calculator
                </Link>{" "}
                or by clearing your browser’s site data in your browser settings.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Cookies and analytics
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                SURVIVE sets no tracking cookies and uses no third-party
                analytics. We do not profile you, follow you across sites, or
                build an advertising picture of you. The only storage we use is
                the first-party local storage described above, which holds your
                own plan on your own device.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Third parties
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                The site is served as static files by our hosting provider,
                Vercel, which may process standard technical request data such as
                an IP address in order to deliver the page, as any web host does.
                We do not share personal data with third parties, because we do
                not collect it.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Children’s privacy
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                SURVIVE is a general-purpose planning tool intended for people
                aged 13 and over. It is not directed at children, and we do not
                knowingly collect information from anyone — including children —
                because the tool collects no personal information at all.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Changes to this policy
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                We may update this policy as the tool evolves. When we do, we
                will revise the date shown at the top of this page. Continued use
                of SURVIVE after a change means you accept the updated policy.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Contact
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                If you have a question about privacy, you can reach out through
                the project’s public repository or website. Because we hold no
                personal data about you, there is no account information for us
                to look up, export, or delete on your behalf.
              </p>
            </section>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
