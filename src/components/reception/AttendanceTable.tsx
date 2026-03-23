import type { AppointmentRow, AppointmentStatus } from "@/types/appointment";
import { badgeClassForStatus, labelForStatus } from "@/lib/reception/status-styles";
import { RowActionsMenu } from "@/components/reception/RowActionsMenu";

type AttendanceTableProps = {
  rows: AppointmentRow[];
  /** Appointments where Mark DNA was used this session and can be reverted */
  dnaUndoableIds: ReadonlySet<string>;
  onCheckIn: (id: string) => void;
  onMarkDna: (id: string) => void;
  onUndoDna: (id: string) => void;
};

function FlagPills({ flags }: { flags?: AppointmentRow["flags"] }) {
  if (!flags) return null;
  const items: { label: string; className: string }[] = [];
  if (flags.interpreter)
    items.push({
      label: "Interpreter",
      className: "bg-indigo-50 text-indigo-900 ring-indigo-200",
    });
  if (flags.fastTrack)
    items.push({
      label: "Fast track",
      className: "bg-orange-50 text-orange-950 ring-orange-200",
    });
  if (flags.wheelchair)
    items.push({
      label: "Access",
      className: "bg-teal-50 text-teal-950 ring-teal-200",
    });
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <span
          key={item.label}
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${item.className}`}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${badgeClassForStatus(status)}`}
    >
      {labelForStatus(status)}
    </span>
  );
}

function PatientIdentityCell({ row }: { row: AppointmentRow }) {
  return (
    <div className="min-w-0 py-2.5 pl-4 pr-3">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-slate-900">
          {row.slotTime}
        </span>
        <span className="min-w-0 font-medium leading-snug text-slate-900">
          {row.patientName}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-slate-500">
        MRN{" "}
        <span className="font-mono tabular-nums tracking-tight text-slate-700">
          {row.mrn}
        </span>
      </p>
    </div>
  );
}

export function AttendanceTable({
  rows,
  dnaUndoableIds,
  onCheckIn,
  onMarkDna,
  onUndoDna,
}: AttendanceTableProps) {
  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-sm text-slate-600">
        No appointments match your filters.
      </p>
    );
  }

  return (
    <>
      {/* Mobile: cards */}
      <ul className="space-y-3 lg:hidden" aria-label="Attendance list">
        {rows.map((row) => (
          <li
            key={row.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-mono text-sm font-semibold tabular-nums text-slate-900">
                    {row.slotTime}
                  </span>
                  <span className="font-medium leading-snug text-slate-900">
                    {row.patientName}
                  </span>
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  <span className="text-slate-500">MRN</span>{" "}
                  <span className="font-mono tabular-nums tracking-tight text-slate-800">
                    {row.mrn}
                  </span>
                  <span className="text-slate-400"> · </span>
                  {row.dobDisplay} ({row.age}y)
                </p>
              </div>
              <StatusBadge status={row.status} />
            </div>
            <p className="mt-2 text-sm text-slate-700">{row.clinic}</p>
            <p className="text-sm text-slate-600">{row.clinician}</p>
            <p className="mt-1 text-xs text-slate-500">{row.appointmentType}</p>
            <div className="mt-2">
              <FlagPills flags={row.flags} />
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <RowActionsMenu
                row={row}
                dnaUndoableIds={dnaUndoableIds}
                onCheckIn={onCheckIn}
                onMarkDna={onMarkDna}
                onUndoDna={onUndoDna}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th scope="col" className="min-w-[12rem] px-4 py-2.5">
                Patient
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-2.5">
                DOB (age)
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-2.5">
                Clinic
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-2.5">
                Clinician
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-2.5">
                Type
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-2.5">
                Flags
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-2.5">
                Status
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-2.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80">
                <td className="align-top">
                  <PatientIdentityCell row={row} />
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-slate-700">
                  {row.dobDisplay}
                  <span className="text-slate-500"> ({row.age}y)</span>
                </td>
                <td className="px-4 py-2.5 text-slate-700">{row.clinic}</td>
                <td className="px-4 py-2.5 text-slate-700">{row.clinician}</td>
                <td className="px-4 py-2.5 text-slate-600">
                  {row.appointmentType}
                </td>
                <td className="px-4 py-2.5">
                  <FlagPills flags={row.flags} />
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <StatusBadge status={row.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <RowActionsMenu
                    row={row}
                    dnaUndoableIds={dnaUndoableIds}
                    onCheckIn={onCheckIn}
                    onMarkDna={onMarkDna}
                    onUndoDna={onUndoDna}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
