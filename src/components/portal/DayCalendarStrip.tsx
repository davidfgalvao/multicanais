"use client";

import { useMemo, useState } from "react";

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

const weekdayShort = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });

export function DayCalendarStrip() {
  const [selected, setSelected] = useState(0);
  const days = useMemo(() => {
    const start = new Date();
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, []);

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] scrollbar-hide"
      role="tablist"
      aria-label="Dias da semana (visualização)"
    >
      {days.map((date, i) => {
        const label =
          i === 0 ? "Hoje" : i === 1 ? "Amanhã" : weekdayShort.format(date);
        const dayNum = date.getDate();
        const selectedDay = selected === i;
        return (
          <button
            key={date.toISOString()}
            type="button"
            role="tab"
            aria-selected={selectedDay}
            onClick={() => setSelected(i)}
            className={[
              "flex min-h-[44px] min-w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-xl border px-3 py-2 text-center transition-colors duration-200",
              selectedDay
                ? "border-accent/50 bg-accent/15 text-white shadow-glow-sm"
                : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200",
            ].join(" ")}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {label}
            </span>
            <span className="font-display text-lg font-bold tabular-nums text-accent-bright">
              {dayNum}
            </span>
          </button>
        );
      })}
    </div>
  );
}
