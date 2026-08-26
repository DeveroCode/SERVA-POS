import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import type { Business, createNewBranch } from "@/types/Index.types";
import { Building2, MapPin, Phone, Mail, Link } from "lucide-react";
import { useFormContext } from "react-hook-form";

type AddNewBranchFormProps = {
  business: Business
};

export default function AddNewBranchForm({ business }: AddNewBranchFormProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<createNewBranch>();
  return (
    <>
      {/* General Information */}
      <section className="bg-white rounded-[20px] border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-700">
            <Building2 className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Información General
            </h3>

            <p className="text-xs text-slate-400">
              Datos identificativos principales de la sucursal.
            </p>
          </div>
        </div>

        <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Nambe of Branch */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Nombre de la Sucursal <span className="text-orange-700">*</span>
            </label>

            <input
              type="text"
              placeholder="Ej. Sucursal Centro"
              id="name"
              className="input-add-branch"
              {...register("name", {
                required: "El nombre de la sucursal es obligatorio",
              })}
            />

            {errors.name && <ErrorAlert>{errors.name.message}</ErrorAlert>}
          </div>

          {/* Slug */}
          <section className="space-y-1.5">
            <label htmlFor="slug" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Slug <span className="text-orange-700">*</span>
            </label>

           <fieldset className="relative">
              <Link className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <div className="flex items-center">
                <span className="pl-10 pr-1 text-sm text-slate-400 bg-slate-50 border border-r-0 border-slate-200 rounded-l-xl h-11 flex items-center whitespace-nowrap">
                  {business?.slug}.com/
                </span>

                <input
                  type="text"
                  placeholder="sucursal-centro"
                  id="slug"
                  className="flex-1 h-11 px-3.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-r-xl font-mono text-slate-800 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all duration-200"
                  {...register("slug", {
                    required: "El slug de la sucursal es obligatorio",
                    pattern: {
                      value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                      message:
                        "El slug solo puede contener letras minúsculas, números y guiones",
                    },
                  })}
                />
              </div>
            </fieldset>


            <p className="text-[11px] text-slate-400">
              Identificador utilizado para la URL de la sucursal.
            </p>

            {errors.slug && <ErrorAlert>{errors.slug.message}</ErrorAlert>}
          </section>

          {/* Phone */}
          <fieldset className="space-y-1.5">
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Teléfono <span className="text-orange-700">*</span>
            </label>

            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="tel"
                id="phone"
                placeholder="+52 636 000 0000"
                className="input-email-phone"
                {...register("phone", {
                  required: "El teléfono de la sucursal es obligatorio",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "El teléfono debe contener 10 números",
                  }
                })}
              />
            </div>
            {errors.phone && <ErrorAlert>{errors.phone.message}</ErrorAlert>}
          </fieldset>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Email de Sucursal <span className="text-orange-700">*</span>
            </label>

            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                placeholder="sucursal@tunegocio.com"
                id="email"
                className="input-email-phone"
                {...register("email", {
                  required: "El email de la sucursal es obligatorio"
                })}
              />
            </div>

            {errors.email && <ErrorAlert>{errors.email.message}</ErrorAlert>}
          </div>
        </fieldset>
      </section>

      {/* direction */}
      <div className="bg-white rounded-[20px] border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <section className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-700">
            <MapPin className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Dirección y Ubicación
            </h3>

            <p className="text-xs text-slate-400">
              Ubicación física de la sucursal.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Calle */}
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="street" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Calle / Avenida <span className="text-orange-700">*</span>
            </label>

            <input
              type="text"
              placeholder="Av. Reforma"
              id="street"
              className="input-add-branch"
              {...register("address.street", { required: "La calle de la sucursal es obligatoria" })}
            />

            {errors.address?.street && <ErrorAlert>{errors.address.street.message}</ErrorAlert>}
          </div>

          {/* Ciudad */}
          <div className="space-y-1.5">
            <label htmlFor="city" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Ciudad <span className="text-orange-700">*</span>
            </label>

            <input
              type="text"
              placeholder="Nuevo Casas Grandes"
              id="city"
              className="input-add-branch"
              {...register("address.city", { required: "La ciudad de la sucursal es obligatoria" })}
            />

            {errors.address?.city && <ErrorAlert>{errors.address.city.message}</ErrorAlert>}
          </div>

          {/* State */}
          <div className="space-y-1.5">
            <label htmlFor="state" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Estado <span className="text-orange-700">*</span>
            </label>

            <input
              type="text"
              placeholder="Chihuahua"
              id="state"
              className="input-add-branch"
              {...register("address.state", { required: "El estado de la sucursal es obligatorio" })}
            />

            {errors.address?.state && <ErrorAlert>{errors.address.state.message}</ErrorAlert>}
          </div>

          {/* Código Postal */}
          <div className="space-y-1.5">
            <label htmlFor="zipCode" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Código Postal <span className="text-orange-700">*</span>
            </label>

            <input
              type="text"
              placeholder="31700"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl font-mono text-slate-800 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all duration-200"
              {...register("address.zipCode", { required: "El código postal de la sucursal es obligatorio" })}
            />

            {errors.address?.zipCode && <ErrorAlert>{errors.address.zipCode.message}</ErrorAlert>}
          </div>

          {/* País */}
          <div className="space-y-1.5">
            <label htmlFor="country" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              País <span className="text-orange-700">*</span>
            </label>

            <input type="text" className="input-add-branch" {...register("address.country", { required: "El país de la sucursal es obligatorio" })} />

            {errors.address?.country && <ErrorAlert>{errors.address.country.message}</ErrorAlert>}
          </div>
        </div>
      </div>
    </>
  );
}
