import Link from "next/link";

type ReceptionHeaderProps = {
  siteName: string;
  dateLabel: string;
  search: string;
  onSearchChange: (value: string) => void;
};

export function ReceptionHeader({
  siteName,
  dateLabel,
  search,
  onSearchChange,
}: ReceptionHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Reception desk
          </p>
          <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
            {siteName}
          </h1>
          <p className="mt-1 text-sm text-slate-600">{dateLabel}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:max-w-none sm:flex-row sm:items-stretch lg:max-w-xl lg:items-center">
          <div className="min-w-0 flex-1 sm:max-w-md lg:max-w-sm">
            <label htmlFor="reception-search" className="sr-only">
              Search patients
            </label>
            <input
              id="reception-search"
              type="search"
              placeholder="Search name, MRN, clinician…"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner outline-none ring-slate-400 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
          <Link
            href="/"
            className="shrink-0 rounded-lg bg-[#005EB8] px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#004a94] focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2 sm:self-center"
          >
            DNA Avoidance
          </Link>
        </div>
      </div>
    </header>
  );
}
