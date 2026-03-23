import type { DnaDashboardAppointment, DnaRiskTier } from "@/types/dna-dashboard";

/** Same bands as stratified summary: high ≥75%, medium 45–74%, low &lt;45%. */
export function riskTierFromPercent(percent: number): DnaRiskTier {
  if (percent >= 75) return "high";
  if (percent >= 45) return "medium";
  return "low";
}

const SCHEDULE_TIER_ORDER: Record<DnaRiskTier, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

/** Weekly action view: high first, then medium, then by time. */
export function compareByRiskTierThenTime(
  a: DnaDashboardAppointment,
  b: DnaDashboardAppointment,
): number {
  const tier =
    SCHEDULE_TIER_ORDER[a.riskTier] - SCHEDULE_TIER_ORDER[b.riskTier];
  if (tier !== 0) return tier;
  return a.slotTime.localeCompare(b.slotTime);
}

/** SMS automation list: medium before low, then by date and time. */
export function compareForSmsAutomation(
  a: DnaDashboardAppointment,
  b: DnaDashboardAppointment,
): number {
  const rank = (t: DnaRiskTier) =>
    t === "medium" ? 0 : t === "low" ? 1 : 2;
  const d = rank(a.riskTier) - rank(b.riskTier);
  if (d !== 0) return d;
  const dateCmp = a.appointmentDate.localeCompare(b.appointmentDate);
  if (dateCmp !== 0) return dateCmp;
  return a.slotTime.localeCompare(b.slotTime);
}
