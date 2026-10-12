import NotEmployeeBranches from "@/Components/NoData/NotEmployeeBranches";
import ModalLayout from "@/Components/Modals/ModalLayout";
import StartBranchModal from "@/pages/dashboard/Employee/StartBranchView";
import { type Branch, type Branches } from "@/types/Index.types";
import { ChevronRight, MapPin, ShieldAlert, Store } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { SET_BRANCH_KEY } from "@/utils/key";

type EmployeeBranchesProps = {
  branches: Branches;
  openModalCredential: boolean;
  setOpenModalCredential: Dispatch<SetStateAction<boolean>>
};

export default function EmployeeBranches({
  branches,
  openModalCredential,
  setOpenModalCredential
}: EmployeeBranchesProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<Branch | null>(null);
  const filteredBranches = branches?.data ?? [];

  const handleSelectBranch = (branch: Branch) => {
    localStorage.setItem(SET_BRANCH_KEY, branch._id);
    setSelectedBranchId(branch);
    setOpenModalCredential(true);
  }
  return (
    <div>
      {filteredBranches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBranches.map((branch) => {
            const isDisabled = branch.isActive === false;
            const isSelected = selectedBranchId?._id === branch._id;

            return (
              <div
                key={branch._id}
                onClick={() => handleSelectBranch(branch)}
                className={`group relative rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between ${
                  isDisabled
                    ? "bg-slate-100/70 border-slate-200 opacity-60 cursor-not-allowed"
                    : "bg-white cursor-pointer shadow-sm hover:shadow-md"
                } ${
                  isSelected
                    ? "border-orange-700 ring-2 ring-orange-700/15 bg-orange-50/20"
                    : !isDisabled && "border-slate-200 hover:border-orange-300"
                }`}
              >
                <div>
                  {/* Header Card: Icono y Código */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isDisabled
                          ? "bg-slate-200 text-slate-400"
                          : isSelected
                            ? "bg-orange-700 text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-700"
                      }`}
                    >
                      <Store className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                        {branch.slug}
                      </span>
                    </div>
                  </div>

                  {/* Nombre y Dirección */}
                  <h3
                    className={`font-semibold text-sm leading-snug mb-1 ${
                      isDisabled
                        ? "text-slate-500"
                        : "text-slate-900 group-hover:text-orange-700 transition-colors"
                    }`}
                  >
                    {branch.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-start gap-1.5 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      {branch.address.street}, {branch.address.city}
                    </span>
                  </p>
                </div>

                {/* Footer Card: Rol y Acción */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {isDisabled ? (
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Acceso restringido
                    </span>
                  ) : (
                    <>
                      <span className="text-[11px] font-medium text-slate-500">
                        Rol:{" "}
                        <strong className="text-slate-700 font-semibold">
                          Adminstrador
                        </strong>
                      </span>

                      <span className="font-semibold text-orange-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        {isSelected ? (
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-700 animate-ping" />
                            Entrando
                          </span>
                        ) : (
                          <>
                            Entrar
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NotEmployeeBranches />
      )}

      <ModalLayout
        open={openModalCredential}
        setOpen={setOpenModalCredential}
      >
       <StartBranchModal sucursalName={selectedBranchId?.name}  />
      </ModalLayout>
    </div>
  );
}
