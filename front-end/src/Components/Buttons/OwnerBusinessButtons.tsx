import { Edit, Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import ModalLayout from "../Modals/ModalLayout";
import EditBusinessView from "@/pages/dashboard/Owner/EditBusinessView";

export default function OwnerBusinessButtons() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-2 ">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2.5 text-xs font-semibold cursor-pointer text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all shadow-sm flex items-center gap-2"
        >
          <Edit className="w-3.5 h-3.5" />
          Editar
        </button>

        <button className="px-4 py-2.5 text-xs font-semibold cursor-pointer text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all shadow-sm flex items-center gap-2">
          <UserPlus className="w-3.5 h-3.5" />
          Invitar
        </button>

        <button className="px-4 py-2.5 text-xs font-semibold cursor-pointer text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Sucursal
        </button>
      </div>

      <ModalLayout open={open} setOpen={setOpen} className="w-175">
        <EditBusinessView />
      </ModalLayout>
    </>
  );
}
