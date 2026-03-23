"use client";

import { useMemo, useState } from "react";
import type { AppointmentRow, AppointmentStatus } from "@/types/appointment";
import { clinicDateLabel, siteName } from "@/data/outpatient-mock";
import { ReceptionHeader } from "@/components/reception/ReceptionHeader";
import { AttendanceTable } from "@/components/reception/AttendanceTable";
import { RowActionsMenuProvider } from "@/components/reception/RowActionsMenu";

type ReceptionClientProps = {
  initialRows: AppointmentRow[];
};

const statusFilterOptions: { value: "all" | AppointmentStatus; label: string }[] =
  [
    { value: "all", label: "All statuses" },
    { value: "booked", label: "Booked" },
    { value: "arrived", label: "Arrived" },
    { value: "waiting", label: "Waiting" },
    { value: "in_consultation", label: "In clinic" },
    { value: "completed", label: "Completed" },
    { value: "dna", label: "DNA" },
  ];

function matchesSearch(row: AppointmentRow, q: string): boolean {
  if (!q.trim()) return true;
  const needle = q.trim().toLowerCase();
  return [
    row.patientName,
    row.mrn,
    row.clinician,
    row.clinic,
    row.appointmentType,
    row.slotTime,
  ].some((field) => field.toLowerCase().includes(needle));
}

type ReceptionState = {
  rows: AppointmentRow[];
  /** Maps appointment id → status to restore after an accidental Mark DNA in this session */
  dnaUndo: Record<string, AppointmentStatus>;
};

export function ReceptionClient({ initialRows }: ReceptionClientProps) {
  const [state, setState] = useState<ReceptionState>(() => ({
    rows: initialRows.map((r) => ({ ...r })),
    dnaUndo: {},
  }));
  const { rows, dnaUndo } = state;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | AppointmentStatus
  >("all");

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      return matchesSearch(row, search);
    });
  }, [rows, search, statusFilter]);

  const dnaUndoableIds = useMemo(
    () => new Set(Object.keys(dnaUndo)),
    [dnaUndo],
  );

  function handleCheckIn(id: string) {
    setState((s) => ({
      ...s,
      rows: s.rows.map((r) =>
        r.id === id && r.status === "booked" ? { ...r, status: "arrived" } : r,
      ),
    }));
  }

  function handleMarkDna(id: string) {
    setState((s) => {
      const row = s.rows.find((r) => r.id === id);
      if (
        !row ||
        (row.status !== "booked" &&
          row.status !== "arrived" &&
          row.status !== "waiting")
      ) {
        return s;
      }
      return {
        rows: s.rows.map((r) =>
          r.id === id ? { ...r, status: "dna" as const } : r,
        ),
        dnaUndo: { ...s.dnaUndo, [id]: row.status },
      };
    });
  }

  function handleUndoDna(id: string) {
    setState((s) => {
      const prevStatus = s.dnaUndo[id];
      if (prevStatus === undefined) return s;
      const { [id]: _removed, ...restUndo } = s.dnaUndo;
      return {
        rows: s.rows.map((r) =>
          r.id === id && r.status === "dna" ? { ...r, status: prevStatus } : r,
        ),
        dnaUndo: restUndo,
      };
    });
  }

  return (
    <div className="min-h-full bg-slate-100 text-slate-900">
      <ReceptionHeader
        siteName={siteName}
        dateLabel={clinicDateLabel}
        search={search}
        onSearchChange={setSearch}
      />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <RowActionsMenuProvider>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Today&apos;s attendance list
            </h2>
            <div className="flex items-center gap-2">
              <label htmlFor="status-filter" className="sr-only">
                Filter by status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | AppointmentStatus)
                }
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
              >
                {statusFilterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="text-sm text-slate-600">
                Showing{" "}
                <span className="font-semibold tabular-nums text-slate-900">
                  {filtered.length}
                </span>{" "}
                of {rows.length}
              </span>
            </div>
          </div>
          <AttendanceTable
            rows={filtered}
            dnaUndoableIds={dnaUndoableIds}
            onCheckIn={handleCheckIn}
            onMarkDna={handleMarkDna}
            onUndoDna={handleUndoDna}
          />
        </RowActionsMenuProvider>
      </main>
    </div>
  );
}
