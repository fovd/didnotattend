import type { DnaDashboardAppointment } from "@/types/dna-dashboard";
import { addDays, toISODateString } from "@/lib/dna-dashboard/date-utils";
import {
  barrierBadgeClass,
  barrierFullLabel,
  barrierShortLabel,
} from "@/lib/dna-dashboard/barrier-labels";

type WeeklyAppointmentsGridProps = {
  weekStartMonday: Date;
  byDay: Map<string, DnaDashboardAppointment[]>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

/** Strong contrast for weekly action cards (high / medium only in this grid). */
function tierBadgeClass(tier: DnaDashboardAppointment["riskTier"]): string {
  switch (tier) {
    case "high":
      return "bg-rose-700 text-white ring-1 ring-rose-900/30";
    case "medium":
      return "bg-yellow-600 text-white ring-1 ring-yellow-800/40";
    case "low":
      return "bg-emerald-700 text-white ring-1 ring-emerald-900/30";
  }
}

function tierLabel(tier: DnaDashboardAppointment["riskTier"]): string {
  switch (tier) {
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
  }
}

export function WeeklyAppointmentsGrid({
  weekStartMonday,
  byDay,
  selectedId,
  onSelect,
}: WeeklyAppointmentsGridProps) {
  const days: { iso: string; weekdayLong: string; dateLine: string }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = addDays(weekStartMonday, i);
    const iso = toISODateString(d);
    days.push({
      iso,
      weekdayLong: d.toLocaleDateString("en-GB", { weekday: "long" }),
      dateLine: d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    });
  }

  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">
        Weekly schedule
      </h2>
      <p className="mt-0.5 text-sm text-slate-500">
        High and medium risk only, sorted high first then medium. Low-risk
        patients use routine SMS only (see table below).
      </p>
      <ol className="mt-2 space-y-1.5">
        {days.map(({ iso, weekdayLong, dateLine }) => (
          <li
            key={iso}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-stretch">
              <div className="flex shrink-0 flex-col justify-center border-b border-slate-200 bg-slate-50 px-2.5 py-1.5 sm:w-32 sm:border-b-0 sm:border-r sm:border-slate-200">
                <span className="text-sm font-semibold leading-tight text-slate-900">
                  {weekdayLong}
                </span>
                <span className="mt-0.5 text-xs leading-tight text-slate-600">
                  {dateLine}
                </span>
              </div>
              <div className="min-w-0 flex-1 p-1.5 sm:p-2">
                <DayCards
                  items={byDay.get(iso) ?? []}
                  selectedId={selectedId}
                  onSelect={onSelect}
                  tierBadgeClass={tierBadgeClass}
                  tierLabel={tierLabel}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DayCards({
  items,
  selectedId,
  onSelect,
  tierBadgeClass,
  tierLabel,
}: {
  items: DnaDashboardAppointment[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  tierBadgeClass: (t: DnaDashboardAppointment["riskTier"]) => string;
  tierLabel: (t: DnaDashboardAppointment["riskTier"]) => string;
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-400 italic">
        No high or medium slots this day (low-risk only).
      </p>
    );
  }
  return (
    <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a) => {
        const selected = selectedId === a.id;
        return (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => onSelect(selected ? null : a.id)}
              className={`flex h-full w-full flex-col gap-1 rounded-md border px-2 py-1.5 text-left shadow-sm transition ${
                selected
                  ? "border-slate-900 ring-2 ring-slate-900 ring-offset-1"
                  : "border-slate-200 hover:border-slate-300"
              } bg-white`}
            >
              <div className="font-mono text-base font-semibold tabular-nums leading-none text-slate-900">
                {a.slotTime}
              </div>
              <div className="text-sm font-semibold leading-snug text-slate-900">
                {a.patientName}
              </div>
              <div className="text-sm leading-snug text-slate-600 line-clamp-2">
                {a.appointmentType}
              </div>
              <div className="flex flex-wrap gap-1 pt-0.5">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${tierBadgeClass(a.riskTier)}`}
                >
                  {tierLabel(a.riskTier)} · {a.dnaRiskPercent}%
                </span>
                <span
                  className={`inline-flex max-w-full rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${barrierBadgeClass(a.primaryBarrier)}`}
                  title={barrierFullLabel(a.primaryBarrier)}
                >
                  {barrierShortLabel(a.primaryBarrier)}
                </span>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
