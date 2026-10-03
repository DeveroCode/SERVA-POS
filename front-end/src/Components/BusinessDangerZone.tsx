import { itemVariants } from "@/data/BusinessDataExample";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useUpdateActiveBusiness } from "@/mutations/useMutationBusiness";
import { useBusiness } from "@/hooks/useBusiness";
import type { UpdateActive } from "@/types/Business.types";

type BusinessDangerZoneProps = {
  setIsDelete?: (open: boolean) => void;
};

export default function BusinessDangerZone({
  setIsDelete,
}: BusinessDangerZoneProps) {
  const { currentBusinessId } = useBusinessContext();
  const { data } = useBusiness(currentBusinessId);
  const { mutate } = useUpdateActiveBusiness();

  const handleSendActive = ({ isActive, businessId }: UpdateActive) => {
    mutate({ isActive, businessId });
  };

  return (
    <motion.section variants={itemVariants} className="pt-6">
      <div className="bg-red-50/30 rounded-2xl border border-red-200/80 p-6 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-red-100">
          <AlertTriangle className="w-5 h-5 text-red-600" />

          <div>
            <h3 className="text-base font-bold text-red-950">
              Zona de Peligro
            </h3>

            <p className="text-xs text-red-700/80">
              Acciones destructivas e irreversibles para la organización
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-red-100 shadow-sm">
            <div>
              <h4 className="text-xs font-bold text-gray-900">
                {data?.isActive
                  ? "Desactivar Negocio Temporalmente"
                  : "Activar Negocio"}
              </h4>

              <p className="text-[11px] text-gray-500 mt-0.5">
                {data?.isActive
                  ? "Suspende el acceso de todas las sucursales y terminales POS inmediatamente."
                  : "Permite nuevamente el acceso de las sucursales y terminales POS."}
              </p>
            </div>

            <button
              disabled={!data}
              onClick={() =>
                handleSendActive({
                  isActive: !data?.isActive,
                  businessId: currentBusinessId,
                })
              }
              className="px-3.5 py-2 cursor-pointer text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {data?.isActive ? "Desactivar Negocio" : "Activar Negocio"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-red-200 shadow-sm">
            <div>
              <h4 className="text-xs font-bold text-red-600">
                Eliminar Negocio Definitivamente
              </h4>

              <p className="text-[11px] text-gray-500 mt-0.5">
                Elimina permanentemente todas las sucursales, historial de
                ventas, menús y datos fiscales.
              </p>
            </div>

            <button
              onClick={() => setIsDelete?.(true)}
              className="px-3.5 cursor-pointer py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm whitespace-nowrap"
            >
              Eliminar Empresa
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
