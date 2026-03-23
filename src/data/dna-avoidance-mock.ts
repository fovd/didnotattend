import type { DnaQueueItem } from "@/types/dna-queue";

/** Sorted: must contact first (mock list order) */
export const dnaAvoidanceQueue: DnaQueueItem[] = [
  {
    id: "dna-q-1",
    patientName: "Patel, Meera",
    appointmentTime: "09:00",
    clinic: "Ultrasound",
    dnaRiskPercent: 88,
    priorityBand: "must_contact_today",
    vulnerabilityDriver: "both",
    profile: "highAccessBarrier",
    predictedBarrier:
      "Long trip in and limited buses; living in an area where extra day-to-day support is more common.",
    flags: {
      travelDistance: true,
      localAreaSupport: true,
    },
    phoneDisplay: "07700 900 482",
    suggestedOpening:
      "Hello, it’s the hospital appointments team. I see you’re travelling from quite far tomorrow. Would it help if we looked into hospital transport or parking for you?",
    secondaryActions: [
      "Book hospital transport",
      "Update next of kin or carer number",
      "See if another visit can be on the same day",
    ],
  },
  {
    id: "dna-q-2",
    patientName: "Khan, Samina",
    appointmentTime: "09:30",
    clinic: "Ultrasound",
    dnaRiskPercent: 81,
    priorityBand: "must_contact_today",
    vulnerabilityDriver: "local_area",
    profile: "busyWorker",
    predictedBarrier:
      "Working hours and travel cost may make this slot hard to keep.",
    flags: {
      localAreaSupport: true,
    },
    phoneDisplay: "07700 900 771",
    suggestedOpening:
      "Hello, it’s the hospital appointments team. We’re checking people who might find the time hard to keep. Would a different time of day or a phone appointment work better?",
    secondaryActions: [
      "Send options by text",
      "Email link to the patient portal",
      "Offer an evening clinic",
    ],
  },
  {
    id: "dna-q-3",
    patientName: "O'Connor, Liam",
    appointmentTime: "09:45",
    clinic: "Ultrasound",
    dnaRiskPercent: 79,
    priorityBand: "contact_soon",
    vulnerabilityDriver: "travel",
    profile: "highAccessBarrier",
    predictedBarrier: "Rural postcode: poor public transport links to the hospital.",
    flags: {
      travelDistance: true,
    },
    phoneDisplay: "07700 900 220",
    suggestedOpening:
      "Hello, it’s the hospital appointments team. I see you’re coming from a rural area. Do you need help with patient transport or clear directions?",
    secondaryActions: [
      "Book hospital transport",
      "Send map and parking",
    ],
  },
  {
    id: "dna-q-4",
    patientName: "Williams, Anwen",
    appointmentTime: "10:00",
    clinic: "Ultrasound",
    dnaRiskPercent: 78,
    priorityBand: "contact_soon",
    vulnerabilityDriver: "local_area",
    profile: "busyWorker",
    predictedBarrier: "Schedule clash is the main worry; area has higher travel strain.",
    flags: {
      localAreaSupport: true,
      contactDetailsCheck: true,
    },
    phoneDisplay: "07700 900 661",
    suggestedOpening:
      "Hello, it’s the hospital appointments team. We’d like to check your contact details are still right and see if another time suits work better.",
    secondaryActions: [
      "Send options by text",
      "Confirm numbers on file",
    ],
  },
  {
    id: "dna-q-5",
    patientName: "Evans, Bronwen",
    appointmentTime: "10:30",
    clinic: "Ultrasound",
    dnaRiskPercent: 76,
    priorityBand: "contact_soon",
    vulnerabilityDriver: "both",
    profile: "longWaiter",
    predictedBarrier:
      "This appointment was booked a long time ago; they may no longer need to come.",
    flags: {
      waitingLongTime: true,
      localAreaSupport: true,
    },
    phoneDisplay: "07700 900 338",
    suggestedOpening:
      "Hello, it’s the hospital appointments team. You’ve been waiting a while for this. Do you still need this appointment, or can we help you another way?",
    secondaryActions: [
      "Send “still needed?” link",
      "Call to confirm",
      "Cancel and offer slot to short notice list",
    ],
  },
  {
    id: "dna-q-6",
    patientName: "Murphy, Sean",
    appointmentTime: "10:45",
    clinic: "Ultrasound",
    dnaRiskPercent: 42,
    priorityBand: "routine",
    vulnerabilityDriver: "travel",
    profile: "highAccessBarrier",
    predictedBarrier: "Moderate distance: worth a quick reminder only.",
    flags: {
      travelDistance: true,
    },
    phoneDisplay: "07700 900 129",
    suggestedOpening:
      "Hello, it’s the hospital appointments team: just reminding you about your appointment and checking you’re still able to travel in.",
    secondaryActions: ["Send reminder text"],
  },
  {
    id: "dna-q-7",
    patientName: "Thomas, Carys",
    appointmentTime: "11:30",
    clinic: "Ultrasound",
    dnaRiskPercent: 82,
    priorityBand: "must_contact_today",
    vulnerabilityDriver: "local_area",
    profile: "highAccessBarrier",
    predictedBarrier:
      "Under-18: needs a parent or guardian to bring them; local area suggests extra barriers.",
    flags: {
      localAreaSupport: true,
      needsSomeoneToBring: true,
    },
    phoneDisplay: "07700 900 290",
    suggestedOpening:
      "Hello, it’s the hospital appointments team. This is for a young person who needs an adult to bring them. Is someone able to bring them to the appointment?",
    secondaryActions: [
      "Call parent or guardian",
      "Do not cancel without local follow-up",
    ],
  },
  {
    id: "dna-q-8",
    patientName: "Brown, Derek",
    appointmentTime: "11:45",
    clinic: "Ultrasound",
    dnaRiskPercent: 68,
    priorityBand: "routine",
    vulnerabilityDriver: "travel",
    profile: "longWaiter",
    predictedBarrier: "Booked months ago: gentle check that it is still wanted.",
    flags: {
      waitingLongTime: true,
    },
    phoneDisplay: "07700 900 673",
    suggestedOpening:
      "Hello, it’s the hospital appointments team. We’re checking long-wait appointments. Do you still need to be seen?",
    secondaryActions: ["Send “still needed?” link"],
  },
];
