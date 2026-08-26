import type { Branch } from '@/types/Index.types'
import { Trash } from 'lucide-react'

type DeleteBranchViewProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isPending: boolean
    branch: Branch
    handleDelete: () => void
}

export default function DeleteBranchView({ setOpen, isPending, branch, handleDelete }: DeleteBranchViewProps) {
  return (
    <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
            <Trash className="w-6 h-6" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            ¿Eliminar sucursal?
          </h2>

          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Estás a punto de eliminar la sucursal{" "}
            <span className="font-semibold text-slate-700">
              {branch.name}
            </span>
            . Esta acción es permanente y no podrás recuperar la
            información de esta sucursal.
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
              onClick={handleDelete}
              disabled={isPending}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Eliminando..." : "Sí, eliminar"}
            </button>
          </div>
        </div>
  )
}
