/** Stratified from dnaRiskPercent: high ≥75%, medium 45–74%, low &lt;45% */
export type DnaRiskTier = "high" | "medium" | "low";

export type DnaSmsStatus = "scheduled" | "sent" | "n/a";

export type DnaPatientSmsReply = "awaiting" | "yes" | "no" | null;

/** Access / travel burden for combined risk (demo labels). */
export type DnaTransportDifficulty = "none" | "low" | "moderate" | "high";

/** Most pertinent DNA barrier for staff triage (from model + record). */
export type DnaReceptionBarrierFocus =
  | "communication_methods"
  | "communication_factors"
  | "transport"
  | "appointment_factors"
  | "personal_factors";

/** Whether the primary barrier came from patient report, history, or both. */
export type DnaBarrierEvidence = "patient_report" | "previous_incidents" | "both";

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
  /** Strongest barrier category for this slot (guides reception). */
  primaryBarrier: DnaReceptionBarrierFocus;
  /** Where the primary barrier signal came from (demo). */
  primaryBarrierSource: DnaBarrierEvidence;
  /** Medium-risk SMS automation; n/a for high/low */
  sms7dStatus: DnaSmsStatus;
  sms3dStatus: DnaSmsStatus;
  patientReply: DnaPatientSmsReply;
};
