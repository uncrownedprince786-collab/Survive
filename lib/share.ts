import type { PlanResult, SideResult } from "@/lib/calculations/engine";
import { formatRunway } from "@/lib/format";
import { SITE } from "@/lib/seo/site";

// Privacy-safe share text: runway only, never any monetary amounts.
function sideLine(name: string, r: SideResult): string {
  const base = formatRunway(r.base.runwayMonths);
  const surv = formatRunway(r.survival.runwayMonths);
  const ext =
    r.survival.extensionMonths > 0 && r.survival.extensionMonths !== Infinity
      ? ` (Survival Mode: ~${surv})`
      : r.survival.extensionMonths === Infinity
        ? " (Survival Mode: sustainable)"
        : "";
  return `${name}: ~${base} of runway${ext}.`;
}

export function buildShareText(result: PlanResult): string {
  const lines = ["My financial runway — via SURVIVE"];
  if (result.personal) lines.push(sideLine("Personal", result.personal));
  if (result.business) lines.push(sideLine("Business", result.business));
  lines.push(`No amounts shared — just the runway. ${SITE.url}`);
  return lines.join("\n");
}
