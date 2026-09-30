import CreateBranch from "@/Components/Cards/Branch/CreateBranch";
import { useBranches } from "@/hooks/useBranches";
import useBusinessContext from "@/hooks/useBusinessContext";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone, ExternalLink
} from "lucide-react";

export default function BranchesPreviewView() {
  const { currentBusinessId } = useBusinessContext();
  const { data } = useBranches(currentBusinessId);

  const previewBranches = data?.data.slice(0, 3) ? data.data : [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {previewBranches.map((branch) => (
        <motion.div
          key={branch._id}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
        >
          <div>
            {/* Branch Image Banner */}
            <div className="h-36 w-full relative overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt={branch.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase text-gray-800 shadow-sm">
                {branch.slug}
              </div>
            </div>

            {/* Branch Details */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-700 transition-colors flex items-center justify-between">
                  {branch.name}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{branch.address.street + ", " + branch.address.zipCode + ", " + branch.address.city}</span>
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> Teléfono:
                  </span>
                  <span className="font-medium text-gray-800">
                    {branch.phone}
                  </span>
                </div>

                {/* <div className="flex items-center justify-between text-gray-600">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Equipo:
                  </span>
                  <span className="font-semibold text-gray-900">
                    {branch.} Empleados
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-gray-400 text-xs">Administrador:</span>
                  <div className="flex items-center gap-2">
                    <img
                      src={branch.adminAvatar}
                      alt={branch.adminName}
                      className="w-5 h-5 rounded-full object-cover border border-gray-200"
                    />
                    <span className="font-semibold text-xs text-gray-800">
                      {branch.adminName}
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Branch Action Footer */}
          <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2">
            <button className="flex-1 cursor-pointer py-2 px-3 text-xs font-semibold text-white bg-gray-900 hover:bg-orange-700 rounded-xl transition-colors duration-200 shadow-sm flex items-center justify-center gap-1.5">
              <span>Ver Sucursal</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      ))}

      {previewBranches.length < 3 && <CreateBranch />}
    </div>
  );
}
