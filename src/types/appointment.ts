export type AppointmentStatus =
  | "booked"
  | "arrived"
  | "waiting"
  | "in_consultation"
  | "completed"
  | "dna";

export type ReceptionFlags = {
  interpreter?: boolean;
  fastTrack?: boolean;
  wheelchair?: boolean;
};

export type AppointmentRow = {
  id: string;
  slotTime: string;
  patientName: string;
  /** 8-digit hospital number (mock) */
  mrn: string;
  dobDisplay: string;
  age: number;
  clinic: string;
  clinician: string;
  appointmentType: string;
  status: AppointmentStatus;
  flags?: ReceptionFlags;
};
