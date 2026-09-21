import type { Member } from '@/types/Index.types'
import { Trash } from 'lucide-react'

type DeleteBranchViewProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isPending: boolean
    member: Member
    handleDelete: (memberId: Member["_id"]) => void
}

export default function DeleteMemberView({ setOpen, isPending, member, handleDelete }: DeleteBranchViewProps) {
  return (
    <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
            <Trash className="w-6 h-6" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            ¿Eliminar Miembro del Negocio?
          </h2>

          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Estás a punto de eliminar a{" "}
            <span className="font-semibold text-slate-700">
              {member.name} {member.last_name}
            </span>
            . Esta acción es permanente y no podrás recuperar la
            información de miembro.
          </p>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={() => handleDelete(member._id)}
              disabled={isPending}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Eliminando..." : "Sí, eliminar"}
            </button>
          </div>
        </div>
  )
}
