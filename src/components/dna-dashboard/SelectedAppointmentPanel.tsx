import type {
  DnaDashboardAppointment,
  DnaRiskTier,
  DnaTransportDifficulty,
} from "@/types/dna-dashboard";
import { riskTierFromPercent } from "@/lib/dna-dashboard/risk-utils";

function tierBadgeClass(tier: DnaRiskTier): string {
  switch (tier) {
    case "high":
      return "bg-rose-50 text-rose-900 ring-rose-200";
    case "medium":
      return "bg-amber-50 text-amber-950 ring-amber-200";
    case "low":
      return "bg-emerald-50 text-emerald-900 ring-emerald-200";
  }
}

function tierWord(tier: DnaRiskTier): string {
  switch (tier) {
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
  }
}

function transportCopy(t: DnaTransportDifficulty): string {
  switch (t) {
    case "none":
      return "None: no access issues recorded";
    case "low":
      return "Low: minor journey friction";
    case "moderate":
      return "Moderate: limited public transport / long transfers";
    case "high":
      return "High: relies on carer or taxi; difficult to reach site";
  }
}

type SelectedAppointmentPanelProps = {
  appointment: DnaDashboardAppointment | null;
};

export function SelectedAppointmentPanel({
  appointment,
}: SelectedAppointmentPanelProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Selected appointment
      </p>
      {!appointment ? (
        <p className="mt-2 text-sm text-slate-500">
          Click a patient in the weekly schedule to view details here.
        </p>
      ) : (
        <SelectedBody appointment={appointment} />
      )}
    </div>
  );
}

function SelectedBody({ appointment }: { appointment: DnaDashboardAppointment }) {
  const combinedTier = riskTierFromPercent(appointment.combinedDnaRiskPercent);

  return (
    <>
      <p className="mt-1.5 text-base font-semibold leading-tight text-slate-900">
        {appointment.patientName}
      </p>
      <p className="mt-0.5 text-sm text-slate-700">
        {appointment.appointmentDate} · {appointment.slotTime} ·{" "}
        {appointment.appointmentType}
      </p>

      <div className="mt-3 border-t border-slate-100 pt-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-500">
          Combined DNA risk
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-semibold tabular-nums text-slate-900">
            {appointment.combinedDnaRiskPercent}%
          </span>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${tierBadgeClass(combinedTier)}`}
          >
            {tierWord(combinedTier)}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          ML prediction plus history, deprivation, and transport (demonstration).
        </p>
      </div>

      <dl className="mt-3 space-y-2.5 border-t border-slate-100 pt-3 text-sm">
        <div>
          <dt className="text-xs font-medium text-slate-500">ML model prediction</dt>
          <dd className="mt-0.5 tabular-nums text-slate-900">
            {appointment.dnaRiskPercent}%
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">
            Previous missed appointments (12 months)
          </dt>
          <dd className="mt-0.5 tabular-nums text-slate-900">
            {appointment.priorMissedCount}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">IMD decile · area</dt>
          <dd className="mt-0.5 text-slate-900">
            Decile {appointment.imdDecile}
            <span className="text-slate-500">
              {" "}
              (1 = most deprived), {appointment.areaLabel}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">Transport / access</dt>
          <dd className="mt-0.5 leading-snug text-slate-800">
            {transportCopy(appointment.transportDifficulty)}
          </dd>
        </div>
      </dl>

      {appointment.riskTier === "medium" ? (
        <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
          Automated SMS (7-day and 3-day with Y/N) applies to medium ML tier for
          this appointment.
        </p>
      ) : appointment.riskTier === "low" ? (
        <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
          Routine SMS reminders only for low ML tier (no Y/N confirmation
          workflow).
        </p>
      ) : null}
    </>
  );
}
