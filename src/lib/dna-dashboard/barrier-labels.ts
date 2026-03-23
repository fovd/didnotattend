import type {
  DnaBarrierEvidence,
  DnaReceptionBarrierFocus,
} from "@/types/dna-dashboard";

/** Short label for chips in the weekly grid */
export function barrierShortLabel(focus: DnaReceptionBarrierFocus): string {
  switch (focus) {
    case "communication_methods":
      return "Digital comms";
    case "communication_factors":
      return "Language / access";
    case "transport":
      return "Transport";
    case "appointment_factors":
      return "Booking / timing";
    case "personal_factors":
      return "Health / life";
  }
}

/** Full label for detail panel */
export function barrierFullLabel(focus: DnaReceptionBarrierFocus): string {
  switch (focus) {
    case "communication_methods":
      return "Communication methods (digital / text)";
    case "communication_factors":
      return "Communication factors (language / interpretation)";
    case "transport":
      return "Transport";
    case "appointment_factors":
      return "Appointment factors (booking / lead time)";
    case "personal_factors":
      return "Personal factors (health / competing commitments)";
  }
}

export function barrierEvidenceLabel(source: DnaBarrierEvidence): string {
  switch (source) {
    case "patient_report":
      return "Patient report";
    case "previous_incidents":
      return "Previous incidents / record";
    case "both":
      return "Patient report and previous incidents";
  }
}

export function barrierBadgeClass(focus: DnaReceptionBarrierFocus): string {
  switch (focus) {
    case "transport":
      return "bg-violet-50 text-violet-950 ring-violet-200";
    case "communication_methods":
      return "bg-indigo-50 text-indigo-950 ring-indigo-200";
    case "communication_factors":
      return "bg-fuchsia-50 text-fuchsia-950 ring-fuchsia-200";
    case "appointment_factors":
      return "bg-cyan-50 text-cyan-950 ring-cyan-200";
    case "personal_factors":
      return "bg-orange-50 text-orange-950 ring-orange-200";
  }
}
