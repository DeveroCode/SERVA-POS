import { Clock } from "lucide-react";
interface ScheduleDay {
  day: string;
  hours: string;
  isToday?: boolean;
}

const MOCK_SCHEDULE: ScheduleDay[] = [
  { day: "Lunes", hours: "08:00 — 20:00" },
  { day: "Martes", hours: "08:00 — 20:00" },
  { day: "Miércoles", hours: "08:00 — 20:00" },
  { day: "Jueves", hours: "08:00 — 20:00", isToday: true },
  { day: "Viernes", hours: "08:00 — 22:00" },
  { day: "Sábado", hours: "09:00 — 22:00" },
  { day: "Domingo", hours: "09:00 — 18:00" },
];

export default function ScheduleBranch() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-700" />
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Horario de Atención
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/80">
          Abierto ahora
        </span>
      </div>

      <div className="space-y-1.5 text-xs">
        {MOCK_SCHEDULE.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
              item.isToday
                ? "bg-orange-50/80 font-bold text-slate-900 border border-orange-200/60"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-1.5">
              {item.isToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-orange-700" />
              )}
              {item.day}
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              {item.hours}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-colors"
      >
        Configurar Horarios
      </button>
    </div>
  );
}
