"use client";

import { useState } from "react";
import { Check, Copy, Printer, Share2 } from "lucide-react";
import type { PlanResult } from "@/lib/calculations/engine";
import { buildShareText } from "@/lib/share";
import { Button } from "@/components/ui/button";

export function ShareExport({ result }: { result: PlanResult }) {
  const [copied, setCopied] = useState(false);
  const text = buildShareText(result);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "My SURVIVE plan", text });
        return;
      } catch {
        /* user cancelled or unsupported — fall through to copy */
      }
    }
    await copy();
  };

  return (
    <div className="no-print rounded-2xl border border-border bg-canvas p-5">
      <h3 className="font-semibold text-ink">Share or save your plan</h3>
      <p className="mt-1 text-sm text-muted">
        The share summary includes your runway only — never any amounts.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="primary" size="md" onClick={share}>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </Button>
        <Button variant="secondary" size="md" onClick={copy}>
          {copied ? (
            <>
              <Check className="h-4 w-4 text-positive" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy summary
            </>
          )}
        </Button>
        <Button variant="secondary" size="md" onClick={() => window.print()}>
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print / PDF
        </Button>
      </div>
    </div>
  );
}
