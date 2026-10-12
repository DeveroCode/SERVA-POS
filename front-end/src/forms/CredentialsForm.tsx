import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import type { CredentialForm } from "@/types/Index.types";
import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CredentialsForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CredentialForm>();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          UserKey de Empleado
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <KeyRound className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Ej. USR-8492"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all"
            {...register("userKey", {
              required: "El userKey es obligatorio para iniciar sesión",
            })}
          />
        </div>

        {errors.userKey && <ErrorAlert>{errors.userKey.message}</ErrorAlert>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all"
            {...register("password", {
              required: "La contraseña es obligatoria para iniciar sesión",
            })}
          />
          {errors.password && (
            <ErrorAlert>{errors.password.message}</ErrorAlert>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
