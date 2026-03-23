type StratifiedSummaryStripProps = {
  high: number;
  medium: number;
  low: number;
  /** Compact inline strip for toolbar (default is larger grid) */
  variant?: "default" | "compact";
};

function SummaryCard({
  label,
  count,
  accentClass,
}: {
  label: string;
  count: number;
  accentClass: string;
}) {
  return (
    <div
      className={`flex min-h-[5.5rem] flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-center shadow-sm ${accentClass}`}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
        {count}
      </span>
    </div>
  );
}

function CompactStat({
  label,
  count,
  borderClass,
}: {
  label: string;
  count: number;
  borderClass: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 shadow-sm ${borderClass}`}
    >
      <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="text-sm font-semibold tabular-nums text-slate-900">{count}</span>
    </div>
  );
}

export function StratifiedSummaryStrip({
  high,
  medium,
  low,
  variant = "default",
}: StratifiedSummaryStripProps) {
  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-500">
          DNA risk this week
        </span>
        <div className="flex flex-wrap gap-2">
          <CompactStat
            label="High"
            count={high}
            borderClass="border-t-2 border-t-rose-500 pt-1"
          />
          <CompactStat
            label="Med"
            count={medium}
            borderClass="border-t-2 border-t-amber-500 pt-1"
          />
          <CompactStat
            label="Low"
            count={low}
            borderClass="border-t-2 border-t-emerald-500 pt-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        DNA risk this week
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <SummaryCard
          label="High"
          count={high}
          accentClass="border-t-4 border-t-rose-500"
        />
        <SummaryCard
          label="Medium"
          count={medium}
          accentClass="border-t-4 border-t-amber-500"
        />
        <SummaryCard
          label="Low"
          count={low}
          accentClass="border-t-4 border-t-emerald-500"
        />
      </div>
    </div>
  );
}
