import { type AddMemberToBranch } from "@/types/Member.types";
import { ShieldCheck, Key, Lock, Eye } from "lucide-react";
import { useFormContext } from "react-hook-form";
import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import { LAST_BUSINESS_KEY } from "@/utils/key";
import { useParams } from "react-router-dom";
import { useBranches } from "@/hooks/useBranches";
import Loader from "@/pages/Loader";

export default function AddPersonnelForm() {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<AddMemberToBranch>();
  const businessParam = useParams().businessId;
  const businessId = localStorage.getItem(LAST_BUSINESS_KEY) || businessParam;

  const { data: branches, isLoading } = useBranches(businessId);

  if (isLoading) return <Loader />;

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
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                sucursal
                <span className="text-orange-700 ml-1">*</span>
              </label>

              <select
                {...register("branchId", {
                  required: "Selecciona una sucursal para el miembro",
                })}
                defaultValue=""
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium text-slate-700 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
              >
                <option value="" disabled>
                  Seleccionar sucursal
                </option>

                {branches?.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>

              {errors.branchId && (
                <ErrorAlert>{errors.branchId.message}</ErrorAlert>
              )}

              <p className="text-[11px] text-slate-400">
                selecciona la sucursal a la que pertenecerá el miembro
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
