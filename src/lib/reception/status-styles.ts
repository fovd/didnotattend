import type { AppointmentStatus } from "@/types/appointment";

const statusLabels: Record<AppointmentStatus, string> = {
  booked: "Booked",
  arrived: "Arrived",
  waiting: "Waiting",
  in_consultation: "In clinic",
  completed: "Completed",
  dna: "Did not attend",
};

export function labelForStatus(status: AppointmentStatus): string {
  return statusLabels[status];
}

export function badgeClassForStatus(status: AppointmentStatus): string {
  switch (status) {
    case "booked":
      return "bg-slate-100 text-slate-800 ring-slate-200";
    case "arrived":
      return "bg-sky-100 text-sky-900 ring-sky-200";
    case "waiting":
      return "bg-amber-100 text-amber-950 ring-amber-200";
    case "in_consultation":
      return "bg-violet-100 text-violet-950 ring-violet-200";
    case "completed":
      return "bg-emerald-100 text-emerald-950 ring-emerald-200";
    case "dna":
      return "bg-rose-100 text-rose-950 ring-rose-200";
  }
}
