"use client";

import { useEffect, useMemo, useState } from "react";
import type { DnaDashboardAppointment } from "@/types/dna-dashboard";
import {
  addDays,
  isDateInWeek,
  parseISODate,
  startOfWeekMonday,
  toISODateString,
} from "@/lib/dna-dashboard/date-utils";
import {
  compareByRiskTierThenTime,
  compareForSmsAutomation,
} from "@/lib/dna-dashboard/risk-utils";
import {
  dnaDashboardAppointments,
  dnaDashboardWeekAnchor,
} from "@/data/dna-dashboard-mock";
import { scoringRationaleBanner } from "@/data/dna-dashboard-rationale";
import { DnaDashboardHeader } from "@/components/dna-dashboard/DnaDashboardHeader";
import { WeekNavigator } from "@/components/dna-dashboard/WeekNavigator";
import { StratifiedSummaryStrip } from "@/components/dna-dashboard/StratifiedSummaryStrip";
import { WeeklyAppointmentsGrid } from "@/components/dna-dashboard/WeeklyAppointmentsGrid";
import { MediumRiskSmsTable } from "@/components/dna-dashboard/MediumRiskSmsTable";
import { SelectedAppointmentPanel } from "@/components/dna-dashboard/SelectedAppointmentPanel";
import { SuggestedActionsCard } from "@/components/dna-dashboard/SuggestedActionsCard";
import { ScoringRationaleBanner } from "@/components/dna-dashboard/ScoringRationaleBanner";

/** Action-focused week view: high + medium only; low uses routine SMS elsewhere. */
function bucketByDay(
  rows: DnaDashboardAppointment[],
  weekStart: Date,
): Map<string, DnaDashboardAppointment[]> {
  const map = new Map<string, DnaDashboardAppointment[]>();
  for (let i = 0; i < 7; i++) {
    map.set(toISODateString(addDays(weekStart, i)), []);
  }
  for (const r of rows) {
    if (!isDateInWeek(r.appointmentDate, weekStart)) continue;
    if (r.riskTier === "low") continue;
    const list = map.get(r.appointmentDate);
    if (list) list.push(r);
  }
  for (const [, list] of map) {
    list.sort(compareByRiskTierThenTime);
  }
  return map;
}

export function DnaAvoidanceDashboardClient() {
  const [weekStartMonday, setWeekStartMonday] = useState(() =>
    startOfWeekMonday(parseISODate(dnaDashboardWeekAnchor)),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const inWeek = useMemo(() => {
    return dnaDashboardAppointments.filter((a) =>
      isDateInWeek(a.appointmentDate, weekStartMonday),
    );
  }, [weekStartMonday]);

  const byDay = useMemo(
    () => bucketByDay(dnaDashboardAppointments, weekStartMonday),
    [weekStartMonday],
  );

  const counts = useMemo(() => {
    let high = 0;
    let medium = 0;
    let low = 0;
    for (const a of inWeek) {
      if (a.riskTier === "high") high++;
      else if (a.riskTier === "medium") medium++;
      else low++;
    }
    return { high, medium, low };
  }, [inWeek]);

  const smsAutomationRows = useMemo(() => {
    return inWeek
      .filter((a) => a.riskTier === "medium" || a.riskTier === "low")
      .sort(compareForSmsAutomation);
  }, [inWeek]);

  const selected = useMemo(
    () =>
      selectedId
        ? dnaDashboardAppointments.find((a) => a.id === selectedId) ?? null
        : null,
    [selectedId],
  );

  useEffect(() => {
    if (!selectedId) return;
    const row = dnaDashboardAppointments.find((a) => a.id === selectedId);
    if (row?.riskTier === "low") setSelectedId(null);
  }, [selectedId, weekStartMonday]);

  function shiftWeek(delta: number) {
    setWeekStartMonday((prev) => addDays(prev, delta * 7));
    setSelectedId(null);
  }

  return (
    <div className="min-h-full bg-slate-100 text-slate-900">
      <DnaDashboardHeader />
      <main className="w-full px-4 py-6 sm:px-6 lg:pl-8 lg:pr-6 xl:pl-10 xl:pr-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-5">
          <div className="min-w-0 flex-1 space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-4 lg:gap-y-2">
                <WeekNavigator
                  weekStartMonday={weekStartMonday}
                  onPrevWeek={() => shiftWeek(-1)}
                  onNextWeek={() => shiftWeek(1)}
                />
                <StratifiedSummaryStrip
                  variant="compact"
                  high={counts.high}
                  medium={counts.medium}
                  low={counts.low}
                />
              </div>
              <div className="space-y-4 pt-4">
                <ScoringRationaleBanner copy={scoringRationaleBanner} />
                <WeeklyAppointmentsGrid
                  weekStartMonday={weekStartMonday}
                  byDay={byDay}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
            </div>

            <section className="space-y-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">
                  Low and medium risk: SMS automation
                </h2>
                <p className="text-xs text-slate-500">
                  Medium: 7-day and 3-day reminders with Y/N. Low: routine
                  reminders only (demonstration).
                </p>
              </div>
              <MediumRiskSmsTable rows={smsAutomationRows} />
            </section>
          </div>

          <aside className="flex w-full shrink-0 flex-col gap-4 lg:sticky lg:top-6 lg:w-72 lg:self-start xl:w-80">
            <SelectedAppointmentPanel appointment={selected} />
            <SuggestedActionsCard appointment={selected} />
          </aside>
        </div>
      </main>
    </div>
  );
}
