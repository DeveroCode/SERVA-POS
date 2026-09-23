import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import {
  MEMBER_ROLES_EXPLAIN, type UpdateCredentialsForm
} from "@/types/Index.types";
import {
  Eye,
  EyeOff,
  Key,
  Lock,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
export default function UpdateMemberCredentialsForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    getValues,
    formState: { errors },
    watch
  } = useFormContext<UpdateCredentialsForm>();

  const userNameDisplay = watch("name");
  const branchNameDisplay = watch("branchName");

  return (
    <div className="space-y-6">
      {/* User Found and Roles */}
      <div className="bg-white rounded-[20px] border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Section Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Información del miembro
            </h2>
            <p className="text-xs text-slate-400">
              Selecciona el usuario y define su función.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Usuario (Bloqueado / No editable) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Usuario
            </label>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={userNameDisplay}
                readOnly
                disabled
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-100/80 border border-slate-200/90 rounded-xl font-medium text-slate-500 cursor-not-allowed select-none focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              El usuario asignado a estas credenciales no se puede editar.
            </p>
          </div>

          {/* Rol */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Rol
              <span className="text-orange-700 ml-1">*</span>
            </label>

            <select
              {...register("role", { required: "El rol es obligatorio" })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium text-slate-700 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
            >
              <option value="" disabled>
                Seleccionar rol
              </option>

              {Object.entries(MEMBER_ROLES_EXPLAIN).map(
                ([roleKey, description]) => (
                  <option key={roleKey} value={roleKey.toLowerCase()}>
                    {description}
                  </option>
                ),
              )}
            </select>

            {errors.role && <ErrorAlert>{errors.role.message}</ErrorAlert>}

            <p className="text-[11px] text-slate-400">
              Define el nivel de acceso del miembro.
            </p>
          </div>
        </div>
      </div>

      {/* Password and Users */}
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
                    required: "El userKey es obligatorio",
                  })}
                  placeholder="Ej. empleado-01"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl font-mono placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
                />
              </div>

              {errors.userKey && (
                <ErrorAlert>{errors.userKey.message}</ErrorAlert>
              )}

              <p className="text-[11px] text-slate-400">
                Identificador que utilizará el miembro para acceder al sistema.
              </p>
            </div>

            {/* Select Branch (Bloqueado / No editable) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Sucursal
              </label>

              <select
                disabled
                value={branchNameDisplay}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-100/80 border border-slate-200/90 rounded-xl font-medium text-slate-500 cursor-not-allowed select-none focus:outline-none appearance-none"
              >
                <option value={branchNameDisplay}>
                  {branchNameDisplay || "Cargando sucursal..."}
                </option>
              </select>

              <p className="text-[11px] text-slate-400">
                La sucursal asignada a estas credenciales no se puede cambiar.
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
              </label>

              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
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
              </label>

              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  id="passwordConfirm"
                  {...register("passwordConfirm", {
                    validate: (value) => {
                      const pass = getValues("password");
                      if (pass && value !== pass) {
                        return "Las contraseñas no coinciden";
                      }
                      return true;
                    },
                  })}
                  placeholder="••••••••"
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
    </div>
  );
}
