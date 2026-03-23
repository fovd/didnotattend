"use client";

import { useState } from "react";
import type { DnaQueueItem } from "@/types/dna-queue";
import { profilePrimaryLabel } from "@/components/dna-avoidance/copy-labels";
import { ScriptHelper } from "@/components/dna-avoidance/ScriptHelper";

type ActionPanelProps = {
  item: DnaQueueItem | null;
};

function FlagChips({ item }: { item: DnaQueueItem }) {
  const chips: { key: string; label: string; critical?: boolean }[] = [];
  if (item.flags.travelDistance)
    chips.push({ key: "t", label: "Travel distance" });
  if (item.flags.localAreaSupport)
    chips.push({ key: "l", label: "Local area: extra support may help" });
  if (item.flags.contactDetailsCheck)
    chips.push({ key: "c", label: "Contact details: please check" });
  if (item.flags.waitingLongTime)
    chips.push({ key: "w", label: "Waiting a long time" });
  if (item.flags.needsSomeoneToBring)
    chips.push({
      key: "wnb",
      label: "Needs someone to bring them",
      critical: true,
    });

  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <span
          key={c.key}
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
            c.critical
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-slate-100 text-slate-800"
          }`}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

export function ActionPanel({ item }: ActionPanelProps) {
  const [cancelRequested, setCancelRequested] = useState(false);
  const [slotOnShortNotice, setSlotOnShortNotice] = useState(false);
  const [safeguardingDone, setSafeguardingDone] = useState(false);

  if (!item) {
    return (
      <div className="flex min-h-[12rem] flex-1 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
        Choose someone from the list to see actions and suggested wording.
      </div>
    );
  }

  const needsWnb = Boolean(item.flags.needsSomeoneToBring);
  const primaryLabel = profilePrimaryLabel(item.profile);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-0.5">
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Contact
        </p>
        <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-slate-900">
          {item.phoneDisplay}
        </p>
        <p className="mt-2 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Appointment:</span>{" "}
          <span className="font-mono tabular-nums text-base text-slate-900 sm:text-lg">
            {item.appointmentTime}
          </span>{" "}
          · {item.clinic}
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Why they are on this list
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-800">
          {item.predictedBarrier}
        </p>
        <div className="mt-3">
          <FlagChips item={item} />
        </div>
      </div>

      <ScriptHelper text={item.suggestedOpening} />

      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Quick actions
        </h3>
        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            className="flex min-h-[2.75rem] w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            {primaryLabel}
          </button>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {item.secondaryActions.map((label) => (
              <button
                key={label}
                type="button"
                className="flex min-h-[2.75rem] items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-center text-sm font-semibold leading-snug text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          If they want to cancel
        </h3>
        {!cancelRequested ? (
          <button
            type="button"
            onClick={() => setCancelRequested(true)}
            className="mt-2 flex min-h-[2.75rem] w-full items-center justify-center rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 sm:w-auto"
          >
            Patient wants to cancel
          </button>
        ) : (
          <div className="mt-2 space-y-2">
            <p className="text-sm text-slate-800">
              Offer the slot to someone who can come at short notice.
            </p>
            {!slotOnShortNotice ? (
              <button
                type="button"
                onClick={() => setSlotOnShortNotice(true)}
                className="flex min-h-[2.75rem] w-full items-center justify-center rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 sm:w-auto"
              >
                Add slot to short notice list
              </button>
            ) : (
              <p className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900">
                Done: this slot is now on the short notice list for booking to
                fill.
              </p>
            )}
          </div>
        )}
      </div>

      {needsWnb ? (
        <div className="rounded-lg border border-slate-300 bg-slate-50 p-3 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-800">
            Extra support
          </h3>
          {!safeguardingDone ? (
            <button
              type="button"
              onClick={() => setSafeguardingDone(true)}
              className="mt-2 flex min-h-[2.75rem] w-full items-center justify-center rounded-lg border border-slate-900 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 sm:w-auto"
            >
              Escalate to safeguarding
            </button>
          ) : (
            <p className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900">
              Logged: local safeguarding team will follow up. Do not cancel
              without their advice.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
