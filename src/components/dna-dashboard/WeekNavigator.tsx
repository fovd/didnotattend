import { addDays } from "@/lib/dna-dashboard/date-utils";

type WeekNavigatorProps = {
  weekStartMonday: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
};

function formatWeekRange(weekStart: Date): string {
  const end = addDays(weekStart, 6);
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const startStr = weekStart.toLocaleDateString("en-GB", opts);
  const endStr = end.toLocaleDateString("en-GB", opts);
  return `${startStr} – ${endStr}`;
}

export function WeekNavigator({
  weekStartMonday,
  onPrevWeek,
  onNextWeek,
}: WeekNavigatorProps) {
  return (
    <div className="flex w-fit max-w-full flex-col items-start gap-2 sm:flex-row sm:items-end sm:gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Week
        </p>
        <p className="mt-0.5 text-base font-semibold leading-tight text-slate-900">
          {formatWeekRange(weekStartMonday)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onPrevWeek}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
        >
          Previous week
        </button>
        <button
          type="button"
          onClick={onNextWeek}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
        >
          Next week
        </button>
      </div>
    </div>
  );
}
