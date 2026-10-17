import ModalLayout from "@/Components/Modals/ModalLayout";
import SetScheduleView from "@/pages/dashboard/Employee/SetScheduleView";
import type { Branch, Schedule } from "@/types/Index.types";
import { Clock } from "lucide-react";
import { useState } from "react";

type ScheduleBranchProps = {
  schedule: Schedule["schedule"];
  schedules: Branch["schedules"];
  name: Branch["name"];
};

export default function ScheduleBranch({
  schedule,
  schedules,
  name,
}: ScheduleBranchProps) {
  const [openModal, setIsOpenModal] = useState(false);
  return (
    <>
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
          {schedule.length > 0 ? (
            schedule.map((item, idx) => {
              const isToday =
                item.day ===
                new Intl.DateTimeFormat("es-MX", {
                  weekday: "long",
                })
                  .format(new Date())
                  .toLowerCase();

              return (
                <div
                  key={item.day ?? idx}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
                    isToday
                      ? "bg-orange-50/80 font-bold text-slate-900 border border-orange-200/60"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5 capitalize">
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
                    )}
                    {item.day}
                  </span>

                  <span className="font-mono text-[11px] text-slate-500">
                    {item.isOpen
                      ? `${item.openTime} - ${item.closeTime}`
                      : "Cerrado"}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-600 text-center">Sin horarios</p>
          )}
        </div>

        {schedule.length > 0 ? (
          <button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="w-full py-2 cursor-pointer text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-colors"
          >
            Configurar Horarios
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="w-full cursor-pointer text-xs justify-between px-3 py-2 rounded-xl text-xstransition-all group relative bg-orange-50/80 text-orange-700 font-bold border border-orange-200/60 shadow-sm"
          >
            Asignar horarios
          </button>
        )}
      </div>

      <ModalLayout
        className="max-w-7xl"
        open={openModal}
        setOpen={setIsOpenModal}
      >
        <SetScheduleView
          sucursalName={name}
          schedules={schedules}
          onClose={() => setIsOpenModal(false)}
        />
      </ModalLayout>
    </>
  );
}
