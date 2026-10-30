import { type AddMemberToBranch } from "@/types/Index.types";
import { ShieldCheck, Key, Lock, Eye, Building2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import Loader from "@/pages/Loader";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useEmployeeBranch } from "@/hooks/useEmployeeBranch";

export default function AddEmployeeToBranchForm() {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<AddMemberToBranch>();
  const { currentBranchId } = useBusinessContext();
  const { data: branch, isPending } = useEmployeeBranch(currentBranchId);
  if (isPending) return <Loader />;

  return (
    <>
      {/* Credenciales */}
      <div className="bg-white rounded-[20px] border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Section Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Credenciales de acceso
            </h2>

            <p className="text-xs text-slate-400">
              Configura las credenciales que utilizará este miembro.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* User Key */}
            <div className="space-y-1.5">
              <label
                htmlFor="userKey"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Clave de usuario
                <span className="text-orange-700 ml-1">*</span>
              </label>

              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  id="userKey"
                  {...register("userKey", {
                    required:
                      "El userKey es obligatorio, solo puede contener letras y numeros",
                  })}
                  placeholder="Ej. empleado-01"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl font-mono placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
                />
              </div>

              <p className="text-[11px] text-slate-400">
                Identificador que utilizará el miembro para acceder al sistema.
              </p>

              {errors.userKey && (
                <ErrorAlert>{errors.userKey.message}</ErrorAlert>
              )}
            </div>
            {/* Select Branch */}
            <div className="space-y-1.5">
              <label
                htmlFor="branchName"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Sucursal
              </label>

              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="branchName"
                  type="text"
                  readOnly
                  tabIndex={-1}
                  value={branch?.name ?? ""}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200/90 rounded-xl font-medium text-slate-600 cursor-not-allowed focus:outline-none"
                />

                {/* El valor que se envía es el id */}
                <input
                  type="hidden"
                  defaultValue={currentBranchId}
                  {...register("branchId", {
                    required: "No se pudo determinar la sucursal",
                  })}
                />
              </div>

              {errors.branchId && (
                <ErrorAlert>{errors.branchId.message}</ErrorAlert>
              )}

              <p className="text-[11px] text-slate-400">
                El miembro se agregará a la sucursal actual.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Contraseña
                <span className="text-orange-700 ml-1">*</span>
              </label>

              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                  })}
                  id="password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
                />

                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {errors.password && (
                <ErrorAlert>{errors.password.message}</ErrorAlert>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                htmlFor="passwordConfirm"
              >
                Confirmar contraseña
                <span className="text-orange-700 ml-1">*</span>
              </label>

              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("passwordConfirm", {
                    required: "La confirmación de contraseña es obligatoria",

                    validate: (value) =>
                      value === getValues("password") ||
                      "Las contraseñas no coinciden",
                  })}
                  id="passwordConfirm"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
                />
              </div>

              {errors.passwordConfirm && (
                <ErrorAlert>{errors.passwordConfirm.message}</ErrorAlert>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
