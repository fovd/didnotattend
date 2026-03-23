"use client";

import { useEffect, useState } from "react";
import type { DnaDashboardAppointment } from "@/types/dna-dashboard";
import { phoneToTelHref } from "@/lib/dna-dashboard/phone-tel";

type SuggestedActionsCardProps = {
  appointment: DnaDashboardAppointment | null;
};

export function SuggestedActionsCard({ appointment }: SuggestedActionsCardProps) {
  const [demoNote, setDemoNote] = useState<string | null>(null);

  useEffect(() => {
    setDemoNote(null);
  }, [appointment?.id]);

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/[0.04]">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Suggested actions
      </p>
      {!appointment ? (
        <p className="mt-2 text-sm text-slate-500">
          Select an appointment to see call and support options.
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm leading-snug text-slate-800">
            {appointment.suggestedAction}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={phoneToTelHref(appointment.contactPhoneDisplay)}
              className="flex min-h-[2.5rem] w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Call {appointment.contactPhoneDisplay}
            </a>
            {appointment.secondaryActionLabels.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() =>
                  setDemoNote(`${label}: logged for reception (demonstration).`)
                }
                className="flex min-h-[2.5rem] w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                {label}
              </button>
            ))}
          </div>
          {demoNote ? (
            <p className="mt-2 text-xs text-slate-600" role="status">
              {demoNote}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
