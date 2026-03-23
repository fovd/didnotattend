/**
 * Editable copy for the scoring rationale banner above the weekly schedule.
 * Replace placeholders with your literature citations, age bands, and local policy.
 */

/** One DNA barrier category with problem + data + preferences (banner “DNA barrier factors”). */
export type RationaleBarrierFactor = {
  name: string;
  description: string;
  whatWeUse: string;
  whatWeRespect: string;
};

export type RationaleSection = {
  title: string;
  /** Simple sections: one bullet per string */
  bullets?: string[];
  /** Rich layout: factor cards (omit bullets when set) */
  barrierFactors?: RationaleBarrierFactor[];
  /** Optional line below barrier cards */
  footerNote?: string;
};

export type ScoringRationaleBannerCopy = {
  title: string;
  summary: string;
  sections: RationaleSection[];
};

export const scoringRationaleBanner: ScoringRationaleBannerCopy = {
  title: "How actions are determined from scores",
  summary:
    "Combined risk scores prioritise who appears in the action schedule and what outreach to offer. Open for rationale, cost context, age, and IMD.",
  sections: [
    {
      title: "Combined score",
      bullets: [
        "ML DNA risk is combined with: recent missed appointments; area deprivation (IMD decile from patient address or postcode); recorded transport or access difficulty.",
        "That combined score drives the headline tier you see when a slot is selected.",
      ],
    },
    {
      title: "Weekly action view",
      bullets: [
        "High and medium combined-risk slots are listed first so reception can focus proactive calls and transport or taxi options where they matter most.",
        "Low-risk patients stay on routine SMS-only pathways (see the automation table below).",
      ],
    },
    {
      title: "Cost to the service",
      bullets: [
        "DNA has a measurable cost: £160 per missed appointment in planning discussions.",
        "Reducing avoidable DNA protects capacity and waiting times.",
      ],
    },
    {
      title: "Age stratification",
      bullets: [
        "Literature typically shows different DNA rates by age band.",
        "The model can weight or segment by age alongside IMD and access.",
        "Replace this block with your preferred age breakdown and references when ready.",
      ],
    },
    {
      title: "DNA barrier factors",
      barrierFactors: [
        {
          name: "Communication methods",
          description:
            "Over-reliance on digital or text channels that do not suit the patient's resources or digital literacy.",
          whatWeUse:
            "SMS delivery and read receipts where available, portal login or appointment-link clicks, and whether prior reminders were by text, app, or post.",
          whatWeRespect:
            "Stated preference for phone or post, \"no smartphone\" or similar accessibility flags, and carer or next-of-kin as preferred contact where recorded.",
        },
        {
          name: "Communication factors",
          description:
            "Language barriers or lack of interpretation integrated into the booking journey.",
          whatWeUse:
            "Preferred language and interpreter-required fields on PAS, past appointment language notes, and prior DNA or reschedule reasons mentioning language.",
          whatWeRespect:
            "Request for interpreter at scan, bilingual or easy-read materials, and offering a call instead of text-only workflows.",
        },
        {
          name: "Transport",
          description:
            "Cost, unreliability, or distance of public transport. Especially relevant for ESNEFT demographics and rural coastal catchments.",
          whatWeUse:
            "Patient postcode to site distance or drive-time proxies, IMD-linked area context, prior DNAs coded to travel, and hospital transport eligibility where the record exists.",
          whatWeRespect:
            "Parking needs, patient transport bookings, preferred arrival time, and escort or carer travel alongside the patient.",
        },
        {
          name: "Appointment factors",
          description:
            "Inflexible booking or long lead times without interim contact.",
          whatWeUse:
            "Days from booking to appointment, slot band (morning or afternoon), history of reschedule requests, and engagement with automated reminders.",
          whatWeRespect:
            "Work or childcare constraints, requested time-of-day preferences, and reasonable offers of nearer dates or alternative slots when policy allows.",
        },
        {
          name: "Personal factors",
          description:
            "Too unwell to travel on the day, or competing work and social commitments.",
          whatWeUse:
            "Recent cancellations, previous DNA reasons in clerical notes (where coded), repeat booking patterns, and vulnerability or safeguarding pathways only where already on the record.",
          whatWeRespect:
            "Patient-stated best times to call, short-term illness, and need to rebook without penalty where appropriate.",
        },
      ],
      footerNote:
        "Each mock patient shows a primary barrier tag (from patient report, previous incidents, or both) so staff can open the conversation on the most relevant topic first.",
    },
    {
      title: "IMD (Index of Multiple Deprivation)",
      bullets: [
        "Summarises neighbourhood-level deprivation and is used here as one social determinant signal, not as a label on individuals.",
        "Interpret alongside clinical and administrative context per local governance.",
      ],
    },
  ],
};
