import type { ScoringRationaleBannerCopy } from "@/data/dna-dashboard-rationale";

type ScoringRationaleBannerProps = {
  copy: ScoringRationaleBannerCopy;
};

export function ScoringRationaleBanner({ copy }: ScoringRationaleBannerProps) {
  return (
    <details className="group rounded-lg border border-sky-200/90 bg-sky-50/90 shadow-sm ring-1 ring-sky-900/5 open:bg-sky-50">
      <summary className="cursor-pointer list-none px-3 py-2.5 sm:px-4 sm:py-3 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-900/80">
              Scoring and actions
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-900">
              {copy.title}
            </p>
            <p className="mt-1 text-sm leading-snug text-slate-600">{copy.summary}</p>
          </div>
          <span
            className="mt-1 shrink-0 rounded border border-sky-200 bg-white px-2 py-0.5 text-xs font-semibold text-sky-900 tabular-nums group-open:hidden"
            aria-hidden
          >
            Show
          </span>
          <span
            className="mt-1 hidden shrink-0 rounded border border-sky-200 bg-white px-2 py-0.5 text-xs font-semibold text-sky-900 tabular-nums group-open:inline"
            aria-hidden
          >
            Hide
          </span>
        </div>
      </summary>
      <div className="border-t border-sky-200/80 px-3 pb-3 pt-3 text-sm leading-relaxed text-slate-700 sm:px-4 sm:pb-4">
        <div className="space-y-4">
          {copy.sections.map((section) => (
            <section key={section.title} aria-labelledby={`rationale-${slug(section.title)}`}>
              <h3
                id={`rationale-${slug(section.title)}`}
                className="text-xs font-semibold uppercase tracking-wide text-slate-600"
              >
                {section.title}
              </h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-sky-700">
                {section.bullets.map((line, i) => (
                  <li key={i} className="pl-0.5">
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </details>
  );
}

function slug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
