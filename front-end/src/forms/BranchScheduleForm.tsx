import { CheckCircle2, XCircle } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import type { ScheduleDataForm } from "@/types/Index.types";

export default function BranchScheduleForm() {
  const { control, watch, setValue, register } =
    useFormContext<ScheduleDataForm>();

  const { fields } = useFieldArray({
    control,
    name: "schedule",
  });

  return (
    <div className="space-y-2.5">
      {fields.map((field, index) => {
        const isOpen = watch(`schedule.${index}.isOpen` as const);
        const dayName = watch(`schedule.${index}.day` as const);
        return (
          <div
            key={field.id}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
              isOpen
                ? "bg-white border-slate-200/90 shadow-sm"
                : "bg-slate-50/70 border-slate-200/50 opacity-75"
            }`}
          >
            <div className="flex items-center gap-3 w-32 shrink-0">
              <button
                type="button"
                onClick={() => setValue(`schedule.${index}.isOpen`, !isOpen)}
                className={`p-1 rounded-lg transition-colors ${
                  isOpen
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-400 bg-slate-200/60"
                }`}
              >
                {isOpen ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
              </button>

              <span
                className={`text-xs font-bold ${
                  isOpen ? "text-slate-800" : "text-slate-400"
                }`}
              >
                {dayName}
              </span>
            </div>

            {isOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  {...register(`schedule.${index}.openTime` as const)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-orange-700"
                />

                <span className="text-xs text-slate-400 font-medium">—</span>

                <input
                  type="time"
                  {...register(`schedule.${index}.closeTime` as const)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-orange-700"
                />
              </div>
            ) : (
              <span className="text-xs font-semibold text-slate-400 italic pr-4">
                Cerrado
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
