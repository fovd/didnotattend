import type { DnaQueueItem } from "@/types/dna-queue";
import {
  priorityLabel,
  vulnerabilityBadgeLabel,
} from "@/components/dna-avoidance/copy-labels";

type QueueListProps = {
  items: DnaQueueItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function priorityClasses(band: DnaQueueItem["priorityBand"]): string {
  switch (band) {
    case "must_contact_today":
      return "border-l-4 border-l-slate-900 bg-slate-100";
    case "contact_soon":
      return "border-l-4 border-l-slate-500 bg-slate-50";
    case "routine":
      return "border-l-4 border-l-slate-300 bg-white";
  }
}

export function QueueList({ items, selectedId, onSelect }: QueueListProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-solid border-slate-200 bg-white shadow-sm">
      <div className="border-b border-solid border-slate-200 bg-slate-50 px-3 py-2">
        <h2 className="text-sm font-semibold text-slate-800">
          Who to contact first
        </h2>
        <p className="text-xs text-slate-600">
          Sorted by risk and support needs. Tap a name to see actions.
        </p>
      </div>
      <ul
        className="min-h-0 flex-1 overflow-y-auto p-2"
        role="listbox"
        aria-label="Daily contact queue"
      >
        {items.map((item) => {
          const selected = item.id === selectedId;
          return (
            <li key={item.id} className="mb-2 last:mb-0">
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => onSelect(item.id)}
                className={`w-full rounded-lg border border-slate-200 p-3 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 ${priorityClasses(item.priorityBand)} ${selected ? "ring-2 ring-slate-900 ring-offset-2 ring-offset-white" : "hover:border-slate-400"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-900">
                    {item.patientName}
                  </span>
                  <span className="shrink-0 font-mono text-sm tabular-nums text-slate-700">
                    {item.appointmentTime}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium text-slate-800">
                    Risk of not attending {item.dnaRiskPercent}%
                  </span>
                  <span className="font-medium text-slate-700">
                    {priorityLabel(item.priorityBand)}
                  </span>
                  <span className="rounded-full bg-slate-200/90 px-2 py-0.5 text-slate-800">
                    {vulnerabilityBadgeLabel(item.vulnerabilityDriver)}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-slate-600">
                  {item.clinic}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
