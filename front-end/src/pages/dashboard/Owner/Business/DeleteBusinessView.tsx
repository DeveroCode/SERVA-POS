import { Trash2, AlertTriangle, Loader2 } from 'lucide-react'

interface DeleteBusinessViewProps {
  onCancel: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export default function DeleteBusinessView({
  onCancel,
  onConfirm,
  isLoading = false
}: DeleteBusinessViewProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 font-sans text-gray-800">
      {/* Header Visual & Icon */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shadow-sm">
          <Trash2 className="w-6 h-6" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          ¿Eliminar este negocio?
        </h2>

        {/* Main Description */}
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal max-w-sm">
          Esta acción es permanente. Al eliminar este negocio, perderás toda la información
          asociada y no podrás recuperarla posteriormente.
        </p>
      </div>

      {/* Visual Warning Box */}
      <div className="mt-5 p-3.5 bg-red-50/70 border border-red-100/80 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        <p className="text-xs font-medium text-red-900 leading-snug">
          Esta acción no se puede deshacer.
        </p>
      </div>

      {/* Actions / Buttons */}
      <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full sm:w-auto cursor-pointer px-4 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200/90 rounded-xl hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-[0.98]"
        >
          Cancelar
        </button>

        {/* Delete Destructive Button */}
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full cursor-pointer sm:w-auto px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Eliminando...</span>
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4 opacity-90" />
              <span>Eliminar negocio</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}