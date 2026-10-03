import { Edit, Plus, Trash2, UserPlus } from "lucide-react";
import { useParams } from "react-router-dom";
import type { Business } from "@/types/Business.types";
import ModalLayout from "../Modals/ModalLayout";
import EditBusinessView from "@/pages/dashboard/Owner/Business/EditBusinessView";
import { useDeleteBusiness } from "@/mutations/useMutationBusiness";
import DeleteBusinessView from "@/pages/dashboard/Owner/Business/DeleteBusinessView";

type OwnerBusinessButtonsProps = {
  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;
  isDelete?: boolean;
  setIsDelete?: (open: boolean) => void;
}

export default function OwnerBusinessButtons({ openEdit, setOpenEdit, isDelete, setIsDelete }: OwnerBusinessButtonsProps) {
  const { businessId } = useParams<{ businessId: Business["_id"] }>();
  const { mutate } = useDeleteBusiness();

  return (
    <>
      <div className="flex items-center gap-2 ">
        <button
          onClick={() => setOpenEdit(true)}
          className="px-4 py-2.5 text-xs font-semibold cursor-pointer text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all shadow-sm flex items-center gap-2"
        >
          <Edit className="w-3.5 h-3.5" />
          Editar
        </button>
        <button
          onClick={() => setIsDelete(true)}
          className="px-4 py-2.5 text-xs font-semibold cursor-pointer text-red-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all shadow-sm flex items-center gap-2"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Eliminar
        </button>

        <button className="px-4 py-2.5 text-xs font-semibold cursor-pointer text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all shadow-sm flex items-center gap-2">
          <UserPlus className="w-3.5 h-3.5" />
          Invitar
        </button>

        <button className="px-2 py-2.5 text-xs font-semibold cursor-pointer text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center gap-2">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <ModalLayout open={openEdit} setOpen={setOpenEdit} className="w-175">
        <EditBusinessView onClose={() => setOpenEdit(false)} />
      </ModalLayout>
      <ModalLayout open={isDelete} setOpen={setIsDelete}>
        <DeleteBusinessView onCancel={() => setIsDelete(false)} onConfirm={() => mutate(businessId)} />
      </ModalLayout>
    </>
  );
}
