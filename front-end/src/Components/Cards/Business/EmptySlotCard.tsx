import { Plus } from "lucide-react";
import { useState } from "react";
import ModalLayout from "../../Modals/ModalLayout";
import AddBusinessView from "@/pages/dashboard/Owner/AddBusinessView";

export function EmptySlotCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="group relative bg-slate-50/50 rounded-[20px] border-2 border-dashed border-slate-200/90 hover:border-orange-300 hover:bg-orange-50/20 transition-all duration-300 p-8 flex flex-col items-center justify-center text-center min-h-95" onClick={() => setOpen(true)}>
        <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm mb-4 group-hover:scale-110 group-hover:bg-orange-700 group-hover:text-white transition-all duration-300">
          <Plus className="w-7 h-7" />
        </div>

        {/* Text Info */}
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
          Crear Negocio
        </h3>
        <p className="text-xs text-slate-500 font-normal max-w-50 leading-relaxed mb-6">
          Puedes registrar hasta 3 negocios en tu cuenta de SERVA.
        </p>

        {/* Primary Action Button */}
        <button
          type="button"
          className="px-5 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all duration-200 shadow-md shadow-orange-500/20 flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Negocio</span>
        </button>
      </div>

      <ModalLayout open={open} setOpen={setOpen} className="w-175">
        <AddBusinessView />
      </ModalLayout>
    </>
  );
}
