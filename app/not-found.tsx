import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <LogoMark className="h-12 w-12" />
      <p className="mt-8 text-sm font-semibold tracking-[0.2em] text-positive">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
        This page ran out of runway
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or was moved.
        Let&rsquo;s get you back to safer ground.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonClasses("primary", "md")}>
          Back home
        </Link>
        <Link href="/calculator" className={buttonClasses("secondary", "md")}>
          Open the calculator
        </Link>
      </div>
    </Container>
  );
}
