import { itemVariants } from "@/data/BusinessDataExample";
import { useBusiness } from "@/hooks/useBusiness";
import useBusinessContext from "@/hooks/useBusinessContext";
import { motion } from "framer-motion";
import { Building2, Phone, Mail } from "lucide-react";

type BusinessInformationProps = {
    open: boolean;
    setOpen: (open: boolean) => void
}

export default function BusinessInformation({ setOpen }: BusinessInformationProps) {
  const { currentBusinessId } = useBusinessContext();
  const { data: businessData } = useBusiness(currentBusinessId);
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Business Info (2 cols) */}
      <motion.section variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-700" />
              Información Corporativa & Contacto
            </h2>
            <p className="text-xs text-gray-500">
              Datos públicos e información fiscal del grupo
            </p>
          </div>
          <button onClick={() => setOpen(true)} className="px-3 py-1.5 cursor-pointer text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            Editar Datos
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-gray-400 font-medium">
              Nombre Legal / Razón Social
            </span>
            <p className="text-sm font-semibold text-gray-900">
              {businessData.name}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 font-medium flex items-center gap-1.5">
              URL / Nombre del dominio creado por <p className="text-orange-700 font-bold">SERVA</p>
            </span>
            <p className="text-sm font-semibold text-gray-900">
              {`https://serva.com/${businessData.slug}`}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 font-medium">
              Correo Electrónico Oficial
            </span>
            <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              {businessData.email}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-gray-400 font-medium">
              Teléfono Principal
            </span>
            <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              {businessData.phone}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
