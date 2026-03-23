/** Who to contact first today (plain-language bands) */
export type DnaPriorityBand = "must_contact_today" | "contact_soon" | "routine";

/** What mainly explains vulnerability on the list (for badges) */
export type VulnerabilityDriver = "travel" | "local_area" | "both";

/** Reception pathway from the PRD; drives primary button emphasis */
export type ReceptionProfile =
  | "highAccessBarrier"
  | "busyWorker"
  | "longWaiter";

export type DnaQueueItem = {
  id: string;
  patientName: string;
  appointmentTime: string;
  clinic: string;
  /** 0–100 */
  dnaRiskPercent: number;
  priorityBand: DnaPriorityBand;
  vulnerabilityDriver: VulnerabilityDriver;
  profile: ReceptionProfile;
  /** One short sentence: why they need a call */
  predictedBarrier: string;
  flags: {
    travelDistance?: boolean;
    localAreaSupport?: boolean;
    contactDetailsCheck?: boolean;
    waitingLongTime?: boolean;
    /** Child or vulnerable adult: needs someone to bring them */
    needsSomeoneToBring?: boolean;
  };
  phoneDisplay: string;
  suggestedOpening: string;
  secondaryActions: string[];
};
