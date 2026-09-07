import {
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  User,
  XCircle
} from "lucide-react";

import { MEMBER_ROLES_EXPLAIN, type RegisterMember } from "@/types/Index.types";
import { useFormContext } from "react-hook-form";
import ErrorAlert from "@/Components/Alerts/ErrorAlert";

export default function RegisterPersonalForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<RegisterMember>();

  const isActive = watch("isActive");
  return (
    <div className="space-y-5">
      {/* SECCIÓN 1: INFORMACIÓN PERSONAL */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-orange-700" />

          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Información Personal
            </h3>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Completa los datos principales del nuevo usuario.
            </p>
          </div>
        </div>

        {/* Grid Nombre + Apellido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
            >
              Nombre <span className="text-orange-700">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ej. Juan Carlos"
              className="w-full px-3.5 py-2 text-xs bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
              {...register("name", {
                required: "El nombre del usuario es obligatorio",
              })}
            />

            {errors.name && <ErrorAlert>{errors.name.message}</ErrorAlert>}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="last_name"
              className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
            >
              Apellido <span className="text-orange-700">*</span>
            </label>

            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Ej. Pérez Gómez"
              className="w-full px-3.5 py-2 text-xs bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
              {...register("last_name", {
                required: "El apellido del usuario es obligatorio",
              })}
            />

            {errors.last_name && (
              <ErrorAlert>{errors.last_name.message}</ErrorAlert>
            )}
          </div>
        </div>

        {/* Grid Teléfono + Fecha de Nacimiento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label
              htmlFor="phone_number"
              className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
            >
              Número Telefónico <span className="text-orange-700">*</span>
            </label>

            <div className="relative">
              <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                placeholder="Ej. +52 55 1234 5678"
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
                {...register("phone_number", {
                  required: "El número telefónico es obligatorio",
                })}
              />
            </div>

            {errors.phone_number && (
              <ErrorAlert>{errors.phone_number.message}</ErrorAlert>
            )}
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200/70" />

      {/* SECCIÓN 2: INFORMACIÓN DE CONTACTO */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-orange-700" />

          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Información de Contacto
            </h3>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Ingresa el correo electrónico asociado a la cuenta.
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
          >
            Correo Electrónico <span className="text-orange-700">*</span>
          </label>

          <div className="relative">
            <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Ej. juan.perez@correo.com"
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
              })}
            />
          </div>
          {errors.email && <ErrorAlert>{errors.email.message}</ErrorAlert>}
        </div>
      </div>

      <div className="h-px w-full bg-slate-200/70" />

      {/* SECCIÓN 3: ROL GLOBAL */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orange-700" />

          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Rol Global en la Plataforma
            </h3>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Define el nivel de acceso general del usuario dentro de SERVA.
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="role"
            className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
          >
            Rol del Usuario <span className="text-orange-700">*</span>
          </label>

          <select
            id="role"
            className="w-full px-3.5 py-2 text-xs bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
            {...register("role", {
              required: "El rol del usuario es obligatorio",
            })}
            name="role"
          >
            {Object.entries(MEMBER_ROLES_EXPLAIN).map(([role, description]) => (
              <option key={role} value={role.charAt(0).toLocaleLowerCase() + role.slice(1).toLowerCase()}>
                {description}
              </option>
            ))}
          </select>
          {errors.role && <ErrorAlert>{errors.role.message}</ErrorAlert>}
        </div>
      </div>

      <div className="h-px w-full bg-slate-200/70" />

      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Estado Inicial de la Cuenta
          </h3>

          <p className="text-[11px] text-slate-400 mt-1">
            Define si la cuenta estará disponible inmediatamente después de
            registrarla.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* ACTIVO */}
          <button
            type="button"
            onClick={() =>
              setValue("isActive", true, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
              isActive
                ? "border-emerald-300 bg-emerald-50 shadow-sm"
                : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/70"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                isActive ? "border-orange-700" : "border-slate-300"
              }`}
            >
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-orange-700" />
              )}
            </div>

            <CheckCircle2
              className={`w-4 h-4 shrink-0 ${
                isActive ? "text-emerald-600" : "text-slate-400"
              }`}
            />

            <div>
              <p className="text-xs font-bold text-slate-800">Activo</p>

              <p className="text-[10px] text-slate-500">
                Puede utilizar su cuenta.
              </p>
            </div>
          </button>

          {/* INACTIVO */}
          <button
            type="button"
            onClick={() =>
              setValue("isActive", false, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
              !isActive
                ? "border-slate-400 bg-slate-100 shadow-sm"
                : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/70"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                !isActive ? "border-orange-700" : "border-slate-300"
              }`}
            >
              {!isActive && (
                <div className="w-2 h-2 rounded-full bg-orange-700" />
              )}
            </div>

            <XCircle
              className={`w-4 h-4 shrink-0 ${
                !isActive ? "text-slate-600" : "text-slate-400"
              }`}
            />

            <div>
              <p className="text-xs font-bold text-slate-800">Inactivo</p>

              <p className="text-[10px] text-slate-500">
                Su acceso permanecerá suspendido.
              </p>
            </div>
          </button>
        </div>

        {/* Registro del campo para React Hook Form */}
        <input type="hidden" {...register("isActive")} />
      </div>
    </div>
  );
}
