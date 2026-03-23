import type {
  RationaleBarrierFactor,
  RationaleSection,
  ScoringRationaleBannerCopy,
} from "@/data/dna-dashboard-rationale";

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
      <div className="border-t border-sky-200/80 px-3 pb-3 pt-4 text-sm leading-relaxed text-slate-700 sm:px-4 sm:pb-4">
        <div className="space-y-6">
          {copy.sections.map((section) => (
            <RationaleSectionBlock key={section.title} section={section} />
          ))}
        </div>
      </div>
    </details>
  );
}

function RationaleSectionBlock({ section }: { section: RationaleSection }) {
  const id = `rationale-${slug(section.title)}`;

  return (
    <section aria-labelledby={id} className="scroll-mt-2">
      <h3
        id={id}
        className="border-b border-sky-200/70 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-700"
      >
        {section.title}
      </h3>

      {section.barrierFactors && section.barrierFactors.length > 0 ? (
        <div className="mt-3 space-y-3">
          {section.barrierFactors.map((factor) => (
            <BarrierFactorCard key={factor.name} factor={factor} />
          ))}
          {section.footerNote ? (
            <p className="rounded-md border border-dashed border-sky-300/80 bg-sky-100/50 px-3 py-2 text-xs leading-snug text-slate-600">
              {section.footerNote}
            </p>
          ) : null}
        </div>
      ) : (
        <ul className="mt-3 list-none space-y-2.5">
          {(section.bullets ?? []).map((line, i) => (
            <li
              key={i}
              className="relative pl-3.5 text-sm leading-snug text-slate-700 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-600"
            >
              {line}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function BarrierFactorCard({ factor }: { factor: RationaleBarrierFactor }) {
  return (
    <article className="rounded-lg border border-slate-200/90 bg-white/70 p-3 shadow-sm sm:p-3.5">
      <h4 className="text-sm font-semibold text-slate-900">{factor.name}</h4>
      <p className="mt-1.5 text-sm leading-snug text-slate-600">{factor.description}</p>

      <dl className="mt-3 space-y-2.5 border-t border-slate-100 pt-3">
        <div>
          <dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-sky-900/90">
            What we use (data)
          </dt>
          <dd className="mt-1 text-sm leading-snug text-slate-700">{factor.whatWeUse}</dd>
        </div>
        <div>
          <dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-600">
            What we respect (preferences)
          </dt>
          <dd className="mt-1 text-sm leading-snug text-slate-700">{factor.whatWeRespect}</dd>
        </div>
      </dl>
    </article>
  );
}

function slug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
