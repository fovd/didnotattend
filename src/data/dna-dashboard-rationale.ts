/**
 * Editable copy for the scoring rationale banner above the weekly schedule.
 * Replace placeholders with your literature citations, age bands, and local policy.
 */
export type RationaleSection = {
  /** Short label shown above the bullets */
  title: string;
  /** One bullet per line of rationale */
  bullets: string[];
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
        "DNA has a measurable cost: we use an illustrative £160 per missed appointment in planning discussions (adjust to your trust's actual tariff).",
        "Reducing avoidable DNA protects capacity and waiting times.",
      ],
    },
    {
      title: "Age stratification",
      bullets: [
        "Literature and local audit typically show different DNA rates by age band.",
        "The model can weight or segment by age alongside IMD and access.",
        "Replace this block with your preferred age breakdown and references when ready.",
      ],
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
