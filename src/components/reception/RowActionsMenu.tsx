"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { AppointmentRow } from "@/types/appointment";

type MenuCtx = {
  openRowId: string | null;
  toggleMenu: (rowId: string) => void;
  closeMenu: () => void;
};

const RowActionsMenuCtx = createContext<MenuCtx | null>(null);

export function RowActionsMenuProvider({ children }: { children: ReactNode }) {
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const toggleMenu = useCallback((rowId: string) => {
    setOpenRowId((prev) => (prev === rowId ? null : rowId));
  }, []);
  const closeMenu = useCallback(() => setOpenRowId(null), []);
  return (
    <RowActionsMenuCtx.Provider value={{ openRowId, toggleMenu, closeMenu }}>
      {children}
    </RowActionsMenuCtx.Provider>
  );
}

function useRowActionsMenu() {
  const ctx = useContext(RowActionsMenuCtx);
  if (!ctx) {
    throw new Error("RowActionsMenu must be used inside RowActionsMenuProvider");
  }
  return ctx;
}

type RowActionsMenuProps = {
  row: AppointmentRow;
  dnaUndoableIds: ReadonlySet<string>;
  onCheckIn: (id: string) => void;
  onMarkDna: (id: string) => void;
  onUndoDna: (id: string) => void;
};

export function RowActionsMenu({
  row,
  dnaUndoableIds,
  onCheckIn,
  onMarkDna,
  onUndoDna,
}: RowActionsMenuProps) {
  const { openRowId, toggleMenu, closeMenu } = useRowActionsMenu();
  const open = openRowId === row.id;
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [pos, setPos] = useState({ top: 0, right: 0 });

  const canCheckIn = row.status === "booked";
  const canDna =
    row.status === "booked" ||
    row.status === "arrived" ||
    row.status === "waiting";
  const canUndoDna = row.status === "dna" && dnaUndoableIds.has(row.id);

  useLayoutEffect(() => {
    if (!open || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      right: Math.max(8, window.innerWidth - rect.right),
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    function onPointerDown(e: MouseEvent | PointerEvent) {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      closeMenu();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open, closeMenu]);

  useEffect(() => {
    if (!open) return;
    function onScroll() {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 6,
        right: Math.max(8, window.innerWidth - rect.right),
      });
    }
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  function run(
    action: "checkIn" | "markDna" | "undoDna",
    id: string,
    allowed: boolean,
  ) {
    if (!allowed) return;
    closeMenu();
    if (action === "checkIn") onCheckIn(id);
    if (action === "markDna") onMarkDna(id);
    if (action === "undoDna") onUndoDna(id);
  }

  const portal =
    typeof document !== "undefined"
      ? createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={`Actions for ${row.patientName}`}
            className="fixed z-[200] w-56 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white py-0 shadow-lg ring-1 ring-black/5"
            style={{ top: pos.top, right: pos.right }}
          >
            <MenuRow
              label="Check in"
              hint={!canCheckIn ? "Booked appointments only" : undefined}
              disabled={!canCheckIn}
              emphasis="primary"
              onPick={() => run("checkIn", row.id, canCheckIn)}
            />
            <MenuRow
              label="Mark DNA"
              hint={!canDna ? "Not available for this status" : undefined}
              disabled={!canDna}
              emphasis="default"
              onPick={() => run("markDna", row.id, canDna)}
            />
            {canUndoDna ? (
              <MenuRow
                label="Undo DNA"
                hint="Revert this session"
                disabled={false}
                emphasis="success"
                onPick={() => run("undoDna", row.id, true)}
              />
            ) : null}
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        onClick={() => toggleMenu(row.id)}
        className="inline-flex min-h-[2.25rem] min-w-[7.5rem] items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
      >
        Actions
        <ChevronIcon open={open} />
      </button>
      {open ? portal : null}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuRow({
  label,
  hint,
  disabled,
  emphasis,
  onPick,
}: {
  label: string;
  hint?: string;
  disabled: boolean;
  emphasis: "primary" | "default" | "success";
  onPick: () => void;
}) {
  const base =
    "flex w-full flex-col items-start gap-0.5 px-3 py-2.5 text-left text-sm transition";
  const tone =
    emphasis === "primary"
      ? "font-semibold text-slate-900"
      : emphasis === "success"
        ? "font-semibold text-emerald-900"
        : "font-medium text-slate-800";
  const interactive = disabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer hover:bg-slate-50 active:bg-slate-100";

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={onPick}
      className={`${base} ${tone} ${interactive} border-0 bg-transparent`}
    >
      <span>{label}</span>
      {hint ? (
        <span className="text-[0.7rem] font-normal leading-tight text-slate-500">
          {hint}
        </span>
      ) : null}
    </button>
  );
}
