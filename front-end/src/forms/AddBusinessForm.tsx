import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import type { CreateBusiness } from "@/types/Index.types";
import { useFormContext } from "react-hook-form";

export default function AddBusinessForm() {
  const {register, formState: {errors}} = useFormContext<CreateBusiness>();
  return (
    <>
      {/* Main Fields Grid */}
      <div className="space-y-5 border-b border-gray-200 pb-5">
        {/* Row 1: Business Name & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <fieldset className="space-y-2">
            <label htmlFor="name" className="label-add-business">
              nombre del negocio <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="input-add-business"
              placeholder="Ej: Serva Bistro & Bar"
              {...register("name", { required: "El nombre del negocio es obligatorio" })}
            />

            {errors.name && (
              <ErrorAlert>{errors.name.message}</ErrorAlert>
            )}
          </fieldset>
          <fieldset className="space-y-2">
            <label htmlFor="slug" className="label-add-business">
              slug url <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              id="slug"
              className="input-add-business"
              placeholder="serva-bistro-bar"
              {...register("slug", { required: "El slug es obligatorio" })}
            />

            {errors.slug && (
              <ErrorAlert>{errors.slug.message}</ErrorAlert>
            )}
          </fieldset>
        </div>
        {/* Row 2: Email & Phone number*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <fieldset className="space-y-2">
            <label htmlFor="email" className="label-add-business">
              correo electrónico <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              id="email"
              className="input-add-business"
              placeholder="contacto@tunegocio.com"
              {...register("email", { required: "El email es obligatorio" })}
            />

            {errors.email && (
              <ErrorAlert>{errors.email.message}</ErrorAlert>
            )}
          </fieldset>
          <fieldset className="space-y-2">
            <label htmlFor="phone" className="label-add-business">
              teléfono de contacto <span className="text-orange-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              className="input-add-business"
              placeholder="+52 (636) 230 56-78"
              {...register("phone", { required: "El telefono es obligatorio" })}
            />

            {errors.phone && (
              <ErrorAlert>{errors.phone.message}</ErrorAlert>
            )}
          </fieldset>
        </div>
        {/* Row 2: Description*/}
        <fieldset className="space-y-1">
          <label htmlFor="description" className="label-add-business">
            Descripción (opcional)
          </label>
          <textarea
            className="input-add-business"
            id="description"
            rows={4}
            cols={50}
            placeholder="Breve reseña sobre el conceptoo, oferta culinaria o servicios de tu establecimiento..."
            {...register("description")}
          />

          {errors.description && (
            <ErrorAlert>{errors.description.message}</ErrorAlert>
          )}
        </fieldset>
      </div>

      {/* Main Fields Grid for social media */}
      <div className="space-y-5 border-b border-gray-200 pb-5">
        <section>
          <label className="label-add-business">
            Redes sociales{" "}
            <span className="normal-case text-slate-400">(opcional)</span>
          </label>
          <p className="text-slate-400 text-xs font-semibold">
            Enlaces visibles en la cabecera de tus cartas digitales
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <input
            type="text"
            name="linkedin"
            className="input-add-business"
            placeholder="LinkedIn URL"
          />
          <input
            type="text"
            name="facebook"
            className="input-add-business"
            placeholder="Faccebook/pagina"
          />
          <input
            type="text"
            name="instagram"
            className="input-add-business"
            placeholder="@usuario_ig"
          />
        </div>
      </div>
    </>
  );
}
