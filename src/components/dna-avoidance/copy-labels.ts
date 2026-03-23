import type {
  DnaPriorityBand,
  ReceptionProfile,
  VulnerabilityDriver,
} from "@/types/dna-queue";

export function priorityLabel(band: DnaPriorityBand): string {
  switch (band) {
    case "must_contact_today":
      return "Contact today";
    case "contact_soon":
      return "Contact soon";
    case "routine":
      return "Routine";
  }
}

export function vulnerabilityBadgeLabel(driver: VulnerabilityDriver): string {
  switch (driver) {
    case "travel":
      return "Travel";
    case "local_area":
      return "Local area";
    case "both":
      return "Both";
  }
}

export function profilePrimaryLabel(profile: ReceptionProfile): string {
  switch (profile) {
    case "highAccessBarrier":
      return "Call patient";
    case "busyWorker":
      return "Send options by text";
    case "longWaiter":
      return "Send still needed link";
  }
}
