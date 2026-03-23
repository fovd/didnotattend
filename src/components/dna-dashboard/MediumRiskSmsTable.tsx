import type { DnaDashboardAppointment } from "@/types/dna-dashboard";
import {
  barrierEvidenceLabel,
  barrierShortLabel,
} from "@/lib/dna-dashboard/barrier-labels";

type MediumRiskSmsTableProps = {
  rows: DnaDashboardAppointment[];
};

function smsLabel(s: DnaDashboardAppointment["sms7dStatus"]): string {
  switch (s) {
    case "scheduled":
      return "Scheduled";
    case "sent":
      return "Sent";
    case "n/a":
      return "-";
  }
}

function replyLabel(r: DnaDashboardAppointment["patientReply"]): string {
  if (r === null) return "-";
  switch (r) {
    case "awaiting":
      return "Awaiting reply";
    case "yes":
      return "Yes";
    case "no":
      return "No";
  }
}

function tierShort(t: DnaDashboardAppointment["riskTier"]): string {
  switch (t) {
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
  }
}

export function MediumRiskSmsTable({ rows }: MediumRiskSmsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-600">
        No low or medium-risk appointments in this week for SMS automation.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-2.5">
              Patient
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-2.5">
              Date & time
            </th>
            <th scope="col" className="px-4 py-2.5">
              Tier
            </th>
            <th scope="col" className="px-4 py-2.5">
              Risk %
            </th>
            <th scope="col" className="max-w-[8rem] px-4 py-2.5">
              Barrier focus
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-2.5">
              Source
            </th>
            <th scope="col" className="px-4 py-2.5">
              7-day SMS
            </th>
            <th scope="col" className="px-4 py-2.5">
              3-day SMS
            </th>
            <th scope="col" className="px-4 py-2.5">
              Patient Y/N
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-slate-50/80">
              <td className="px-4 py-2.5 font-medium text-slate-900">
                {r.patientName}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-slate-700">
                <span className="font-mono tabular-nums text-slate-600">
                  {r.appointmentDate}
                </span>{" "}
                <span className="font-mono tabular-nums">{r.slotTime}</span>
              </td>
              <td className="px-4 py-2.5 text-slate-800">
                {tierShort(r.riskTier)}
              </td>
              <td className="px-4 py-2.5 tabular-nums text-slate-800">
                {r.dnaRiskPercent}%
              </td>
              <td className="max-w-[10rem] px-4 py-2.5 text-xs text-slate-800">
                {barrierShortLabel(r.primaryBarrier)}
              </td>
              <td className="px-4 py-2.5 text-xs text-slate-600">
                {barrierEvidenceLabel(r.primaryBarrierSource)}
              </td>
              <td className="px-4 py-2.5 text-slate-700">{smsLabel(r.sms7dStatus)}</td>
              <td className="px-4 py-2.5 text-slate-700">{smsLabel(r.sms3dStatus)}</td>
              <td className="px-4 py-2.5 text-slate-800">{replyLabel(r.patientReply)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
