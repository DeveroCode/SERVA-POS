import LabelForm from "@/Components/Texts/LabelForm";
import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import { useFormContext } from "react-hook-form";
import type { UpdateUser } from "types/User.types";

export default function UpdatePersonalInfoForm() {
  const {register, formState: {errors}} = useFormContext<UpdateUser>();
  return (
    <div className="space-y-3">
      <fieldset className="flex gap-5">
        <div className="flex flex-col">
          <LabelForm section="name">nombre(s)</LabelForm>
          <input
            type="text"
            id="name"
            className="input-form capitalize"
            placeholder="Ingresa tu(s) nombre(s)"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && (
                <ErrorAlert>{errors.name.message}</ErrorAlert>
              )}
        </div>
        <div className="flex flex-col">
          <LabelForm section="last_names">apellido(s)</LabelForm>
          <input
            type="text"
            id="last_names"
            className="input-form capitalize"
            placeholder="Ingresa tus apellidos"
            {...register("last_name", { required: "Los apellidos son obligatorios" })}
          />
          {errors.last_name && (
                <ErrorAlert>{errors.last_name.message}</ErrorAlert>
              )}
        </div>
      </fieldset>
      <fieldset className="flex gap-5">
        <div className="flex flex-col">
          <LabelForm section="date">fecha de nacimiento</LabelForm>
          <input
            type="date"
            id="date"
            className="input-form w-52"
            {...register("birthday", { required: "La fecha de nacimiento es obligatoria" })}
          />
          {errors.birthday && (
                <ErrorAlert>{errors.birthday.message}</ErrorAlert>
              )}
        </div>
        <div className="flex flex-col">
          <LabelForm section="phone">teléfono</LabelForm>
          <input
            type="tel"
            id="phone"
            className="input-form"
            placeholder="Ingresa tu número de teléfono"
            {...register("phone_number", { required: "El teléfono es obligatorio" })}
          />
          {errors.phone_number && (
                <ErrorAlert>{errors.phone_number.message}</ErrorAlert>
              )}
        </div>
      </fieldset>
      <fieldset className="flex flex-col">
          <LabelForm section="email">correo eléctronico</LabelForm>
          <input
            type="email"
            id="email"
            className="input-form"
            placeholder="Ingresa tu correo eléctronico"
            {...register("email", { required: "El correo électronico es obligatorio" })}
          />
          {errors.email && (
                <ErrorAlert>{errors.email.message}</ErrorAlert>
              )}
        </fieldset>
    </div>
  );
}
