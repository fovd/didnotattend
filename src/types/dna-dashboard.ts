/** Stratified from dnaRiskPercent: high ≥75%, medium 45–74%, low &lt;45% */
export type DnaRiskTier = "high" | "medium" | "low";

export type DnaSmsStatus = "scheduled" | "sent" | "n/a";

export type DnaPatientSmsReply = "awaiting" | "yes" | "no" | null;

/** Access / travel burden for combined risk (demo labels). */
export type DnaTransportDifficulty = "none" | "low" | "moderate" | "high";

export type DnaDashboardAppointment = {
  id: string;
  patientName: string;
  /** ISO date YYYY-MM-DD */
  appointmentDate: string;
  slotTime: string;
  clinic: string;
  appointmentType: string;
  /** ML model DNA risk score, 0–100; drives weekly grid badges and SMS tier. */
  dnaRiskPercent: number;
  riskTier: DnaRiskTier;
  /** Combined risk score (ML + history + IMD + transport), 0–100; headline in detail panel. */
  combinedDnaRiskPercent: number;
  /** Missed appointments in the last 12 months (same clinic or trust; demo). */
  priorMissedCount: number;
  /** English IMD decile 1–10 (1 = most deprived). */
  imdDecile: number;
  /** Short area label, e.g. outward postcode or locality. */
  areaLabel: string;
  transportDifficulty: DnaTransportDifficulty;
  /** Reception-facing recommendation when this slot is selected (demo). */
  suggestedAction: string;
  /** Display number for outbound call; spaces allowed. */
  contactPhoneDisplay: string;
  /** Extra one-tap actions below Call (e.g. taxi, transport). */
  secondaryActionLabels: string[];
  /** Medium-risk SMS automation; n/a for high/low */
  sms7dStatus: DnaSmsStatus;
  sms3dStatus: DnaSmsStatus;
  patientReply: DnaPatientSmsReply;
};
