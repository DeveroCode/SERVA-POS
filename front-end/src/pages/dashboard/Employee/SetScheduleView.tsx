import { Building2, Clock, Save, Copy } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type { Branch, ScheduleDataForm } from "@/types/Index.types";
import { DEFAULT_SCHEDULE_DAYS } from "@/lib/index";
import BranchScheduleForm from "@/forms/BranchScheduleForm";
import { useSetScheduleBranch } from "@/mutations/useMutationEmployee";
import Loader from "@/pages/Loader";

type SetScheduleViewProps = {
  sucursalName?: string;
  schedules?: Branch["schedules"];
  onClose?: () => void;
};

export default function SetScheduleView({
  sucursalName = "Sucursal Centro",
  schedules,
  onClose,
}: SetScheduleViewProps) {
  // Mutation
  const { mutate, isPending } = useSetScheduleBranch();
  // Instancia base de react-hook-form únicamente para la estructura visual
  const methods = useForm<ScheduleDataForm>({
    defaultValues: {
      schedule: schedules?.schedule || DEFAULT_SCHEDULE_DAYS,
    },
  });

  const { getValues, setValue, handleSubmit } = methods;
  // Copiar todos los horarios
  const handleCopyWeeks = () => {
    const monday = getValues("schedule.0");

    if (!monday) return;

    for (let i = 1; i <= 4; i++) {
      setValue(`schedule.${i}.isOpen`, monday.isOpen);
      setValue(`schedule.${i}.openTime`, monday.openTime);
      setValue(`schedule.${i}.closeTime`, monday.closeTime);
    }
  };

  const handleSendSchedule = (schedule: ScheduleDataForm) => {
    mutate(schedule, { onSuccess: onClose });
  };

  if (isPending) return <Loader />;

  return (
    <>
      {/* Header Contextual de Sucursal */}
      <div className="relative p-6 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-700 flex items-center justify-center shrink-0 shadow-sm">
              <Clock className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-100/70 text-orange-700 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                <Building2 className="w-3 h-3" />
                {sucursalName}
              </span>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                Configurar Horarios de Atención
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyWeeks}
            title="Copiar horario del lunes a toda la semana laboral"
            className="hidden cursor-pointer sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200/80 hover:bg-slate-50 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Duplicar Lun-Vie</span>
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          Define las horas de apertura y cierre para cada día de la semana. Los
          días marcados como cerrados no aceptarán nuevas órdenes en la
          plataforma.
        </p>
      </div>

      {/* Formulario */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSendSchedule)}
          noValidate
          className="p-6 space-y-4"
        >
          {/* Renderizado directo de los siete días de la semana */}
          <BranchScheduleForm />

          {/* Botones de acción */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 cursor-pointer py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
            )}

            <button
              type="submit"
              className="py-2.5 cursor-pointer px-5 text-xs font-bold text-white bg-orange-700 hover:bg-orange-800 rounded-xl transition-all shadow-md shadow-orange-500/15 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Horarios</span>
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
