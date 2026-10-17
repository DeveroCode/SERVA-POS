import ModalLayout from "@/Components/Modals/ModalLayout";
import SetScheduleView from "@/pages/dashboard/Employee/SetScheduleView";
import type { Branch, Schedule } from "@/types/Index.types";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const today = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
  })
    .format(currentTime)
    .toLowerCase();

  const todaySchedule = schedule.find((item) => item.day === today);

  const currentTimeString = `${String(currentTime.getHours()).padStart(2, "0")}:${String(
    currentTime.getMinutes(),
  ).padStart(2, "0")}`;

  const isCurrentlyOpen =
    todaySchedule?.isOpen === true &&
    currentTimeString >= todaySchedule.openTime &&
    currentTimeString < todaySchedule.closeTime;

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

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              isCurrentlyOpen
                ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                : "bg-slate-100 text-slate-600 border-slate-200"
            }`}
          >
            {isCurrentlyOpen ? "Abierto" : "Cerrado"}
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          {schedule.length > 0 ? (
            schedule.map((item) => {
              const isToday = item.day === today;

              return (
                <div
                  key={item.day}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
                    isToday
                      ? "bg-orange-50/80 font-bold text-slate-900 border border-orange-200/60"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5 capitalize">
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-700" />
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
            <p className="text-xs text-slate-600 text-center">
              Sin horarios configurados
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpenModal(true)}
          className={`w-full py-2 cursor-pointer text-xs font-semibold rounded-xl transition-colors ${
            schedules
              ? "text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80"
              : "text-orange-700 bg-orange-50/80 hover:bg-orange-100 border border-orange-200/60"
          }`}
        >
          {schedules ? "Configurar horarios" : "Asignar horarios"}
        </button>
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
